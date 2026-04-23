import logoSmall from '../images/logo_small.png'
import newsletter from '../images/newsletter.png'

export default function Footer() {
  return (
    <footer className="bg-[#1e2d4a]">
      {/* Newsletter Section */}
      <div className="relative overflow-hidden py-12 md:py-20 px-4 md:px-6">
        {/* Background illustration */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${newsletter})` }}
        />
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <h2 className="text-white font-black text-3xl md:text-5xl mb-4">Never Miss a Recipe</h2>
          <p className="text-white/80 text-sm md:text-base mb-8">
            Subscribe to our newsletter and get weekly recipes delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-transparent">
            <div className="flex-1 flex items-center gap-3 bg-white/10 border border-white/20 rounded-full px-5 py-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent text-white placeholder-white/50 outline-none text-sm flex-1"
              />
            </div>
            <button className="bg-[#f5c518] text-[#1e2d4a] font-bold text-sm rounded-full px-6 py-3 hover:opacity-90 transition-opacity whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-white/50 text-sm mt-4">Join 50,000+ food lovers already subscribed</p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-white/10 px-4 md:px-10 py-10 md:py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logoSmall} alt="recipeNest" className="w-8 h-8 object-contain brightness-0 invert" />
              <span className="text-white font-black text-lg">recipeNest</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Your ultimate destination for discovering and sharing delicious recipes from around the world.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Explore</h4>
            <ul className="space-y-3">
              {['All Recipes', 'Categories', 'Popular', 'New Recipes'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Contact', 'Blog', 'Careers'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {/* Facebook */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                  <polygon fill="#1e2d4a" points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">© 2026 recipeNest. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="text-white/40 text-sm hover:text-white/70 transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}