import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import 'react-phone-number-input/style.css';
import 'animate.css';
import { Suspense } from 'react';
import { Loader } from '@/components/common';

export const metadata: Metadata = {
  title: 'Hashibis',
  description: 'Try out the cannabis experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <main className="minHeigth maxWidth container m-auto">
            {children}
          </main>
        </Suspense>
        <Footer />
        <ToastContainer closeOnClick pauseOnHover />
      </body>
    </html>
  );
}
