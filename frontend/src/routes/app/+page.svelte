<script lang="ts">
	import type { PageData } from "./$types";


    let data: PageData;
</script>

<h1>HOME PAGE!</h1>

{#if data?.accounts}
    {#each (data?.accounts || []) as account}
        <p>{account.name}</p>
    {/each}
{/if}