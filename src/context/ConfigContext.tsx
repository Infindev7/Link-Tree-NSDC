'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LinkTreeConfig } from '@/types/config';
import { DEFAULT_CONFIG } from '@/config/default-config';
import { THEME_PRESETS } from '@/config/themes';

interface ToastMessage {
  id: string;
  text: string;
  type: 'success' | 'info' | 'error';
}

interface ConfigContextType {
  config: LinkTreeConfig;
  toast: ToastMessage | null;
  showToast: (text: string, type?: 'success' | 'info' | 'error') => void;
  recordClick: (id: string) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<LinkTreeConfig>(DEFAULT_CONFIG);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Apply theme CSS variables
  useEffect(() => {
    const preset = THEME_PRESETS[config.theme.id] || THEME_PRESETS['retro-synthwave'];
    const root = document.documentElement;

    Object.entries(preset.cssVars).forEach(([key, val]) => {
      root.style.setProperty(key, val);
    });

    if (config.theme.accentColor) {
      root.style.setProperty('--accent', config.theme.accentColor);
    }
  }, [config.theme]);

  const showToast = useCallback((text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, text, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3000);
  }, []);

  const recordClick = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      links: prev.links.map((link) =>
        link.id === id ? { ...link, clicks: (link.clicks || 0) + 1 } : link
      ),
    }));
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        config,
        toast,
        showToast,
        recordClick,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
