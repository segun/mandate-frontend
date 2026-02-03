import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Shield, Globe, ArrowRight } from 'lucide-react';
import { WebsiteLayout } from './components';

const GOLD = '#ca8a04';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const principles = [
  {
    title: 'Structure Over Chaos',
    description: 'Political success requires institutional discipline. We build systems that enforce structure and prevent organizational entropy.'
  },
  {
    title: 'Accountability by Design',
    description: 'Every action is tracked, every role is defined, every process is documented. Governance is not optional—it\'s architectural.'
  },
  {
    title: 'Scale With Integrity',
    description: 'From local chapters to national operations, our infrastructure maintains consistency, security, and accountability at any scale.'
  }
];

const cards = [
  {
    icon: MapPin,
    title: 'Purpose-Built',
    description: 'Every feature is designed specifically for political operations—not adapted from generic business tools.'
  },
  {
    icon: Shield,
    title: 'Sovereign Technology',
    description: 'Built with data sovereignty in mind. Private deployments, local data residency, and institutional-grade security.'
  },
  {
    icon: Globe,
    title: 'Africa-Focused',
    description: 'Designed for the unique context of African democracies—accounting for infrastructure constraints and operational realities.'
  }
];

export function AboutPage() {
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
                About CONTROLHQ
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Institutional Infrastructure for{' '}
              <span className="text-gradient-gold">Democracy</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg sm:text-xl leading-relaxed" style={{ color: '#ccc' }}>
              We are not a campaign tool. We are political infrastructure.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
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
                Our Mission
              </h2>
              <div className="space-y-6 leading-relaxed" style={{ color: '#ccc' }}>
                <p>
                  CONTROLHQ was designed to solve a foundational problem in African democracies: 
                  the absence of institutional infrastructure for political organization.
                </p>
                <p>
                  We are building the operating system for political governance—an institutional 
                  platform that enables structure, accountability, and coordination at every level.
                </p>
                <p>
                  CONTROLHQ is not a consumer product. It is institutional-grade infrastructure 
                  built for political parties, campaign operations, civil society organizations, 
                  and governance stakeholders.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {cards.map((card) => (
                <div 
                  key={card.title} 
                  className="p-8 rounded-lg"
                  style={{ backgroundColor: '#141417', border: '1px solid #2a2a2e' }}
                >
                  <card.icon className="w-8 h-8 mb-4" style={{ color: GOLD }} />
                  <h3 
                    className="text-xl font-semibold mb-3"
                    style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
                    {card.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
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
              Institutional Principles
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#888' }}>
              The foundational values that guide every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                className="text-center p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ border: `2px solid ${GOLD}` }}
                >
                  <span 
                    className="font-bold"
                    style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif', color: GOLD }}
                  >
                    {index + 1}
                  </span>
                </div>
                <h3 
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
              Ready to build institutional infrastructure?
            </h2>
            <p className="text-lg mb-10" style={{ color: '#888' }}>
              Join the institutions transforming their political operations with CONTROLHQ.
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
