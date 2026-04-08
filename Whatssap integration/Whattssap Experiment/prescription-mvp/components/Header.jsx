/**
 * App header — shown on all doctor screens (1, 2, 3).
 * Sticky, teal-tinted surface, doctor avatar + "Doctor's Portal" title.
 */

import { DOCTOR } from '../backend/constants/doctor.js';

export default function Header() {
  return (
    <header
      style={{
        position:       'sticky',
        top:            0,
        zIndex:         100,
        height:         '64px',
        padding:        '0 16px',
        display:        'flex',
        alignItems:     'center',
        gap:            '12px',
        background:     '#F0F4F4',
        // No explicit shadow — tonal elevation creates separation
      }}
      aria-label="Doctor's Portal"
    >
      {/* Doctor avatar */}
      <img
        src={DOCTOR.avatarUrl}
        alt={DOCTOR.name}
        width={40}
        height={40}
        style={{
          borderRadius: '50%',
          objectFit:    'cover',
          flexShrink:   0,
          background:   '#E0F2F1',
        }}
        onError={(e) => {
          // Fallback to a teal circle with initials if avatar missing
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      {/* Avatar fallback */}
      <span
        aria-hidden="true"
        style={{
          display:        'none',
          width:          '40px',
          height:         '40px',
          borderRadius:   '50%',
          background:     '#00897B',
          color:          '#fff',
          alignItems:     'center',
          justifyContent: 'center',
          fontSize:       '16px',
          fontWeight:     '600',
          flexShrink:     0,
        }}
      >
        Dr
      </span>

      <span
        style={{
          fontSize:      '22px',
          fontWeight:    '500',
          color:         '#1C1B1F',
          letterSpacing: '0px',
        }}
      >
        Doctor&apos;s Portal
      </span>
    </header>
  );
}
