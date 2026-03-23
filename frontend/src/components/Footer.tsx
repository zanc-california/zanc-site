import { Link } from 'react-router-dom';
import SubscribeForm from './SubscribeForm';

const Footer = () => {
  return (
    <footer className="bg-zambia-green text-white border-t border-zambia-green-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-copper-glow border border-copper/30">
                <span className="font-heading font-bold text-copper">Z</span>
              </span>
              <div>
                <div className="font-heading font-bold text-white">ZANC</div>
                <div className="text-sm text-white/80">Zambian Association in Northern California</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-white/80 max-w-sm">
              Zambian heritage, NorCal community. Connecting members across Northern California and beyond since 2017.
            </p>
            <div id="zanc-updates" className="mt-6 max-w-sm scroll-mt-28 border-t border-white/15 pt-6">
              <SubscribeForm variant="footer" />
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-white/80 hover:text-copper transition-colors">About</Link></li>
              <li><Link to="/initiatives" className="text-white/80 hover:text-copper transition-colors">Initiatives</Link></li>
              <li><Link to="/news" className="text-white/80 hover:text-copper transition-colors">Events &amp; News</Link></li>
              <li><Link to="/membership" className="text-white/80 hover:text-copper transition-colors">Join ZANC</Link></li>
              <li><Link to="/insurance" className="text-white/80 hover:text-copper transition-colors">Insurance</Link></li>
              <li><Link to="/donate" className="text-white/80 hover:text-copper transition-colors">Donate</Link></li>
              <li><Link to="/privacy-policy" className="text-white/80 hover:text-copper transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-copper transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-3">Our partners</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="https://www.americanhsi.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="mb-2 inline-block rounded-md bg-white p-2.5 max-w-[200px] shadow-sm ring-1 ring-white/20">
                    <img
                      src="/images/businesses-partners/AHS.jpg"
                      alt="American Hospitality Services logo"
                      className="max-h-12 sm:max-h-14 w-auto max-w-full object-contain object-left"
                      width={180}
                      height={56}
                      loading="lazy"
                    />
                  </div>
                  <span className="block text-white/90 group-hover:text-copper transition-colors font-medium">
                    American Hospitality Services (AHS)
                  </span>
                </a>
                <p className="mt-1 text-xs text-white/65 leading-relaxed max-w-xs">
                  A Northern California hotel development, operations, and asset-management partner — supporting hospitality and community
                  connections across the region.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-3">Follow</h3>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/80 hover:text-copper transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/80 hover:text-copper transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/80 hover:text-copper transition-colors">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.808 2.256 6.088 2.243 6.497 2.243 12c0 5.503.013 5.912.072 7.192.059 1.276.353 2.449 1.32 3.416.967.967 2.14 1.261 3.416 1.32 1.28.059 1.689.072 7.192.072s5.912-.013 7.192-.072c1.276-.059 2.449-.353 3.416-1.32.967-.967 1.261-2.14 1.32-3.416.059-1.28.072-1.689.072-7.192s-.013-5.912-.072-7.192c-.059-1.276-.353-2.449-1.32-3.416C19.449.425 18.276.131 17 .072 15.72.013 15.311 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/15 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-white/70">
          <p>&copy; {new Date().getFullYear()} Zambian Association in Northern California. All rights reserved.</p>
          <p>
            Built by{' '}
            <a
              href="https://levrage-studio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-copper hover:text-copper-glow underline-offset-2 hover:underline"
            >
              LevrAge Innovation Studios
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;