"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Game } from "@/types";
import { Header } from "./Header";
import { GameCard } from "./GameCard";
import { GameModal } from "./GameModal";
import { SubscribeModal } from "./SubscribeModal";

const CATEGORIES = [
  { label: "Todos",       emoji: "🎲" },
  { label: "Estratégia",  emoji: "⚔️" },
  { label: "Família",     emoji: "🏠" },
  { label: "Cooperativo", emoji: "🤝" },
  { label: "Criativo",    emoji: "🎨" },
  { label: "Festa",       emoji: "🎉" },
  { label: "Cartas",      emoji: "🃏" },
];

interface CatalogClientProps {
  initialGames: Game[];
}

export function CatalogClient({ initialGames }: CatalogClientProps) {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [filter, setFilter] = useState<"all" | "available" | "rented">("all");

  const filteredGames = useMemo(() => {
    return initialGames.filter((game) => {
      const matchesSearch =
        search === "" ||
        game.name.toLowerCase().includes(search.toLowerCase()) ||
        game.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === "Todos" || game.category === category;

      const matchesFilter =
        filter === "all" ||
        (filter === "available" && game.available) ||
        (filter === "rented" && !game.available);

      return matchesSearch && matchesCategory && matchesFilter;
    });
  }, [initialGames, search, category, filter]);

  const availableCount = initialGames.filter((g) => g.available).length;
  const rentedCount = initialGames.filter((g) => !g.available).length;
  const minPrice = initialGames.length
    ? Math.min(...initialGames.map((g) => g.price))
    : 0;

  return (
    <div className="min-h-screen bg-dot-pattern" style={{ backgroundColor: "#f0e8ff" }}>
      <Header onSubscribeClick={() => setShowSubscribe(true)} />

      {/* ═══ HERO ═══ */}
      <section className="relative bg-gradient-to-br from-[#1e0a40] via-[#3b0764] to-[#4c1d95] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-purple-800/30 rounded-full blur-3xl" />

        {/* Floating dice decorations */}
        <div className="absolute top-8 right-8 text-6xl opacity-10 rotate-12 select-none hidden lg:block">🎲</div>
        <div className="absolute bottom-12 right-1/4 text-4xl opacity-10 -rotate-6 select-none hidden lg:block">♟️</div>
        <div className="absolute top-16 left-1/3 text-3xl opacity-10 rotate-45 select-none hidden lg:block">🃏</div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 md:py-20 flex flex-col md:flex-row items-center gap-10 relative z-10">
          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-violet-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {availableCount} jogos disponíveis agora
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              Sua próxima{" "}
              <span className="text-gradient bg-gradient-to-r from-violet-300 to-pink-300"
                style={{ background: "linear-gradient(135deg,#c4b5fd,#f0abfc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                aventura
              </span>
              <br />
              começa aqui 🎲
            </h2>

            <p className="text-violet-300 text-lg max-w-lg mb-8 md:mb-10">
              Alugue jogos de tabuleiro e crie memórias incríveis. Simples, rápido e pelo WhatsApp.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {[
                { value: initialGames.length, label: "jogos no catálogo", color: "text-white" },
                { value: availableCount, label: "disponíveis agora", color: "text-green-400" },
                { value: `R$ ${minPrice}`, label: "a partir de", color: "text-amber-400" },
              ].map(({ value, label, color }) => (
                <div key={label} className="text-center">
                  <div className={`text-3xl font-extrabold ${color}`}>{value}</div>
                  <div className="text-violet-400 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Logo graphic */}
          <div className="shrink-0 hidden md:block">
            <div className="relative w-52 h-52">
              <div className="absolute inset-0 bg-violet-500/20 rounded-full blur-2xl" />
              <Image
                src="/caravela-icon.png"
                alt="Caravela Tabuleiria"
                fill
                className="relative object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full h-14">
            <path
              d="M0,56 L0,28 Q180,0 360,28 T720,28 T1080,28 T1440,28 L1440,56 Z"
              fill="#f0e8ff"
              className="animate-wave"
            />
            <path
              d="M0,56 L0,40 Q240,12 480,40 T960,40 T1440,40 L1440,56 Z"
              fill="#f0e8ff"
              opacity="0.6"
              className="animate-wave-slow"
            />
          </svg>
        </div>
      </section>

      {/* ═══ CATALOG ═══ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16">

        {/* Filter bar */}
        <div className="glass rounded-2xl border border-violet-200/60 shadow-sm p-4 mb-8 space-y-3">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar jogo pelo nome..."
              className="input-field pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {/* Category pills */}
            {CATEGORIES.map(({ label, emoji }) => (
              <button
                key={label}
                onClick={() => setCategory(label)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  category === label
                    ? "bg-violet-600 text-white shadow-md shadow-violet-300/40"
                    : "bg-violet-100/80 text-violet-700 hover:bg-violet-200"
                }`}
              >
                {emoji} {label}
              </button>
            ))}

            <div className="h-5 w-px bg-violet-200 mx-1 hidden sm:block" />

            {/* Availability toggles */}
            {(
              [
                { key: "all",       label: "Todos",        icon: "🎮" },
                { key: "available", label: "Disponíveis",  icon: "✅" },
                { key: "rented",    label: "Alugados",     icon: "🔴" },
              ] as const
            ).map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  filter === key
                    ? "bg-violet-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        {(search || category !== "Todos" || filter !== "all") && (
          <p className="text-sm text-violet-600 font-medium mb-5">
            {filteredGames.length} {filteredGames.length === 1 ? "jogo encontrado" : "jogos encontrados"}
            {search && <span className="text-violet-400"> para &quot;{search}&quot;</span>}
          </p>
        )}

        {/* Games grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} onClick={setSelectedGame} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 flex flex-col items-center">
            <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center text-4xl mb-4">
              🔍
            </div>
            <p className="text-violet-800 font-bold text-xl mb-1">Nenhum jogo encontrado</p>
            <p className="text-gray-400 text-sm mb-5">Tente outros filtros ou limpe a busca</p>
            <button
              onClick={() => { setSearch(""); setCategory("Todos"); setFilter("all"); }}
              className="btn-secondary text-sm"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </main>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="bg-white/60 border-y border-violet-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
          <h2 className="text-2xl font-extrabold text-violet-900 text-center mb-10">
            Como funciona?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: "1", icon: "🎲", title: "Escolha seu jogo", desc: "Navegue pelo catálogo e encontre o jogo perfeito para a sua próxima reunião." },
              { step: "2", icon: "💬", title: "Entre em contato", desc: "Clique em 'Alugar pelo WhatsApp' e combine os detalhes diretamente com o dono." },
              { step: "3", icon: "🏠", title: "Aproveite!", desc: "Receba o jogo, pague pessoalmente e divirta-se com amigos e família." },
            ].map(({ step, icon, title, desc }) => (
              <div key={step} className="text-center p-6 rounded-2xl bg-white border border-violet-100 shadow-sm">
                <div className="w-12 h-12 bg-violet-600 text-white rounded-2xl flex items-center justify-center text-lg font-extrabold mx-auto mb-3 shadow-md shadow-violet-300/50">
                  {step}
                </div>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-violet-900 mb-1">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-gradient-to-br from-[#1e0a40] to-[#4c1d95] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <Image
              src="/caravela-icon.png"
              alt="Caravela"
              width={52}
              height={52}
              className="rounded-2xl shadow-lg"
            />
            <div>
              <p className="font-extrabold text-lg">Caravela Tabuleiria</p>
              <p className="text-violet-300 text-sm">Aluguel de jogos de tabuleiro</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-violet-300">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSubscribe(true)}
                className="hover:text-white transition-colors"
              >
                📧 Receber novidades
              </button>
              <span>·</span>
              <a href="/admin" className="hover:text-white transition-colors">
                🔒 Admin
              </a>
            </div>
            <p className="text-violet-500 text-xs">
              Pagamento combinado pelo WhatsApp · Sem taxas online
            </p>
          </div>
        </div>
      </footer>

      {/* ═══ Modals ═══ */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
      {showSubscribe && (
        <SubscribeModal onClose={() => setShowSubscribe(false)} />
      )}
    </div>
  );
}
