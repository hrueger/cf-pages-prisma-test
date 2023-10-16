import type { PageServerLoad } from './$types';
import { dev } from '$app/environment';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

if (dev) {
    await import("dotenv").then((dotenv) => dotenv.config());
}

export const load: PageServerLoad = async () => {
    neonConfig.webSocketConstructor = ws;
    const connectionString = `${process.env.DATABASE_URL}`;

    // Init prisma client
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool);
    const prisma = new PrismaClient({ adapter });

    return {
        toDoListEntries: prisma.toDoListEntry.findMany(),
    };
}