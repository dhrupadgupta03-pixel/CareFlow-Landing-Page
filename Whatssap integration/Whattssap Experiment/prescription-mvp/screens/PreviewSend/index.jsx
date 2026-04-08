/**
 * Screen 3 — Preview + Send
 *
 * States handled internally:
 *   3A — uploading (spinner overlay on image, disabled Send button)
 *   3B — ready to send (clean image, active Send button)
 *   3C — upload failed (error banner, Retry button)
 *   3D — device offline (offline banner + status chip)
 *   3E — wrong number inline panel (phone correction without retake)
 *   3F — WhatsApp blocked (copy link fallback)
 *
 * Props:
 *   patientName     {string}
 *   sanitizedPhone  {string}   E.164 digits e.g. "919876543210"
 *   previewUrl      {string}   local object URL for instant preview
 *   capturedFile    {File}
 *   onRetake        {fn}       resets back to Screen 2
 *   appUrl          {string}   base URL e.g. window.location.origin
 */

'use client';
import { useState } from 'react';
import Card     from '../../components/Card.jsx';
import Button   from '../../components/Button.jsx';
import Badge    from '../../components/Badge.jsx';
import Banner   from '../../components/Banner.jsx';
import Divider  from '../../components/Divider.jsx';
import { validatePhone, formatPhoneDisplay } from '../../backend/lib/phone.js';

export default function PreviewSend({
  patientName,
  sanitizedPhone,
  previewUrl,
  capturedFile,
  onRetake,
  appUrl,
}) {
  const [uploading, setUploading]             = useState(false);       // 3A
  const [uploadError, setUploadError]         = useState(null);        // 3C
  const [isOffline, setIsOffline]             = useState(false);       // 3D
  const [prescriptionId, setPrescriptionId]   = useState(null);
  const [waBlocked, setWaBlocked]             = useState(false);       // 3F
  const [prescriptionUrl, setPrescriptionUrl] = useState(null);
  const [copied, setCopied]                   = useState(false);

  // 3E — wrong number panel
  const [showNumberPanel, setShowNumberPanel] = useState(false);
  const [altPhone, setAltPhone]               = useState('');
  const [altPhoneError, setAltPhoneError]     = useState(null);
  const [activePhone, setActivePhone]         = useState(sanitizedPhone);

  async function doUpload(phone) {
    if (!navigator.onLine) {
      setIsOffline(true);
      setUploadError('No internet connection. Connect to WiFi or mobile data, then tap Retry.');
      return null;
    }

    setUploading(true);
    setUploadError(null);
    setIsOffline(false);

    try {
      const form = new FormData();
      form.append('image',        capturedFile);
      form.append('patientName',  patientName);
      form.append('patientPhone', phone);

      const res  = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Upload failed');

      return data.prescriptionId;
    } catch (err) {
      if (!navigator.onLine) {
        setIsOffline(true);
        setUploadError('No internet connection. Connect to WiFi or mobile data, then tap Retry.');
      } else {
        setUploadError('Upload failed. Check your connection and try again.');
      }
      return null;
    } finally {
      setUploading(false);
    }
  }

  function fireWhatsApp(rxId, phone) {
    const url     = `${appUrl}/prescription/${rxId}`;
    const message = `Here is your prescription from Dr. Reynaldo O. Joson:\n\n${url}`;
    const waLink  = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    const newWindow = window.open(waLink, '_blank');

    // If window.open returns null → popup blocked or WhatsApp not installed (3F)
    if (!newWindow || newWindow.closed) {
      setWaBlocked(true);
      setPrescriptionUrl(url);
    }

    // Clear sessionStorage after successful send attempt
    try { sessionStorage.removeItem('px_name'); sessionStorage.removeItem('px_phone'); } catch (_) {}
  }

  async function handleSend() {
    const rxId = await doUpload(activePhone);
    if (!rxId) return; // error already set
    setPrescriptionId(rxId);
    fireWhatsApp(rxId, activePhone);
  }

  async function handleRetry() {
    if (prescriptionId) {
      // Already uploaded — just retry the WhatsApp link
      fireWhatsApp(prescriptionId, activePhone);
    } else {
      const rxId = await doUpload(activePhone);
      if (!rxId) return;
      setPrescriptionId(rxId);
      fireWhatsApp(rxId, activePhone);
    }
  }

  async function handleCopyLink() {
    if (!prescriptionUrl) return;
    try {
      await navigator.clipboard.writeText(prescriptionUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {}
  }

  // 3E — confirm new number
  function handleConfirmAltPhone() {
    const result = validatePhone(altPhone);
    if (!result.valid) {
      setAltPhoneError(result.error);
      return;
    }
    setActivePhone(result.sanitized);
    setShowNumberPanel(false);
    setAltPhone('');
    setAltPhoneError(null);
  }

  const displayPhone = formatPhoneDisplay(activePhone);
  const isReady      = !uploading && !uploadError && !waBlocked;

  return (
    <Card>
      {/* Patient identity block */}
      <Badge />
      <h2 style={{ margin: '4px 0 4px', fontSize: '28px', fontWeight: '400', color: '#1C1B1F' }}>
        {patientName}
      </h2>
      <Divider />

      {/* Prescription image container */}
      <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={previewUrl}
          alt={`Prescription photo for ${patientName}`}
          style={{
            width:        '100%',
            height:       'auto',
            display:      'block',
            border:       uploadError ? '1.5px solid #B3261E' : '1px solid #E7E0EC',
            borderRadius: '12px',
          }}
        />

        {/* 3A — Uploading overlay */}
        {uploading && (
          <div style={{
            position:       'absolute', inset: 0,
            background:     'rgba(255,255,255,0.65)',
            display:        'flex', flexDirection: 'column',
            alignItems:     'center', justifyContent: 'center', gap: '8px',
            borderRadius:   '12px',
          }}>
            <span className="md3-spinner-teal" aria-hidden="true" />
            <p style={{ margin: 0, fontSize: '16px', fontWeight: '500', color: '#00897B' }}>
              Uploading…
            </p>
          </div>
        )}
      </div>

      {/* 3A — Progress bar + label */}
      {uploading && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            height: '4px', borderRadius: '100px',
            background: '#E0F2F1', overflow: 'hidden',
          }}>
            <div className="md3-progress-indeterminate" style={{ height: '100%', background: '#00897B' }} />
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#49454F', textAlign: 'right' }}>
            Preparing your prescription…
          </p>
        </div>
      )}

      {/* 3C — Upload error banner */}
      {uploadError && !isOffline && (
        <Banner variant="error" style={{ marginBottom: '20px' }}>
          Upload failed. Check your connection and try again.
        </Banner>
      )}

      {/* 3D — Offline banner */}
      {isOffline && (
        <>
          <Banner variant="warning" style={{ marginBottom: '8px' }}>
            No internet connection.{'\n'}Connect to WiFi or mobile data, then tap Retry.
          </Banner>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            height: '32px', padding: '0 12px', borderRadius: '100px',
            background: '#F4F6F8', border: '1px solid #E7E0EC',
            fontSize: '12px', fontWeight: '500', color: '#49454F',
            marginBottom: '20px',
          }}>
            📶 Device is offline
          </span>
        </>
      )}

      {/* 3F — WhatsApp blocked */}
      {waBlocked && (
        <>
          <Banner variant="info" style={{ marginBottom: '8px' }}>
            Could not open WhatsApp. Share this link with your patient manually.
          </Banner>
          <div style={{
            background: '#F4F6F8', borderRadius: '8px',
            border: '1px solid #E7E0EC', padding: '12px 16px',
            marginBottom: '20px',
          }}>
            <p style={{ margin: '0 0 8px', fontSize: '11px', fontWeight: '500', color: '#49454F', letterSpacing: '1px' }}>
              PRESCRIPTION LINK
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                flex: 1, fontSize: '12px', color: '#1C1B1F',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                fontFamily: 'monospace',
              }}>
                {prescriptionUrl}
              </span>
              <button
                onClick={handleCopyLink}
                style={{
                  flexShrink: 0, height: '32px', padding: '0 12px',
                  borderRadius: '100px', background: copied ? '#E0F2F1' : '#00897B',
                  color: copied ? '#004D40' : '#fff', border: 'none', cursor: 'pointer',
                  fontSize: '12px', fontWeight: '500', fontFamily: 'inherit',
                }}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <Button variant="outlined" onClick={handleRetry} icon="💬" style={{ marginBottom: '8px' }}>
            Try WhatsApp Again
          </Button>
          <Button variant="text" onClick={onRetake}>
            Retake Photo
          </Button>
        </>
      )}

      {/* 3E — Wrong number inline panel */}
      {showNumberPanel && (
        <div style={{
          background: '#FAFAFA', border: '1.5px solid #E0F2F1',
          borderRadius: '12px', padding: '16px', marginBottom: '24px',
        }}>
          <p style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '500', color: '#49454F' }}>
            Send to a different number
          </p>
          <input
            type="tel"
            inputMode="numeric"
            value={altPhone}
            onChange={(e) => { setAltPhone(e.target.value); setAltPhoneError(null); }}
            placeholder={displayPhone}
            aria-label="Alternative WhatsApp number"
            style={{
              width: '100%', height: '48px', padding: '0 12px',
              borderRadius: '8px', border: altPhoneError ? '1.5px solid #B3261E' : '1.5px solid #CAC4D0',
              fontSize: '16px', fontFamily: 'inherit', background: '#F4F6F8',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
          {altPhoneError && (
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#B3261E' }}>
              ⚠ {altPhoneError}
            </p>
          )}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button
              onClick={() => { setShowNumberPanel(false); setAltPhone(''); setAltPhoneError(null); }}
              style={{
                flex: 1, height: '44px', borderRadius: '100px',
                background: 'transparent', border: '1.5px solid #00897B',
                color: '#00897B', fontFamily: 'inherit', fontSize: '14px',
                fontWeight: '500', cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAltPhone}
              style={{
                flex: 1, height: '44px', borderRadius: '100px',
                background: '#00897B', border: 'none',
                color: '#fff', fontFamily: 'inherit', fontSize: '14px',
                fontWeight: '500', cursor: 'pointer',
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {/* 3B — Primary actions (shown when not blocked/uploading/failed) */}
      {!waBlocked && (
        <>
          {/* Send / Retry / Uploading button */}
          {uploadError ? (
            <Button variant="filled" loading={uploading} onClick={handleRetry} icon="↺" style={{ marginBottom: '8px' }}>
              Retry Upload
            </Button>
          ) : (
            <Button
              variant="filled"
              loading={uploading}
              disabled={uploading || showNumberPanel}
              onClick={handleSend}
              icon="💬"
              style={{ marginBottom: '8px' }}
            >
              {uploading ? 'Uploading…' : 'Send to WhatsApp'}
            </Button>
          )}

          <Button variant="outlined" onClick={onRetake} disabled={uploading} style={{ marginBottom: '16px' }}>
            Retake Photo
          </Button>

          {/* 3E trigger — wrong number text link */}
          {!showNumberPanel && (
            <p style={{ textAlign: 'center', margin: 0, fontSize: '12px', color: '#49454F' }}>
              Wrong number?{' '}
              <button
                onClick={() => setShowNumberPanel(true)}
                style={{
                  background: 'none', border: 'none', padding: 0,
                  color: '#00897B', fontSize: '12px', cursor: 'pointer',
                  textDecoration: 'underline', fontFamily: 'inherit',
                }}
              >
                Send to a different number →
              </button>
            </p>
          )}
        </>
      )}
    </Card>
  );
}
