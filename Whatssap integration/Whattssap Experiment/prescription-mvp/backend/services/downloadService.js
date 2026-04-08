/**
 * Download service — proxies the Cloudinary image through the same origin.
 *
 * iOS Safari ignores the `download` attribute on anchor tags for cross-origin
 * URLs. Routing through /api/download/[id] (same origin) makes it work.
 *
 * To change the download filename format or add auth checks:
 *   - Modify this file only.
 */

import { supabase } from '../lib/supabase.js';

/**
 * Fetch the full-res image from Cloudinary and return a streamable Response.
 *
 * @param {string} prescriptionId
 * @returns {Promise<Response>}  A Response with Content-Disposition: attachment
 */
export async function streamPrescriptionDownload(prescriptionId) {
  // Look up the original image URL
  const { data, error } = await supabase
    .from('prescriptions')
    .select('image_url')
    .eq('id', prescriptionId)
    .single();

  if (error || !data) {
    return new Response('Prescription not found', { status: 404 });
  }

  // Fetch the image from Cloudinary server-side
  const imageRes = await fetch(data.image_url);
  if (!imageRes.ok) {
    return new Response('Could not retrieve image', { status: 502 });
  }

  const filename = `prescription-${prescriptionId}.jpg`;

  return new Response(imageRes.body, {
    status: 200,
    headers: {
      'Content-Type':        imageRes.headers.get('content-type') || 'image/jpeg',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control':       'private, no-store',
    },
  });
}
