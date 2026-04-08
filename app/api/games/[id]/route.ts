import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, imageUrl, price, minPlayers, maxPlayers, minAge, duration, category, available } = body;

    const game = await prisma.game.update({
      where: { id: params.id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl || null }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(minPlayers !== undefined && { minPlayers: parseInt(minPlayers) }),
        ...(maxPlayers !== undefined && { maxPlayers: parseInt(maxPlayers) }),
        ...(minAge !== undefined && { minAge: parseInt(minAge) }),
        ...(duration !== undefined && { duration }),
        ...(category !== undefined && { category: category || null }),
        ...(available !== undefined && { available }),
      },
    });

    return NextResponse.json(game);
  } catch {
    return NextResponse.json({ error: "Erro ao atualizar jogo" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    await prisma.game.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erro ao deletar jogo" }, { status: 500 });
  }
}
