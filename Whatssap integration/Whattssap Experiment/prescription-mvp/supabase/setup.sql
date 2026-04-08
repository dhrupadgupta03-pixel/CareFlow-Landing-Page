-- Run this once in the Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql

CREATE TABLE IF NOT EXISTS prescriptions (
  id            TEXT PRIMARY KEY,          -- nanoid(7), unguessable access token
  patient_name  TEXT NOT NULL,
  patient_phone TEXT NOT NULL,             -- stored as sanitized digits e.g. "919876543210"
  image_url     TEXT NOT NULL,             -- original full-res Cloudinary URL (used for display + download)
  og_image_url  TEXT NOT NULL,             -- 1200x630 padded OG version (used only in WhatsApp preview)
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- No RLS needed — the unguessable nanoid is the access control for this MVP.
-- If you add patient auth later, enable RLS here and add policies.
