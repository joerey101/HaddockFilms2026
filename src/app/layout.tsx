import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-editorial',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Haddock Films',
  description: 'Productora de cine argentina',
  metadataBase: new URL('https://haddockfilms.com'),
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Haddock Films',
  url: 'https://haddockfilms.com',
  logo: 'https://haddockfilms.com/assets/logo.png',
  sameAs: [
    'https://www.instagram.com/haddockfilms',
    'https://vimeo.com/haddockfilms',
    'https://www.linkedin.com/company/haddock-films',
  ],
  description: 'Productora de cine argentino.',
  foundingDate: '1999',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AR',
    addressLocality: 'Buenos Aires',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${playfair.variable}`} data-version="v1" data-scroll-behavior="smooth">
      <body className="antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
