import Link from 'next/link'
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="container-luxury py-16 text-center">
          <p className="text-overline text-gold-400 mb-4">Join the Circle</p>
          <h2 className="display-md text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-white/60 text-sm max-w-md mx-auto mb-8 font-light">
            Be the first to discover new collections, exclusive events, and private sales.
          </p>
          <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-4 bg-white/5 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-gold-400 transition-colors"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white text-xs font-medium tracking-widest uppercase transition-colors duration-200 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-luxury py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="text-3xl font-light tracking-[0.3em] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              LUXÉ
            </div>
            <p className="text-white/50 text-sm font-light leading-relaxed mb-6 max-w-xs">
              Curated luxury for those who appreciate the finest things. Fashion and timepieces of exceptional quality.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-gold-400 flex items-center justify-center text-white/60 hover:text-gold-400 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-white/40 mb-5">Collections</h4>
            <ul className="space-y-3">
              {['New Arrivals', "Women's Fashion", "Men's Fashion", 'Luxury Watches', 'Accessories', 'Sale'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors duration-150 font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-white/40 mb-5">Client Services</h4>
            <ul className="space-y-3">
              {['Contact Us', 'Shipping & Returns', 'Size Guide', 'Care Instructions', 'Store Locator', 'Gift Cards'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors duration-150 font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-medium tracking-widest uppercase text-white/40 mb-5">Company</h4>
            <ul className="space-y-3">
              {['Our Story', 'Sustainability', 'Press', 'Careers', 'Affiliates', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors duration-150 font-light">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-luxury py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs font-light">
            © {new Date().getFullYear()} LUXÉ. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Terms', 'Privacy', 'Cookies'].map((item) => (
              <Link key={item} href="#" className="text-white/40 hover:text-white/70 text-xs transition-colors">
                {item}
              </Link>
            ))}
          </div>
          {/* Payment icons */}
          <div className="flex items-center gap-3 text-white/30">
            <span className="text-xs tracking-widest uppercase">Accepted Payments:</span>
            {['Visa', 'MC', 'Amex', 'PayPal'].map((p) => (
              <span key={p} className="text-[10px] border border-white/20 px-2 py-1 rounded-sm">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
