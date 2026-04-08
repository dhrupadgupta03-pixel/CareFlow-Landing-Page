/**
 * Dynamic sitemap — lists static routes + all prescription pages from Supabase.
 * Next.js serves this at /sitemap.xml automatically.
 */

import { supabase } from '../backend/lib/supabase.js';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://prescription-mvp.vercel.app';

export default async function sitemap() {
  // Static routes
  const staticRoutes = [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
  ];

  // Dynamic prescription pages
  let prescriptionRoutes = [];
  try {
    const { data } = await supabase
      .from('prescriptions')
      .select('id, created_at')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (data) {
      prescriptionRoutes = data.map((rx) => ({
        url: `${APP_URL}/prescription/${rx.id}`,
        lastModified: new Date(rx.created_at),
        changeFrequency: 'never',
        priority: 0.8,
      }));
    }
  } catch (_) {
    // If Supabase is down, return static routes only
  }

  return [...staticRoutes, ...prescriptionRoutes];
}
