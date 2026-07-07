import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
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
    <html lang="es-AR" className={`${montserrat.variable} ${montserrat.className}`} data-version="v1" data-scroll-behavior="smooth">
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
