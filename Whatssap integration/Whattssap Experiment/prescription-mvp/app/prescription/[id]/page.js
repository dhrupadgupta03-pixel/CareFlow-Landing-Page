/**
 * Patient prescription page — Server Component.
 *
 * generateMetadata() runs server-side so WhatsApp's crawler
 * (which does NOT run JavaScript) can read the OG tags.
 *
 * Route: /prescription/[id]
 */

import { notFound }             from 'next/navigation';
import { getPrescriptionById }  from '../../../backend/services/prescriptionService.js';
import { DOCTOR }               from '../../../backend/constants/doctor.js';
import PrescriptionView         from '../../../patient/PrescriptionView.jsx';
import NotFoundView             from '../../../patient/NotFoundView.jsx';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || '';

export async function generateMetadata({ params }) {
  const prescription = await getPrescriptionById(params.id);

  if (!prescription) {
    return {
      title: 'Prescription not found',
      description: 'This link may have expired.',
    };
  }

  return {
    title:       `Prescription for ${prescription.patientName} · ${DOCTOR.name}`,
    description: `From ${DOCTOR.clinic} · Tap to view and download`,
    openGraph: {
      title:       `Prescription for ${prescription.patientName} · ${DOCTOR.name}`,
      description: `From ${DOCTOR.clinic} · Tap to view and download`,
      images: [{
        url:    prescription.ogImageUrl,
        width:  1200,
        height: 630,
      }],
      url:  `${APP_URL}/prescription/${params.id}`,
      type: 'website',
    },
    // Twitter / X card (also used by WhatsApp as fallback)
    twitter: {
      card:        'summary_large_image',
      title:       `Prescription for ${prescription.patientName}`,
      description: `From ${DOCTOR.clinic}`,
      images:      [prescription.ogImageUrl],
    },
  };
}

export default async function PrescriptionPage({ params }) {
  let prescription;

  try {
    prescription = await getPrescriptionById(params.id);
  } catch {
    // Supabase down or network error — show graceful error, not a 500
    return <NotFoundView />;
  }

  if (!prescription) {
    notFound();
  }

  return <PrescriptionView prescription={prescription} />;
}
