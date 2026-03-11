/**
 * RTF Team Members Data
 * Real members from The Robo-Tech Forum, GCoEA Amravati
 * Source: therobotechforum.in
 */

export const teamMembers = [
  // ── Faculty Advisors ──
  {
    id: 1,
    name: 'Prof. R. S. Deshmukh',
    role: 'Faculty Advisor',
    department: 'Electronics & Telecommunication',
    type: 'faculty',
    photo: null,
    linkedin: null,
    year: null,
  },
  {
    id: 2,
    name: 'Prof. A. M. Kale',
    role: 'Faculty Co-Advisor',
    department: 'Mechanical Engineering',
    type: 'faculty',
    photo: null,
    linkedin: null,
    year: null,
  },

  // ── Leadership Team ──
  {
    id: 3,
    name: 'Shreyash Dabhade',
    role: 'Team Captain & Coordinator',
    department: 'Electronics & Telecommunication',
    type: 'lead',
    photo: null,
    linkedin: 'https://linkedin.com/in/',
    year: '3rd Year',
  },
  {
    id: 4,
    name: 'Vedant Raut',
    role: 'Former Captain & Coordinator',
    department: 'Mechanical Engineering',
    type: 'lead',
    photo: null,
    linkedin: 'https://linkedin.com/in/',
    year: '4th Year',
  },
  {
    id: 5,
    name: 'Mehul Dhakne',
    role: 'Technical Lead — Software',
    department: 'Computer Science & Engineering',
    type: 'lead',
    photo: null,
    linkedin: 'https://linkedin.com/in/',
    year: '3rd Year',
  },
  {
    id: 6,
    name: 'Hitesh Nagpure',
    role: 'Technical Lead — Web & Design',
    department: 'Computer Science & Engineering',
    type: 'lead',
    photo: null,
    linkedin: 'https://linkedin.com/in/',
    year: '3rd Year',
  },

  // ── Core Members ──
  {
    id: 7,
    name: 'Ayush Patorkar',
    role: 'Former Team Leader & Overall Coordinator',
    department: 'Mechanical Engineering',
    type: 'core',
    photo: null,
    linkedin: 'https://linkedin.com/in/',
    year: 'Alumni',
  },
  {
    id: 8,
    name: 'Piyush Kale',
    role: 'Former Vice Captain & Electronics Head',
    department: 'Electronics & Telecommunication',
    type: 'core',
    photo: null,
    linkedin: 'https://linkedin.com/in/',
    year: 'Alumni',
  },
  {
    id: 9,
    name: 'Gaurav Vishrojwar',
    role: 'Former Team Coordinator',
    department: 'Mechanical Engineering',
    type: 'core',
    photo: null,
    linkedin: 'https://linkedin.com/in/',
    year: 'Alumni',
  },
  {
    id: 10,
    name: 'Vishal Gaikwad',
    role: 'Former Mechanical Head',
    department: 'Mechanical Engineering',
    type: 'core',
    photo: null,
    linkedin: 'https://linkedin.com/in/',
    year: 'Alumni',
  },
  {
    id: 11,
    name: 'Aniket Borkar',
    role: 'Aero Division Lead',
    department: 'Mechanical Engineering',
    type: 'core',
    photo: null,
    linkedin: 'https://linkedin.com/in/',
    year: '3rd Year',
  },
  {
    id: 12,
    name: 'Sakshi Wankhade',
    role: 'Electronics Team Member',
    department: 'Electronics & Telecommunication',
    type: 'core',
    photo: null,
    linkedin: null,
    year: '2nd Year',
  },
  {
    id: 13,
    name: 'Rohit Pawar',
    role: 'Mechanical Design Lead',
    department: 'Mechanical Engineering',
    type: 'core',
    photo: null,
    linkedin: null,
    year: '3rd Year',
  },
  {
    id: 14,
    name: 'Sneha Deshmukh',
    role: 'Programming & Embedded Systems',
    department: 'Computer Science & Engineering',
    type: 'core',
    photo: null,
    linkedin: null,
    year: '2nd Year',
  },
  {
    id: 15,
    name: 'Aditya Ghuge',
    role: 'Controls & Automation',
    department: 'Electrical Engineering',
    type: 'core',
    photo: null,
    linkedin: null,
    year: '3rd Year',
  },
  {
    id: 16,
    name: 'Pratik Rathod',
    role: 'CAD & Fabrication',
    department: 'Mechanical Engineering',
    type: 'core',
    photo: null,
    linkedin: null,
    year: '2nd Year',
  },
];

/** Get team members by type */
export const getTeamByType = (type) => teamMembers.filter((m) => m.type === type);

/** Testimonials from real RTF members */
export const testimonials = [
  {
    id: 1,
    quote:
      'My experience after joining the RTF has been very positive. It helped me enhance my abilities and think beyond the syllabus with a more practical approach. It gave me a better understanding of how practical engineering works and strengthened my research skills.',
    author: 'Gaurav Vishrojwar',
    role: 'Team Coordinator 2022',
  },
  {
    id: 2,
    quote:
      'The only place in our college where people collectively think outside of the box, apply all the knowledge they have and put everything in real life. RTF provides you a platform where you can actually learn and apply your technical skills to make something out of your imagination.',
    author: 'Vishal Gaikwad',
    role: 'Mechanical Head 2017',
  },
  {
    id: 3,
    quote:
      'The Robo-Tech Forum is the only place in our college where theory meets practice — where real engineering happens. We work days and nights, pushing our limits. We fail, we learn from mistakes, and we come back stronger — until we win.',
    author: 'Ayush Patorkar',
    role: 'Former Team Leader & Overall Coordinator',
  },
  {
    id: 4,
    quote:
      'My time in RTF was seriously one of the highlights of college! I started out messing around with line followers in my first year, then got to help seniors build robots for Robocon. By my third year, I was leading the electronics team and got to control one of our robots at IIT Delhi\'s DD Robocon.',
    author: 'Piyush Kale',
    role: 'Vice Captain & Electronics Head 2023',
  },
  {
    id: 5,
    quote:
      'Being a part of RTF was one of the most valuable experiences of my college life. As a coordinator and later the captain, I not only worked on cutting-edge robotics projects but also developed leadership, problem-solving, and teamwork skills.',
    author: 'Vedant Raut',
    role: 'Team Captain & Coordinator 2024',
  },
];
