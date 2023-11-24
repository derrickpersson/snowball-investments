<script lang="ts">
	import { navigating } from "$app/stores";
	import DetailedAmount from "$lib/components/transaction/DetailedAmount.svelte";
	import type { PageData } from "./$types";
    import LeftArrowIcon from "$lib/assets/left-arrow.svg?raw";
	import TransactionActions from "$lib/components/transaction/TransactionActions.svelte";
	import TransactionHeader from "$lib/components/transaction/Header.svelte";


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
    <TransactionHeader 
        transaction={transaction}
        backLocation={$navigating?.from?.url.pathname}
    />

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