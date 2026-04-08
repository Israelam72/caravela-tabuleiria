import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const games = await prisma.game.findMany({
      orderBy: [{ available: "desc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(games);
  } catch {
    return NextResponse.json({ error: "Erro ao buscar jogos" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, imageUrl, price, minPlayers, maxPlayers, minAge, duration, category, available } = body;

    if (!name || !description || price === undefined) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes" }, { status: 400 });
    }

    const game = await prisma.game.create({
      data: {
        name,
        description,
        imageUrl: imageUrl || null,
        price: parseFloat(price),
        minPlayers: parseInt(minPlayers) || 2,
        maxPlayers: parseInt(maxPlayers) || 4,
        minAge: parseInt(minAge) || 10,
        duration: duration || "60 min",
        category: category || null,
        available: available ?? true,
      },
    });

    // Notificar assinantes se RESEND_API_KEY estiver configurado
    if (process.env.RESEND_API_KEY) {
      try {
        const subscribers = await prisma.subscriber.findMany();
        if (subscribers.length > 0) {
          const { Resend } = await import("resend");
          const resend = new Resend(process.env.RESEND_API_KEY);
          const emails = subscribers.map((s) => s.email);

          await resend.emails.send({
            from: process.env.EMAIL_FROM || "Caravela Tabuleiria <noreply@caravela.com>",
            to: emails,
            subject: `Novidade na Caravela! 🎲 ${game.name} chegou`,
            html: `
              <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
                <h1 style="color: #6d28d9;">Caravela Tabuleiria</h1>
                <p>Temos um novo jogo disponível para aluguel:</p>
                <h2 style="color: #1e1b4b;">${game.name}</h2>
                ${game.imageUrl ? `<img src="${game.imageUrl}" alt="${game.name}" style="width: 100%; border-radius: 8px; margin: 16px 0;" />` : ""}
                <p>${game.description}</p>
                <p><strong>Preço:</strong> R$ ${game.price.toFixed(2).replace(".", ",")}</p>
                <a href="${process.env.NEXTAUTH_URL || "https://caravela.com"}" style="background: #6d28d9; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; margin-top: 16px;">
                  Ver catálogo completo
                </a>
              </div>
            `,
          });
        }
      } catch (emailError) {
        console.error("Erro ao enviar emails:", emailError);
      }
    }

    return NextResponse.json(game, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro ao criar jogo" }, { status: 500 });
  }
}
