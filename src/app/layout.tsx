import type { Metadata } from 'next';
import './globals.css';
import { CmsRuntime } from '@/components/cms-runtime';
import { GlobalOctaAI } from '@/components/ai/global-octa-ai';
import { GlobalCalculatorOverlay } from '@/components/global-calculator-overlay';
import { GlobalLegacySidebar } from '@/components/global-legacy-sidebar';
import { GlobalHeroTopNav } from '@/components/global-hero-top-nav';

export const metadata: Metadata = {
  title: 'OCTA — Presence Platform',
  description: 'Vertical-first intelligent videoconferencing.',
};

// Keep global visual layers explicit so production includes meeting-stage and chat visibility refinements.
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><CmsRuntime/>{children}<GlobalLegacySidebar/><GlobalHeroTopNav/><GlobalCalculatorOverlay/><GlobalOctaAI/></body></html>;
}
