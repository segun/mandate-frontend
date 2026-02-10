import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowRight, Copy } from 'lucide-react';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', organization: '', message: '' });
  };

  const copyToClipboard = (value: string) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(value).catch(() => {
        fallbackCopy(value);
      });
      return;
    }
    fallbackCopy(value);
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
                  <button
                    type="button"
                    onClick={() => copyToClipboard(method.copyValue || method.contact)}
                    className="p-1 rounded hover:bg-black/20 transition"
                    aria-label={`Copy ${method.title.toLowerCase()} details`}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            className="max-w-2xl mx-auto p-12 rounded-lg"
            style={{ backgroundColor: '#141417', border: '1px solid #2a2a2e' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Send us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label 
                  className="block text-sm font-medium mb-2" 
                  style={{ color: '#ccc' }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg text-base"
                  style={{ 
                    backgroundColor: '#0f0f12', 
                    border: '1px solid #2a2a2e',
                    color: '#f5f5f5'
                  }}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2" 
                  style={{ color: '#ccc' }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg text-base"
                  style={{ 
                    backgroundColor: '#0f0f12', 
                    border: '1px solid #2a2a2e',
                    color: '#f5f5f5'
                  }}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2" 
                  style={{ color: '#ccc' }}
                >
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg text-base"
                  style={{ 
                    backgroundColor: '#0f0f12', 
                    border: '1px solid #2a2a2e',
                    color: '#f5f5f5'
                  }}
                  placeholder="Your organization"
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2" 
                  style={{ color: '#ccc' }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg text-base resize-none"
                  style={{ 
                    backgroundColor: '#0f0f12', 
                    border: '1px solid #2a2a2e',
                    color: '#f5f5f5'
                  }}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                style={{ backgroundColor: GOLD, color: '#000000' }}
              >
                Send Message
                <ArrowRight className="w-5 h-5" />
              </button>

              {submitted && (
                <motion.div
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor: 'rgba(202, 138, 4, 0.1)', border: `1px solid ${GOLD}` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p style={{ color: GOLD }}>Thank you! We'll get back to you soon.</p>
                </motion.div>
              )}
            </form>
          </motion.div>
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
