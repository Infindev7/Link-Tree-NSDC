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
  Sparkles,
} from 'lucide-react';

export function LinkTreePreview() {
  const { config, recordClick } = useConfig();
  const [isQrOpen, setIsQrOpen] = useState(false);

  const activeLinks = config.links.filter((l) => l.isActive);
  const activeSocials = config.socials.filter((s) => s.enabled && s.url);

  // Social badge styling matching vcet-nsdc.vercel.app
  const getSocialBrandStyle = (platform: string) => {
    switch (platform) {
      case 'email':
        return 'border-red-500/40 text-red-400 hover:bg-red-500/10 hover:shadow-[0_0_18px_rgba(239,68,68,0.5)] hover:border-red-500/80';
      case 'linkedin':
        return 'border-blue-500/40 text-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_18px_rgba(59,130,246,0.5)] hover:border-blue-500/80';
      case 'youtube':
        return 'border-red-500/40 text-red-400 hover:bg-red-500/10 hover:shadow-[0_0_18px_rgba(239,68,68,0.5)] hover:border-red-500/80';
      case 'instagram':
        return 'border-pink-500/40 text-pink-400 hover:bg-pink-500/10 hover:shadow-[0_0_18px_rgba(236,72,153,0.5)] hover:border-pink-500/80';
      case 'website':
      default:
        return 'border-purple-500/40 text-purple-300 hover:bg-purple-500/10 hover:shadow-[0_0_18px_rgba(168,85,247,0.5)] hover:border-purple-500/80';
    }
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

      {/* Top Header with Status Indicator & Share Button */}
      <header className="relative z-10 w-full max-w-xl flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {/* Status Live Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] text-white/70 font-medium shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>VCET NSDC Chapter</span>
          </div>
        </div>

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

      {/* Main Profile & Links Container (Increased Width) */}
      <main className="relative z-10 w-full max-w-xl flex-1 flex flex-col items-center">
        {/* Profile Avatar with Halo Glow */}
        <div className="relative mb-4 group">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden p-2 shadow-2xl transition-transform duration-300 group-hover:scale-105 border-2 border-purple-400/80 bg-black/80"
            style={{
              boxShadow: '0 0 30px -4px rgba(168, 85, 247, 0.45)',
            }}
          >
            <Image
              src={config.profile.avatarUrl}
              alt={config.profile.name}
              width={112}
              height={112}
              priority
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Status Pill Badge - Only "Data beats emotions" */}
        <div className="mb-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-500/10 backdrop-blur-md border border-purple-500/30 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.15)]">
          <Sparkles size={13} className="text-purple-400" />
          <span className="tracking-wide italic">&quot;Data beats emotions&quot;</span>
        </div>

        {/* Name with VCET NSDC Signature Gradient & Wide Sans-Serif Font */}
        <h1 className="text-2xl sm:text-3xl font-black font-title-wide tracking-wider text-center bg-gradient-to-r from-purple-400 via-violet-300 to-blue-400 bg-clip-text text-transparent uppercase">
          {config.profile.name}
        </h1>
        <p className="text-sm font-medium text-purple-300/80 mt-0.5 mb-3 tracking-wide">
          {config.profile.handle}
        </p>

        {/* Bio */}
        {config.profile.bio && (
          <p className="text-xs sm:text-sm text-white/75 text-center max-w-md mb-3 leading-relaxed font-normal">
            {config.profile.bio}
          </p>
        )}

        {/* Location Tag */}
        {config.profile.location && (
          <div className="flex items-center gap-1.5 text-[11px] text-white/50 font-medium mb-6">
            <MapPin size={12} className="text-purple-400" />
            <span>{config.profile.location}</span>
          </div>
        )}

        {/* Social Icons Bar (with official hover colors) */}
        {activeSocials.length > 0 && (
          <div className="flex items-center justify-center gap-3.5 flex-wrap mb-8">
            {activeSocials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border transition-all duration-300 hover:scale-110 shadow-md active:scale-95 ${getSocialBrandStyle(
                  social.platform
                )}`}
                title={social.label || social.platform}
                aria-label={social.label || social.platform}
              >
                <SocialIconRenderer platform={social.platform} size={20} />
              </a>
            ))}
          </div>
        )}

        {/* Links Stack (Enlarged Cards, Typography, and Icons) */}
        <div className="w-full space-y-4 sm:space-y-4.5 mb-10">
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
                className={`group relative w-full p-4.5 sm:p-5 flex items-center gap-4 sm:gap-5 rounded-2xl transition-all duration-300 cursor-pointer text-left overflow-hidden select-none active:scale-[0.99] bg-[#0f111c]/80 backdrop-blur-xl border ${
                  link.isFeatured
                    ? 'border-purple-500/40 hover:border-purple-400 hover:shadow-[0_0_28px_rgba(168,85,247,0.4)] ring-1 ring-purple-500/30'
                    : 'border-slate-800/80 hover:border-purple-500/50 hover:bg-[#151928]/95 hover:shadow-[0_6px_24px_rgba(0,0,0,0.6)]'
                }`}
              >
                {/* Icon Container with Purple Glow (Enlarged) */}
                <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 transition-transform group-hover:scale-110 group-hover:bg-purple-500/20 group-hover:text-purple-300">
                  <IconRenderer name={link.icon} size={24} />
                </div>

                {/* Content: Title & Description (Enlarged Font) */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors tracking-tight">
                      {link.title}
                    </span>
                    {link.badge && (
                      <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 tracking-wide">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  {link.description && (
                    <p className="text-xs sm:text-[13px] text-white/70 mt-1 line-clamp-2 leading-relaxed">
                      {link.description}
                    </p>
                  )}
                </div>

                {/* Right Arrow Indicator (Enlarged) */}
                <div className="text-white/40 group-hover:text-purple-300 transition-colors shrink-0">
                  <ExternalLink size={18} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            ))
          )}
        </div>
      </main>

      {/* Clean Official Footer */}
      <footer className="relative z-10 w-full max-w-xl pt-6 border-t border-white/10 text-center text-xs text-white/40 flex flex-col items-center gap-1.5">
        <p className="font-medium text-white/60">
          © 2026 VCET. All rights reserved to VCET NSDC.
        </p>
        <p className="text-[11px] text-white/40">
          Vidyavardhini&apos;s College of Engineering and Technology, Vasai Road (W)
        </p>
      </footer>

      {/* Share / QR Code Modal */}
      <QrCodeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  );
}
