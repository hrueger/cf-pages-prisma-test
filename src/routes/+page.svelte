<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>
<h1>SvelteKit and Prisma running on the Edge 🎉</h1>

<pre>{JSON.stringify(data, null, 2)}</pre>