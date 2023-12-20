import type { PageServerLoad } from './$types';
import { dev } from '$app/environment';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client/edge';
import ws from 'ws';
import { env } from '$env/dynamic/private';

if (dev) {
    await import("dotenv").then((dotenv) => dotenv.config());
}

let pool: Pool;
let adapter: PrismaNeon;
let prisma: PrismaClient;

export const load: PageServerLoad = async ({}) => {
    neonConfig.webSocketConstructor = ws;
    const connectionString = `${env.DATABASE_URL}`;
    pool = pool || new Pool({ connectionString });
    adapter = adapter || new PrismaNeon(pool);
    prisma = prisma || new PrismaClient({ adapter });

    return {
        toDoListEntries: await prisma.toDoListEntry.findMany(),
    };
}