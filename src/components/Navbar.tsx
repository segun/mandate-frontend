import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useAuthStore } from '../stores/auth.store';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = useMemo(
    () => [
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'States', to: '/states' },
      { label: 'LGAs', to: '/lgas' }, // Placeholder, should be dynamic
      { label: 'Wards', to: '/wards' },
      { label: 'Polling Units', to: '/polling-units' },
      { label: 'Voters', to: '/voters' },
      { label: 'Users', to: '/users' },
    ],
    [],
  );


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  const initial = user?.fullName?.[0]?.toUpperCase() ?? 'M';

  if (!isAuthenticated) return null;

  return (
    <nav className="sticky top-0 z-30 bg-[#141417]/95 backdrop-blur border-b border-[#2a2a2e] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/images/logo.png" 
                alt="ControlHQ" 
                className="h-10 w-auto"
              />
            </Link>
            <span className="hidden sm:inline-flex items-center rounded-full bg-[#ca8a04]/10 px-3 py-1 text-xs font-medium text-[#ca8a04]">
              Field Command
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.to)
                    ? 'text-[#ca8a04] bg-[#ca8a04]/10'
                    : 'text-[#888] hover:text-[#ca8a04] hover:bg-[#1a1a1e]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold rounded-full bg-[#ca8a04] text-[#0d0d0f] shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#141417] focus:ring-[#ca8a04]"
            >
              <span>Logout</span>
            </button>
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ca8a04] text-[#0d0d0f] text-sm font-semibold shadow-sm">
                {initial}
              </div>
              <div className="hidden md:block leading-tight">
                <p className="text-sm font-semibold text-white">{user?.fullName}</p>
                <p className="text-xs text-[#888]">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex md:hidden items-center justify-center p-2 rounded-md text-[#888] hover:text-[#ca8a04] hover:bg-[#1a1a1e]"
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-[#2a2a2e] bg-[#141417]/95 backdrop-blur">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'text-[#ca8a04] bg-[#ca8a04]/10'
                    : 'text-[#888] hover:text-[#ca8a04] hover:bg-[#1a1a1e]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="mt-2 w-full inline-flex items-center justify-center px-3 py-2 text-sm font-semibold rounded-md bg-[#ca8a04] text-[#0d0d0f] shadow-sm hover:bg-[#d4940a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#141417] focus:ring-[#ca8a04] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
