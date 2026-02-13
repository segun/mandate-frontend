import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Database, 
  Shield, 
  Cloud, 
  Lock, 
  Zap, 
  ArrowRight
} from 'lucide-react';
import { WebsiteLayout } from './components';

const GOLD = '#ca8a04';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const features = [
  {
    icon: Database,
    title: 'Institutional Data Architecture',
    description: 'Purpose-built data models optimized for political operations',
    points: ['Voter registry systems', 'Constituency hierarchies', 'Operational data structures', 'Audit trail logging']
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Institutional-grade security for sensitive political operations',
    points: ['Role-based access control', 'End-to-end encryption', 'Multi-factor authentication', 'Compliance frameworks']
  },
  {
    icon: Cloud,
    title: 'Deployment Options',
    description: 'Deploy CONTROLHQ in the way that works for your institution',
    points: ['Cloud deployment', 'Private/self-hosted', 'Hybrid configurations', 'Data residency control']
  },
  {
    icon: Lock,
    title: 'Data Sovereignty',
    description: 'Complete control over your political data and institutional information',
    points: ['On-premises deployment', 'Local data residency', 'No third-party access', 'Institutional ownership']
  },
  {
    icon: Zap,
    title: 'Real-Time Operations',
    description: 'Live command and control for operational coordination',
    points: ['Live dashboards', 'Real-time updates', 'Instant notifications', 'Command coordination']
  },
  {
    icon: Database,
    title: 'Analytics & Intelligence',
    description: 'Data-driven insights for strategic decision-making',
    points: ['Custom analytics', 'Predictive modeling', 'Trend analysis', 'Decision support']
  }
];

const specifications = [
  { label: 'Technology Stack', value: 'Node.js, TypeScript, PostgreSQL, React' },
  { label: 'API Architecture', value: 'RESTful APIs with institutional governance' },
  { label: 'Data Encryption', value: 'AES-256 at rest, TLS 1.3 in transit' },
  { label: 'Uptime SLA', value: '99.95% for enterprise deployments' },
  { label: 'Scalability', value: 'Horizontal scaling for any institutional size' },
  { label: 'Support', value: '24/7 enterprise support available' }
];

export function PlatformPage() {
  return (
    <WebsiteLayout>
      {/* Hero Section */}
      <section className="py-24 lg:py-32 hero-gradient">
        <div className="section-container">
          <motion.div
            className="max-w-4xl"
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div variants={fadeIn} className="flex items-center gap-2 mb-6">
              <span className="h-px w-12" style={{ backgroundColor: GOLD }} />
              <span className="text-sm font-medium tracking-widest uppercase" style={{ color: GOLD }}>
                Platform
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Enterprise-Grade{' '}
              <span className="text-gradient-gold">Architecture</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg sm:text-xl leading-relaxed" style={{ color: '#ccc' }}>
              Built from the ground up with institutional requirements in mind. Security, 
              scalability, and sovereignty at every layer.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Core Platform Capabilities
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#888' }}>
              Six foundational pillars designed for institutional operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-8 rounded-lg"
                style={{ backgroundColor: '#141417', border: '1px solid #2a2a2e' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(202, 138, 4, 0.1)' }}
                >
                  <feature.icon className="w-6 h-6" style={{ color: GOLD }} />
                </div>
                <h3 
                  className="text-lg font-semibold mb-3"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#888' }}>
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-xs">
                      <span 
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: GOLD }}
                      />
                      <span style={{ color: '#ccc' }}>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: '#1a1a1f' }}>
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Technical Specifications
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#888' }}>
              Enterprise-grade infrastructure built for institutional scale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {specifications.map((spec, index) => (
              <motion.div
                key={spec.label}
                className="p-6 rounded-lg"
                style={{ 
                  backgroundColor: '#0f0f12', 
                  border: `1px solid ${GOLD}20` 
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <p className="text-sm font-medium mb-2" style={{ color: GOLD }}>
                  {spec.label}
                </p>
                <p style={{ color: '#ccc' }}>
                  {spec.value}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Explore the complete architecture
            </h2>
            <p className="text-lg mb-10" style={{ color: '#888' }}>
              Our technical team will provide a comprehensive briefing on platform architecture, 
              security, and deployment options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{ backgroundColor: GOLD, color: '#000000' }}
              >
                Register for Access
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{ border: `2px solid ${GOLD}`, color: '#f5f5f5' }}
              >
                Contact Architecture Team
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
