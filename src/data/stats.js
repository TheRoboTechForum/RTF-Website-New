/**
 * RTF Club Statistics
 * Key metrics for The Robo-Tech Forum, GCoEA Amravati
 */

export const stats = {
  members: 120,
  projects: 50,
  competitions: 15,
  founded: 2017,
};

/** Competitions RTF participates in — scraped from therobotechforum.in */
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

/** Current sponsors */
export const sponsors = [
  {
    id: 1,
    name: 'MathWorks',
    logo: null,
    tier: 'gold',
    website: 'https://mathworks.com',
  },
];

/** Social media links */
export const socials = {
  facebook: 'https://www.facebook.com/robotechforum',
  instagram: 'https://www.instagram.com/the_robo_tech_forum_gcoea/',
  linkedin: 'https://www.linkedin.com/company/the-robo-tech-forum/',
  github: null,
  website: 'https://therobotechforum.in',
};

/** Contact info */
export const contactInfo = {
  email: 'robotechforum@gcoea.ac.in',
  address: 'Government College of Engineering, Amravati, Maharashtra 444604, India',
  college: 'GCoEA — Government College of Engineering, Amravati',
  hours: 'Mon–Sat, 10:00 AM – 6:00 PM',
};
