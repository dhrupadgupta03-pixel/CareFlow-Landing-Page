/**
 * Prescription read service.
 *
 * To add caching, expiry logic, or soft-deletes:
 *   - Add them here without touching any route handler or UI component.
 */

import { supabase }        from '../lib/supabase.js';
import { buildDisplayUrl } from '../lib/cloudinary.js';

/**
 * Fetch a single prescription by its nanoid.
 * Returns null if not found.
 *
 * @param {string} id
 * @returns {Promise<object|null>}
 */
export async function getPrescriptionById(id) {
  const { data, error } = await supabase
    .from('prescriptions')
    .select('id, patient_name, patient_phone, image_url, og_image_url, created_at')
    .eq('id', id)
    .single();

  if (error || !data) return null;

  return {
    id:           data.id,
    patientName:  data.patient_name,
    patientPhone: data.patient_phone,
    imageUrl:     data.image_url,
    ogImageUrl:   data.og_image_url,
    displayUrl:   buildDisplayUrl(data.image_url),
    createdAt:    data.created_at,
  };
}
