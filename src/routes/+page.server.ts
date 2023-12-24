import type { PageServerLoad, Actions } from './$types';
import { dev } from '$app/environment';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client/edge';
import ws from 'ws';
import { DATABASE_URL } from '$env/static/private';

if (dev) {
    await import("dotenv").then((dotenv) => dotenv.config());
}

export const load: PageServerLoad = async ({}) => {
    const prisma = getPrisma();

    return {
        toDoListEntries: await prisma.toDoListEntry.findMany(),
    };
}

export const actions = {
    createToDoListEntry: async ({ request }) => {
        const prisma = getPrisma();
        const title = await request.formData().then((formData) => formData.get('title')) as string;
        const toDoListEntry = await prisma.toDoListEntry.create({
            data: {
                title,
            },
        });
        return {
            toDoListEntry,
        };
    },
} satisfies Actions;

function getPrisma() {
    neonConfig.webSocketConstructor = ws;
    const connectionString = `${DATABASE_URL}`;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool);
    const prisma = new PrismaClient({ adapter });
    return prisma;
}
