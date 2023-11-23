<script lang="ts">
	import { navigating } from "$app/stores";
	import DetailedAmount from "$lib/components/transaction/DetailedAmount.svelte";
	import { capitalize } from "$lib/strings";
	import type { PageData } from "./$types";


    export let data: PageData;

    $: ({ transaction } = data);
</script>

<div class="container mx-auto max-w-md">
    <a class="text-5xl mb-4 block" href={`${$navigating?.from?.route || `/app`}`}>
        &larr;
    </a>
    <div class="flex flex-row justify-between items-end">
        <div class="flex flex-col justify-start gap-2">
            <img src={transaction.vendor.logoURL} alt={transaction.vendor.name} class="w-10 h-10" />
            <h3>{transaction.vendor.name}</h3>
        </div>
        <div>
            <DetailedAmount amount={transaction.debitAmount || transaction.creditAmount || 0} />
        </div>
    </div>

    <div class="py-6 flex flex-col gap-4">
        <button class="bg-surface-500 w-full rounded-lg px-3 py-2 flex flex-row gap-4 items-center">
            <div class="bg-primary-500 rounded-lg w-10 h-10">

            </div>
            <div class="flex flex-col items-start">
                <h6 class="leading-5">{capitalize(transaction.category)}</h6>
                <p class="text-xs">Change category</p>
            </div>
        </button>
    </div>
    <div class="pt-4">
        <p class="text-error-500">Don't recognise this payment? Get help</p>
    </div>
</div>