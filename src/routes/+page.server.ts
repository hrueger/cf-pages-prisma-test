import { Pool } from '@prisma/pg-worker';
import type { PageServerLoad, Actions } from './$types';
import { PrismaClient, type ToDoListEntry } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg-worker';
import { dev } from '$app/environment';

export const load: PageServerLoad = async ({ platform }) => {
    const prisma = getPrisma(platform!);

    return {
        toDoListEntries: await prisma.toDoListEntry.findMany(),
        pageRenderedAt: (platform as any)?.cf?.colo || 'unknown',
    };
}

const RUNS = 10;

export const actions = {
    createToDoListEntry: async ({ request, platform }) => {
        const prisma = getPrisma(platform!);
        const title = await request.formData().then((formData) => formData.get('title')) as string;
        let toDoListEntry: ToDoListEntry | undefined = undefined;
        for (let i = 0; i < RUNS; i++) {
            if (toDoListEntry) {
                await prisma.toDoListEntry.delete({
                    where: {
                        id: toDoListEntry.id,
                    },
                });
            }
            toDoListEntry = await prisma.toDoListEntry.create({
                data: {
                    title,
                },
            });
        }
        return {
            toDoListEntry,
        };
    },
    deleteToDoListEntry: async ({ request, platform }) => {
        const prisma = getPrisma(platform!);
        const id = await request.formData().then((formData) => formData.get('id')) as string;
        await prisma.toDoListEntry.delete({
            where: {
                id: parseInt(id),
            },
        });
    }
} satisfies Actions;

function getPrisma(platform: App.Platform): PrismaClient {
    const connectionString = platform.env.HYPERDRIVE.connectionString;

    if (dev) {
        return new PrismaClient({
            datasourceUrl: connectionString,
            log: ['query'],
        });
    }
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })
    return prisma;
}
