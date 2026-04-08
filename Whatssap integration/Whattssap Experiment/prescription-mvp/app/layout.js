import './globals.css';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  subsets:  ['latin'],
  weight:   ['400', '500', '700'],
  display:  'swap',
  variable: '--font-roboto',
});

export const metadata = {
  title:       "Doctor's Portal",
  description: 'Send prescriptions to patients via WhatsApp',
  robots:      'index, follow',
};

export const viewport = {
  width:        'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor:   '#00897B',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>{children}</body>
    </html>
  );
}
