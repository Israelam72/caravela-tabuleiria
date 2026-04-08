"use client";

import { useState, useEffect } from "react";

interface SubscribeModalProps {
  onClose: () => void;
}

export function SubscribeModal({ onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.error || "Erro ao cadastrar.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Erro de conexão. Tente novamente.");
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-violet-800 mb-2">
              Cadastro realizado!
            </h2>
            <p className="text-gray-600 mb-6">
              Você receberá novidades sobre nosso catálogo de jogos.
            </p>
            <button onClick={onClose} className="btn-primary">
              Ótimo, obrigado!
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎲</div>
              <h2 className="text-2xl font-bold text-violet-800">
                Receba Novidades
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Cadastre seu email e seja o primeiro a saber quando novos jogos
                chegarem ao catálogo!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label">Seu email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="voce@exemplo.com"
                  required
                />
              </div>

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-3 py-2 text-sm">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Cadastrando..." : "Cadastrar"}
              </button>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              Sem spam. Apenas novidades do nosso catálogo.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
