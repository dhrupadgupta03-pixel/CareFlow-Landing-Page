/**
 * MD3 Assist Chip — "Active Now" badge shown on screens 2 and 3.
 */

export default function Badge({ label = 'Active Now' }) {
  return (
    <span
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        gap:           '6px',
        height:        '28px',
        padding:       '0 12px',
        borderRadius:  '100px',
        background:    '#E0F2F1',
        border:        '1px solid rgba(0,137,123,0.3)',
        fontSize:      '12px',
        fontWeight:    '500',
        color:         '#004D40',
        letterSpacing: '0.1px',
        userSelect:    'none',
      }}
    >
      {/* Live green dot */}
      <span
        aria-hidden="true"
        style={{
          width:        '8px',
          height:       '8px',
          borderRadius: '50%',
          background:   '#00C853',
          flexShrink:   0,
        }}
      />
      {label}
    </span>
  );
}
