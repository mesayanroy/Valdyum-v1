'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

export interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Drawer = ({ open, onClose, title, children }: DrawerProps) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-obsidian/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            'fixed inset-y-0 right-0 z-50 w-full md:w-[70vw] bg-alabaster border-l border-alabaster-3 shadow-hard-lg transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 rounded-none flex flex-col'
          )}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-alabaster-3 px-6 py-4">
              <DialogPrimitive.Title className="font-display text-2xl font-bold text-obsidian">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Close className="font-mono text-stone hover:text-obsidian transition-colors cursor-none">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>
          )}
          {!title && (
            <DialogPrimitive.Close className="absolute right-6 top-6 font-mono text-stone hover:text-obsidian transition-colors cursor-none z-10">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
