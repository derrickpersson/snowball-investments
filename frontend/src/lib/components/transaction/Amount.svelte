<script lang="ts">
	import type { Transaction } from "$lib/types";

    export let accountType: "credit" | "debit";
    export let transaction: Transaction;

    let amount: number = 0;
    $: {
        if(accountType === "credit") {
            amount = transaction.creditAmount || -transaction.debitAmount;
        } else {
            amount = transaction.debitAmount || -transaction.creditAmount;
        }
    }

    let displayAmount: [string, string];
    $: displayAmount = Number(amount).toFixed(2).toString().split(".") as [string, string];
</script>


<div class="flex flex-row">
    <div>{displayAmount[0]}</div>
    <div class="text-sm self-center">.{displayAmount[1]}</div>
</div>