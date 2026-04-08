/**
 * Screen 4A — Patient prescription view (loaded state).
 * Server Component — rendered on the server, no 'use client'.
 */

import { DOCTOR } from '../backend/constants/doctor.js';

export default function PrescriptionView({ prescription }) {
  const { id, patientName, displayUrl } = prescription;

  return (
    <div style={{
      maxWidth:  '430px',
      margin:    '0 auto',
      minHeight: '100vh',
      background:'#F4F6F8',
      paddingBottom: 'env(safe-area-inset-bottom, 32px)',
    }}>

      {/* Doctor Identity Card — full-bleed top */}
      <div style={{
        background:   '#FAFAFA',
        borderRadius: '0 0 16px 16px',
        padding:      '20px 16px',
        marginBottom: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DOCTOR.avatarUrl}
            alt={DOCTOR.name}
            width={40} height={40}
            style={{ borderRadius: '50%', objectFit: 'cover', background: '#E0F2F1' }}
          />
          <div>
            <p style={{ margin: 0, fontSize: '22px', fontWeight: '500', color: '#1C1B1F' }}>
              {DOCTOR.name}
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: '#49454F' }}>
              {DOCTOR.clinic}
            </p>
          </div>
        </div>
        <hr style={{ border: 'none', borderTop: '1px solid #E7E0EC', margin: '0 0 12px' }} />
        <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#49454F' }}>{DOCTOR.address}</p>
        <p style={{ margin: 0, fontSize: '12px', color: '#49454F' }}>
          Tel: {DOCTOR.phone} · {DOCTOR.registrationNo}
        </p>
      </div>

      {/* Patient Info Card */}
      <div style={{
        background: '#FAFAFA', borderRadius: '16px',
        padding: '16px', margin: '0 16px 12px',
      }}>
        <p style={{ margin: '0 0 4px', fontSize: '11px', fontWeight: '500', color: '#49454F', letterSpacing: '1px' }}>
          PRESCRIPTION FOR
        </p>
        <p style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: '600', color: '#1C1B1F' }}>
          {patientName}
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: '#49454F' }}>
          Issued via Doctor&apos;s Portal
        </p>
      </div>

      {/* Prescription Image Card */}
      <div style={{
        background: '#FAFAFA', borderRadius: '16px',
        overflow: 'hidden', margin: '0 16px 12px',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displayUrl}
          alt={`Prescription photo for ${patientName}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          loading="eager"
        />
        <p style={{
          margin: 0, padding: '12px 16px',
          fontSize: '12px', color: '#49454F', textAlign: 'center',
        }}>
          Tap and hold the image to save
        </p>
      </div>

      {/* Download Card */}
      <div style={{
        background: '#FAFAFA', borderRadius: '16px',
        padding: '16px', margin: '0 16px 24px',
      }}>
        <a
          href={`/api/download/${id}`}
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
            marginBottom:   '4px',
          }}
        >
          ⬇ Download Prescription
        </a>
        <p style={{ margin: 0, fontSize: '12px', color: '#49454F', textAlign: 'center' }}>
          Saves to your Photos or Files app
        </p>
      </div>

      {/* Footer */}
      <div style={{ padding: '0 16px 32px', textAlign: 'center' }}>
        <p style={{ margin: '0 0 2px', fontSize: '11px', color: '#49454F' }}>
          Sent securely via Doctor&apos;s Portal
        </p>
        <p style={{ margin: 0, fontSize: '11px', color: '#49454F' }}>
          This link is for your personal use only.
        </p>
      </div>
    </div>
  );
}
