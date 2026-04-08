"use client";

import Image from "next/image";

interface HeaderProps {
  onSubscribeClick: () => void;
}

export function Header({ onSubscribeClick }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-violet-100 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/caravela-icon.png"
            alt="Caravela Tabuleiria"
            width={48}
            height={48}
            className="rounded-xl shadow-sm"
          />
          <div>
            <h1 className="text-lg font-bold text-violet-800 leading-tight">
              Caravela
            </h1>
            <p className="text-xs text-violet-500 font-medium leading-tight">
              Tabuleiria
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-3">
          <button
            onClick={onSubscribeClick}
            className="btn-primary text-sm py-2 px-4"
          >
            <span className="hidden sm:inline">Receber Novidades</span>
            <span className="sm:hidden">Novidades</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
