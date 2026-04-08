/**
 * GET /api/openapi — Serves the OpenAPI 3.0 spec as JSON.
 */

import { NextResponse } from 'next/server';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://prescription-mvp.vercel.app';

const spec = {
  openapi: '3.0.3',
  info: {
    title: 'Prescription MVP API',
    version: '1.0.0',
    description: 'API for uploading and downloading prescriptions sent via WhatsApp.',
  },
  servers: [{ url: APP_URL }],
  paths: {
    '/api/upload': {
      post: {
        summary: 'Upload a prescription',
        description: 'Uploads a prescription image to Cloudinary, stores metadata in Supabase, and returns a shareable prescription ID.',
        operationId: 'uploadPrescription',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['image', 'patientName', 'patientPhone'],
                properties: {
                  image: {
                    type: 'string',
                    format: 'binary',
                    description: 'Prescription photo (JPEG, PNG, or HEIC)',
                  },
                  patientName: {
                    type: 'string',
                    description: "Patient's full name",
                    example: 'Juan Dela Cruz',
                  },
                  patientPhone: {
                    type: 'string',
                    description: '10-digit Indian mobile number (or 12 digits with 91 prefix)',
                    example: '9876543210',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Prescription created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    prescriptionId: {
                      type: 'string',
                      description: '7-character nanoid',
                      example: 'CuxdC9g',
                    },
                    imageUrl: {
                      type: 'string',
                      format: 'uri',
                      description: 'Full-resolution Cloudinary URL',
                    },
                  },
                },
              },
            },
          },
          '400': {
            description: 'Validation error (missing fields or invalid phone)',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
          '500': {
            description: 'Server error',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    error: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/download/{id}': {
      get: {
        summary: 'Download a prescription image',
        description: 'Proxies the Cloudinary image through the same origin for iOS Safari compatibility. Returns the image as an attachment.',
        operationId: 'downloadPrescription',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'Prescription nanoid',
            example: 'CuxdC9g',
          },
        ],
        responses: {
          '200': {
            description: 'Prescription image file',
            content: {
              'image/jpeg': {
                schema: { type: 'string', format: 'binary' },
              },
            },
            headers: {
              'Content-Disposition': {
                schema: { type: 'string' },
                example: 'attachment; filename="prescription-CuxdC9g.jpg"',
              },
            },
          },
          '404': {
            description: 'Prescription not found',
          },
          '502': {
            description: 'Could not retrieve image from storage',
          },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(spec, {
    headers: {
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
