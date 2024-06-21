import React from 'react';
import Head from 'next/head';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';

import LayoutWrapper from './LayoutWrapper';
import NewAppBar from '@/components/shared/NewAppBar';

import "./globals.css";
import { Footer } from 'antd/es/layout/layout';
require("@solana/wallet-adapter-react-ui/styles.css");

type Metadata = any;
type Viewport = any;

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const APP_NAME = "Parity Issuance Portal";
const APP_DEFAULT_TITLE = "Parity Issuance Portal";
const APP_TITLE_TEMPLATE = "%s - Parity Issuance Portal";
const APP_DESCRIPTION = "Parity Issuance Portal is a platform to mint and redeem your xSOLD tokens.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const AppHead = ({ metadata, viewport }: any) => {
  return (
    <Head>
      <title>{metadata.title.default}</title>
      <meta name="description" content={metadata.description} />
      <link rel="manifest" href={metadata.manifest} />
      <meta name="theme-color" content={viewport.themeColor} />
      <style>{`:root { --font-sans: 'Inter', sans-serif; }`}</style>
      {/* Add other head elements as needed based on metadata and viewport */}
    </Head>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <LayoutWrapper>
      <AppHead metadata={metadata} viewport={viewport} />
      <html
        style={{ fontFamily: 'Inter', fontWeight: 'bold', fontStyle: 'normal' }}
        lang='en'>
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-YOURID"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-YOURID');
      `,
          }}
        ></script> */}
        <body className='font-sans'>
          <NewAppBar />
          <div lang="en">
            {children}
          </div>
          {/* <Footer /> */}
          <Toaster theme='dark' />
        </body>
      </html>
    </LayoutWrapper>
  );
}