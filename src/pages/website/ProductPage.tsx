import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Vote, 
  Users, 
  Radio, 
  BarChart3, 
  ArrowRight,
  Check 
} from 'lucide-react';
import { WebsiteLayout } from './components';

const GOLD = '#ca8a04';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const modules = [
  {
    icon: Building2,
    name: 'Governance Structure Manager',
    description: 'Define and enforce organizational hierarchies across all levels of political operation.',
    features: ['Role-based access control', 'Hierarchical org charts', 'Chapter & ward management', 'Leadership succession protocols']
  },
  {
    icon: MapPin,
    name: 'Field Operations Engine',
    description: 'Coordinate ground-level activities with precision and accountability.',
    features: ['Task assignment & tracking', 'Geospatial deployment', 'Real-time field updates', 'Resource allocation']
  },
  {
    icon: Vote,
    name: 'Voter Registry System',
    description: 'Secure, compliant electoral data management with institutional-grade controls.',
    features: ['Voter data management', 'Constituency mapping', 'Turnout modeling', 'Compliance frameworks']
  },
  {
    icon: Users,
    name: 'Mobilization Engine',
    description: 'Scale grassroots engagement with structured volunteer coordination.',
    features: ['Volunteer management', 'Event coordination', 'Outreach campaigns', 'Engagement tracking']
  },
  {
    icon: Radio,
    name: 'Command Center',
    description: 'Real-time operational oversight with institutional command and control capabilities.',
    features: ['Live dashboards', 'Incident management', 'Communication hub', 'Decision support']
  },
  {
    icon: BarChart3,
    name: 'Analytics Platform',
    description: 'Data-driven insights for strategic decision-making across all operations.',
    features: ['Performance metrics', 'Trend analysis', 'Predictive modeling', 'Custom reporting']
  }
];

export function ProductPage() {
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
                Product
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              The Political{' '}
              <span className="text-gradient-gold">Operating System</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg sm:text-xl leading-relaxed" style={{ color: '#ccc' }}>
              A comprehensive suite of integrated modules designed to power every aspect of 
              political operations—from governance structure to field mobilization.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-sm font-medium tracking-widest uppercase mb-4 block" style={{ color: GOLD }}>
              Core Modules
            </span>
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-4"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Integrated Political Infrastructure
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#888' }}>
              Six core modules working in concert to deliver institutional-grade capabilities.
            </p>
          </motion.div>

          <div className="space-y-8">
            {modules.map((module, index) => (
              <motion.div
                key={module.name}
                className="p-8 lg:p-12 rounded-lg"
                style={{ backgroundColor: '#141417', border: '1px solid #2a2a2e' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="grid lg:grid-cols-3 gap-8 items-start">
                  <div className="lg:col-span-2">
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: 'rgba(202, 138, 4, 0.1)' }}
                      >
                        <module.icon className="w-6 h-6" style={{ color: GOLD }} />
                      </div>
                      <h3 
                        className="text-2xl font-semibold"
                        style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                      >
                        {module.name}
                      </h3>
                    </div>
                    <p className="leading-relaxed" style={{ color: '#888' }}>
                      {module.description}
                    </p>
                  </div>
                  <div>
                    <ul className="space-y-3">
                      {module.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm">
                          <Check className="w-4 h-4 shrink-0" style={{ color: GOLD }} />
                          <span style={{ color: '#ccc' }}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: '#1a1a1f' }}>
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
              Deploy the complete political operating system
            </h2>
            <p className="text-lg mb-10" style={{ color: '#888' }}>
              Register your institution to explore how CONTROLHQ can transform your political operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{ backgroundColor: GOLD, color: '#000000' }}
              >
                Register
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/platform"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{ border: `2px solid ${GOLD}`, color: '#f5f5f5' }}
              >
                View Platform Architecture
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
