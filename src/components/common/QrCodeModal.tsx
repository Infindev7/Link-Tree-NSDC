'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Copy, Check, Download, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useConfig } from '@/context/ConfigContext';

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
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(SHARE_URL)}`,
    },
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${SHARE_URL}`)}`,
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`,
    },
    {
      name: 'Telegram',
      url: `https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md p-6 overflow-hidden rounded-3xl border border-white/10 shadow-2xl transition-all"
        style={{
          background: 'var(--card-bg, #0f172a)',
          color: 'var(--text-primary, #f8fafc)',
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Share2 size={20} className="text-[var(--accent)]" />
            <h3 className="text-lg font-semibold tracking-tight">Share Profile</h3>
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
          <div className="p-4 bg-white rounded-2xl shadow-xl ring-4 ring-white/10">
            <Image
              src={QR_IMAGE_PATH}
              alt="VCET NSDC QR Code (https://nsdc-links.vercel.app/)"
              width={192}
              height={192}
              priority
              className="w-48 h-48 rounded-lg object-contain"
            />
          </div>
          <p className="mt-3 text-xs text-[var(--text-secondary)] font-medium">
            Scan with phone camera to open {SHARE_URL}
          </p>
        </div>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-black/40 border border-white/10 mb-4">
          <input
            type="text"
            readOnly
            value={SHARE_URL}
            className="flex-1 bg-transparent px-2 text-xs text-[var(--text-secondary)] font-mono outline-none truncate"
          />
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[var(--accent)] text-black transition-transform active:scale-95 hover:opacity-90 shadow-sm"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={handleDownloadQr}
            className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Download size={15} />
            <span>Download QR</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Copy size={15} />
            <span>Copy Link</span>
          </button>
        </div>

        {/* Social Share Shortcuts */}
        <div>
          <span className="block text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2">
            Share on
          </span>
          <div className="flex flex-wrap gap-2">
            {shareLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all text-[var(--text-secondary)] hover:text-white"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
