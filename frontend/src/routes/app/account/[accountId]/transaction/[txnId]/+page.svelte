<script lang="ts">
	import { navigating } from "$app/stores";
	import DetailedAmount from "$lib/components/transaction/DetailedAmount.svelte";
	import type { PageData } from "./$types";
    import LeftArrowIcon from "$lib/assets/left-arrow.svg?raw";
	import TransactionActions from "$lib/components/transaction/TransactionActions.svelte";


    export let data: PageData;

    $: ({ transaction } = data);

    let transactionType: "credit" | "debit";
    $: {
        if(transaction.debitAmount) {
            transactionType = "debit";
        } else {
            transactionType = "credit";
        }
    }

</script>

<div class="container mx-auto max-w-md">
    <a class="text-5xl mb-4 block" href={`${$navigating?.from?.route || `/app`}`}>
        {@html LeftArrowIcon}
    </a>
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

    <div class="py-6 flex flex-col gap-4">
        <TransactionActions 
            transactionType={transactionType}
            transaction={transaction}
        />
    </div>
    <div class="pt-4">
        <p class="text-error-500">Don't recognise this payment? Get help</p>
    </div>
</div>