import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Lock } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../../../stores/auth.store";

const GOLD = "#ca8a04";

export function WebsiteNavbar() {
  const location = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const LinkIcon = isAuthenticated ? LayoutDashboard : Lock;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/about", label: "About" },
    { path: "/product", label: "Product" },
    { path: "/solutions", label: "Solutions" },
    { path: "/platform", label: "Platform" },
    { path: "/partnerships", label: "Partnerships" },
    { path: "/contact", label: "Contact" },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    scrollToTop();
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 backdrop-blur-md py-4"
      style={{
        backgroundColor: "rgba(13, 13, 15, 0.8)",
        borderBottom: `1px solid ${GOLD}20`,
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-container flex items-center justify-between gap-3">
        <Link to="/" onClick={scrollToTop} className="flex items-center gap-3">
          <img src="/images/logo.png" alt="ControlHQ" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={scrollToTop}
              style={{ color: isActive(item.path) ? GOLD : "#ccc" }}
              className="hover:opacity-80 transition-opacity font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="relative z-10 hidden md:flex flex-wrap items-center gap-3 pointer-events-auto">
          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            target={isAuthenticated ? undefined : "_blank"}
            rel={isAuthenticated ? undefined : "noopener noreferrer"}
            style={{ border: `2px solid ${GOLD}`, color: "#888" }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg text-foreground hover:bg-muted/50 transition-colors"
          >
            <LinkIcon className="w-4 h-4" />
            {isAuthenticated ? "Dashboard" : "Secure Login"}
          </Link>
          <Link
            to="/register"
            onClick={scrollToTop}
            className="inline-flex items-center justify-center px-6 py-2 rounded-lg font-semibold"
            style={{ backgroundColor: GOLD, color: "#000000" }}
          >
            Register
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="md:hidden inline-flex items-center justify-center rounded-lg border border-[#2a2a2e] p-2 text-[#ccc] hover:text-[#ca8a04] hover:border-[#ca8a04]/40 transition-colors"
          aria-label="Toggle website navigation"
          aria-expanded={isMobileMenuOpen}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#2a2a2e] bg-[#0d0d0f]/95">
          <div className="section-container py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                style={{ color: isActive(item.path) ? GOLD : "#ccc" }}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#1a1a1d] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <Link
                to={isAuthenticated ? "/dashboard" : "/login"}
                target={isAuthenticated ? undefined : "_blank"}
                rel={isAuthenticated ? undefined : "noopener noreferrer"}
                onClick={closeMobileMenu}
                style={{ border: `2px solid ${GOLD}`, color: "#888" }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-foreground hover:bg-muted/50 transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
                {isAuthenticated ? "Dashboard" : "Secure Login"}
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="inline-flex items-center justify-center px-6 py-2 rounded-lg font-semibold"
                style={{ backgroundColor: GOLD, color: "#000000" }}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
