import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { ArrowUpRight, Mail, MapPin, Clock } from 'lucide-react';
import { contactInfo, socials, stats } from "../../data/stats";

const exploreLinks = [
  { path: "/projects", label: "Projects" },
  { path: "/gallery", label: "Gallery" },
  { path: "/timeline", label: "Timeline" },
  { path: "/achievement", label: "Achievements" },
];

const communityLinks = [
  { path: "/about", label: "About" },
  { path: "/team", label: "Team" },
  { path: "/sponsors", label: "Sponsors" },
  { path: "/contact", label: "Contact" },
];

const memberLinks = [
  { path: "/login", label: "Member Portal" },
  { path: "/contact", label: "Join RTF" },
  { path: "/sponsors", label: "Partner With Us" },
];

const socialLinks = [
  { href: socials.facebook, label: "Facebook", icon: FaFacebookF },
  { href: socials.instagram, label: "Instagram", icon: FaInstagram },
  { href: socials.linkedin, label: "LinkedIn", icon: FaLinkedinIn },
];

const contactItems = [
  { icon: Mail, label: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: MapPin, label: "GCoEA, Amravati", href: "/contact" },
  { icon: Clock, label: contactInfo.hours, href: "/contact" },
];

export default function Footer() {
  const linkGroups = [
    { title: "Explore", links: exploreLinks },
    { title: "Community", links: communityLinks },
    { title: "Members", links: memberLinks },
  ];

  return (
    <footer className="relative bg-deep px-4 pb-8 pt-20 sm:px-8 lg:pt-28 overflow-hidden z-10">
      <div className="absolute inset-0 bg-grid opacity-70 pointer-events-none" />
      <div className="absolute left-1/2 top-8 h-48 w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-none select-none z-0 opacity-[0.035]">
        <span className="font-display font-black text-[28vw] leading-[0.72] text-white whitespace-nowrap">
          RTF
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="bg-surface/80 backdrop-blur-xl border border-cyan-500/20 rounded-card p-6 sm:p-10 lg:p-12 shadow-card">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.5fr] lg:gap-16">
            <div>
              <Link to="/" className="group inline-flex items-center gap-3 mb-6" aria-label="Robo-Tech Forum home">
                <div className="w-11 h-11 rounded-button bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center transition-all duration-300 group-hover:bg-cyan-500/25 group-hover:shadow-glow-cyan">
                  <span className="font-display font-bold text-cyan-300 text-sm">
                    RTF
                  </span>
                </div>
                <div>
                  <span className="block font-display font-semibold text-text-primary text-xl leading-tight">
                    Robo-Tech Forum
                  </span>
                  <span className="block text-xs text-text-muted">
                    Government College of Engineering, Amravati
                  </span>
                </div>
              </Link>

              <p className="max-w-md text-text-secondary text-sm leading-relaxed mb-8">
                A student-driven robotics community building competition-ready machines,
                project culture, and hands-on engineering confidence.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {socialLinks.map((socialLink) => {
                  const SocialIcon = socialLink.icon;

                  return socialLink.href && (
                    <a
                      key={socialLink.label}
                      href={socialLink.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={socialLink.label}
                      className="h-10 w-10 rounded-button border border-border/80 bg-deep/40 text-text-secondary flex items-center justify-center transition-all duration-200 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-300"
                    >
                      <SocialIcon size={17} />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="space-y-9">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-10">
                {linkGroups.map((group) => (
                  <nav key={group.title} aria-label={`${group.title} links`}>
                    <h4 className="text-label text-cyan-300/90 mb-5">{group.title}</h4>
                    <ul className="space-y-3">
                      {group.links.map((link) => (
                        <li key={`${group.title}-${link.path}-${link.label}`}>
                          <Link
                            to={link.path}
                            className="group inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-cyan-300"
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight size={13} className="opacity-0 -translate-x-1 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {contactItems.map((item) => {
                  const ContactIcon = item.icon;
                  const isExternal = item.href.startsWith("mailto:");
                  const content = (
                    <>
                      <ContactIcon size={17} className="mt-0.5 flex-shrink-0 text-cyan-300" />
                      <span className="min-w-0 break-words text-xs leading-relaxed text-text-secondary">{item.label}</span>
                    </>
                  );

                  return isExternal ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex min-h-[64px] min-w-0 items-start gap-3 rounded-card border border-border/70 bg-deep/35 px-4 py-3 transition-colors hover:border-cyan-500/40"
                    >
                      {content}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="flex min-h-[64px] min-w-0 items-start gap-3 rounded-card border border-border/70 bg-deep/35 px-4 py-3 transition-colors hover:border-cyan-500/40"
                    >
                      {content}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="my-8 h-px w-full bg-border/60" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs text-text-muted">
                © {new Date().getFullYear()} The Robo-Tech Forum. All rights reserved.
              </p>
              <p className="mt-1 text-xs text-text-muted">
                Founded in {stats.founded}. Built by students, for builders.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-button border border-cyan-500/30 px-4 py-2 text-sm font-medium text-cyan-300 transition-all hover:border-cyan-400/60 hover:bg-cyan-500/10"
              >
                Contact Team
                <ArrowUpRight size={15} />
              </Link>
              <Link
                to="/sponsors"
                className="inline-flex items-center justify-center gap-2 rounded-button bg-cyan-500 px-4 py-2 text-sm font-semibold text-deep shadow-glow-cyan transition-all hover:bg-cyan-400"
              >
                Sponsor RTF
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
