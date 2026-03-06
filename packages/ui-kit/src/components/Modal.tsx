'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Modal = ({ open, onClose, title, children, size = 'md' }: ModalProps) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-obsidian/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-alabaster border border-alabaster-3 shadow-hard-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-none flex flex-col',
            {
              'max-w-sm': size === 'sm',
              'max-w-md': size === 'md',
              'max-w-2xl': size === 'lg',
              'max-w-[95vw] h-[95vh]': size === 'full',
            }
          )}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-alabaster-3 px-6 py-4">
              <DialogPrimitive.Title className="font-display text-xl font-bold text-obsidian">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Close className="font-mono text-stone hover:text-obsidian transition-colors cursor-none">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            </div>
          )}
          {!title && (
            <DialogPrimitive.Close className="absolute right-4 top-4 font-mono text-stone hover:text-obsidian transition-colors cursor-none">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
          <div className="p-6 overflow-y-auto flex-1">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
