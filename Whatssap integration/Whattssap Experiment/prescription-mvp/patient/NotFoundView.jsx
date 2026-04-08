/**
 * Screen 4C — Prescription not found (broken/expired link).
 * Rendered by app/not-found.js and app/prescription/[id]/page.js on null lookup.
 * Server Component — no 'use client'.
 */

import { DOCTOR } from '../backend/constants/doctor.js';

export default function NotFoundView() {
  const waLink = `https://wa.me/${DOCTOR.phone.replace(/\D/g, '')}`;

  return (
    <div style={{
      maxWidth:       '430px',
      margin:         '0 auto',
      minHeight:      '100vh',
      background:     '#F4F6F8',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      paddingBottom:  'env(safe-area-inset-bottom, 32px)',
    }}>
      {/* Content card */}
      <div style={{
        background:   '#FAFAFA',
        borderRadius: '16px',
        padding:      '32px 24px',
        margin:       '80px 16px 24px',
        textAlign:    'center',
        width:        '100%',
        maxWidth:     '380px',
        boxSizing:    'border-box',
      }}>
        <span style={{ fontSize: '64px', color: '#49454F' }} aria-hidden="true">📄</span>
        <h1 style={{
          margin:     '24px 0 12px',
          fontSize:   '24px',
          fontWeight: '600',
          color:      '#1C1B1F',
        }}>
          Prescription not found
        </h1>
        <p style={{
          margin:       '0 auto 32px',
          fontSize:     '14px',
          color:        '#49454F',
          lineHeight:   '1.6',
          maxWidth:     '280px',
        }}>
          This link may have expired or is incorrect.
          Please contact your doctor for a new link.
        </p>
        <a
          href={waLink}
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            gap:            '8px',
            width:          '100%',
            height:         '56px',
            borderRadius:   '100px',
            background:     '#00897B',
            color:          '#fff',
            textDecoration: 'none',
            fontSize:       '16px',
            fontWeight:     '500',
          }}
        >
          💬 Contact Doctor on WhatsApp
        </a>
      </div>

      <p style={{ fontSize: '12px', color: '#49454F' }}>Doctor&apos;s Portal</p>
    </div>
  );
}
