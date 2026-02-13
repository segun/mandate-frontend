import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Phone, Copy } from 'lucide-react';
import { WebsiteLayout } from './components';

const GOLD = '#ca8a04';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const WHATSAPP_MESSAGE = encodeURIComponent('Hello, I would like to learn more about CONTROLHQ.');

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Reach out with specific inquiries',
    contact: 'controlhq@gmail.com',
    link: 'mailto:controlhq@gmail.com',
    copyValue: 'controlhq@gmail.com'
  },
  {
    icon: Phone,
    title: 'Phone',
    description: 'Speak with our team directly',
    contact: '+2348162946163',
    link: `https://wa.me/2348162946163?text=${WHATSAPP_MESSAGE}`,
    copyValue: '+2348162946163'
  },
  {
    icon: MapPin,
    title: 'Office',
    description: 'Visit us in person',
    contact: '3 Odobo Street, Ogba Ikeja, Lagos',
    copyValue: '3 Odobo Street, Ogba Ikeja, Lagos'
  }
];

export function ContactPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (value: string, index: number) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(value).catch(() => {
        fallbackCopy(value);
      });
    } else {
      fallbackCopy(value);
    }

    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex((current) => (current === index ? null : current)), 1200);
  };

  const fallbackCopy = (value: string) => {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Copy failed', err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

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
                Contact
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Get in Touch With{' '}
              <span className="text-gradient-gold">Our Team</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg sm:text-xl leading-relaxed" style={{ color: '#ccc' }}>
              Whether you have questions about CONTROLHQ, want to discuss partnerships,
              or need technical support, we're here to help.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                className="text-center p-8 rounded-lg"
                style={{ backgroundColor: '#141417', border: '1px solid #2a2a2e' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: 'rgba(202, 138, 4, 0.1)' }}
                >
                  <method.icon className="w-6 h-6" style={{ color: GOLD }} />
                </div>
                <h3
                  className="text-xl font-semibold mb-2"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  {method.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: '#888' }}>
                  {method.description}
                </p>
                <div className="font-semibold flex items-center justify-center gap-3" style={{ color: GOLD }}>
                  {method.link ? (
                    <a
                      href={method.link}
                      target={method.title === 'Phone' ? '_blank' : undefined}
                      rel={method.title === 'Phone' ? 'noreferrer' : undefined}
                      className="hover:opacity-80"
                    >
                      {method.contact}
                    </a>
                  ) : (
                    <span>{method.contact}</span>
                  )}
                  <div className="relative flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(method.copyValue || method.contact, index)}
                      className="p-1 rounded hover:bg-black/20 transition"
                      aria-label={`Copy ${method.title.toLowerCase()} details`}
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {copiedIndex === index && (
                        <motion.span
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: -12 }}
                          exit={{ opacity: 0, y: -18 }}
                          transition={{ duration: 0.4 }}
                          className="absolute text-xs font-medium"
                          style={{ color: GOLD, pointerEvents: 'none' }}
                        >
                          Copied
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ or Additional Info */}
      <section className="py-24 lg:py-32" style={{ backgroundColor: '#1a1a1f' }}>
        <div className="section-container">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-3xl lg:text-4xl font-bold mb-6"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Response Times
            </h2>
            <div className="max-w-2xl mx-auto space-y-4" style={{ color: '#888' }}>
              <p>
                <span className="font-semibold" style={{ color: '#f5f5f5' }}>General Inquiries:</span>
                {' '}Typically responded to within 24 hours
              </p>
              <p>
                <span className="font-semibold" style={{ color: '#f5f5f5' }}>Partnership Opportunities:</span>
                {' '}Priority response within 12 hours
              </p>
              <p>
                <span className="font-semibold" style={{ color: '#f5f5f5' }}>Technical Support:</span>
                {' '}Enterprise support available 24/7
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
