/**
 * Doctor UI — state machine orchestrator.
 *
 * This file owns:
 *   - Global state (step, patient data, captured file)
 *   - sessionStorage persistence for Step 1 fields
 *   - Screen routing: renders PatientInfo → Camera → PreviewSend
 *
 * No UI logic lives here. Each screen component is self-contained.
 */

'use client';
import { useState, useEffect } from 'react';
import Header      from '../components/Header.jsx';
import PatientInfo from '../screens/PatientInfo/index.jsx';
import Camera      from '../screens/Camera/index.jsx';
import PreviewSend from '../screens/PreviewSend/index.jsx';

const SESSION_KEY_NAME  = 'px_name';
const SESSION_KEY_PHONE = 'px_phone';

export default function DoctorPortal() {
  const [step,           setStep]           = useState(1);
  const [patientName,    setPatientName]     = useState('');
  const [patientPhone,   setPatientPhone]    = useState('');   // raw input
  const [sanitizedPhone, setSanitizedPhone]  = useState('');   // E.164
  const [capturedFile,   setCapturedFile]    = useState(null);
  const [previewUrl,     setPreviewUrl]      = useState(null);
  const [sessionRestored, setSessionRestored] = useState(false);

  // Restore from sessionStorage on mount (Screen 1E)
  useEffect(() => {
    try {
      const savedName  = sessionStorage.getItem(SESSION_KEY_NAME);
      const savedPhone = sessionStorage.getItem(SESSION_KEY_PHONE);
      if (savedName || savedPhone) {
        if (savedName)  setPatientName(savedName);
        if (savedPhone) setPatientPhone(savedPhone);
        setSessionRestored(true);
      }
    } catch (_) {}
  }, []);

  // Persist to sessionStorage on every keystroke
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY_NAME,  patientName);
      sessionStorage.setItem(SESSION_KEY_PHONE, patientPhone);
    } catch (_) {}
  }, [patientName, patientPhone]);

  function handleContinue(sanitized) {
    setSanitizedPhone(sanitized);
    setStep(2);
  }

  function handleCapture(file) {
    setCapturedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setStep(3);
  }

  function handleRetake() {
    setCapturedFile(null);
    setPreviewUrl(null);
    setStep(2);
  }

  function handleBackToStep1() {
    setStep(1);
  }

  return (
    <div style={{
      maxWidth:      '430px',
      margin:        '0 auto',
      minHeight:     '100vh',
      background:    '#F4F6F8',
      paddingBottom: 'env(safe-area-inset-bottom, 32px)',
    }}>
      <Header />

      <div style={{ padding: '16px' }}>
        {step === 1 && (
          <PatientInfo
            patientName={patientName}
            patientPhone={patientPhone}
            onNameChange={(v) => setPatientName(v)}
            onPhoneChange={(v) => setPatientPhone(v)}
            onContinue={handleContinue}
            sessionRestored={sessionRestored}
            onDismissRestore={() => setSessionRestored(false)}
          />
        )}

        {step === 2 && (
          <Camera
            patientName={patientName}
            onCapture={handleCapture}
            onBack={handleBackToStep1}
          />
        )}

        {step === 3 && capturedFile && (
          <PreviewSend
            patientName={patientName}
            sanitizedPhone={sanitizedPhone}
            previewUrl={previewUrl}
            capturedFile={capturedFile}
            onRetake={handleRetake}
            appUrl={typeof window !== 'undefined' ? window.location.origin : ''}
          />
        )}
      </div>
    </div>
  );
}
