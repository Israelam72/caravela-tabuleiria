"use client";

import Image from "next/image";
import { Game } from "@/types";

const categoryColors: Record<string, string> = {
  Estratégia: "bg-blue-100 text-blue-700",
  Família: "bg-yellow-100 text-yellow-700",
  Cooperativo: "bg-teal-100 text-teal-700",
  Criativo: "bg-pink-100 text-pink-700",
  Festa: "bg-orange-100 text-orange-700",
  Cartas: "bg-purple-100 text-purple-700",
};

interface GameCardProps {
  game: Game;
  onClick: (game: Game) => void;
}

export function GameCard({ game, onClick }: GameCardProps) {
  const categoryClass =
    game.category && categoryColors[game.category]
      ? categoryColors[game.category]
      : "bg-gray-100 text-gray-600";

  return (
    <div
      onClick={() => onClick(game)}
      className="card cursor-pointer group hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      {/* Imagem */}
      <div className="relative aspect-square overflow-hidden bg-violet-50">
        {game.imageUrl ? (
          <Image
            src={game.imageUrl}
            alt={game.name}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
              !game.available ? "opacity-60 grayscale" : ""
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🎲</span>
          </div>
        )}

        {/* Badge de disponibilidade */}
        <div className="absolute top-2 right-2">
          {game.available ? (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
              Disponível
            </span>
          ) : (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
              Alugado
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-violet-900 text-base leading-tight">
            {game.name}
          </h3>
          {game.category && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${categoryClass}`}>
              {game.category}
            </span>
          )}
        </div>

        <p className="text-gray-500 text-xs mb-3 line-clamp-2">
          {game.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span title="Jogadores">
            👥 {game.minPlayers}–{game.maxPlayers}
          </span>
          <span title="Idade mínima">🔢 {game.minAge}+</span>
          <span title="Duração">⏱ {game.duration}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-amber-600 font-bold text-lg">
            R$ {game.price.toFixed(2).replace(".", ",")}
          </span>
          <span className="text-violet-600 text-xs font-medium group-hover:underline">
            Ver detalhes →
          </span>
        </div>
      </div>
    </div>
  );
}
