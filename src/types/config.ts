export type SocialPlatformType =
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'instagram'
  | 'youtube'
  | 'discord'
  | 'email'
  | 'spotify'
  | 'twitch'
  | 'telegram'
  | 'threads'
  | 'website';

export interface SocialLink {
  platform: SocialPlatformType;
  url: string;
  enabled: boolean;
  label?: string;
}

export interface LinkItem {
  id: string;
  title: string;
  url: string;
  description?: string;
  icon?: string; // Lucide icon name or emoji
  badge?: string; // e.g., 'Featured', 'New', 'Hot', 'Code'
  isFeatured?: boolean;
  isActive: boolean;
  clicks: number;
}

export type ThemePresetId =
  | 'midnight-glass'
  | 'cyberpunk-neon'
  | 'aurora-borealis'
  | 'sunset-horizon'
  | 'minimal-luxe'
  | 'retro-synthwave'
  | 'emerald-dark'
  | 'lavender-dream';

export type CardStyle = 'glass' | 'flat' | 'outline' | 'glow' | 'neomorph';
export type ButtonShape = 'rounded-xl' | 'rounded-2xl' | 'rounded-full' | 'rounded-md';
export type BgStyle = 'aurora-mesh' | 'cosmic-grid' | 'star-particles' | 'gradient-glow' | 'minimal-solid';
export type FontChoice = 'sans' | 'mono' | 'serif';

export interface ThemeConfig {
  id: ThemePresetId;
  name: string;
  bgStyle: BgStyle;
  cardStyle: CardStyle;
  buttonShape: ButtonShape;
  fontFamily: FontChoice;
  accentColor: string;
  glowEnabled: boolean;
  showClickCounts: boolean;
}

export interface ProfileConfig {
  name: string;
  handle: string;
  bio: string;
  avatarUrl: string;
  badgeText: string;
  showBadge: boolean;
  location?: string;
}

export interface LinkTreeConfig {
  version: number;
  updatedAt: string;
  profile: ProfileConfig;
  socials: SocialLink[];
  links: LinkItem[];
  theme: ThemeConfig;
}
