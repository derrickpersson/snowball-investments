<script lang="ts">
	import type { PageData } from "./$types";
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

<div class="py-6 flex flex-col gap-4">
    <TransactionActions 
        transactionType={transactionType}
        transaction={transaction}
    />
</div>
<div class="pt-4">
    <p class="text-error-500">Don't recognise this payment? Get help</p>
</div>