import { prisma } from "@/lib/prisma";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [games, subscriberCount] = await Promise.all([
    prisma.game.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.subscriber.count(),
  ]);

  const serialized = games.map((g) => ({
    ...g,
    createdAt: g.createdAt.toISOString(),
    updatedAt: g.updatedAt.toISOString(),
  }));

  return <AdminDashboard initialGames={serialized} subscriberCount={subscriberCount} />;
}
