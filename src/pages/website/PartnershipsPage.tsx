import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Handshake, Globe, Users, TrendingUp, ArrowRight, Check } from 'lucide-react';
import { WebsiteLayout } from './components';

const GOLD = '#ca8a04';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const partnerTypes = [
  {
    icon: Handshake,
    title: 'Technology Partners',
    description: 'Integration and system partners who extend CONTROLHQ capabilities',
    benefits: [
      'API access and integration',
      'Co-marketing opportunities',
      'Revenue sharing models',
      'Technical support and training'
    ]
  },
  {
    icon: Globe,
    title: 'Regional Deployment Partners',
    description: 'Implementation partners bringing CONTROLHQ to regional markets',
    benefits: [
      'Market exclusivity',
      'Implementation services',
      'Local support structure',
      'Revenue partnerships'
    ]
  },
  {
    icon: Users,
    title: 'Institutional Partners',
    description: 'Organizations implementing CONTROLHQ at scale',
    benefits: [
      'Institutional licensing',
      'Custom implementations',
      'Dedicated support',
      'Strategic advisory'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Advisory Partners',
    description: 'Subject matter experts guiding platform development',
    benefits: [
      'Platform input and direction',
      'Industry expertise sharing',
      'Co-authored content',
      'Thought leadership'
    ]
  }
];

const partnerBenefits = [
  'Access to institutional-grade political infrastructure',
  'Technical and commercial support from CONTROLHQ team',
  'Revenue-sharing and licensing opportunities',
  'Co-marketing and joint go-to-market initiatives',
  'Exclusive regional and vertical partnerships available',
  'Direct access to product and strategy teams'
];

export function PartnershipsPage() {
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
                Partnerships
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Partner With{' '}
              <span className="text-gradient-gold">CONTROLHQ</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg sm:text-xl leading-relaxed" style={{ color: '#ccc' }}>
              Build, extend, and deploy institutional infrastructure alongside CONTROLHQ. 
              We are building partnerships that matter.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Partner Types */}
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
              Partnership Models
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#888' }}>
              Multiple ways to partner and grow with CONTROLHQ
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={partner.title}
                className="p-8 rounded-lg"
                style={{ backgroundColor: '#141417', border: '1px solid #2a2a2e' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(202, 138, 4, 0.1)' }}
                >
                  <partner.icon className="w-6 h-6" style={{ color: GOLD }} />
                </div>
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  {partner.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: '#888' }}>
                  {partner.description}
                </p>
                <ul className="space-y-3">
                  {partner.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: GOLD }} />
                      <span style={{ color: '#ccc' }}>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: '#1a1a1f' }}>
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-3xl lg:text-4xl font-bold mb-8"
                style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
              >
                Why Partner With CONTROLHQ
              </h2>
              <ul className="space-y-4">
                {partnerBenefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Check className="w-5 h-5 shrink-0 mt-1" style={{ color: GOLD }} />
                    <span style={{ color: '#ccc' }}>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="p-8 rounded-lg"
              style={{ backgroundColor: '#0f0f12', border: `1px solid ${GOLD}20` }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 
                className="text-2xl font-semibold mb-6"
                style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
              >
                Next Steps
              </h3>
              <div className="space-y-4" style={{ color: '#ccc' }}>
                <p>
                  <span className="font-semibold" style={{ color: GOLD }}>1. Initial Conversation</span>
                  <br />
                  Let's discuss your organization and partnership goals
                </p>
                <p>
                  <span className="font-semibold" style={{ color: GOLD }}>2. Partnership Exploration</span>
                  <br />
                  We'll identify the best partnership model for your needs
                </p>
                <p>
                  <span className="font-semibold" style={{ color: GOLD }}>3. Formalization</span>
                  <br />
                  Execute partnership agreement and commence collaboration
                </p>
              </div>
            </motion.div>
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
              Let's build the future together
            </h2>
            <p className="text-lg mb-10" style={{ color: '#888' }}>
              Interested in partnering with CONTROLHQ? Reach out to our partnerships team 
              to explore collaboration opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{ backgroundColor: GOLD, color: '#000000' }}
              >
                Start Partnership Conversation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                style={{ border: `2px solid ${GOLD}`, color: '#f5f5f5' }}
              >
                Back to Home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
