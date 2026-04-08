/**
 * Phone sanitization and validation for Indian numbers.
 *
 * To support a different country:
 *   - Change COUNTRY_CODE and COUNTRY_DIGITS
 *   - Update the formatDisplay function
 */

const COUNTRY_CODE = '91';
const VALID_LENGTH = 12; // country code (2) + local number (10)

/**
 * Sanitize raw phone input to a clean E.164-style digit string.
 * Returns null if the input cannot be normalized to a valid number.
 *
 * Rules applied in order:
 * 1. Strip all non-digit characters
 * 2. Remove any leading zeros
 * 3. If 10 digits remain → prepend country code
 * 4. If 12 digits starting with country code → valid
 * 5. Anything else → invalid
 */
export function sanitizePhone(raw) {
  if (!raw) return null;

  // Step 1: strip non-digits
  let digits = raw.replace(/\D/g, '');

  // Step 2: remove leading zeros
  while (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  // Step 3: bare 10-digit local number — prepend country code
  if (digits.length === 10) {
    digits = COUNTRY_CODE + digits;
  }

  // Step 4: valid if exactly 12 digits starting with country code
  if (digits.length === VALID_LENGTH && digits.startsWith(COUNTRY_CODE)) {
    return digits;
  }

  return null;
}

/**
 * Format a sanitized digit string for display.
 * "919876543210" → "+91 98765 43210"
 */
export function formatPhoneDisplay(sanitized) {
  const country = sanitized.slice(0, 2);
  const first5  = sanitized.slice(2, 7);
  const last5   = sanitized.slice(7, 12);
  return `+${country} ${first5} ${last5}`;
}

/**
 * Full validation entry point.
 * Returns { valid, error, sanitized, display }
 */
export function validatePhone(raw) {
  const digits = (raw || '').replace(/\D/g, '');

  // Specific error for leading zero
  if (digits.startsWith('0') && digits.length === 11) {
    return {
      valid: false,
      error: 'Remove the leading 0 — enter 10 digits only (e.g. 9876543210)',
      sanitized: null,
      display: null,
    };
  }

  const sanitized = sanitizePhone(raw);

  if (!sanitized) {
    return {
      valid: false,
      error: 'Enter a valid 10-digit mobile number',
      sanitized: null,
      display: null,
    };
  }

  return {
    valid: true,
    error: null,
    sanitized,
    display: formatPhoneDisplay(sanitized),
  };
}
