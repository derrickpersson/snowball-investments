<script lang="ts">
	import { getContext } from "svelte";
	import type { PageData } from "./$types";
    import type { Writable } from "svelte/store";


    export let data: PageData;

    const userContext = getContext("user") as Writable<any>;

    const selectedAccount = data?.accounts ? data.accounts[0] : null;

    $: console.log(data);
</script>

<div class="container mx-auto max-w-md">
    <div>
        <h4>👋 Hey {$userContext?.firstName}!</h4>
        <p>
            ${selectedAccount.balance}
        </p>
    </div>
    <div>
        
    </div>
</div>

{#if data?.accounts}
    {#each (data?.accounts || []) as account}
        <p>{account.accountNumber}</p>
    {/each}
{/if}