'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Copy, Check, Download, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useConfig } from '@/context/ConfigContext';
import { SocialIconRenderer } from './IconRenderer';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHARE_URL = 'https://nsdc-links.vercel.app/';
const QR_IMAGE_PATH = '/qr-code.png';

export function QrCodeModal({ isOpen, onClose }: QrCodeModalProps) {
  const { config, showToast } = useConfig();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setCopied(true);
      showToast('Profile link copied to clipboard!');
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 },
        });
      } catch {}
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Failed to copy link', 'error');
    }
  };

  const handleDownloadQr = () => {
    const a = document.createElement('a');
    a.href = QR_IMAGE_PATH;
    a.download = `vcet-nsdc-qrcode.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('QR Code downloaded!');
  };

  const shareText = `Check out ${config.profile.name}'s official links:`;
  const shareLinks = [
    {
      name: 'X (Twitter)',
      platform: 'twitter' as const,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(SHARE_URL)}`,
      style: 'border-white/20 text-white/80 hover:text-white hover:bg-white/10 hover:border-white/60 hover:shadow-[0_0_18px_rgba(255,255,255,0.3)]',
    },
    {
      name: 'WhatsApp',
      platform: 'whatsapp' as const,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${SHARE_URL}`)}`,
      style: 'border-emerald-500/30 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/15 hover:border-emerald-500/80 hover:shadow-[0_0_18px_rgba(16,185,129,0.4)]',
    },
    {
      name: 'LinkedIn',
      platform: 'linkedin' as const,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`,
      style: 'border-blue-500/30 text-blue-400 hover:text-blue-300 hover:bg-blue-500/15 hover:border-blue-500/80 hover:shadow-[0_0_18px_rgba(59,130,246,0.4)]',
    },
    {
      name: 'Telegram',
      platform: 'telegram' as const,
      url: `https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(shareText)}`,
      style: 'border-sky-500/30 text-sky-400 hover:text-sky-300 hover:bg-sky-500/15 hover:border-sky-500/80 hover:shadow-[0_0_18px_rgba(14,165,233,0.4)]',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md p-6 overflow-hidden rounded-3xl border border-purple-500/30 shadow-2xl transition-all"
        style={{
          background: '#0e111d',
          backgroundImage: 'radial-gradient(ellipse 90% 90% at 50% -20%, rgba(168,85,247,0.18), #0e111d 80%)',
          color: '#f8fafc',
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Share2 size={20} className="text-purple-400" />
            <h3 className="text-lg font-semibold tracking-tight text-white">Share Profile</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Static QR Display */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="p-4 bg-white rounded-2xl shadow-xl ring-4 ring-purple-500/20">
            <Image
              src={QR_IMAGE_PATH}
              alt="VCET NSDC QR Code (https://nsdc-links.vercel.app/)"
              width={192}
              height={192}
              priority
              className="w-48 h-48 rounded-lg object-contain"
            />
          </div>
          <p className="mt-3 text-xs text-purple-300/80 font-medium">
            Scan with phone camera to open {SHARE_URL}
          </p>
        </div>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-purple-500/20 mb-4">
          <input
            type="text"
            readOnly
            value={SHARE_URL}
            className="flex-1 bg-transparent px-2 text-xs text-white/80 font-mono outline-none truncate"
          />
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-purple-500 hover:bg-purple-400 text-white transition-all active:scale-95 shadow-sm"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <button
            onClick={handleDownloadQr}
            className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-xl border border-white/10 bg-white/5 hover:bg-purple-950/30 hover:border-purple-500/40 transition-all text-white/90"
          >
            <Download size={15} className="text-purple-400" />
            <span>Download QR</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-xl border border-white/10 bg-white/5 hover:bg-purple-950/30 hover:border-purple-500/40 transition-all text-white/90"
          >
            <Copy size={15} className="text-purple-400" />
            <span>Copy Link</span>
          </button>
        </div>

        {/* Social Share Shortcuts with Themed Icons */}
        <div>
          <span className="block text-[11px] font-semibold text-purple-300/90 uppercase tracking-wider mb-2.5">
            Share on
          </span>
          <div className="flex items-center gap-3">
            {shareLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center bg-black/40 backdrop-blur-md border transition-all duration-300 hover:scale-110 active:scale-95 shadow-md ${s.style}`}
                title={s.name}
                aria-label={s.name}
              >
                <SocialIconRenderer platform={s.platform} size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
