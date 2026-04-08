/**
 * MD3 Button variants used in this app.
 *
 * variant: 'filled' | 'outlined' | 'text'
 * All buttons are full-width and pill-shaped per the design spec.
 */

const BASE = {
  display:       'flex',
  alignItems:    'center',
  justifyContent:'center',
  gap:           '8px',
  width:         '100%',
  height:        '56px',
  borderRadius:  '100px',
  fontSize:      '16px',
  fontWeight:    '500',
  letterSpacing: '0.1px',
  fontFamily:    'inherit',
  cursor:        'pointer',
  border:        'none',
  outline:       'none',
  transition:    'opacity 0.15s ease',
  userSelect:    'none',
  WebkitTapHighlightColor: 'transparent',
};

const VARIANTS = {
  filled: {
    background: '#00897B',
    color:      '#FFFFFF',
    border:     'none',
  },
  outlined: {
    background: 'transparent',
    color:      '#00897B',
    border:     '1.5px solid #00897B',
  },
  text: {
    background: 'transparent',
    color:      '#00897B',
    border:     'none',
    height:     '40px',
    width:      'auto',
  },
};

const DISABLED = {
  filled: {
    background: '#E0E0E0',
    color:      '#9E9E9E',
    cursor:     'not-allowed',
  },
  outlined: {
    background: 'transparent',
    color:      '#9E9E9E',
    border:     '1.5px solid #BDBDBD',
    cursor:     'not-allowed',
  },
  text: {
    color:  '#9E9E9E',
    cursor: 'not-allowed',
  },
};

function Spinner() {
  return (
    <span style={{
      width:        '20px',
      height:       '20px',
      borderRadius: '50%',
      border:       '2.5px solid rgba(255,255,255,0.3)',
      borderTop:    '2.5px solid #fff',
      display:      'inline-block',
      animation:    'md3-spin 0.7s linear infinite',
      flexShrink:   0,
    }} />
  );
}

export default function Button({
  variant   = 'filled',
  disabled  = false,
  loading   = false,
  icon      = null,
  children,
  onClick,
  style     = {},
  type      = 'button',
}) {
  const isDisabled = disabled || loading;
  const variantStyle = VARIANTS[variant] || VARIANTS.filled;
  const disabledStyle = isDisabled ? (DISABLED[variant] || DISABLED.filled) : {};

  const computedStyle = {
    ...BASE,
    ...variantStyle,
    ...disabledStyle,
    ...(isDisabled ? { opacity: loading ? 0.7 : 1 } : {}),
    ...style,
  };

  return (
    <button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      style={computedStyle}
    >
      {loading ? (
        <>
          <Spinner />
          {children}
        </>
      ) : (
        <>
          {icon && <span style={{ fontSize: '18px', lineHeight: 1 }}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}
