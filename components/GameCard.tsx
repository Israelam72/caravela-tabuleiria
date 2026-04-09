"use client";

import Image from "next/image";
import { Game } from "@/types";

const categoryConfig: Record<string, { emoji: string; style: string }> = {
  Estratégia:  { emoji: "⚔️",  style: "bg-blue-500/90 text-white" },
  Família:     { emoji: "🏠",  style: "bg-yellow-500/90 text-white" },
  Cooperativo: { emoji: "🤝",  style: "bg-teal-500/90 text-white" },
  Criativo:    { emoji: "🎨",  style: "bg-pink-500/90 text-white" },
  Festa:       { emoji: "🎉",  style: "bg-orange-500/90 text-white" },
  Cartas:      { emoji: "🃏",  style: "bg-purple-500/90 text-white" },
  Temático:    { emoji: "🗺️",  style: "bg-amber-600/90 text-white" },
};

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

export function GameCard({ game, onClick }: GameCardProps) {
  const cat = game.category ? categoryConfig[game.category] : null;

  return (
    <div
      onClick={() => onClick(game)}
      className="group cursor-pointer rounded-2xl overflow-hidden bg-white card-glow border border-violet-100/60"
    >
      {/* ── Image ── */}
      <div className="relative aspect-square overflow-hidden bg-violet-100">
        {game.imageUrl ? (
          <Image
            src={game.imageUrl}
            alt={game.name}
            fill
            className={`object-cover group-hover:scale-110 transition-transform duration-500 ease-out
              ${!game.available ? "grayscale brightness-75" : ""}`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-100 to-purple-100">
            <span className="text-7xl opacity-50">🎲</span>
          </div>
        )}

        {/* Dark gradient at bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Category chip – top left */}
        {cat && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${cat.style}`}>
            {cat.emoji} {game.category}
          </span>
        )}

        {/* Availability badge – top right */}
        {game.available ? (
          <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            Disponível
          </span>
        ) : (
          <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Alugado
          </span>
        )}

        {/* Game name on image overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-bold text-white text-base leading-tight drop-shadow-lg line-clamp-2">
            {game.name}
          </h3>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-3">
        {/* Meta info */}
        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {game.minPlayers}–{game.maxPlayers} jogadores
          </span>
          <span className="text-violet-200">•</span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {game.duration}
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-400 font-medium block leading-none mb-0.5">
              aluguel
            </span>
            <span className="text-xl font-extrabold text-amber-500">
              R$ {game.price.toFixed(2).replace(".", ",")}
            </span>
          </div>
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition-all
            ${game.available
              ? "bg-violet-600 text-white group-hover:bg-violet-700 group-hover:shadow-md group-hover:shadow-violet-300/50"
              : "bg-gray-100 text-gray-400"
            }`}>
            {game.available ? "Ver mais →" : "Indisponível"}
          </span>
        </div>
      </div>
    </div>
  );
}
