import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Punch the Monkey — AI Monkey Art Generator | NanoBanana AI',
  description:
    'An unofficial fan tribute to Punch, the baby macaque from Ichikawa City Zoo. Learn his real story and create AI-generated monkey artwork with NanoBanana AI.',
  keywords:
    'Punch the Monkey, Punch macaque, Ichikawa City Zoo, AI monkey art, monkey avatar generator, GanbarePanchi, HangInTherePunch, NanoBanana AI',
  openGraph: {
    title: 'Punch the Monkey — AI Monkey Art Generator',
    description:
      'Celebrate Punch the macaque with AI-generated monkey art. Unofficial fan tribute powered by NanoBanana AI.',
    type: 'website',
  },
}

export default function PunchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
