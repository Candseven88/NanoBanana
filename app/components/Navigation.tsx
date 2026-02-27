'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Sparkles,
  Wand2,
  Palette,
  Menu,
  X,
  Home,
  BookOpen,
  Zap,
  Users
} from 'lucide-react'
import Link from 'next/link'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    {
      id: 'username-to-image',
      label: 'Username to Image',
      icon: Sparkles,
      description: 'Generate personalized avatars',
      type: 'tab'
    },
    {
      id: 'text-to-image',
      label: 'Text to Image',
      icon: Wand2,
      description: 'Create images from text',
      type: 'tab'
    },
    {
      id: 'image-to-image',
      label: 'Image to Image',
      icon: Palette,
      description: 'Transform existing images',
      type: 'tab'
    }
  ]

  const pageItems = [
    {
      id: 'nanobanana',
      label: 'NanoBanana',
      icon: Sparkles,
      description: 'AI Image Generation Tools',
      href: '/nanobanana',
      type: 'page'
    },
    {
      id: 'seedream',
      label: 'Seedream 4.0',
      icon: Zap,
      description: 'Advanced AI Image Generator',
      href: '/seedream',
      type: 'page'
    },
    {
      id: 'punch-the-monkey',
      label: 'Punch 🐒',
      icon: Sparkles,
      description: 'AI Monkey Art · Fan Tribute',
      href: '/punch-the-monkey',
      type: 'page'
    },
    {
      id: 'blog',
      label: 'Blog',
      icon: BookOpen,
      description: 'Latest AI insights',
      href: '/blog',
      type: 'page'
    },
    {
      id: 'about',
      label: 'About',
      icon: Users,
      description: 'Learn about us',
      href: '/about',
      type: 'page'
    }
  ]

  // 切换功能标签
  const switchTab = (tabId: string) => {
    window.dispatchEvent(new CustomEvent('switchTab', { detail: { tabId } }))
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg flex items-center justify-center shadow-md">
                <img src="/Logo.png" alt="NanoBanana" className="w-6 h-6 object-contain" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold">
                <span className="gradient-text">NanoBanana</span>
                <span className="text-gray-800"> AI</span>
              </h1>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <motion.button
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-4 h-4" />
                <span className="font-medium">Home</span>
              </motion.button>
            </Link>
            
            {pageItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-orange-100 py-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2">
              <Link href="/">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Home className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">Home</div>
                    <div className="text-sm text-gray-500 group-hover:text-orange-500">
                      Back to main page
                    </div>
                  </div>
                </motion.button>
              </Link>
              
              {pageItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <div className="text-left">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-500 group-hover:text-orange-500">
                        {item.description}
                      </div>
                    </div>
                  </motion.button>
                </Link>
              ))}
              
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => switchTab(item.id)}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 group"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-sm text-gray-500 group-hover:text-orange-500">
                      {item.description}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
} 