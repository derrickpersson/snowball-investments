<script lang="ts">
	import { navigating } from "$app/stores";
    import TransactionHeader from "$lib/components/transaction/Header.svelte";
	import type { LayoutData } from "./$types";

    export let data: LayoutData;

    $: ({ transaction } = data);

</script>

<div class="container mx-auto max-w-md">
    <TransactionHeader 
        transaction={transaction}
        backLocation={$navigating?.from?.url.pathname}
    />

    <slot />
</div>