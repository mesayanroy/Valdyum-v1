'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { CheckCircle2, XCircle, Info } from 'lucide-react';
import { cn } from '@valdyum/ui-kit';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  subText?: string;
  duration?: number;
}

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  subText?: string;
  duration: number;
}

interface ToastContextType {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

type Action =
  | { type: 'ADD_TOAST'; payload: Toast }
  | { type: 'REMOVE_TOAST'; payload: string };

const toastReducer = (state: Toast[], action: Action): Toast[] => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.payload];
    case 'REMOVE_TOAST':
      return state.filter((toast) => toast.id !== action.payload);
    default:
      return state;
  }
};

const accentStyles: Record<ToastType, { borderLeft: string; glowShadow: string }> = {
  success: {
    borderLeft: '2px solid rgba(0,255,102,0.7)',
    glowShadow: '-4px 0 16px rgba(0,255,102,0.15)',
  },
  error: {
    borderLeft: '2px solid rgba(255,68,68,0.7)',
    glowShadow: '-4px 0 16px rgba(255,68,68,0.15)',
  },
  info: {
    borderLeft: '2px solid rgba(0,229,255,0.7)',
    glowShadow: '-4px 0 16px rgba(0,229,255,0.15)',
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const addToast = useCallback((type: ToastType, message: string, options?: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = options?.duration || 4000;

    dispatch({
      type: 'ADD_TOAST',
      payload: { id, type, message, subText: options?.subText, duration },
    });

    setTimeout(() => {
      dispatch({ type: 'REMOVE_TOAST', payload: id });
    }, duration);
  }, []);

  const success = useCallback((message: string, options?: ToastOptions) => addToast('success', message, options), [addToast]);
  const error = useCallback((message: string, options?: ToastOptions) => addToast('error', message, options), [addToast]);
  const info = useCallback((message: string, options?: ToastOptions) => addToast('info', message, options), [addToast]);

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => {
          const accent = accentStyles[toast.type];
          return (
            <div
              key={toast.id}
              className="pointer-events-auto animate-in slide-in-from-right-full fade-in duration-300 relative"
              style={{
                background: 'rgba(12,11,9,0.82)',
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderTop: '1px solid rgba(255,255,255,0.12)',
                borderLeft: accent.borderLeft,
                boxShadow: `0 24px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06), ${accent.glowShadow}`,
                minWidth: 280,
                maxWidth: 400,
                padding: '16px 20px',
              }}
            >
              {/* Top edge highlight */}
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)',
                }}
              />
              <div className="flex items-start gap-3">
                {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-ichor mt-0.5 shrink-0" />}
                {toast.type === 'error' && <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />}
                {toast.type === 'info' && <Info className="w-4 h-4 text-aether mt-0.5 shrink-0" />}
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[11px] text-alabaster">{toast.message}</span>
                  {toast.subText && <span className="font-mono text-[9px] text-white/40">{toast.subText}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
