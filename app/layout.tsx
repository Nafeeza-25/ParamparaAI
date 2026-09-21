import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'ParamparaAI | Digital Apprenticeship', description: 'Artisan-verified learning for living traditions.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
