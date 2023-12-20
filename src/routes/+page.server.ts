import type { PageServerLoad } from './$types';
import { building, dev } from '$app/environment';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client/edge';
import ws from 'ws';
import { env } from '$env/dynamic/private';

if (dev) {
    await import("dotenv").then((dotenv) => dotenv.config());
}

let prisma: PrismaClient;
if (!building) {
    neonConfig.webSocketConstructor = ws;
    const connectionString = `${env.DATABASE_URL}`;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool);
    prisma = new PrismaClient({ adapter });
}

export const load: PageServerLoad = async () => {
    return {
        toDoListEntries: await prisma.toDoListEntry.findMany(),
    };
}