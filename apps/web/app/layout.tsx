import type { Metadata } from 'next';
import { cinzel, geist, geistMono } from './fonts';
import { PersistentCanvas } from './ClientWrappers';
import { MorphismProvider } from '@valdyum/ui-kit';
import { SmoothScroll } from '../components/SmoothScroll';
import { PageTransition } from '../components/shared/PageTransition';
import { ToastProvider } from '../components/shared/Toast';
import { Footer } from '../components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
    title: 'Valdyum — Forge Autonomous Agents on Solana',
    description:
        'The open-source infrastructure layer for building, deploying, monetizing, and forking AI agents with verifiable on-chain identity and execution history.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${cinzel.variable} ${geist.variable} ${geistMono.variable}`}>
            <head>
            </head>
            <body className="font-body bg-alabaster text-obsidian antialiased">
                <MorphismProvider>
                    <SmoothScroll>
                        <PersistentCanvas />
                        <ToastProvider>
                            <PageTransition>
                                <main>{children}</main>
                                <Footer />
                            </PageTransition>
                        </ToastProvider>
                    </SmoothScroll>
                </MorphismProvider>
            </body>
        </html>
    );
}
