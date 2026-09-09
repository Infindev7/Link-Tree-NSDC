'use client';

import React from 'react';
import { useConfig } from '@/context/ConfigContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function Toast() {
  const { toast } = useConfig();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/95 backdrop-blur-md text-white border border-white/15 shadow-2xl text-xs font-medium">
        {toast.type === 'success' && <CheckCircle2 size={16} className="text-emerald-400" />}
        {toast.type === 'error' && <AlertCircle size={16} className="text-rose-400" />}
        {toast.type === 'info' && <Info size={16} className="text-sky-400" />}
        <span>{toast.text}</span>
      </div>
    </div>
  );
}
