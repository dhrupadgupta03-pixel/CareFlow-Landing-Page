/**
 * POST /api/upload
 *
 * Thin route handler. All business logic lives in backend/services/uploadService.js.
 * This file only: parses the request, calls the service, returns JSON.
 */

import { NextResponse }       from 'next/server';
import { createPrescription } from '../../../backend/services/uploadService.js';
import { validatePhone }      from '../../../backend/lib/phone.js';

export async function POST(request) {
  try {
    const formData    = await request.formData();
    const imageFile   = formData.get('image');
    const patientName = formData.get('patientName')?.toString().trim();
    const rawPhone    = formData.get('patientPhone')?.toString().trim();

    // Basic validation
    if (!imageFile || !patientName || !rawPhone) {
      return NextResponse.json(
        { error: 'Missing required fields: image, patientName, patientPhone' },
        { status: 400 }
      );
    }

    // Validate phone
    const phoneResult = validatePhone(rawPhone);
    if (!phoneResult.valid) {
      return NextResponse.json(
        { error: phoneResult.error },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer      = Buffer.from(arrayBuffer);

    const { prescriptionId, imageUrl } = await createPrescription(
      buffer,
      patientName,
      phoneResult.sanitized
    );

    return NextResponse.json({ prescriptionId, imageUrl }, { status: 201 });
  } catch (err) {
    console.error('[upload] error:', err);
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
