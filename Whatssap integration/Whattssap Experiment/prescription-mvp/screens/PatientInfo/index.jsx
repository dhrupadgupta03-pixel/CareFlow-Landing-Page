/**
 * Screen 1 — Patient Info
 *
 * States handled internally:
 *   1A — empty form
 *   1B — name filled, phone empty
 *   1C — phone validation error
 *   1D — both fields valid, Continue active
 *   1E — session restored (info banner shown on mount if sessionStorage had data)
 *
 * Props:
 *   patientName     {string}
 *   patientPhone    {string}   raw input value
 *   onNameChange    {fn}
 *   onPhoneChange   {fn}
 *   onContinue      {fn}       called with (sanitizedPhone) when Continue tapped
 *   sessionRestored {boolean}  true → show "Your previous patient info was restored" banner
 *   onDismissRestore {fn}      called when doctor edits either field after restore
 */

'use client';
import { useState } from 'react';
import Card       from '../../components/Card.jsx';
import Button     from '../../components/Button.jsx';
import TextField  from '../../components/TextField.jsx';
import Banner     from '../../components/Banner.jsx';
import { validatePhone } from '../../backend/lib/phone.js';

export default function PatientInfo({
  patientName,
  patientPhone,
  onNameChange,
  onPhoneChange,
  onContinue,
  sessionRestored,
  onDismissRestore,
}) {
  // phoneError is only shown after the user has blurred the phone field
  const [phoneTouched, setPhoneTouched] = useState(false);

  const nameValid  = patientName.trim().length > 0;
  const phoneResult = validatePhone(patientPhone);
  const phoneError  = phoneTouched && !phoneResult.valid ? phoneResult.error : null;
  const phoneConfirm = phoneTouched && phoneResult.valid
    ? `Sending to ${phoneResult.display} — correct?`
    : null;

  const canContinue = nameValid && phoneResult.valid;

  function handleNameChange(e) {
    onDismissRestore?.();
    onNameChange(e.target.value);
  }

  function handlePhoneChange(e) {
    onDismissRestore?.();
    onPhoneChange(e.target.value);
  }

  function handlePhoneBlur() {
    setPhoneTouched(true);
  }

  function handleContinue() {
    if (!canContinue) return;
    onContinue(phoneResult.sanitized);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* 1E — Session restored banner (above the card) */}
      {sessionRestored && (
        <Banner variant="info">
          Your previous patient info was restored.
        </Banner>
      )}

      <Card>
        {/* Section heading */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{
            margin: 0, fontSize: '22px', fontWeight: '500',
            color: '#1C1B1F', letterSpacing: '0px',
          }}>
            New Prescription
          </h2>
          <p style={{
            margin: '4px 0 0', fontSize: '12px', fontWeight: '400',
            color: '#49454F', letterSpacing: '0.4px',
          }}>
            Enter patient details to continue
          </p>
        </div>

        {/* Patient Name field */}
        <TextField
          id="patient-name"
          label="Patient Name"
          value={patientName}
          onChange={handleNameChange}
          autoComplete="name"
          autoCorrect="off"
          spellCheck={false}
          style={{ marginBottom: '16px' }}
        />

        {/* WhatsApp Number field */}
        <TextField
          id="patient-phone"
          label="WhatsApp Number"
          value={patientPhone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          helperText={!phoneTouched ? 'Include country code if outside India' : null}
          errorText={phoneError}
          confirmText={phoneConfirm}
          style={{ marginBottom: '24px' }}
        />

        {/* Continue button */}
        <Button
          variant="filled"
          disabled={!canContinue}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Card>
    </div>
  );
}
