import { PrismaClient } from "@prisma/client";

// En desarrollo, Next.js recarga los módulos con cada cambio de archivo
// (hot reload). Sin este patrón, cada recarga crearía una nueva conexión
// a la base de datos y eventualmente se agotarían las conexiones
// disponibles. Guardamos la instancia en `globalThis` para reutilizarla
// entre recargas dentro del mismo proceso de desarrollo.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
