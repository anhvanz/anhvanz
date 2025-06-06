import '../globals.css'
import '../../styles/global.css'
import '../../styles/animation.css'
import '../../styles/dark-mode.css'
import 'highlight.js/styles/github.css'
import '../../styles/markdown.css'
import 'katex/dist/katex.min.css'

import type { AbstractIntlMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react'
import { cmuSansVi } from '../fonts'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ImageZoomClient from '../../components/ImageZoomClient'

export const metadata = {
  title: 'Anh Vanz',
  description: 'Personal portfolio of Van Anh',
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {

  let messages: AbstractIntlMessages | null = null;
  try {
    messages = (await import(`@/i18n/messages/${locale}.json`)).default;
  } catch (error) {
    console.log(error);
    // notFound();
    // messages = null;
  }

  if (!messages) {
    return (
      <html lang="en">
        <body>
          <h1>404 - Not Found</h1>
          <p>Locale {locale} is not supported.</p>
        </body>
      </html>
    );
  }

  return (

    <NextIntlClientProvider locale={locale} messages={messages}>
      <html lang={locale} className={cmuSansVi.variable}>
        <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        </head>
        <body className='dark:bg-[var(--background-color-dark)] min-h-screen flex flex-col'>
          <ImageZoomClient />
          <Navbar />
          <main className='dark:bg-[var(--background-color-dark)]'>{children}</main>
          <Footer />
        </body>
      </html>
    </NextIntlClientProvider>
  )
}
