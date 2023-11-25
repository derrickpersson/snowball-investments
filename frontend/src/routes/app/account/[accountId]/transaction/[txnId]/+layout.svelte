<script lang="ts">
	import TransactionHeader from "$lib/components/transaction/Header.svelte";
	import type { LayoutData } from "./$types";

    export let data: LayoutData;

    $: ({ transaction } = data);

</script>

<div class="container mx-auto max-w-md">
    <TransactionHeader 
        transaction={transaction}
    />

    <slot />
</div>