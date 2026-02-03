import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { WebsiteLayout } from './components';

const GOLD = '#ca8a04';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const accessBenefits = [
  'Full access to all core modules',
  'Institutional-grade security architecture',
  'Dedicated implementation support',
  'Custom configuration and deployment',
  'Training and onboarding for your team',
  'Priority technical support'
];

export function RequestAccessPage() {
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    contactName: '',
    email: '',
    phone: '',
    specificNeeds: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({
      organizationName: '',
      organizationType: '',
      contactName: '',
      email: '',
      phone: '',
      specificNeeds: ''
    });
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
                Get Started
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
            >
              Request{' '}
              <span className="text-gradient-gold">Institutional Access</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="text-lg sm:text-xl leading-relaxed" style={{ color: '#ccc' }}>
              Join leading institutions transforming their political operations with CONTROLHQ. 
              Submit your request below and our team will connect with you shortly.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 lg:py-32">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-2xl font-bold mb-8"
                style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
              >
                What You Get
              </h2>
              <ul className="space-y-4">
                {accessBenefits.map((benefit, index) => (
                  <motion.li
                    key={benefit}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: GOLD }} />
                    <span style={{ color: '#ccc' }}>{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-2 p-12 rounded-lg"
              style={{ backgroundColor: '#141417', border: '1px solid #2a2a2e' }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 
                className="text-2xl font-bold mb-8"
                style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
              >
                Access Request Form
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2" 
                      style={{ color: '#ccc' }}
                    >
                      Organization Name
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={formData.organizationName}
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
                      Organization Type
                    </label>
                    <select
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg text-base"
                      style={{ 
                        backgroundColor: '#0f0f12', 
                        border: '1px solid #2a2a2e',
                        color: '#f5f5f5'
                      }}
                    >
                      <option value="">Select type...</option>
                      <option value="political-campaign">Political Campaign</option>
                      <option value="political-party">Political Party</option>
                      <option value="ngo">NGO / Civil Society</option>
                      <option value="government">Government Institution</option>
                      <option value="tech-partner">Technology Partner</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      className="block text-sm font-medium mb-2" 
                      style={{ color: '#ccc' }}
                    >
                      Contact Name
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg text-base"
                      style={{ 
                        backgroundColor: '#0f0f12', 
                        border: '1px solid #2a2a2e',
                        color: '#f5f5f5'
                      }}
                      placeholder="Your name"
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
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium mb-2" 
                    style={{ color: '#ccc' }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg text-base"
                    style={{ 
                      backgroundColor: '#0f0f12', 
                      border: '1px solid #2a2a2e',
                      color: '#f5f5f5'
                    }}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium mb-2" 
                    style={{ color: '#ccc' }}
                  >
                    Specific Needs / Use Cases
                  </label>
                  <textarea
                    name="specificNeeds"
                    value={formData.specificNeeds}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg text-base resize-none"
                    style={{ 
                      backgroundColor: '#0f0f12', 
                      border: '1px solid #2a2a2e',
                      color: '#f5f5f5'
                    }}
                    placeholder="Tell us about your specific needs and use cases..."
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      required
                      className="rounded"
                      style={{ accentColor: GOLD }}
                    />
                    <span style={{ color: '#888' }}>
                      I agree to be contacted by the CONTROLHQ team regarding my request
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                  style={{ backgroundColor: GOLD, color: '#000000' }}
                >
                  Submit Access Request
                  <ArrowRight className="w-5 h-5" />
                </button>

                {submitted && (
                  <motion.div
                    className="p-4 rounded-lg text-center"
                    style={{ backgroundColor: 'rgba(202, 138, 4, 0.1)', border: `1px solid ${GOLD}` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p style={{ color: GOLD }}>
                      Thank you! Your request has been received. Our team will contact you within 24 hours.
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
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
              What Happens Next
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#888' }}>
              After you submit your request, here's what to expect
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              {
                step: '1',
                title: 'Request Review',
                description: 'Our team reviews your submission and requirements'
              },
              {
                step: '2',
                title: 'Initial Consultation',
                description: 'We schedule a call to discuss your needs in detail'
              },
              {
                step: '3',
                title: 'Access & Onboarding',
                description: 'You receive credentials and begin implementation'
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center p-6 rounded-lg"
                style={{ backgroundColor: '#0f0f12', border: `1px solid ${GOLD}20` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold"
                  style={{ backgroundColor: 'rgba(202, 138, 4, 0.2)', color: GOLD }}
                >
                  {item.step}
                </div>
                <h3 
                  className="font-semibold mb-2"
                  style={{ fontFamily: 'Space Grotesk, system-ui, sans-serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm" style={{ color: '#888' }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </WebsiteLayout>
  );
}
