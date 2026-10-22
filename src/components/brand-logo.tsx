import React from 'react';

interface BrandLogoProps {
    className?: string;
    showSubtitle?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

export function BrandLogo({ className = '', showSubtitle = true, size = 'md' }: BrandLogoProps) {
    const isSm = size === 'sm';
    const isLg = size === 'lg';

    return (
        <div className={`inline-flex items-center gap-2 group select-none shrink-0 ${className}`}>
            {/* Elegant Art Emblem Icon */}
            <div className={`relative flex items-center justify-center shrink-0 rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-accent/30 border border-primary/25 shadow-xs transition-transform duration-300 group-hover:scale-105 ${
                isSm ? 'size-7' : isLg ? 'size-11' : 'size-8 sm:size-9'
            }`}>
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`text-primary transition-colors duration-300 ${
                        isSm ? 'size-3.5' : isLg ? 'size-5' : 'size-4 sm:size-4.5'
                    }`}
                >
                    {/* Artistic Venetian Rose / Paint Palette Motif */}
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12c0 3.31 1.61 6.24 4.09 8.04.4.29.91.26 1.25-.08l1.72-1.72c.38-.38.99-.38 1.37 0l.54.54c.78.78 2.05.78 2.83 0 .78-.78.78-2.05 0-2.83l-1.06-1.06c-.78-.78-.78-2.05 0-2.83.78-.78 2.05-.78 2.83 0l1.06 1.06c.39.39 1.02.39 1.41 0l2.12-2.12c.38-.38.99-.38 1.37 0 .39.39.89.58 1.41.58.26 0 .52-.05.76-.16C21.78 15.68 22 13.91 22 12c0-5.52-4.48-10-10-10z"
                        fill="currentColor"
                        fillOpacity="0.15"
                    />
                    <path
                        d="M12 4.5c-4.14 0-7.5 3.36-7.5 7.5 0 2.22 1.02 4.19 2.58 5.51.27.23.63.26.93.07.3-.19.49-.52.49-.88v-.4c0-1.1.9-2 2-2h.2c1.1 0 2-.9 2-2 0-.55.45-1 1-1h.4c.55 0 1-.45 1-1v-.4c0-.55.45-1 1-1h.4c.55 0 1-.45 1-1v-.4c0-.55-.45-1-1-1-1.38 0-2.5-1.12-2.5-2.5V5.5c0-.55-.45-1-1-1z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                    />
                    {/* Delicate paint dab accents */}
                    <circle cx="8" cy="8.5" r="1.2" fill="currentColor" />
                    <circle cx="15.5" cy="8" r="1.2" fill="currentColor" />
                    <circle cx="7.5" cy="13" r="1" fill="currentColor" />
                    <circle cx="16.5" cy="12.5" r="1" fill="currentColor" />
                </svg>
            </div>

            {/* Typography */}
            <div className="flex flex-col text-left justify-center">
                <span className={`font-serif tracking-wide text-foreground leading-none font-semibold ${
                    isSm ? 'text-base' : isLg ? 'text-2xl' : 'text-base sm:text-xl'
                }`}>
                    Julia di Venezia
                </span>
                {showSubtitle && (
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] sm:tracking-[0.26em] text-primary/80 font-medium font-sans mt-0.5 sm:mt-1 hidden min-[360px]:block">
                        Atelier d&apos;Art
                    </span>
                )}
            </div>
        </div>
    );
}
