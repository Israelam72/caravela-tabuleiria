"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Game } from "@/types";

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Left: Image ── */}
        <div className="relative md:w-5/12 shrink-0 aspect-square md:aspect-auto min-h-[260px]">
          {game.imageUrl ? (
            <Image
              src={game.imageUrl}
              alt={game.name}
              fill
              className={`object-cover ${!game.available ? "grayscale brightness-75" : ""}`}
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-200 to-purple-300">
              <span className="text-9xl opacity-40">🎲</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/20" />

          {/* Category badge */}
          {game.category && (
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-violet-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
              {game.category}
            </span>
          )}

          {/* Rented overlay */}
          {!game.available && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-2xl rotate-[-8deg]">
                <span className="text-white text-xl font-black tracking-widest">ALUGADO</span>
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Info ── */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-500 hover:text-gray-800 rounded-full w-9 h-9 flex items-center justify-center shadow-md transition-all hover:scale-110"
          >
            ✕
          </button>

          <div className="p-6 flex flex-col gap-5 flex-1">
            {/* Title + Price */}
            <div className="flex items-start justify-between gap-4 pr-8">
              <div>
                <h2 className="text-2xl font-extrabold text-violet-900 leading-tight">
                  {game.name}
                </h2>
                {game.available ? (
                  <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Disponível para alugar
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    Alugado no momento
                  </span>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">por aluguel</p>
                <p className="text-3xl font-extrabold text-amber-500">
                  R$ {game.price.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: "Jogadores",
                  value: `${game.minPlayers}–${game.maxPlayers}`,
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  label: "Duração",
                  value: game.duration,
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: "Idade",
                  value: `${game.minAge}+`,
                },
              ].map(({ icon, label, value }) => (
                <div key={label} className="bg-violet-50 rounded-2xl p-3 text-center">
                  <div className="text-violet-500 flex justify-center mb-1.5">{icon}</div>
                  <p className="text-[10px] text-gray-400 font-medium">{label}</p>
                  <p className="text-sm font-bold text-violet-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sobre o jogo</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{game.description}</p>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-2">
              {game.available ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full pulse-green text-base"
                >
                  <WhatsAppIcon />
                  Alugar pelo WhatsApp
                </a>
              ) : (
                <div className="bg-gray-100 text-gray-400 font-semibold py-4 px-6 rounded-2xl text-center text-sm">
                  Disponível em breve — entre em contato
                </div>
              )}
              <p className="text-[11px] text-gray-400 text-center mt-2">
                Pagamento e entrega combinados pelo WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
