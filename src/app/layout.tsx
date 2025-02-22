import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'RoundTable Feedback',
  description: 'Performance Feedback Automation',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-brand-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
