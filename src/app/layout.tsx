import type { Metadata } from 'next';
import { Geist, Geist_Mono, Unbounded } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VCET NSDC | Official Links & Chapter Hub',
  description: "Official National Student Data Corps (NSDC) Student Chapter at Vidyavardhini's College of Engineering and Technology (VCET), Vasai.",
  icons: {
    icon: '/Logo.png',
    shortcut: '/Logo.png',
    apple: '/Logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#0b0b14] text-[#f8fafc]">
        {children}
      </body>
    </html>
  );
}
