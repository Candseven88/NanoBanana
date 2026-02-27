'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  Sparkles,
  Wand2,
  ImageIcon,
  Download,
  Info,
  BookOpen,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import Navigation from '../components/Navigation'
import Card from '../components/ui/Card'
import GradientButton from '../components/ui/GradientButton'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../components/ui/Toast'
import Link from 'next/link'
import type { Metadata } from 'next'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GenerationResponse {
  artifacts: Array<{ url?: string; base64?: string }>
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const sizeOptions = [
  { label: '1024×1024 (Square)', value: '1024x1024' },
  { label: '768×1344 (Portrait)', value: '768x1344' },
  { label: '1344×768 (Landscape)', value: '1344x768' },
]

const stylePresets = [
  { label: '🎨 Watercolor', value: 'soft watercolor illustration style' },
  { label: '✨ Anime', value: 'cute anime style with big expressive eyes' },
  { label: '📷 Realistic', value: 'photorealistic wildlife photography style' },
  { label: '🖍️ Storybook', value: "children's storybook illustration style" },
  { label: '🌈 Pop Art', value: 'vibrant pop art style with bold outlines' },
  { label: '🐒 Pixel', value: 'retro pixel art style, 16-bit' },
]

const faqItems = [
  {
    q: 'Is this an official page of Ichikawa City Zoo or the Punch Foundation?',
    a: 'No. This is an unofficial fan tribute by NanoBanana AI. We have no affiliation, partnership, or endorsement from Ichikawa City Zoo, its staff, or any organization claiming to represent Punch. All factual information is sourced from public news reports by Reuters, BBC, and The Japan Times.',
  },
  {
    q: 'Who is Punch?',
    a: 'Punch is a Japanese macaque born in July 2025 at Ichikawa City Zoo in Chiba Prefecture, Japan. After being abandoned by his mother — likely due to extreme summer heat — he was hand-raised by zookeeper Kosuke Shikano and became inseparable from a plush IKEA orangutan toy. His story went viral in early 2026, inspiring millions worldwide.',
  },
  {
    q: 'How does the AI monkey avatar generator work?',
    a: 'We use the same BigModel AI engine that powers all NanoBanana tools. You describe the kind of monkey-themed artwork you want, pick a style, and our model generates a unique image in seconds. No real photos of Punch are used or produced — every image is 100 % AI-generated.',
  },
  {
    q: 'Does this tool generate real photos of Punch?',
    a: 'Absolutely not. The generator creates fictional, AI-imagined monkey illustrations. It does not replicate, modify, or redistribute any real photographs of Punch or any other living animal.',
  },
  {
    q: 'Is any money collected through this page?',
    a: 'No. This page does not collect donations, sell merchandise, or monetize Punch\'s story in any way. If you would like to support Punch, please donate directly through Ichikawa City Zoo\'s official channels.',
  },
  {
    q: 'Why should we care about stories like Punch\'s?',
    a: 'Stories of animal resilience remind us of the importance of wildlife care, ethical zoo management, and the emotional bonds between humans and animals. Punch\'s journey highlights the dedication of zookeepers who work tirelessly behind the scenes.',
  },
]

const timelineEvents = [
  { date: 'Jul 2025', title: 'Born & Abandoned', desc: 'Punch is born at Ichikawa City Zoo. His mother rejects him, likely due to extreme summer heat.' },
  { date: 'Jul 2025', title: 'Rescued by Zookeeper', desc: 'Kosuke Shikano begins round-the-clock care, bottle-feeding Punch every two hours.' },
  { date: 'Aug 2025', title: 'The IKEA Orangutan', desc: 'After testing many substitutes, keepers find that a plush IKEA orangutan gives Punch the best comfort and grip.' },
  { date: 'Late 2025', title: 'Troop Integration', desc: 'Punch starts interacting with other macaques. He faces rejection but shows remarkable resilience.' },
  { date: 'Jan 2026', title: 'Signs of Acceptance', desc: 'Other macaques begin grooming Punch and sitting beside him — hopeful signs of social bonding.' },
  { date: 'Feb 2026', title: 'Global Phenomenon', desc: 'Videos surpass 40 million views. #GanbarePanchi and #HangInTherePunch trend worldwide.' },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PunchTheMonkeyPage() {
  // Generator state
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState(stylePresets[0])
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState('')
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [originalUrls, setOriginalUrls] = useState<string[]>([])
  const [error, setError] = useState('')

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const { showError, showWarning, ToastManager } = useToast()

  /* ---- generate ---- */
  const generate = async () => {
    const desc = prompt.trim() || 'a cute baby monkey hugging a plush toy'
    const fullPrompt = `${selectedStyle.value}, ${desc}. Adorable, heartwarming, animal-friendly illustration. High detail, centered composition, soft lighting, 8k.`

    setIsGenerating(true)
    setError('')
    setProgress('Sending request to AI model…')
    setGeneratedImages([])
    setOriginalUrls([])

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: fullPrompt, size: selectedSize.value }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Generation failed')
      }

      setProgress('Processing result…')
      const data: GenerationResponse = await res.json()

      if (data.artifacts?.length) {
        const originals: string[] = []
        const display: string[] = []
        data.artifacts.forEach((a) => {
          if (a.url) {
            originals.push(a.url)
            display.push(`/api/proxy-image-display?url=${encodeURIComponent(a.url)}`)
          } else if (a.base64) {
            const b64 = `data:image/png;base64,${a.base64}`
            originals.push(b64)
            display.push(b64)
          }
        })
        setGeneratedImages(display)
        setOriginalUrls(originals)
      } else {
        throw new Error('No images returned')
      }
    } catch (e: any) {
      const msg = e.message || 'Something went wrong'
      setError(msg)
      if (msg.includes('sensitive') || msg.includes('unsafe')) {
        showWarning('Your prompt may contain sensitive content. Try different wording.', 'Content Warning', 8000)
      } else {
        showError(msg, 'Generation Failed', 6000)
      }
    } finally {
      setIsGenerating(false)
      setProgress('')
    }
  }

  const downloadImage = (index: number) => {
    const url = originalUrls[index]
    if (!url) return
    const link = document.createElement('a')
    link.download = `nanobanana-monkey-art-${Date.now()}-${index}.png`
    if (url.startsWith('data:image/')) {
      link.href = url
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      fetch(`/api/proxy-image?url=${encodeURIComponent(url)}`)
        .then(async (r) => {
          const blob = await r.blob()
          const blobUrl = URL.createObjectURL(blob)
          link.href = blobUrl
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(blobUrl)
        })
        .catch(() => setError('Download failed. Please try again.'))
    }
  }

  const quickPrompts = [
    'A baby monkey hugging a plush orangutan toy',
    'A tiny macaque peeking out from a zookeeper\'s jacket',
    'A monkey sitting alone with a stuffed animal, hopeful expression',
    'Two monkeys grooming each other in a peaceful garden',
    'A resilient little monkey climbing a tree at sunrise',
  ]

  return (
    <>
      <ToastManager />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50/30 relative overflow-hidden">
        <Navigation />

        {/* Hero */}
        <section className="relative z-10 pt-24 pb-12">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
                🐒 Unofficial Fan Tribute · Inspired by Punch's Story
              </span>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Punch the Monkey</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-4">
                In July 2025 a tiny Japanese macaque named Punch was abandoned at birth, rescued by a devoted
                zookeeper, and found comfort in a plush orangutan toy. By February 2026 his story had moved
                millions around the world.
              </p>
              <p className="text-base text-gray-500 max-w-2xl mx-auto mb-8">
                This page celebrates Punch's resilience with a brief retelling of his journey and a fun AI art
                generator — all powered by NanoBanana AI. No real photos of Punch are used or produced.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <GradientButton
                  size="md"
                  variant="primary"
                  leftIcon={<Wand2 className="w-5 h-5" />}
                  onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Try the AI Generator
                </GradientButton>
                <GradientButton
                  size="md"
                  variant="outline"
                  leftIcon={<BookOpen className="w-5 h-5" />}
                  onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Read Punch's Story
                </GradientButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Disclaimer banner */}
        <div className="container mx-auto px-4 mb-12">
          <motion.div
            className="max-w-3xl mx-auto bg-amber-50 border border-amber-200 rounded-2xl p-5 flex items-start gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-800 leading-relaxed">
              This is an <span className="font-semibold">unofficial, non-commercial fan page</span> created by
              NanoBanana AI. We are not affiliated with, endorsed by, or connected to Ichikawa City Zoo, its
              staff, IKEA, or any organization representing Punch. All factual content is sourced from public
              reporting by Reuters, BBC, The Japan Times, and similar outlets. No donations are collected here.
            </p>
          </motion.div>
        </div>

        {/* ---- Punch's Story ---- */}
        <section id="story" className="container mx-auto px-4 py-12">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              The Story of <span className="gradient-text">Punch</span>
            </h2>
            <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
              A brief, fact-based retelling drawn from international news coverage.
            </p>

            {/* Narrative cards */}
            <div className="space-y-8">
              <Card variant="glass" hover={false} className="border-l-4 border-orange-400">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">A Rough Start</h3>
                <p className="text-gray-600 leading-relaxed">
                  Punch was born in July 2025 at Ichikawa City Zoo and Botanical Gardens in Chiba Prefecture,
                  just outside Tokyo. Shortly after birth his mother abandoned him — zookeeper Kosuke Shikano
                  later told reporters that extreme summer heat may have triggered the rejection. An onlooker
                  spotted the tiny, shivering infant and alerted staff, who rushed him into emergency care.
                </p>
              </Card>

              <Card variant="glass" hover={false} className="border-l-4 border-yellow-400">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Round-the-Clock Rescue</h3>
                <p className="text-gray-600 leading-relaxed">
                  Shikano tucked Punch inside his jacket, against his chest, and began bottle-feeding him every
                  two hours. Japanese macaque infants normally cling to their mothers to build muscle strength
                  and feel secure, so the keepers needed a substitute — fast.
                </p>
              </Card>

              <Card variant="glass" hover={false} className="border-l-4 border-green-400">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Why a Plush Orangutan?</h3>
                <p className="text-gray-600 leading-relaxed">
                  The team experimented with rolled-up towels and various stuffed animals before settling on a
                  plush orangutan from IKEA. As Shikano explained to Reuters, its relatively long hair and
                  monkey-like shape gave Punch easy places to grip, and they hoped the resemblance to a real
                  primate would help him integrate back into the troop later. Punch latched on immediately and
                  has rarely been seen without it since.
                </p>
              </Card>

              <Card variant="glass" hover={false} className="border-l-4 border-blue-400">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">The Struggle to Belong</h3>
                <p className="text-gray-600 leading-relaxed">
                  Reintroducing a hand-raised infant into a strict macaque hierarchy is painstaking work.
                  Punch was often chased, pushed away, or filmed hiding alone while clutching his plush
                  companion. But recent footage has offered hope: other macaques have been seen grooming him,
                  sitting beside him, and even hugging him. The zoo issued a statement encouraging people to
                  cheer Punch on rather than feel sorry for him, noting his remarkable resilience and mental
                  strength.
                </p>
              </Card>

              <Card variant="glass" hover={false} className="border-l-4 border-purple-400">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">A Global Phenomenon</h3>
                <p className="text-gray-600 leading-relaxed">
                  By February 2026 some of the most widely shared videos of Punch had racked up over 40 million
                  views. BBC, The New York Times, Reuters, Forbes, and many other outlets covered his story.
                  Fans rallied around the hashtags #GanbarePanchi and #HangInTherePunch, and IKEA Japan's CEO
                  personally visited the zoo to donate backup plush orangutans.
                </p>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* ---- Timeline ---- */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              <span className="gradient-text">Timeline</span>
            </h2>

            <div className="relative border-l-2 border-orange-200 ml-4 space-y-8">
              {timelineEvents.map((evt, i) => (
                <motion.div
                  key={i}
                  className="relative pl-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 border-2 border-white shadow" />
                  <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">{evt.date}</span>
                  <h4 className="text-lg font-semibold text-gray-800 mt-1">{evt.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mt-1">{evt.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ---- AI Generator ---- */}
        <section id="generator" className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                <span className="gradient-text">AI Monkey Art</span> Generator
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Create your own monkey-themed AI artwork. Every image is 100 % AI-generated — no real
                animal photos are used or produced.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Left — controls */}
              <Card variant="glass" hover={false}>
                <div className="space-y-5">
                  {/* Prompt */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Wand2 className="w-4 h-4 text-orange-500" />
                      Describe your artwork
                    </label>
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g. A baby monkey hugging a plush orangutan toy under cherry blossoms…"
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200/30 focus:border-orange-400 transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Quick prompts */}
                  <div>
                    <span className="text-xs font-medium text-gray-500 mb-2 block">Quick ideas:</span>
                    <div className="flex flex-wrap gap-2">
                      {quickPrompts.map((qp, i) => (
                        <motion.button
                          key={i}
                          onClick={() => setPrompt(qp)}
                          className="px-3 py-1.5 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg text-xs text-orange-700 transition-colors"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {qp.length > 50 ? qp.slice(0, 47) + '…' : qp}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Style */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-orange-500" />
                      Art style
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {stylePresets.map((sp) => (
                        <motion.button
                          key={sp.label}
                          onClick={() => setSelectedStyle(sp)}
                          className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                            selectedStyle.label === sp.label
                              ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-transparent shadow-md'
                              : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300'
                          }`}
                          whileTap={{ scale: 0.96 }}
                        >
                          {sp.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-orange-500" />
                      Image size
                    </label>
                    <select
                      value={selectedSize.value}
                      onChange={(e) => {
                        const opt = sizeOptions.find((o) => o.value === e.target.value)
                        if (opt) setSelectedSize(opt)
                      }}
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:ring-4 focus:ring-orange-200/30 focus:border-orange-400 transition-all text-sm"
                    >
                      {sizeOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Generate button */}
                  <div className="pt-2">
                    <GradientButton
                      size="lg"
                      fullWidth
                      loading={isGenerating}
                      leftIcon={!isGenerating ? <Wand2 className="w-5 h-5" /> : undefined}
                      onClick={generate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? 'Generating…' : 'Generate Monkey Art'}
                    </GradientButton>
                  </div>

                  <AnimatePresence>
                    {isGenerating && progress && (
                      <motion.div
                        className="p-3 bg-orange-50 border border-orange-200 rounded-xl"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <p className="text-orange-700 text-sm text-center font-medium">{progress}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="text-xs text-gray-400 text-center">
                    Powered by NanoBanana AI · BigModel cogview-3-flash
                  </p>
                </div>
              </Card>

              {/* Right — result */}
              <Card variant="glass" hover={false} className="min-h-[480px]">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Your Artwork</h3>

                {generatedImages.length === 0 ? (
                  <EmptyState
                    title="No artwork yet"
                    description="Describe a scene and hit Generate to create AI monkey art"
                    icon="image"
                  />
                ) : (
                  <div className="space-y-4">
                    {generatedImages.map((img, i) => (
                      <motion.div
                        key={i}
                        className="bg-white rounded-xl overflow-hidden shadow-lg border border-orange-100"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <div className="relative group bg-gray-50 flex items-center justify-center min-h-[240px]">
                          <img
                            src={img}
                            alt={`AI-generated monkey artwork ${i + 1}`}
                            className="w-full h-auto max-h-96 object-contain"
                            crossOrigin="anonymous"
                          />
                          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button
                              onClick={() => downloadImage(i)}
                              className="bg-white text-orange-700 px-4 py-2 rounded-lg shadow-xl hover:bg-orange-50 transition-colors font-semibold text-sm flex items-center gap-2"
                            >
                              <Download className="w-4 h-4" /> Download
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <button
                            onClick={() => downloadImage(i)}
                            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-2 px-4 rounded-lg transition-all font-semibold text-sm"
                          >
                            Download Artwork
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                <AnimatePresence>
                  {error && (
                    <motion.div
                      className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <p className="text-red-700 text-sm text-center">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </div>
          </motion.div>
        </section>

        {/* ---- FAQ ---- */}
        <section className="container mx-auto px-4 py-16">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>

            <div className="space-y-3">
              {faqItems.map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-gray-800 text-sm pr-4">{item.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-orange-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ---- Animal Welfare Note ---- */}
        <section className="container mx-auto px-4 py-12">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
              <Heart className="w-10 h-10 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">A Note on Animal Welfare</h3>
              <p className="text-gray-600 leading-relaxed text-sm max-w-2xl mx-auto mb-4">
                Punch's story is a reminder of the extraordinary care that dedicated zookeepers provide every
                day. If you are moved by his journey, consider supporting your local zoo or a reputable animal
                welfare organization. Ethical wildlife care depends on public awareness, scientific research,
                and compassionate action.
              </p>
              <p className="text-gray-500 text-xs">
                We encourage kindness toward all animals and respect for the professionals who care for them.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ---- Sources ---- */}
        <section className="container mx-auto px-4 py-8 pb-16">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Sources & Further Reading</h3>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {[
                { label: 'Reuters', url: 'https://www.reuters.com' },
                { label: 'BBC News', url: 'https://www.bbc.com/news' },
                { label: 'The Japan Times', url: 'https://www.japantimes.co.jp' },
              ].map((src) => (
                <a
                  key={src.label}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {src.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">
              All factual claims on this page are sourced from the above outlets. Content was rephrased for
              compliance with licensing restrictions.
            </p>
          </motion.div>
        </section>
      </div>
    </>
  )
}
