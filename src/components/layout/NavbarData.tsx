// Define the navigation data structure
export interface NavItem {
  name: string;
  href: string;
  dropdown?: NavItem[];
}

export const navigation: NavItem[] = [

  {
    name: 'About',
    href: '/about',
    dropdown: [
      { name: 'Our Centre', href: '/about/our-centre' },
      { name: 'Vedanta', href: '/about/vedanta' },
      { name: 'The Holy Trinity', href: '/about/holy-trinity' },

    ]
  },
  {
    name: 'Services',
    href: '/services',
    dropdown: [
      { name: 'Satsangs', href: '/services/satsangs' },
      { name: 'Hinduism for Children', href: '/services/hinduism-for-children' },
      { name: 'Upcoming Events', href: '/services/special-functions' },

      { name: 'Seva/Outreach', href: '/services/seva' },
    ]
  },

  { name: 'New Ashram Project', href: '/new-ashram-project' },
  { name: 'Chant', href: '/chant' },
  {
    name: 'Hinduism',
    href: '/learn'
  },

  { name: 'Gallery', href: '/gallery' },
  { name: 'Donate', href: '/donate' },
  { name: 'Contact', href: '/contact' },
];
