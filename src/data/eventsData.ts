export interface Event {
  id: string;
  date: string;
  dateObj: {
    day: string;
    month: string;
    year: number;
  };
  time: string;
  title: string;
  description: string;
  location?: string;
  link?: string;
  status: 'upcoming' | 'completed';
  registrationUrl?: string;
  pdfUrl?: string;
}

export const EVENTS: Event[] = [
  {
    id: 'education-seminar-2026',
    date: 'Sunday, 16th August 2026',
    dateObj: {
      day: '16th',
      month: 'August',
      year: 2026
    },
    time: '10:00 AM - 12:30 PM',
    title: 'Seminar: The Importance of Spiritual Education for Children',
    description: 'A comprehensive seminar featuring papers on religious education, parental roles, teaching methods, and age-appropriate resources for spiritual education. Keynote speakers include Mrs Ragini Haribhai, Mr M K Angajan, Revered Swami Viprananda, and Revered Pravrajika Ishtaprana Mataji.',
    location: 'Vodaworld at Vodacom Office Park, Vodacom Boulevard, Midrand',
    status: 'upcoming',
    registrationUrl: 'https://forms.gle/opGyZGV8Ju8nC9EM7',
    pdfUrl: '/pics/Education Seminar August 2026.pdf'
  }
];
