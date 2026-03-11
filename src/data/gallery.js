/**
 * RTF Gallery Data
 * Photo gallery for The Robo-Tech Forum, GCoEA Amravati
 * Using picsum.photos placeholders — replace with real images later
 */

export const galleryItems = [
  {
    id: 1,
    title: 'DD Robocon 2025 — Arena Day',
    category: 'COMPETITIONS',
    image: 'https://picsum.photos/seed/rtf-robocon1/600/400',
    date: 'March 2025',
  },
  {
    id: 2,
    title: 'R1 & R2 Bots Ready for Match',
    category: 'COMPETITIONS',
    image: 'https://picsum.photos/seed/rtf-robocon2/600/800',
    date: 'March 2025',
  },
  {
    id: 3,
    title: 'Team at IIT Delhi Campus',
    category: 'COMPETITIONS',
    image: 'https://picsum.photos/seed/rtf-iitd/600/400',
    date: 'March 2025',
  },
  {
    id: 4,
    title: 'Quadruped Robot — First Walk Test',
    category: 'LAB',
    image: 'https://picsum.photos/seed/rtf-quadruped/600/600',
    date: 'November 2024',
  },
  {
    id: 5,
    title: 'ANAV Rover Testing for IRoC-U',
    category: 'LAB',
    image: 'https://picsum.photos/seed/rtf-irocu1/600/400',
    date: 'September 2024',
  },
  {
    id: 6,
    title: 'VTOL Aircraft Maiden Flight',
    category: 'EVENTS',
    image: 'https://picsum.photos/seed/rtf-vtol/600/800',
    date: 'October 2024',
  },
  {
    id: 7,
    title: 'Arduino Workshop for Freshers',
    category: 'WORKSHOPS',
    image: 'https://picsum.photos/seed/rtf-workshop1/600/400',
    date: 'August 2024',
  },
  {
    id: 8,
    title: 'Soldering & PCB Design Session',
    category: 'WORKSHOPS',
    image: 'https://picsum.photos/seed/rtf-solder/600/600',
    date: 'September 2024',
  },
  {
    id: 9,
    title: 'RC Boat Race Day',
    category: 'EVENTS',
    image: 'https://picsum.photos/seed/rtf-rcboat/600/400',
    date: 'February 2024',
  },
  {
    id: 10,
    title: 'Swerve Drive Bot — CNC Parts',
    category: 'LAB',
    image: 'https://picsum.photos/seed/rtf-swerve/600/400',
    date: 'July 2024',
  },
  {
    id: 11,
    title: 'Techfest IIT Bombay — Team Photo',
    category: 'COMPETITIONS',
    image: 'https://picsum.photos/seed/rtf-techfest/600/800',
    date: 'December 2023',
  },
  {
    id: 12,
    title: 'Line Follower — 1st Place Trophy',
    category: 'COMPETITIONS',
    image: 'https://picsum.photos/seed/rtf-trophy/600/600',
    date: 'October 2023',
  },
  {
    id: 13,
    title: 'Embedded Systems Workshop',
    category: 'WORKSHOPS',
    image: 'https://picsum.photos/seed/rtf-embedded/600/400',
    date: 'July 2023',
  },
  {
    id: 14,
    title: 'GCoEA Annual Tech Exhibition',
    category: 'EVENTS',
    image: 'https://picsum.photos/seed/rtf-exhibition/600/400',
    date: 'March 2024',
  },
  {
    id: 15,
    title: 'First RC Plane — Maiden Flight',
    category: 'EVENTS',
    image: 'https://picsum.photos/seed/rtf-plane/600/800',
    date: 'November 2022',
  },
  {
    id: 16,
    title: 'Holonomic Base Assembly',
    category: 'LAB',
    image: 'https://picsum.photos/seed/rtf-holonomic/600/400',
    date: 'January 2023',
  },
  {
    id: 17,
    title: 'CAD Design Sprint — Robocon Bot',
    category: 'LAB',
    image: 'https://picsum.photos/seed/rtf-cad/600/600',
    date: 'December 2024',
  },
  {
    id: 18,
    title: 'Fluxus IIT Indore Participation',
    category: 'COMPETITIONS',
    image: 'https://picsum.photos/seed/rtf-fluxus/600/400',
    date: 'February 2024',
  },
  {
    id: 19,
    title: 'ROS & Python Training Session',
    category: 'WORKSHOPS',
    image: 'https://picsum.photos/seed/rtf-ros/600/400',
    date: 'June 2024',
  },
  {
    id: 20,
    title: 'RTF Team — Annual Group Photo',
    category: 'EVENTS',
    image: 'https://picsum.photos/seed/rtf-group/600/400',
    date: 'January 2025',
  },
];

/** All gallery categories */
export const galleryCategories = ['ALL', 'EVENTS', 'COMPETITIONS', 'WORKSHOPS', 'LAB'];

/** Filter gallery by category */
export const getGalleryByCategory = (category) =>
  category === 'ALL' ? galleryItems : galleryItems.filter((item) => item.category === category);
