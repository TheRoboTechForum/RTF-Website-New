import { useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition, fadeUp, staggerContainer } from '../lib/animations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionHeader from '../components/ui/SectionHeader';
import HoloCard from '../components/ui/HoloCard';
import NeoButton from '../components/ui/NeoButton';
import { Mail, MapPin, Clock, Send } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

import { contactInfo, socials } from '../data/stats';

const contactCards = [
  {
    icon: Mail,
    title: 'Email Us',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: contactInfo.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address)}`,
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: contactInfo.hours,
    href: null,
  },
];

export default function Contact() {
  const [cardRef, cardInView] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, wire to a backend / Formspree / EmailJS
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 pb-24 px-6"
    >
      <SectionHeader
        label="// GET IN TOUCH"
        title="Contact Us"
        subtitle="Have a question, sponsorship inquiry, or just want to say hello? We'd love to hear from you."
      />

      {/* Contact Info Cards */}
      <motion.div
        ref={cardRef}
        variants={staggerContainer}
        initial="hidden"
        animate={cardInView ? 'visible' : 'hidden'}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        {contactCards.map((card) => (
          <motion.div key={card.title} variants={fadeUp}>
            <HoloCard glow="cyan" className="p-6 text-center h-full">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                <card.icon size={20} className="text-cyan-400" />
              </div>
              <h3 className="font-display font-semibold text-text-primary text-sm mb-2">
                {card.title}
              </h3>
              {card.href ? (
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-cyan-400 transition-colors leading-relaxed"
                >
                  {card.value}
                </a>
              ) : (
                <p className="text-sm text-text-secondary leading-relaxed">{card.value}</p>
              )}
            </HoloCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Form + Socials */}
      <div className="max-w-3xl mx-auto">
        <HoloCard glow="cyan" className="p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <Send size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-h3 text-text-primary mb-2">Message Sent!</h3>
              <p className="text-sm text-text-secondary">
                We'll get back to you within 24–48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="text-label text-text-muted block mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-elevated border border-border rounded-button text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-label text-text-muted block mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-elevated border border-border rounded-button text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="text-label text-text-muted block mb-2">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Sponsorship inquiry / General question / Other"
                  className="w-full px-4 py-3 bg-elevated border border-border rounded-button text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-label text-text-muted block mb-2">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 bg-elevated border border-border rounded-button text-sm text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all resize-none"
                />
              </div>

              <NeoButton type="submit" arrow className="w-full sm:w-auto justify-center">
                SEND MESSAGE
              </NeoButton>
            </form>
          )}
        </HoloCard>

        {/* Social Links */}
        <div className="mt-12 text-center">
          <p className="text-label text-text-muted mb-4">OR FIND US ON</p>
          <div className="flex items-center justify-center gap-4">
            {socials.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
              >
                <FaFacebookF />
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
              >
                <FaInstagram />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
              >
                <FaLinkedinIn />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.main>
  );
}
