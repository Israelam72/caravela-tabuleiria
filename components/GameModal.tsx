"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Game } from "@/types";

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

export function GameModal({ game, onClose }: GameModalProps) {
  useEffect(() => {
    if (!game) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [game, onClose]);

  if (!game) return null;

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
  const message = encodeURIComponent(
    `Olá! Gostaria de saber mais sobre o aluguel do jogo *${game.name}*. Ele está disponível?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full w-8 h-8 flex items-center justify-center shadow transition-colors"
        >
          ✕
        </button>

        {/* Imagem */}
        <div className="relative w-full aspect-video bg-violet-50 rounded-t-3xl overflow-hidden">
          {game.imageUrl ? (
            <Image
              src={game.imageUrl}
              alt={game.name}
              fill
              className={`object-cover ${!game.available ? "opacity-70 grayscale" : ""}`}
              sizes="(max-width: 768px) 100vw, 672px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-8xl">🎲</span>
            </div>
          )}

          {/* Overlay se alugado */}
          {!game.available && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-red-500/90 text-white text-2xl font-bold px-6 py-3 rounded-2xl shadow-lg rotate-[-6deg]">
                ALUGADO
              </span>
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="text-2xl font-bold text-violet-900">{game.name}</h2>
              {game.category && (
                <span className="inline-block mt-1 bg-violet-100 text-violet-700 text-sm font-medium px-3 py-0.5 rounded-full">
                  {game.category}
                </span>
              )}
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-amber-600">
                R$ {game.price.toFixed(2).replace(".", ",")}
              </div>
              <div className="text-xs text-gray-400">por aluguel</div>
            </div>
          </div>

          {/* Detalhes */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            <div className="bg-violet-50 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">👥</div>
              <div className="text-xs text-gray-500">Jogadores</div>
              <div className="font-semibold text-violet-800 text-sm">
                {game.minPlayers}–{game.maxPlayers}
              </div>
            </div>
            <div className="bg-violet-50 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">🔢</div>
              <div className="text-xs text-gray-500">Idade mín.</div>
              <div className="font-semibold text-violet-800 text-sm">
                {game.minAge}+
              </div>
            </div>
            <div className="bg-violet-50 rounded-xl p-3 text-center">
              <div className="text-xl mb-1">⏱</div>
              <div className="text-xs text-gray-500">Duração</div>
              <div className="font-semibold text-violet-800 text-sm">
                {game.duration}
              </div>
            </div>
          </div>

          {/* Descrição */}
          <p className="text-gray-600 leading-relaxed mb-6">{game.description}</p>

          {/* Botão WhatsApp */}
          {game.available ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Alugar pelo WhatsApp
            </a>
          ) : (
            <div className="bg-gray-100 text-gray-500 font-semibold py-3 px-6 rounded-xl text-center">
              Este jogo está alugado no momento
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
