import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Scale, 
  BarChart3, 
  Users, 
  Building2, 
  MapPin, 
  Vote, 
  Radio,
  ArrowRight,
  Globe
} from 'lucide-react';
import { WebsiteLayout } from './components';

const GOLD = '#ca8a04';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const corePillars = [
  {
    icon: Shield,
    title: 'Structure',
    description: 'Institutional frameworks for political organization and governance hierarchy.'
  },
  {
    icon: Scale,
    title: 'Governance',
    description: 'Accountability systems and democratic process enforcement at every level.'
  },
  {
    icon: BarChart3,
    title: 'Intelligence',
    description: 'Data-driven insights for strategic decision-making and operational awareness.'
  },
  {
    icon: Users,
    title: 'Mobilization',
    description: 'Coordinated field operations and grassroots engagement at scale.'
  }
];

const platformModules = [
  { icon: Building2, name: 'Governance Structure Manager', desc: 'Hierarchical organization and role management' },
  { icon: MapPin, name: 'Field Operations Engine', desc: 'Ground-level coordination and task management' },
  { icon: Vote, name: 'Voter Registry System', desc: 'Secure electoral data management' },
  { icon: Users, name: 'Mobilization Engine', desc: 'Grassroots engagement and volunteer coordination' },
  { icon: Radio, name: 'Command Center', desc: 'Real-time operational oversight and control' },
  { icon: BarChart3, name: 'Analytics Platform', desc: 'Performance metrics and strategic insights' }
];

const whoWeServe = [
  { icon: Vote, label: 'Political Campaigns' },
  { icon: Building2, label: 'Political Parties' },
  { icon: Globe, label: 'NGOs & Civil Society' },
  { icon: Scale, label: 'Government Institutions' }
];

export function HomePage() {
  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(202, 138, 4, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(202, 138, 4, 0.3) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
        </div>

        <div className="section-container relative z-10">
          <motion.div 
            className="max-w-4xl"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div variants={fadeIn} className="flex items-center gap-2 mb-6">
              <span className="h-px w-12" style={{ backgroundColor: GOLD }} />
              <span className="text-sm font-medium tracking-widest uppercase" style={{ color: GOLD }}>
                Political Infrastructure
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Political Infrastructure for{' '}
              <span className="text-gradient-gold">Modern Governance</span>
            </motion.h1>

            <motion.p 
              variants={fadeIn}
              className="text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-3xl mb-10"
            >
              CONTROLHQ is an institutional political operations platform designed to bring structure, 
              accountability, and governance into grassroots mobilization, democratic organization, 
              and electoral processes.
            </motion.p>

            {/* 1. Request Access button - gold bg, black text */}
            {/* 2. Partner With Us button - gold border */}
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/request-access"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg shadow-lg transition-all duration-300"
                style={{ backgroundColor: GOLD, color: '#000000' }}
              >
                Request Access
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/partnerships"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{ border: `2px solid ${GOLD}`, color: '#f5f5f5' }}
              >
                Partner With Us
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute right-0 top-1/4 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(202, 138, 4, 0.05)' }} />
        <div className="absolute right-1/4 bottom-1/4 w-64 h-64 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(202, 138, 4, 0.1)' }} />
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y" style={{ backgroundColor: '#1a1a1f', borderColor: '#2a2a2e' }}>
        <div className="section-container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <p className="text-sm tracking-wide" style={{ color: '#888' }}>
              Trusted by political movements, institutions, and governance stakeholders
            </p>
            <div className="flex items-center gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="w-20 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: '#252529' }}
                >
                  <span className="text-xs" style={{ color: '#888' }}>Partner {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars Section */}
      {/* 3. Core Pillars text should be gold */}
      {/* 4. Icons on Structure, Governance, Intelligence, Mobilization should be gold */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium tracking-widest uppercase mb-4 block" style={{ color: GOLD }}>
              Core Pillars
            </span>
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              The Foundation of Political Infrastructure
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#888' }}>
              CONTROLHQ provides the institutional framework for effective political organization
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                className="p-8 rounded-lg transition-all duration-300"
                style={{ backgroundColor: '#141417', border: '1px solid #2a2a2e' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(202, 138, 4, 0.1)' }}
                >
                  <pillar.icon className="w-7 h-7" style={{ color: GOLD }} />
                </div>
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      {/* 5. Product Overview text should be gold */}
      {/* 6. Same background and padding as Core Pillars section */}
      {/* 7. Explore the platform - gold text, gold border */}
      {/* 8. platformModules icons should be gold */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div>
              <span className="text-sm font-medium tracking-widest uppercase mb-4 block" style={{ color: GOLD }}>
                Product Overview
              </span>
              <h2 
                className="text-3xl lg:text-4xl font-bold mb-6"
                style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
              >
                The Political Operating System
              </h2>
              <p className="leading-relaxed mb-8" style={{ color: '#888' }}>
                A comprehensive suite of integrated modules designed to power every aspect of 
                political operations—from governance structure to field mobilization, from 
                voter management to real-time analytics.
              </p>
              <Link
                to="/product"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-colors"
                style={{ border: `2px solid ${GOLD}`, color: GOLD }}
              >
                Explore the Platform
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {platformModules.map((module, index) => (
                <motion.div
                  key={module.name}
                  className="p-5 rounded-lg transition-all duration-300"
                  style={{ backgroundColor: '#141417', border: '1px solid #2a2a2e' }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <module.icon className="w-5 h-5 mb-3" style={{ color: GOLD }} />
                  <h4 
                    className="font-semibold text-sm mb-1"
                    style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                  >
                    {module.name}
                  </h4>
                  <p className="text-xs" style={{ color: '#888' }}>{module.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We Serve Section */}
      {/* 9. Built For Institutions text should be gold */}
      {/* 10. whoWeServe icons should be gold */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium tracking-widest uppercase mb-4 block" style={{ color: GOLD }}>
              Built For Institutions
            </span>
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Who CONTROLHQ Serves
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {whoWeServe.map((item, index) => (
              <motion.div
                key={item.label}
                className="text-center p-8 rounded-lg transition-all duration-300"
                style={{ border: '1px solid #2a2a2e' }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <item.icon className="w-10 h-10 mx-auto mb-4" style={{ color: GOLD }} />
                <span 
                  className="font-medium"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* 11. Request Access button - gold bg, black text */}
      {/* 12. Institutional Partnerships button - gold border */}
      <section 
        className="py-24 lg:py-32 relative overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #1a1a1f, #0d0d0f)' }}
      >
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(202, 138, 4, 0.4) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        <div className="section-container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Build structure. Enforce governance.{' '}
              <span className="text-gradient-gold">Command your control.</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: '#888' }}>
              Join the institutions already transforming their political operations with CONTROLHQ infrastructure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/request-access"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg shadow-lg transition-all duration-300"
                style={{ backgroundColor: GOLD, color: '#000000' }}
              >
                Request Access
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/partnerships"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{ border: `2px solid ${GOLD}`, color: '#f5f5f5' }}
              >
                Institutional Partnerships
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
