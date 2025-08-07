import Link from 'next/link'
import { NAVIGATION_LINKS, SOCIAL_LINKS, SERVICES } from '@/lib/constants'
import { Github, Linkedin, Twitter, MessageCircle } from 'lucide-react'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  discord: MessageCircle,
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-heading font-bold text-gradient mb-4 block">
              ForstvalStudio
            </Link>
            <p className="text-gray-400 mb-6">
              Where every tech dream finds its home. We specialize in creating 
              innovative solutions across AI/ML, web development, game development, 
              and enterprise solutions.
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.icon as keyof typeof socialIcons]
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {SERVICES.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:business@forststalstudio.com"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  business@forststalstudio.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@forststalstudio.com"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  support@forststalstudio.com
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="inline-block btn-primary mt-2"
                >
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} ForstvalStudio. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-primary text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-gray-500 text-sm">
                Built with ❤️ and Next.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}