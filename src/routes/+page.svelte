<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>
<h1>SvelteKit and Prisma running on the Edge 🎉</h1>
<small>Database: Postgres hosted at Contabo (Düsseldorf), but page rendered using Cloudflare Pages ({data.pageRenderedAt})</small>

<ul>
    {#each data.toDoListEntries as toDoListEntry}
        <li>
            {toDoListEntry.title}
            <form use:enhance action="?/deleteToDoListEntry" method="POST" style="display: inline">
                <input type="hidden" name="id" value="{toDoListEntry.id}" />
                <button type="submit">Delete</button>
            </form>
        </li>
    {/each}
</ul>

<form use:enhance action="?/createToDoListEntry" method="POST">
    <input type="text" name="title" placeholder="Your name" />
    <button type="submit">Add</button>
</form>