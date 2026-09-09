'use client';

import React from 'react';
import { ConfigProvider } from '@/context/ConfigContext';
import { LinkTreePreview } from '@/components/LinkTreePreview';
import { Toast } from '@/components/common/Toast';

export default function Home() {
  return (
    <ConfigProvider>
      <div className="relative min-h-screen w-full flex flex-col bg-[#0b0b14]">
        {/* Public VCET NSDC Bio-Link Page */}
        <LinkTreePreview />

        {/* Floating Notifications (Copy Link, etc.) */}
        <Toast />
      </div>
    </ConfigProvider>
  );
}
