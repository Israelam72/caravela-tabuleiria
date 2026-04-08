"use client";

import { useState, useMemo } from "react";
import { Game } from "@/types";
import { Header } from "./Header";
import { GameCard } from "./GameCard";
import { GameModal } from "./GameModal";
import { SubscribeModal } from "./SubscribeModal";

const CATEGORIES = ["Todos", "Estratégia", "Família", "Cooperativo", "Criativo", "Festa", "Cartas"];

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

      const matchesCategory =
        category === "Todos" || game.category === category;

      const matchesFilter =
        filter === "all" ||
        (filter === "available" && game.available) ||
        (filter === "rented" && !game.available);

      return matchesSearch && matchesCategory && matchesFilter;
    });
  }, [initialGames, search, category, filter]);

  const availableCount = initialGames.filter((g) => g.available).length;
  const rentedCount = initialGames.filter((g) => !g.available).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0ebff" }}>
      <Header onSubscribeClick={() => setShowSubscribe(true)} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-violet-900 mb-3">
            Nosso Catálogo de Jogos
          </h2>
          <p className="text-violet-600 text-lg max-w-xl mx-auto">
            Encontre o jogo perfeito para sua reunião. Alugue e pague pelo WhatsApp!
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <span className="flex items-center gap-1.5 text-green-700 font-medium">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block" />
              {availableCount} disponíveis
            </span>
            <span className="flex items-center gap-1.5 text-red-600 font-medium">
              <span className="w-2.5 h-2.5 bg-red-400 rounded-full inline-block" />
              {rentedCount} alugados
            </span>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-violet-100 p-4 mb-8 space-y-3">
          {/* Busca */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍  Buscar jogo..."
            className="input-field bg-violet-50/50"
          />

          <div className="flex flex-wrap gap-2">
            {/* Categorias */}
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-violet-600 text-white"
                    : "bg-violet-100 text-violet-700 hover:bg-violet-200"
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="border-l border-violet-200 mx-1" />

            {/* Disponibilidade */}
            {(
              [
                { key: "all", label: "Todos" },
                { key: "available", label: "✅ Disponíveis" },
                { key: "rented", label: "🔴 Alugados" },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  filter === key
                    ? "bg-violet-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de jogos */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredGames.map((game) => (
              <GameCard key={game.id} game={game} onClick={setSelectedGame} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-violet-700 font-semibold text-lg">
              Nenhum jogo encontrado
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Tente mudar os filtros ou a busca
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-violet-900 text-violet-200 py-8 px-4 text-center text-sm">
        <p className="font-bold text-white mb-1">Caravela Tabuleiria</p>
        <p>Aluguel de jogos de tabuleiro · Pagamento via WhatsApp</p>
        <a
          href="/admin"
          className="inline-block mt-4 text-violet-400 hover:text-violet-200 text-xs transition-colors"
        >
          Área administrativa
        </a>
      </footer>

      {/* Modais */}
      {selectedGame && (
        <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
      )}
      {showSubscribe && (
        <SubscribeModal onClose={() => setShowSubscribe(false)} />
      )}
    </div>
  );
}
