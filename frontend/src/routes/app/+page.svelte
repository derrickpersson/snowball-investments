<script lang="ts">
	import type { PageData } from "./$types";


    export let data: PageData;

    $: console.log(data);
</script>

<h1>HOME PAGE!</h1>

{#if data?.accounts}
    {#each (data?.accounts || []) as account}
        <p>{account.accountNumber}</p>
    {/each}
{/if}