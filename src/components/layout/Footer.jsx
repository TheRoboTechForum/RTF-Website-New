import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, ArrowRight } from 'lucide-react';
import { socials, contactInfo } from '../../data/stats';

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/team', label: 'Team' },
];

const resourceLinks = [
  { path: '/timeline', label: 'Timeline' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
  { path: '/login', label: 'Member Portal' },
];

export default function Footer() {
  return (
    <footer className="relative bg-surface border-t border-cyan-500/20">
      {/* Cyan top-border glow line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                <span className="font-display font-bold text-cyan-400 text-xs">RTF</span>
              </div>
              <span className="font-display font-semibold text-text-primary">
                Robo-Tech Forum
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-xs">
              Engineering excellence. Built by students. Recognized by industry. The premier
              robotics club at GCoEA, Amravati.
            </p>
            <div className="flex items-center gap-3">
              {socials.facebook && (
                <a
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="RTF on Facebook"
                  className="w-9 h-9 rounded-lg bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
                >
                  <Facebook size={16} />
                </a>
              )}
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="RTF on Instagram"
                  className="w-9 h-9 rounded-lg bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
                >
                  <Instagram size={16} />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="RTF on LinkedIn"
                  className="w-9 h-9 rounded-lg bg-elevated border border-border flex items-center justify-center text-text-muted hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
                >
                  <Linkedin size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-label text-text-muted mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-text-secondary hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Resources */}
          <div>
            <h4 className="text-label text-text-muted mb-4">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-text-secondary hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact + Sponsor CTA */}
          <div>
            <h4 className="text-label text-text-muted mb-4">Get In Touch</h4>
            <ul className="space-y-3 mb-6">
              <li className="text-sm text-text-secondary">{contactInfo.email}</li>
              <li className="text-sm text-text-secondary leading-relaxed">
                {contactInfo.address}
              </li>
              <li className="text-sm text-text-secondary">{contactInfo.hours}</li>
            </ul>
            <Link
              to="/sponsors"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono font-semibold tracking-wider text-deep bg-amber-500 rounded-button hover:bg-amber-400 transition-colors duration-200 group"
            >
              BECOME A SPONSOR
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted text-center sm:text-left">
            © {new Date().getFullYear()} The Robo-Tech Forum, GCoEA Amravati. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            We Learn. We Create. We Teach.
          </p>
        </div>
      </div>
    </footer>
  );
}
