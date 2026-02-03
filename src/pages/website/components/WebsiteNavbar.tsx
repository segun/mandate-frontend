import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const GOLD = '#ca8a04';

export function WebsiteNavbar() {
  return (
    <motion.nav 
      className="sticky top-0 z-50 backdrop-blur-md py-4"
      style={{ backgroundColor: 'rgba(13, 13, 15, 0.8)', borderBottom: `1px solid ${GOLD}20` }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/images/logo.png" 
            alt="ControlHQ" 
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/about" style={{ color: '#ccc' }} className="hover:opacity-80 transition-opacity">
            About
          </Link>
          <Link to="/product" style={{ color: '#ccc' }} className="hover:opacity-80 transition-opacity">
            Product
          </Link>
          <Link to="/solutions" style={{ color: '#ccc' }} className="hover:opacity-80 transition-opacity">
            Solutions
          </Link>
          <Link to="/platform" style={{ color: '#ccc' }} className="hover:opacity-80 transition-opacity">
            Platform
          </Link>
          <Link to="/partnerships" style={{ color: '#ccc' }} className="hover:opacity-80 transition-opacity">
            Partnerships
          </Link>
          <Link to="/contact" style={{ color: '#ccc' }} className="hover:opacity-80 transition-opacity">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button 
            className="px-6 py-2 rounded-lg font-semibold"
            style={{ border: `2px solid ${GOLD}`, color: '#888' }}
          >
            Secure Login
          </button>
          <Link
            to="/request-access"
            className="px-6 py-2 rounded-lg font-semibold"
            style={{ backgroundColor: GOLD, color: '#000000' }}
          >
            Request Access
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
