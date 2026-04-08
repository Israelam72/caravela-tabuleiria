import { prisma } from "@/lib/prisma";
import { CatalogClient } from "@/components/CatalogClient";

export const revalidate = 60;

export default async function HomePage() {
  const games = await prisma.game.findMany({
    orderBy: [{ available: "desc" }, { createdAt: "desc" }],
  });

  const serialized = games.map((g) => ({
    ...g,
    createdAt: g.createdAt.toISOString(),
    updatedAt: g.updatedAt.toISOString(),
  }));

  return <CatalogClient initialGames={serialized} />;
}
