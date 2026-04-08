/**
 * Upload service — orchestrates Cloudinary upload + Supabase insert.
 *
 * This is the single place to change if you want to:
 *   - Add server-side image validation (size, type, dimensions)
 *   - Add audit logging on every upload
 *   - Swap to a different storage provider
 */

import { nanoid } from 'nanoid';
import { uploadPrescription } from '../lib/cloudinary.js';
import { supabase }           from '../lib/supabase.js';

/**
 * Upload a prescription image and persist the record.
 *
 * @param {Buffer} imageBuffer  - Raw image file buffer
 * @param {string} patientName  - Patient's full name
 * @param {string} patientPhone - Sanitized E.164 phone string (e.g. "919876543210")
 * @returns {{ prescriptionId: string, imageUrl: string }}
 */
export async function createPrescription(imageBuffer, patientName, patientPhone) {
  const prescriptionId = nanoid(7);

  // 1. Upload to Cloudinary — returns original URL + OG-padded URL
  const { imageUrl, ogImageUrl } = await uploadPrescription(imageBuffer, prescriptionId);

  // 2. Persist to Supabase
  const { error } = await supabase
    .from('prescriptions')
    .insert({
      id:            prescriptionId,
      patient_name:  patientName,
      patient_phone: patientPhone,
      image_url:     imageUrl,
      og_image_url:  ogImageUrl,
    });

  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }

  return { prescriptionId, imageUrl };
}
