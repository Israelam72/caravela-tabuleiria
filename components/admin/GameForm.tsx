"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Game, GameFormData } from "@/types";

const CATEGORIES = ["Estratégia", "Família", "Cooperativo", "Criativo", "Festa", "Cartas", "Temático", "Outro"];

interface GameFormProps {
  game?: Game | null;
  onSave: (data: GameFormData) => Promise<void>;
  onCancel: () => void;
}

const defaultForm: GameFormData = {
  name: "",
  description: "",
  imageUrl: "",
  price: 0,
  minPlayers: 2,
  maxPlayers: 4,
  minAge: 10,
  duration: "60 min",
  category: "Estratégia",
  available: true,
};

export function GameForm({ game, onSave, onCancel }: GameFormProps) {
  const [form, setForm] = useState<GameFormData>(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (game) {
      setForm({
        name: game.name,
        description: game.description,
        imageUrl: game.imageUrl || "",
        price: game.price,
        minPlayers: game.minPlayers,
        maxPlayers: game.maxPlayers,
        minAge: game.minAge,
        duration: game.duration,
        category: game.category || "Estratégia",
        available: game.available,
      });
    } else {
      setForm(defaultForm);
    }
  }, [game]);

  function update<K extends keyof GameFormData>(key: K, value: GameFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.description.trim()) {
      setError("Nome e descrição são obrigatórios.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onSave(form);
    } catch {
      setError("Erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Preview de imagem */}
      {form.imageUrl && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden bg-violet-50">
          <Image
            src={form.imageUrl}
            alt="Preview"
            fill
            className="object-cover"
            onError={() => update("imageUrl", "")}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="label">Nome do jogo *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="input-field"
            placeholder="Ex: Catan"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label">Descrição *</label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className="input-field resize-none"
            rows={3}
            placeholder="Descreva o jogo..."
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className="label">URL da imagem</label>
          <input
            type="url"
            value={form.imageUrl}
            onChange={(e) => update("imageUrl", e.target.value)}
            className="input-field"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <div>
          <label className="label">Preço (R$) *</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => update("price", parseFloat(e.target.value) || 0)}
            className="input-field"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="label">Categoria</label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="input-field"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label">Mín. jogadores</label>
          <input
            type="number"
            value={form.minPlayers}
            onChange={(e) => update("minPlayers", parseInt(e.target.value) || 2)}
            className="input-field"
            min="1"
            max="20"
          />
        </div>

        <div>
          <label className="label">Máx. jogadores</label>
          <input
            type="number"
            value={form.maxPlayers}
            onChange={(e) => update("maxPlayers", parseInt(e.target.value) || 4)}
            className="input-field"
            min="1"
            max="20"
          />
        </div>

        <div>
          <label className="label">Idade mínima</label>
          <input
            type="number"
            value={form.minAge}
            onChange={(e) => update("minAge", parseInt(e.target.value) || 8)}
            className="input-field"
            min="3"
            max="18"
          />
        </div>

        <div>
          <label className="label">Duração</label>
          <input
            type="text"
            value={form.duration}
            onChange={(e) => update("duration", e.target.value)}
            className="input-field"
            placeholder="Ex: 45-90 min"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => update("available", !form.available)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                form.available ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  form.available ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {form.available ? "Disponível para aluguel" : "Marcado como alugado"}
            </span>
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex-1"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Salvando..." : game ? "Salvar alterações" : "Adicionar jogo"}
        </button>
      </div>
    </form>
  );
}
