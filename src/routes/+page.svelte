<script lang="ts">
    import { enhance } from "$app/forms";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>
<h1>SvelteKit and Prisma running on the Edge 🎉</h1>

<pre>{JSON.stringify(data, null, 2)}</pre>

<form use:enhance action="?/createToDoListEntry" method="POST">
    <input type="text" name="title" placeholder="Your name" />
    <button type="submit">Add</button>
</form>