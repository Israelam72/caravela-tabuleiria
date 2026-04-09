"use client";

import Image from "next/image";

interface HeaderProps {
  onSubscribeClick: () => void;
}

export function Header({ onSubscribeClick }: HeaderProps) {
  return (
    <header className="glass border-b border-violet-200/60 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-violet-400/30 rounded-2xl blur-md group-hover:blur-lg transition-all" />
            <Image
              src="/caravela-icon.png"
              alt="Caravela Tabuleiria"
              width={44}
              height={44}
              className="relative rounded-2xl shadow-md"
            />
          </div>
          <div className="leading-none">
            <span className="block text-base font-extrabold text-violet-900 tracking-tight">
              Caravela
            </span>
            <span className="block text-[11px] font-bold text-violet-500 tracking-widest uppercase">
              Tabuleiria
            </span>
          </div>
        </a>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSubscribeClick}
            className="btn-primary text-sm flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="hidden sm:inline">Receber Novidades</span>
            <span className="sm:hidden">Novidades</span>
          </button>
        </div>
      </div>
    </header>
  );
}
