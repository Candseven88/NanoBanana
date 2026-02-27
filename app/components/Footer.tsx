'use client'

import { motion } from 'framer-motion'
import { 
  Mail, 
  MapPin, 
  Phone, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Github,
  ArrowRight,
  Sparkles,
  Heart,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import GradientButton from './ui/GradientButton'

const footerSections = [
  {
    title: 'Product',
    links: [
      { label: 'NanoBanana AI', href: '/nanobanana' },
      { label: 'Seedream 4.0', href: '/seedream' },
      { label: 'Punch the Monkey 🐒', href: '/punch-the-monkey' },
      { label: 'Username to Image', href: '/nanobanana' },
      { label: 'Text to Image', href: '/nanobanana' },
      { label: 'Image to Image', href: '/nanobanana' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'AI Editing Blog', href: '/blog' },
      { label: 'Professional AI Tips', href: '/blog/edit-pro-tips-ai' },
      { label: 'Seedream vs NanoBanana', href: '/blog/nanobanana-vs-seedream' },
      { label: 'Success Stories', href: '/blog/nanobanana-success-stories' },
      { label: 'Feature Guides', href: '/blog/nanobanana-features-guide' },
      { label: 'Future Roadmap', href: '/blog/nanobanana-future-roadmap' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Press Kit', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Investors', href: '#' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Contact Support', href: '#' },
      { label: 'Status Page', href: '#' },
      { label: 'Bug Reports', href: '#' },
      { label: 'Feature Requests', href: '#' },
      { label: 'System Status', href: '#' }
    ]
  }
]

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/nanobananaai', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com/nanobananaai', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/nanobananaai', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/nanobananaai', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/nanobananaai', label: 'GitHub' }
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'GDPR Compliance', href: '#' },
  { label: 'Accessibility', href: '#' }
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900/20 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="absolute -bottom-20 -left-20 w-32 h-32 bg-gradient-to-tr from-blue-400/10 to-purple-400/10 rounded-full"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Logo decorations */}
        <motion.div
          className="absolute top-20 right-1/4 w-8 h-8 opacity-5"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <img src="/Logo.png" alt="NanoBanana Logo" className="w-full h-full object-contain" />
        </motion.div>

        <motion.div
          className="absolute bottom-32 right-1/3 w-6 h-6 opacity-8"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img src="/Logo.png" alt="NanoBanana Logo" className="w-full h-full object-contain" />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-gray-700/50">
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl blur-lg opacity-30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <div className="relative bg-white/10 rounded-2xl p-3 shadow-xl backdrop-blur-sm">
                    <Sparkles className="w-8 h-8 text-orange-400" />
                  </div>
                </div>
                <h3 className="ml-4 text-3xl md:text-4xl font-bold">
                  Stay <span className="gradient-text">Creative</span>
                </h3>
              </div>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get the latest AI tools, tips, and creative inspiration delivered to your inbox. 
                Join 100K+ creators who never miss an update.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                />
                <GradientButton
                  variant="primary"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="px-6"
                >
                  Subscribe
                </GradientButton>
              </div>
              
              <p className="text-xs text-gray-400 mt-4">
                No spam, unsubscribe at any time. Read our <Link href="/privacy" className="text-orange-400 hover:text-orange-300">Privacy Policy</Link>.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
                      <img src="/Logo.png" alt="NanoBanana Logo" className="w-6 h-6 object-contain" />
                    </div>
                  </div>
                  <h4 className="ml-3 text-2xl font-bold">
                    <span className="gradient-text">NanoBanana</span> AI
                  </h4>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Democratizing AI creativity for everyone. Transform your ideas into stunning visuals 
                  with our powerful, easy-to-use AI image generation platform.
                </p>
                
                <div className="flex items-center gap-4 mb-6">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}
                </div>
                
                <div className="text-sm text-gray-400 space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>hello@nanobanana.ai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={section.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  viewport={{ once: true }}
                >
                  <h5 className="text-lg font-semibold mb-4 text-white">{section.title}</h5>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link 
                          href={link.href}
                          className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                        >
                          <span>{link.label}</span>
                          {link.href.startsWith('http') && (
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-1 text-gray-400">
                <span>© {currentYear} NanoBanana AI Inc. Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Heart className="w-4 h-4 text-red-400 fill-current" />
                </motion.div>
                <span>in San Francisco</span>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                {legalLinks.map((link, index) => (
                  <span key={link.label} className="flex items-center gap-4">
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                    {index < legalLinks.length - 1 && (
                      <span className="text-gray-600">•</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg z-50 hover:shadow-xl transition-all duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ArrowRight className="w-5 h-5 text-white rotate-[-90deg]" />
        </motion.button>
      </div>
    </footer>
  )
} 