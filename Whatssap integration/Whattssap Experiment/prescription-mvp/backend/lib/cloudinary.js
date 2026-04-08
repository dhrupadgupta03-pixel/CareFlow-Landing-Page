/**
 * Cloudinary client and upload helpers.
 *
 * To swap the image host:
 *   - Replace uploadPrescription() and buildDisplayUrl() while keeping
 *     the same return shape: { imageUrl, ogImageUrl }
 *   - All callers depend only on those two fields.
 */

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a prescription image buffer to Cloudinary.
 * Returns both the original URL and the OG-optimized (1200×630) URL.
 *
 * c_pad + b_white: letterboxes portrait prescriptions into the landscape
 * OG frame without cropping any content.
 */
export async function uploadPrescription(buffer, prescriptionId) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        public_id: `prescriptions/${prescriptionId}`,
        resource_type: 'image',
        // Cloudinary converts HEIC → JPEG automatically server-side
        eager: [
          {
            // OG image: letterboxed 1200×630, white background, JPEG
            width: 1200,
            height: 630,
            crop: 'pad',
            background: 'white',
            format: 'jpg',
            quality: 'auto',
          },
        ],
        eager_async: false,
      },
      (error, result) => {
        if (error) return reject(error);

        const imageUrl   = result.secure_url;
        const ogImageUrl = result.eager[0].secure_url;

        resolve({ imageUrl, ogImageUrl });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Build a fast-loading display URL for the patient page.
 * Uses the original image resized to 800px wide — not the OG crop.
 */
export function buildDisplayUrl(imageUrl) {
  // Insert Cloudinary transformations into an existing secure_url
  return imageUrl.replace(
    '/upload/',
    '/upload/w_800,q_auto,f_auto/'
  );
}

/**
 * Build the original full-res URL for download.
 * Returns the imageUrl as-is (no transformation).
 */
export function buildDownloadUrl(imageUrl) {
  return imageUrl;
}
