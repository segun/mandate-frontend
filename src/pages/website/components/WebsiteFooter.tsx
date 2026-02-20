import { Link } from 'react-router-dom';
import { Shield, Lock, Globe } from 'lucide-react';

const GOLD = '#ca8a04';

export function WebsiteFooter() {
  return (
    <footer style={{ backgroundColor: '#0d0d0f', borderTop: `1px solid ${GOLD}20` }} className="py-16">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src="/images/logo.png" 
                alt="ControlHQ" 
                className="h-10 w-auto"
              />
            </Link>
            <p style={{ color: '#888' }}>
              Institutional infrastructure for political governance across Africa.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#f5f5f5' }}>Product</h4>
            <ul className="space-y-2">
              <li><Link to="/product" style={{ color: '#888' }} className="hover:opacity-80">Overview</Link></li>
              <li><Link to="/platform" style={{ color: '#888' }} className="hover:opacity-80">Platform</Link></li>
              <li><Link to="/solutions" style={{ color: '#888' }} className="hover:opacity-80">Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#f5f5f5' }}>Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" style={{ color: '#888' }} className="hover:opacity-80">About</Link></li>
              <li><Link to="/partnerships" style={{ color: '#888' }} className="hover:opacity-80">Partnerships</Link></li>
              <li><Link to="/contact" style={{ color: '#888' }} className="hover:opacity-80">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" style={{ color: '#f5f5f5' }}>Security</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: GOLD }} />
                <span style={{ color: '#888', fontSize: '0.875rem' }}>Enterprise Security</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-4 h-4" style={{ color: GOLD }} />
                <span style={{ color: '#888', fontSize: '0.875rem' }}>Private Deployments</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4" style={{ color: GOLD }} />
                <span style={{ color: '#888', fontSize: '0.875rem' }}>Africa-Focused</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8" style={{ borderTop: `1px solid ${GOLD}20` }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p style={{ color: '#888' }} className="text-center md:text-left">
              © 2026 CONTROLHQ. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              <a href="#" style={{ color: '#888' }} className="hover:opacity-80 text-sm">
                Privacy Policy
              </a>
              <a href="#" style={{ color: '#888' }} className="hover:opacity-80 text-sm">
                Terms of Service
              </a>
              <a href="#" style={{ color: '#888' }} className="hover:opacity-80 text-sm">
                Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
