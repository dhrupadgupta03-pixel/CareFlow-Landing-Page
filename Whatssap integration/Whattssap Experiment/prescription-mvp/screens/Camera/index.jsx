/**
 * Screen 2 — Camera Capture
 *
 * States handled internally:
 *   2A — default placeholder, "Take Photo" button
 *   2B — camera permission denied (error placeholder + instructions)
 *   2C — HEIC format warning (preview unavailable, but upload will work)
 *
 * Props:
 *   patientName  {string}
 *   onCapture    {fn}  called with (file: File) when photo taken
 *   onBack       {fn}  returns to Screen 1 without clearing state
 */

'use client';
import { useRef, useState } from 'react';
import Card     from '../../components/Card.jsx';
import Button   from '../../components/Button.jsx';
import Badge    from '../../components/Badge.jsx';
import Banner   from '../../components/Banner.jsx';
import Divider  from '../../components/Divider.jsx';

const PLACEHOLDER_STYLE = {
  width:          '100%',
  height:         '260px',
  borderRadius:   '12px',
  display:        'flex',
  flexDirection:  'column',
  alignItems:     'center',
  justifyContent: 'center',
  gap:            '12px',
  marginBottom:   '16px',
};

export default function Camera({ patientName, onCapture, onBack }) {
  const fileInputRef = useRef(null);
  const [cameraError, setCameraError]   = useState(false);  // 2B
  const [heicWarning, setHeicWarning]   = useState(false);  // 2C
  const [capturedFile, setCapturedFile] = useState(null);

  function handleTakePhoto() {
    setCameraError(false);
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // 2B: some browsers fire change with an empty file on denial
    if (file.size === 0) {
      setCameraError(true);
      return;
    }

    // 2C: HEIC/HEIF from iPhone
    const isHeic = file.type === 'image/heic' || file.type === 'image/heif';
    if (isHeic) {
      setHeicWarning(true);
      setCapturedFile(file);
      return;
    }

    // Normal capture → hand off to parent immediately
    onCapture(file);
  }

  function handleHeicContinue() {
    if (capturedFile) onCapture(capturedFile);
  }

  function handleRetake() {
    setHeicWarning(false);
    setCapturedFile(null);
    // Reset the file input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  return (
    <Card>
      {/* Patient identity block */}
      <Badge />
      <h2 style={{
        margin: '4px 0 4px', fontSize: '28px', fontWeight: '400', color: '#1C1B1F',
      }}>
        {patientName || 'Patient'}
      </h2>
      <Divider />

      {/* Hidden file input — triggers native camera */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        aria-hidden="true"
      />

      {/* 2B — Camera denied */}
      {cameraError && (
        <>
          <div style={{
            ...PLACEHOLDER_STYLE,
            background:   '#F9DEDC',
            border:       '1.5px dashed rgba(179,38,30,0.4)',
          }}>
            <span style={{ fontSize: '40px' }} aria-hidden="true">🚫</span>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: '500', color: '#B3261E', textAlign: 'center' }}>
              Camera access denied
            </p>
            <p style={{
              margin: 0, fontSize: '12px', color: '#410E0B',
              textAlign: 'center', lineHeight: 1.6, maxWidth: '220px',
            }}>
              Go to browser Settings → Site Settings → Camera and allow access for this site. Then reload the page.
            </p>
          </div>
          <Button variant="filled" onClick={() => window.location.reload()} icon="↺">
            Reload Page
          </Button>
        </>
      )}

      {/* 2C — HEIC warning */}
      {heicWarning && !cameraError && (
        <>
          <div style={{
            ...PLACEHOLDER_STYLE,
            background: '#F4F6F8',
            border:     '1.5px solid #E7E0EC',
          }}>
            <span style={{ fontSize: '40px', color: '#49454F' }} aria-hidden="true">🖼</span>
            <p style={{ margin: 0, fontSize: '16px', color: '#49454F', textAlign: 'center' }}>
              Preview unavailable
            </p>
          </div>
          <Banner variant="warning" style={{ marginBottom: '16px' }}>
            Image captured in HEIC format. Preview won&apos;t show here — your patient will receive it correctly.
          </Banner>
          <Button variant="filled" onClick={handleHeicContinue} style={{ marginBottom: '12px' }}>
            Use This Photo
          </Button>
          <Button variant="text" onClick={handleRetake}>
            Retake Photo
          </Button>
        </>
      )}

      {/* 2A — Default placeholder */}
      {!cameraError && !heicWarning && (
        <>
          <div style={{
            ...PLACEHOLDER_STYLE,
            background: '#F4F6F8',
            border:     '1.5px dashed #CAC4D0',
          }}>
            <span style={{ fontSize: '40px', color: '#CAC4D0' }} aria-hidden="true">📷</span>
            <p style={{ margin: 0, fontSize: '16px', color: '#49454F', textAlign: 'center' }}>
              Take Prescription Photo
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: '#49454F', textAlign: 'center' }}>
              Position the prescription flat and in good light
            </p>
          </div>

          <Button variant="filled" onClick={handleTakePhoto} icon="📷" style={{ marginBottom: '12px' }}>
            Take Photo
          </Button>
          <Button variant="text" onClick={onBack}>
            ← Back to patient info
          </Button>
        </>
      )}

      {/* Back button always available when in error states */}
      {(cameraError) && (
        <Button variant="text" onClick={onBack} style={{ marginTop: '12px' }}>
          ← Back to patient info
        </Button>
      )}
    </Card>
  );
}
