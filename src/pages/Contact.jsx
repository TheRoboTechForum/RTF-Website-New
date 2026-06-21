import { motion } from 'framer-motion';
import { pageTransition, fadeUp } from '../lib/animations';
import SectionHeader from '../components/ui/SectionHeader';
import { Mail, MapPin, Clock } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import TerminalContact from '../components/sections/TerminalContact';

import { contactInfo, socials } from '../data/stats';

export default function Contact() {
  return (
    <motion.main
      id="main-content"
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-28 pb-24 px-6 relative"
    >
      <SectionHeader
        title="Contact Us"
        subtitle="Have a question, sponsorship inquiry, or just want to say hello? We'd love to hear from you."
      />

      <div className="max-w-6xl mx-auto mt-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 bg-elevated/50 border border-border rounded-2xl p-4 lg:p-6 backdrop-blur-md">
          
          {/* Left Sidebar - Contact Info */}
          <motion.div 
            variants={fadeUp}
            className="w-full lg:w-1/3 rounded-xl p-8 text-white relative overflow-hidden flex flex-col justify-between border border-border/50"
          >


            <div>
              <h3 className="text-3xl font-display font-semibold mb-10 relative z-10">
                Get in touch
              </h3>
              
              <div className="space-y-8 relative z-10">
                {/* Address */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={18} />
                    </div>
                    <h4 className="font-medium text-lg">Visit us</h4>
                  </div>
                  <p className="text-text-secondary text-sm ml-12 leading-relaxed">
                    Come say hello at our workspace.<br />
                    {contactInfo.address}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-white" size={18} />
                    </div>
                    <h4 className="font-medium text-lg">Chat to us</h4>
                  </div>
                  <p className="text-text-secondary text-sm ml-12 mb-1">Our friendly team is here to help.</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-white text-sm ml-12 hover:text-cyan-300 transition-colors">
                    {contactInfo.email}
                  </a>
                </div>

                {/* Hours */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 flex items-center justify-center flex-shrink-0">
                      <Clock className="text-white" size={18} />
                    </div>
                    <h4 className="font-medium text-lg">Working hours</h4>
                  </div>
                  <p className="text-text-secondary text-sm ml-12 mb-1">{contactInfo.hours}</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-16 lg:mt-0 relative z-10 pt-8">
              <h4 className="font-medium text-lg mb-4">Social media</h4>
              <div className="flex gap-4">
                {socials.facebook && (
                  <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-border/50 flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300 text-white">
                    <FaFacebookF size={16} />
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-border/50 flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300 text-white">
                    <FaLinkedinIn size={16} />
                  </a>
                )}
                {socials.instagram && (
                  <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-border/50 flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300 text-white">
                    <FaInstagram size={16} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Area - Terminal Contact Form */}
          <motion.div 
            variants={fadeUp}
            className="w-full lg:w-2/3 p-2 lg:p-4"
          >
            <TerminalContact />
          </motion.div>

        </div>
      </div>
    </motion.main>
  );
}