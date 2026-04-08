/**
 * MD3 full-bleed divider.
 */

export default function Divider({ style = {} }) {
  return (
    <hr
      aria-hidden="true"
      style={{
        border:     'none',
        borderTop:  '1px solid #E7E0EC',
        margin:     '12px -20px',
        ...style,
      }}
    />
  );
}
