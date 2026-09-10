import { LinkTreeConfig } from '@/types/config';

export const VCET_NSDC_LOGO = '/Logo.png';

export const DEFAULT_AVATARS = [
  VCET_NSDC_LOGO,
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
];

export const DEFAULT_CONFIG: LinkTreeConfig = {
  version: 2,
  updatedAt: new Date().toISOString(),
  profile: {
    name: 'VCET NSDC',
    handle: '@vcet.nsdc',
    bio: '',
    avatarUrl: VCET_NSDC_LOGO,
    badgeText: '"Data beats emotions."',
    showBadge: true,
    location: "Vidyavardhini's College of Engineering and Technology, Vasai Road (W)",
  },
  socials: [
    {
      platform: 'email',
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=nsdc@vcet.edu.in',
      enabled: true,
      label: 'Email',
    },
    {
      platform: 'linkedin',
      url: 'https://www.linkedin.com/in/vcet-nsdc/',
      enabled: true,
      label: 'LinkedIn',
    },
    {
      platform: 'youtube',
      url: 'https://www.youtube.com/channel/UCjBw5a7WU00GwkxaTjF9jqg',
      enabled: true,
      label: 'YouTube',
    },
    {
      platform: 'instagram',
      url: 'https://www.instagram.com/vcet.nsdc/',
      enabled: true,
      label: 'Instagram',
    },
    {
      platform: 'website',
      url: 'https://vcet-nsdc.vercel.app/',
      enabled: true,
      label: 'Website',
    },
  ],
  links: [
    {
      id: 'vcet-link-1',
      title: 'Official VCET NSDC Portal',
      url: 'https://vcet-nsdc.vercel.app/',
      description: 'Explore our chapter initiatives, mission, and department announcements',
      icon: 'Globe',
      badge: 'Official',
      isFeatured: true,
      isActive: true,
      clicks: 340,
    },
    {
      id: 'vcet-link-2',
      title: 'Flagship Events & Hackathons',
      url: 'https://vcet-nsdc.vercel.app/events',
      description: 'Byteverse Hackathon, hands-on ML workshops, and technical competitions',
      icon: 'Rocket',
      badge: 'Events',
      isFeatured: true,
      isActive: true,
      clicks: 215,
    },
    {
      id: 'vcet-link-3',
      title: 'Meet Our Core Team & Mentors',
      url: 'https://vcet-nsdc.vercel.app/team',
      description: 'Student leaders, developers, and faculty coordinators behind NSDC VCET',
      icon: 'Briefcase',
      isActive: true,
      clicks: 184,
    },
    {
      id: 'vcet-link-5',
      title: 'Partner & Collaborate With Us',
      url: 'https://vcet-nsdc.vercel.app/contact',
      description: 'Get in touch for sponsorships, speaker invitations, and community partnerships',
      icon: 'Mail',
      badge: 'Contact',
      isActive: true,
      clicks: 98,
    },
    {
      id: 'vcet-link-6',
      title: 'Campus Location on Google Maps',
      url: "https://maps.google.com/?q=Vidyavardhini's+College+of+Engineering+and+Technology+Vasai",
      description: 'K.T. Marg, Vartak College Campus, Vasai Road (W), Maharashtra 401202',
      icon: 'Compass',
      isActive: true,
      clicks: 76,
    },
  ],
  theme: {
    id: 'retro-synthwave',
    name: 'Cosmic AI Violet',
    bgStyle: 'aurora-mesh',
    cardStyle: 'glass',
    buttonShape: 'rounded-2xl',
    fontFamily: 'sans',
    accentColor: '#a855f7',
    glowEnabled: true,
    showClickCounts: false,
  },
};
