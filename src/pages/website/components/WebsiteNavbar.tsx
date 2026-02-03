import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const GOLD = "#ca8a04";

export function WebsiteNavbar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="section-container flex items-center justify-between">
        <Link to="/" onClick={scrollToTop} className="flex items-center gap-3">
          <img src="/images/logo.png" alt="ControlHQ" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/about"
            onClick={scrollToTop}
            style={{ color: isActive("/about") ? GOLD : "#ccc" }}
            className="hover:opacity-80 transition-opacity font-medium"
          >
            About
          </Link>
          <Link
            to="/product"
            onClick={scrollToTop}
            style={{ color: isActive("/product") ? GOLD : "#ccc" }}
            className="hover:opacity-80 transition-opacity font-medium"
          >
            Product
          </Link>
          <Link
            to="/solutions"
            onClick={scrollToTop}
            style={{ color: isActive("/solutions") ? GOLD : "#ccc" }}
            className="hover:opacity-80 transition-opacity font-medium"
          >
            Solutions
          </Link>
          <Link
            to="/platform"
            onClick={scrollToTop}
            style={{ color: isActive("/platform") ? GOLD : "#ccc" }}
            className="hover:opacity-80 transition-opacity font-medium"
          >
            Platform
          </Link>
          <Link
            to="/partnerships"
            onClick={scrollToTop}
            style={{ color: isActive("/partnerships") ? GOLD : "#ccc" }}
            className="hover:opacity-80 transition-opacity font-medium"
          >
            Partnerships
          </Link>
          <Link
            to="/contact"
            onClick={scrollToTop}
            style={{ color: isActive("/contact") ? GOLD : "#ccc" }}
            className="hover:opacity-80 transition-opacity font-medium"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/login"
            target="_blank"
            rel="noopener noreferrer"
            style={{ border: `2px solid ${GOLD}`, color: "#888" }}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg text-foreground hover:bg-muted/50 transition-colors"
          >
            <Lock className="w-4 h-4" />
            Secure Login
          </Link>
          <Link
            to="/request-access"
            onClick={scrollToTop}
            className="px-6 py-2 rounded-lg font-semibold"
            style={{ backgroundColor: GOLD, color: "#000000" }}
          >
            Request Access
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
