/**
 * MD3 Filled Text Field.
 *
 * Supports:
 *   - Floating label (resting → active → floating)
 *   - Error state with icon + message
 *   - Confirmation state (teal checkmark + message)
 *   - Helper text (always-visible subtitle)
 */

'use client';
import { useState } from 'react';

export default function TextField({
  label,
  value,
  onChange,
  onBlur,
  type        = 'text',
  inputMode,
  autoComplete,
  autoCorrect = 'off',
  spellCheck  = false,
  helperText,
  errorText,
  confirmText,
  id,
  style       = {},
}) {
  const [focused, setFocused] = useState(false);

  const hasValue   = value && value.length > 0;
  const isFloating = focused || hasValue;
  const hasError   = !!errorText;
  const hasConfirm = !!confirmText && !hasError;

  const activeColor = hasError ? '#B3261E' : '#00897B';

  return (
    <div style={{ position: 'relative', ...style }}>
      {/* Field container */}
      <div
        style={{
          position:     'relative',
          background:   '#EEEEEE',
          borderRadius: '8px 8px 0 0',
          height:       '56px',
        }}
      >
        {/* Floating label */}
        <label
          htmlFor={id}
          style={{
            position:   'absolute',
            left:       '16px',
            color:      focused ? activeColor : '#49454F',
            fontSize:   isFloating ? '11px' : '16px',
            fontWeight: isFloating ? '500' : '400',
            top:        isFloating ? '8px' : '50%',
            transform:  isFloating ? 'none' : 'translateY(-50%)',
            transition: 'all 0.15s ease',
            pointerEvents: 'none',
            letterSpacing: isFloating ? '0.5px' : '0.5px',
          }}
        >
          {label}
        </label>

        {/* Input */}
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          spellCheck={spellCheck}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(e);
          }}
          aria-describedby={
            hasError   ? `${id}-error` :
            hasConfirm ? `${id}-confirm` :
            helperText ? `${id}-helper` : undefined
          }
          aria-invalid={hasError}
          style={{
            position:    'absolute',
            bottom:      0,
            left:        0,
            right:       0,
            height:      '36px',
            padding:     '0 16px',
            background:  'transparent',
            border:      'none',
            outline:     'none',
            fontSize:    '16px',
            color:       hasError ? '#B3261E' : '#1C1B1F',
            fontFamily:  'inherit',
            letterSpacing: '0.5px',
          }}
        />

        {/* Bottom active indicator */}
        <div style={{
          position:     'absolute',
          bottom:       0,
          left:         0,
          right:        0,
          height:       focused ? '2px' : '1px',
          background:   focused ? activeColor : '#CAC4D0',
          transition:   'height 0.1s ease, background 0.1s ease',
        }} />
      </div>

      {/* Below-field text: error > confirm > helper */}
      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '4px',
            margin:     '4px 0 0',
            fontSize:   '12px',
            fontWeight: '500',
            color:      '#B3261E',
            letterSpacing: '0.5px',
          }}
        >
          <span aria-hidden="true">⚠</span>
          {errorText}
        </p>
      )}

      {hasConfirm && (
        <p
          id={`${id}-confirm`}
          style={{
            display:    'flex',
            alignItems: 'center',
            gap:        '4px',
            margin:     '4px 0 0',
            fontSize:   '12px',
            fontWeight: '500',
            color:      '#00897B',
            letterSpacing: '0.5px',
          }}
        >
          <span aria-hidden="true">✓</span>
          {confirmText}
        </p>
      )}

      {!hasError && !hasConfirm && helperText && (
        <p
          id={`${id}-helper`}
          style={{
            margin:        '4px 0 0',
            fontSize:      '12px',
            fontWeight:    '500',
            color:         '#49454F',
            letterSpacing: '0.5px',
          }}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
