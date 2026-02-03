import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Vote, Building2, Globe, Scale, ArrowRight, Check } from 'lucide-react';
import { WebsiteLayout } from './components';

const GOLD = '#ca8a04';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const solutions = [
  {
    icon: Vote,
    title: 'For Political Campaigns',
    description: 'Institutional infrastructure for electoral operations at any scale.',
    capabilities: [
      'Unified campaign command structure',
      'Field team coordination and deployment',
      'Voter outreach management',
      'Real-time operational dashboards',
      'Volunteer mobilization at scale',
      'Data-driven strategic planning'
    ]
  },
  {
    icon: Building2,
    title: 'For Political Parties',
    description: 'Governance infrastructure for sustained organizational effectiveness.',
    capabilities: [
      'Party hierarchy management',
      'Chapter and ward coordination',
      'Membership registry systems',
      'Internal governance protocols',
      'Leadership accountability frameworks',
      'Institutional memory preservation'
    ]
  },
  {
    icon: Globe,
    title: 'For NGOs & Civil Society',
    description: 'Operational infrastructure for advocacy movements and civic organizations.',
    capabilities: [
      'Campaign coordination tools',
      'Grassroots engagement systems',
      'Coalition management',
      'Impact tracking and reporting',
      'Volunteer network management',
      'Community mobilization frameworks'
    ]
  },
  {
    icon: Scale,
    title: 'For Government Institutions',
    description: 'Administrative infrastructure for governance operations and public engagement.',
    capabilities: [
      'Constituent engagement platforms',
      'Service delivery coordination',
      'Inter-agency collaboration',
      'Public program management',
      'Stakeholder communication',
      'Governance transparency tools'
    ]
  }
];

export function SolutionsPage() {
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
                Solutions
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Infrastructure for{' '}
              <span className="text-gradient-gold">Every Institution</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg sm:text-xl leading-relaxed" style={{ color: '#ccc' }}>
              Purpose-built solutions for campaigns, parties, civil society, and governance 
              stakeholders operating at any scale.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="space-y-16">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                className="grid lg:grid-cols-2 gap-12 items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(202, 138, 4, 0.1)' }}
                    >
                      <solution.icon className="w-7 h-7" style={{ color: GOLD }} />
                    </div>
                    <h2 
                      className="text-2xl lg:text-3xl font-bold"
                      style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                    >
                      {solution.title}
                    </h2>
                  </div>
                  <p className="text-lg leading-relaxed mb-8" style={{ color: '#888' }}>
                    {solution.description}
                  </p>
                  <Link
                    to="/request-access"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-colors"
                    style={{ border: `2px solid ${GOLD}`, color: GOLD }}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div 
                  className={`p-8 rounded-lg ${index % 2 === 1 ? 'lg:order-1' : ''}`}
                  style={{ backgroundColor: '#141417', border: '1px solid #2a2a2e' }}
                >
                  <h3 
                    className="font-semibold text-sm mb-6 uppercase tracking-wide"
                    style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', color: GOLD }}
                  >
                    Key Capabilities
                  </h3>
                  <ul className="space-y-4">
                    {solution.capabilities.map((capability) => (
                      <li key={capability} className="flex items-start gap-3">
                        <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: GOLD }} />
                        <span style={{ color: '#ccc' }}>{capability}</span>
                      </li>
                    ))}
                  </ul>
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
              Find the right solution for your institution
            </h2>
            <p className="text-lg mb-10" style={{ color: '#888' }}>
              Our team will work with you to configure CONTROLHQ for your specific operational requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/request-access"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{ backgroundColor: GOLD, color: '#000000' }}
              >
                Request Access
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{ border: `2px solid ${GOLD}`, color: '#f5f5f5' }}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
