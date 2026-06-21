/**
 * RTF Club Statistics
 * Key metrics for The The Robo-Tech Forum, GCoEA Amravati
 *
 * How to update this file:
 * 1. Change only the values after the colon.
 * 2. Numbers do not need quotes, for example members: 120.
 * 3. Text links must stay inside quotes.
 * 4. If a link or logo is not ready, write null without quotes.
 */

export const stats = {
  members: 60,
  projects: 10,
  competitions: 15,
  founded: 2014,
  alumniCount: 200,

};

/**
 * Competitions RTF participates in.
 *
 * How to add a competition:
 * Copy one full competition block, paste it below, give it a new id, and update
 * name, organizer, description, and year.
 */
export const competitions = [
  {
    id: 1,
    name: 'E-Yantra Robotics Challenge',
    organizer: 'IIT Bombay',
    description:
      'A prestigious national robotics competition organized by IIT Bombay under the Ministry of Education, challenging students to solve real-world problems using embedded systems and robotics.',
    year: '2025-26',
  },
  {
    id: 2,
    name: 'DD Robocon (ABU Robocon India)',
    organizer: 'Doordarshan & IIT Delhi',
    description:
      'The Indian edition of ABU Robocon — a national-level robotics competition where teams design and build robots to complete complex tasks based on a unique theme, aiming for international qualification.',
    year: '2025',
  },
  {
    id: 3,
    name: 'Techfest IIT Bombay',
    organizer: 'IIT Bombay',
    description:
      'Asia\'s largest science and technology festival, hosting competitions, workshops, exhibitions, and lectures — a premier platform for showcasing technical talent and innovation.',
    year: '2024',
  },
  {
    id: 4,
    name: 'Fluxus — IIT Indore',
    organizer: 'IIT Indore',
    description:
      'The annual techno-cultural festival of IIT Indore, offering technical challenges, cultural performances, and engaging events attracting participants from across the country.',
    year: '2024',
  },
  {
    id: 5,
    name: 'IRoC-U — ISRO Robotics Challenge',
    organizer: 'ISRO / U R Rao Satellite Centre',
    description:
      'ISRO solicits innovative ideas and designs of robotic rovers for future missions, providing development opportunities in space robotics and leveraging creative thinking among Indian youth.',
    year: '2024',
  },
  {
    id: 6,
    name: 'AXIS — VNIT Nagpur',
    organizer: 'VNIT Nagpur',
    description:
      'The annual technical festival of VNIT Nagpur and one of Central India\'s largest tech fests, featuring events, workshops, exhibitions, and guest talks attracting over 30,000 attendees.',
    year: '2024',
  },
];

/**
 * Current sponsors
 *
 * For sponsor logos, paste a public image link in logo, for example:
 * logo: 'https://example.com/sponsor-logo.png'
 * Keep logo: null if the logo is not ready.
 */
export const sponsors = [
  {
    id: 1,
    name: 'MathWorks',
    logo: null,
    // tier: 'gold',
    website: 'https://mathworks.com',
  },
   {
    id: 2,
    name: 'idle Robotics',
    logo: 'assets/sponsors/idlelogo.png',
    // tier: 'gold',
    website: 'https://idlerobotics.com/',
  },
   {
    id: 3,
    name: 'Solidworks',
    logo: 'https://www.3ds.com/assets/3ds-navigation/3DS_corporate-logo_solidworks.svg',
    // tier: 'gold',
    website: 'https://solidworks.com/',
  },
];

/**
 * Social media links
 *
 * Paste the full public profile link inside quotes. If a profile does not
 * exist yet, use null without quotes.
 */
export const socials = {
  facebook: 'https://www.facebook.com/robotechforum',
  instagram: 'https://www.instagram.com/the_robo_tech_forum_gcoea/',
  linkedin: 'https://www.linkedin.com/company/the-robo-tech-forum/',
  github: null,
  website: 'https://therobotechforum.in',
};

/**
 * Contact info
 *
 * Update the text inside quotes. Keep email, address, college, and hours names
 * unchanged because the website reads these exact names.
 */
export const contactInfo = {
  email: 'robotechforum@gcoea.ac.in',
  address: 'Government College of Engineering, Amravati, Maharashtra 444604, India',
  college: 'GCoEA — Government College of Engineering, Amravati',
  hours: 'Mon–Sat, 10:00 AM – 6:00 PM',
};
