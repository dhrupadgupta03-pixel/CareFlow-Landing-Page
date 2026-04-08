/**
 * MD3 Filled Card.
 * Used as the main content container on all doctor screens.
 */

export default function Card({ children, style = {} }) {
  return (
    <div
      style={{
        background:   '#FAFAFA',
        borderRadius: '16px',
        padding:      '20px',
        // MD3 Level 1 tonal elevation — no box-shadow, slightly darker surface
        backgroundColor: '#F0F4F4',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
