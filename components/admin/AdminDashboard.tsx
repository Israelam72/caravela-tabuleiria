"use client";

import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Game, GameFormData } from "@/types";
import { GameForm } from "./GameForm";

interface AdminDashboardProps {
  initialGames: Game[];
  subscriberCount: number;
}

export function AdminDashboard({ initialGames, subscriberCount }: AdminDashboardProps) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [showForm, setShowForm] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [search, setSearch] = useState("");

  function notify(type: "success" | "error", msg: string) {
    setNotification({ type, msg });
    setTimeout(() => setNotification(null), 3000);
  }

  async function handleSave(data: GameFormData) {
    const url = editingGame ? `/api/games/${editingGame.id}` : "/api/games";
    const method = editingGame ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro ao salvar");

    const saved = await res.json();

    if (editingGame) {
      setGames((prev) =>
        prev.map((g) =>
          g.id === editingGame.id ? { ...saved, createdAt: saved.createdAt, updatedAt: saved.updatedAt } : g
        )
      );
      notify("success", "Jogo atualizado com sucesso!");
    } else {
      setGames((prev) => [{ ...saved, createdAt: saved.createdAt, updatedAt: saved.updatedAt }, ...prev]);
      notify("success", "Jogo adicionado com sucesso!");
    }

    setShowForm(false);
    setEditingGame(null);
  }

  async function handleToggleAvailability(game: Game) {
    const res = await fetch(`/api/games/${game.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ available: !game.available }),
    });

    if (!res.ok) {
      notify("error", "Erro ao atualizar disponibilidade.");
      return;
    }

    setGames((prev) =>
      prev.map((g) => (g.id === game.id ? { ...g, available: !g.available } : g))
    );
    notify("success", `${game.name} marcado como ${!game.available ? "disponível" : "alugado"}.`);
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/games/${id}`, { method: "DELETE" });

    if (!res.ok) {
      notify("error", "Erro ao deletar jogo.");
      return;
    }

    setGames((prev) => prev.filter((g) => g.id !== id));
    setDeleteConfirm(null);
    notify("success", "Jogo removido.");
  }

  function openEdit(game: Game) {
    setEditingGame(game);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingGame(null);
  }

  const filtered = games.filter(
    (g) =>
      search === "" ||
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      (g.category || "").toLowerCase().includes(search.toLowerCase())
  );

  const availableCount = games.filter((g) => g.available).length;
  const rentedCount = games.filter((g) => !g.available).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notificação */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg font-medium text-sm transition-all ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {notification.msg}
        </div>
      )}

      {/* Header admin */}
      <header className="bg-violet-900 text-white px-6 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <Image
            src="/caravela-icon.png"
            alt="Caravela"
            width={40}
            height={40}
            className="rounded-xl"
          />
          <div>
            <h1 className="font-bold text-lg leading-tight">Caravela Tabuleiria</h1>
            <p className="text-violet-300 text-xs">Painel Administrativo</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="text-violet-300 hover:text-white text-sm transition-colors"
          >
            Ver site
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="bg-violet-700 hover:bg-violet-600 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total de jogos", value: games.length, icon: "🎲", color: "bg-violet-50 text-violet-800" },
            { label: "Disponíveis", value: availableCount, icon: "✅", color: "bg-green-50 text-green-800" },
            { label: "Alugados", value: rentedCount, icon: "🔴", color: "bg-red-50 text-red-800" },
            { label: "Assinantes", value: subscriberCount, icon: "📧", color: "bg-blue-50 text-blue-800" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} className={`${color} rounded-2xl p-4 text-center`}>
              <div className="text-2xl mb-1">{icon}</div>
              <div className="text-3xl font-bold">{value}</div>
              <div className="text-xs font-medium opacity-70 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Ações + busca */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍  Buscar jogo..."
            className="input-field max-w-sm bg-white"
          />
          <button
            onClick={() => { setEditingGame(null); setShowForm(true); }}
            className="btn-primary whitespace-nowrap"
          >
            + Adicionar jogo
          </button>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-left">
                  <th className="px-4 py-3 font-semibold text-gray-600">Jogo</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Categoria</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Preço</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Jogadores</th>
                  <th className="px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-600 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                      Nenhum jogo encontrado
                    </td>
                  </tr>
                ) : (
                  filtered.map((game) => (
                    <tr key={game.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-violet-50 shrink-0">
                            {game.imageUrl ? (
                              <Image
                                src={game.imageUrl}
                                alt={game.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-lg">🎲</div>
                            )}
                          </div>
                          <span className="font-medium text-gray-800">{game.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-gray-500 text-xs">{game.category || "—"}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-amber-600">
                        R$ {game.price.toFixed(2).replace(".", ",")}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell text-gray-500 text-xs">
                        {game.minPlayers}–{game.maxPlayers}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleAvailability(game)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                            game.available
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          {game.available ? "Disponível" : "Alugado"}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => openEdit(game)}
                            className="text-violet-600 hover:text-violet-800 text-xs font-medium px-2 py-1 rounded hover:bg-violet-50 transition-colors"
                          >
                            Editar
                          </button>
                          {deleteConfirm === game.id ? (
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleDelete(game.id)}
                                className="text-red-600 hover:text-red-800 text-xs font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                              >
                                Confirmar
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="text-gray-500 text-xs font-medium px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                              >
                                Não
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(game.id)}
                              className="text-red-500 hover:text-red-700 text-xs font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                            >
                              Deletar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de formulário */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeForm}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-violet-800 mb-6">
              {editingGame ? `Editar: ${editingGame.name}` : "Adicionar novo jogo"}
            </h2>
            <GameForm
              game={editingGame}
              onSave={handleSave}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}
    </div>
  );
}
