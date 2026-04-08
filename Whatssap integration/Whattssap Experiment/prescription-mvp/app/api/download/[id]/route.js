/**
 * GET /api/download/[id]
 *
 * Same-origin download proxy required for iOS Safari.
 * Safari ignores the `download` attribute on cross-origin anchor tags.
 * Routing through this endpoint (same origin) forces a file save.
 *
 * Thin handler — all logic in backend/services/downloadService.js.
 */

import { streamPrescriptionDownload } from '../../../../backend/services/downloadService.js';

export async function GET(request, { params }) {
  const { id } = params;

  if (!id) {
    return new Response('Missing prescription ID', { status: 400 });
  }

  return streamPrescriptionDownload(id);
}
