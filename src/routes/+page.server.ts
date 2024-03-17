import type { PageServerLoad, Actions } from './$types';
import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

export const load: PageServerLoad = async ({ platform }) => {
    const prisma = getPrisma(platform);

    return {
        toDoListEntries: await prisma.toDoListEntry.findMany(),
    };
}

export const actions = {
    createToDoListEntry: async ({ request, platform }) => {
        const prisma = getPrisma(platform);
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
    deleteToDoListEntry: async ({ request, platform }) => {
        const prisma = getPrisma(platform);
        const id = await request.formData().then((formData) => formData.get('id')) as string;
        await prisma.toDoListEntry.delete({
            where: {
                id: parseInt(id),
            },
        });
    }
} satisfies Actions;

function getPrisma(platform?: App.Platform): PrismaClient {
    const adapter = new PrismaD1(platform!.env.MY_DB);
    const prisma = new PrismaClient({ adapter });
    return prisma;
}
