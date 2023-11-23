<script lang="ts">
    import type { Transaction } from "$lib/types";
    import type { Account } from "$lib/types";
    import Amount from "./Amount.svelte";

    export let transaction: Transaction;
    export let selectedAccount: Account | null = null;
</script>

<a class="flex flex-row justify-between w-full hover:bg-surface-active-token cursor-pointer px-2" href={`/app/account/${selectedAccount?.id}/transaction/${transaction.id}`}>
    <div class="flex flex-row gap-4 py-2 items-center">
        {#if transaction.vendor.logoURL}
            <img src={transaction.vendor.logoURL} alt={transaction.vendor.name} class="w-10 h-10" />
        {/if}
        <div>{transaction.vendor.name}</div>
    </div>
    <div class="flex flex-row items-center">
        <Amount 
            accountType={selectedAccount?.category}
            transaction={transaction}
        />
    </div>
</a>