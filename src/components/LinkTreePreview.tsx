'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useConfig } from '@/context/ConfigContext';
import { IconRenderer, SocialIconRenderer } from './common/IconRenderer';
import { QrCodeModal } from './common/QrCodeModal';
import {
  Share2,
  ExternalLink,
  MapPin,
} from 'lucide-react';

export function LinkTreePreview() {
  const { config, recordClick } = useConfig();
  const [isQrOpen, setIsQrOpen] = useState(false);

  const activeLinks = config.links.filter((l) => l.isActive);
  const activeSocials = config.socials.filter((s) => s.enabled && s.url);

  // Social badge styling matching vcet-nsdc.vercel.app with vibrant brand glows
  const getSocialBrandStyle = (platform: string) => {
    switch (platform) {
      case 'email':
        return 'border-red-500/40 text-red-400 hover:bg-red-500/15 hover:shadow-[0_0_22px_rgba(239,68,68,0.6)] hover:border-red-500/90';
      case 'linkedin':
        return 'border-blue-500/40 text-blue-400 hover:bg-blue-500/15 hover:shadow-[0_0_22px_rgba(59,130,246,0.6)] hover:border-blue-500/90';
      case 'youtube':
        return 'border-red-500/40 text-red-400 hover:bg-red-500/15 hover:shadow-[0_0_22px_rgba(239,68,68,0.6)] hover:border-red-500/90';
      case 'instagram':
        return 'border-pink-500/40 text-pink-400 hover:bg-pink-500/15 hover:shadow-[0_0_22px_rgba(236,72,153,0.6)] hover:border-pink-500/90';
      case 'website':
      default:
        return 'border-purple-500/40 text-purple-300 hover:bg-purple-500/15 hover:shadow-[0_0_22px_rgba(168,85,247,0.6)] hover:border-purple-500/90';
    }
  };

  const getSocialHref = (social: { platform: string; url: string }) => {
    if (social.platform === 'email') {
      const email = social.url.replace(/^mailto:/, '');
      if (email.startsWith('http')) return email;
      return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    }
    return social.url;
  };

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-between px-4 py-8 sm:py-12 selection:bg-purple-500 selection:text-white font-sans transition-colors duration-500"
      style={{
        backgroundColor: '#0b0b14',
        backgroundImage:
          'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(168,85,247,0.22), rgba(59,130,246,0.12), #0b0b14 85%)',
        color: '#f8fafc',
      }}
    >
      {/* Background Animated Ambient Mesh Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[650px] h-[520px] rounded-full bg-purple-600/15 blur-[130px] animate-pulse duration-[7000ms]" />
        <div className="absolute top-[35%] right-[-10%] w-[420px] h-[420px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[450px] h-[450px] rounded-full bg-violet-600/10 blur-[120px]" />
        {/* Subtle grid pattern matching VCET NSDC web background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Top Header with Share Button */}
      <header className="relative z-10 w-full max-w-md flex items-center justify-end mb-6">
        {/* Share Modal Trigger Button */}
        <button
          onClick={() => setIsQrOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-purple-950/40 backdrop-blur-md border border-purple-500/30 hover:border-purple-500/70 text-xs font-medium transition-all active:scale-95 text-white shadow-lg hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          title="Share & QR Code"
        >
          <Share2 size={13} className="text-purple-400" />
          <span>Share</span>
        </button>
      </header>

      {/* Main Profile & Links Container */}
      <main className="relative z-10 w-full max-w-md flex-1 flex flex-col items-center">
        {/* Pic 1 VCET NSDC Logo (Enlarged & Proportional) */}
        <div className="flex items-center justify-center gap-4 sm:gap-5 mb-4 select-none transition-transform duration-300 hover:scale-[1.02]">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
            <Image
              src="/Logo.png"
              alt="VCET NSDC Logo"
              width={112}
              height={112}
              priority
              className="w-full h-full object-contain drop-shadow-[0_0_24px_rgba(168,85,247,0.45)]"
            />
          </div>
          <div className="flex flex-col justify-center text-left leading-none text-white">
            <span
              className="text-xl sm:text-2xl font-normal tracking-wide text-white/95"
              style={{ fontFamily: 'Georgia, Cambria, serif' }}
            >
              VCET
            </span>
            <span
              className="text-5xl sm:text-6xl font-bold tracking-tight text-white -mt-1"
              style={{ fontFamily: 'Georgia, Cambria, serif' }}
            >
              NSDC
            </span>
          </div>
        </div>

        {/* Subtitle Quote */}
        <p className="text-sm sm:text-base text-purple-300/90 italic text-center tracking-wide mb-6">
          &ldquo;Data beats emotions.&rdquo;
        </p>

        {/* Enlarged Circle Social Icons Bar */}
        {activeSocials.length > 0 && (
          <div className="flex items-center justify-center gap-4 sm:gap-5 flex-wrap mb-9">
            {activeSocials.map((social) => (
              <a
                key={social.platform}
                href={getSocialHref(social)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 sm:w-15 sm:h-15 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border transition-all duration-300 hover:scale-115 shadow-lg active:scale-95 ${getSocialBrandStyle(
                  social.platform
                )}`}
                title={social.label || social.platform}
                aria-label={social.label || social.platform}
              >
                <SocialIconRenderer platform={social.platform} size={25} />
              </a>
            ))}
          </div>
        )}

        {/* Links Stack (Brought Back to Original Balanced Size) */}
        <div className="w-full space-y-3.5 mb-10">
          {activeLinks.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white/5 border border-dashed border-white/10 text-white/50 text-xs">
              No links available.
            </div>
          ) : (
            activeLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => recordClick(link.id)}
                className={`group relative w-full p-4 flex items-center gap-3.5 rounded-2xl transition-all duration-300 cursor-pointer text-left overflow-hidden select-none active:scale-[0.985] bg-[#0f111c]/75 backdrop-blur-xl border ${
                  link.isFeatured
                    ? 'border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_24px_rgba(168,85,247,0.35)] ring-1 ring-purple-500/30'
                    : 'border-slate-800/80 hover:border-purple-500/50 hover:bg-[#151928]/90 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                }`}
              >
                {/* Icon Container with Purple Glow */}
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 transition-transform group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:text-purple-300">
                  <IconRenderer name={link.icon} size={20} />
                </div>

                {/* Content: Title & Description */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white group-hover:text-purple-200 transition-colors">
                      {link.title}
                    </span>
                    {link.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 tracking-wide">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  {link.description && (
                    <p className="text-[11px] text-white/60 mt-0.5 line-clamp-2 leading-relaxed">
                      {link.description}
                    </p>
                  )}
                </div>

                {/* Right Arrow Indicator */}
                <div className="text-white/40 group-hover:text-purple-300 transition-colors shrink-0">
                  <ExternalLink size={15} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))
          )}
        </div>
      </main>

      {/* Clean Official Footer */}
      <footer className="relative z-10 w-full max-w-md pt-6 border-t border-white/10 text-center text-xs text-white/40 flex flex-col items-center gap-1.5">
        <p className="font-medium text-white/60">
          © 2026 VCET. All rights reserved to VCET NSDC.
        </p>
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/50 font-medium">
          <MapPin size={12} className="text-purple-400 shrink-0" />
          <span>Vidyavardhini&apos;s College of Engineering and Technology, Vasai Road (W)</span>
        </div>
      </footer>

      {/* Share / QR Code Modal */}
      {isQrOpen && <QrCodeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />}
    </div>
  );
}
