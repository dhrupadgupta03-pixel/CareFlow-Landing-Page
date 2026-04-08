/**
 * Inline banner for contextual messages.
 *
 * variant: 'info' | 'warning' | 'error'
 *
 * Used for:
 *   - Info:    session-restored notice (1E), WhatsApp blocked fallback (3F)
 *   - Warning: HEIC format notice (2C), offline notice (3D)
 *   - Error:   upload failed (3C), camera denied (2B)
 */

const STYLES = {
  info: {
    background: '#E1F5FE',
    color:      '#01579B',
    icon:       'ℹ',
  },
  warning: {
    background: '#FFF3E0',
    color:      '#BF360C',
    icon:       '⚠',
  },
  error: {
    background: '#F9DEDC',
    color:      '#410E0B',
    icon:       '✕',
  },
};

export default function Banner({ variant = 'info', children, style = {} }) {
  const s = STYLES[variant] || STYLES.info;

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      style={{
        display:      'flex',
        alignItems:   'flex-start',
        gap:          '8px',
        padding:      '12px 16px',
        borderRadius: '8px',
        background:   s.background,
        color:        s.color,
        fontSize:     '14px',
        lineHeight:   '1.5',
        ...style,
      }}
    >
      <span aria-hidden="true" style={{ fontSize: '18px', lineHeight: '1.4', flexShrink: 0 }}>
        {s.icon}
      </span>
      <span>{children}</span>
    </div>
  );
}
