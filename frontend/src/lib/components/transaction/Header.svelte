<script lang="ts">
    import type { Transaction } from "$lib/types";
    import LeftArrowIcon from "$lib/assets/left-arrow.svg?raw";
	import DetailedAmount from "./DetailedAmount.svelte";

    export let transaction: Transaction;
</script>

<button class="text-5xl mb-4 block" on:click={() => {
    history.back();
}}>
    {@html LeftArrowIcon}
</button>
<div class="flex flex-row justify-between items-end">
    <div class="flex flex-col justify-start gap-2">
        {#if transaction.vendor.logoURL}
            <img src={transaction.vendor.logoURL} alt={transaction.vendor.name} class="w-10 h-10" />
        {/if}
        <h3>{transaction.vendor.name}</h3>
    </div>
    <div>
        <DetailedAmount amount={transaction.debitAmount || transaction.creditAmount || 0} />
    </div>
</div>