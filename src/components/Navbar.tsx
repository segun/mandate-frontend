import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useAuthStore } from '../stores/auth.store';
import { Resource, hasAccessToResource } from '../lib/permissions';

interface NavLink {
  label: string;
  to: string;
  resource: Resource;
}

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isPlatformOwner = user?.role === 'PLATFORM_OWNER';

  const navLinks: NavLink[] = useMemo(
    () => {
      if (isPlatformOwner) {
        return [
          { label: 'Dashboard', to: '/dashboard', resource: Resource.DASHBOARD },
          { label: 'Tenants', to: '/platform-owner/tenants', resource: Resource.PLATFORM_TENANTS },
          { label: 'Geo Data', to: '/platform-owner/geodata', resource: Resource.PLATFORM_GEODATA_UPLOAD },
        ];
      }

      return [
        { label: 'Dashboard', to: '/dashboard', resource: Resource.DASHBOARD },
        { label: 'States', to: '/states', resource: Resource.STATES },
        { label: 'LGAs', to: '/lgas', resource: Resource.LGAS },
        { label: 'Wards', to: '/wards', resource: Resource.WARDS },
        { label: 'Polling Units', to: '/polling-units', resource: Resource.POLLING_UNITS },
        { label: 'Voters', to: '/voters', resource: Resource.VOTERS },
        { label: 'Users', to: '/users', resource: Resource.USERS },
        { label: 'Chat', to: '/chat', resource: Resource.CHAT },
        { label: 'Election Day', to: '/election-day', resource: Resource.ELECTION_RESULTS },
      ];
    },
    [isPlatformOwner],
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  const canAccessLink = (resource: Resource) => hasAccessToResource(user?.role, resource);

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
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => {
              const hasAccess = canAccessLink(link.resource);
              return hasAccess ? (
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
              ) : (
                <span
                  key={link.to}
                  className="px-3 py-2 text-sm font-medium rounded-lg text-[#4a4a4e] cursor-not-allowed"
                  title="You don't have access to this section"
                >
                  {link.label}
                </span>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsUserMenuOpen((open) => !open)}
                className="group flex items-center gap-2 rounded-full px-2 py-1 hover:bg-[#1a1a1e] transition-colors cursor-pointer"
                aria-label="Open user menu"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="menu"
                title="Open user menu"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ca8a04] text-[#0d0d0f] text-sm font-semibold shadow-sm">
                  {initial}
                </div>
                <div className="hidden md:block leading-tight text-left">
                  <p className="text-sm font-semibold text-white group-hover:text-[#ca8a04] transition-colors">{user?.fullName}</p>
                  <p className="text-xs text-[#888] group-hover:text-[#ca8a04]/80 transition-colors">{user?.role}</p>
                </div>
                <svg
                  className={`hidden md:block h-4 w-4 text-[#888] transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-[#2a2a2e] bg-[#141417] shadow-xl p-3 z-50">
                  <div className="px-2 pb-3 border-b border-[#2a2a2e]">
                    <p className="text-xs uppercase tracking-wide text-[#888]">Signed in as</p>
                    <p className="text-sm font-semibold text-white mt-1">{user?.fullName}</p>
                    <p className="text-xs text-[#888]">{user?.email}</p>
                  </div>
                  <div className="pt-3 flex flex-col gap-2">
                    <Link
                      to="/user/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm font-semibold text-[#f5f5f5] hover:bg-[#1a1a1e]"
                    >
                      User Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 rounded-lg text-sm font-semibold text-[#ca8a04] hover:bg-[#1a1a1e] text-left"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
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
            {navLinks.map((link) => {
              const hasAccess = canAccessLink(link.resource);
              return hasAccess ? (
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
              ) : (
                <span
                  key={link.to}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-[#4a4a4e] cursor-not-allowed"
                  title="You don't have access to this section"
                >
                  {link.label}
                </span>
              );
            })}
            <Link
              to="/user/settings"
              onClick={() => setIsOpen(false)}
              className="mt-2 w-full inline-flex items-center justify-center px-3 py-2 text-sm font-semibold rounded-md border border-[#2a2a2e] text-[#f5f5f5] hover:bg-[#1a1a1e] transition-colors"
            >
              User Settings
            </Link>
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
