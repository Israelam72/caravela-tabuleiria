import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    // Enviar email de boas-vindas se RESEND_API_KEY estiver configurado
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: process.env.EMAIL_FROM || "Caravela Tabuleiria <noreply@caravela.com>",
          to: email,
          subject: "Bem-vindo à Caravela Tabuleiria! 🎲",
          html: `
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
              <h1 style="color: #6d28d9;">Caravela Tabuleiria</h1>
              <p>Olá! Seu email foi cadastrado com sucesso.</p>
              <p>A partir de agora você receberá novidades sobre nosso catálogo de jogos de tabuleiro para aluguel.</p>
              <p>Fique de olho para não perder nenhum lançamento!</p>
              <a href="${process.env.NEXTAUTH_URL || "https://caravela.com"}" style="background: #6d28d9; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; margin-top: 16px;">
                Ver catálogo
              </a>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Erro ao enviar email de boas-vindas:", emailError);
      }
    }

    return NextResponse.json({ success: true, id: subscriber.id });
  } catch {
    return NextResponse.json({ error: "Erro ao cadastrar email" }, { status: 500 });
  }
}
