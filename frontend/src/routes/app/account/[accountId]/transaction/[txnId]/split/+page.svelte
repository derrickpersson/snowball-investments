<script lang="ts">
    import type { PageData, PageServerData } from "./$types";
	import ContactItem from "$lib/components/splits/ContactItem.svelte";
	import type { Writable } from "svelte/store";
	import DetailedAmount from "$lib/components/transaction/DetailedAmount.svelte";
    import AdjustIcon from "$lib/assets/adjust.svg?raw";
    import MoneyIcon from "$lib/assets/cash.svg?raw";
	import ActionButton from "$lib/components/ActionButton.svelte";
	import { SplitType, type Contact, type Split } from "$lib/types";
	import { superForm } from "sveltekit-superforms/client";
    import { getToastStore } from '@skeletonlabs/skeleton';
	import { toastHandler, getInitialSplit,addSplitShare, removeSplitShare, calculateRequestedTotalFromSplitShares } from "$lib/components/splits/utils";
	import { getContext } from "svelte";
	import { page } from "$app/stores";

    const toastStore = getToastStore();

    export let data: PageData & PageServerData;

    $: ({ contacts, transaction } = data);

    const selectedContacts = getContext("selectedContacts") as Writable<Contact[]>;
    const splitStore = getContext("splitStore") as Writable<Split>;

    $: {
        if(!$splitStore) {
            splitStore.set(getInitialSplit(transaction.creditAmount, $selectedContacts));
        }
    }

    const { form, enhance } = superForm(data.form, {
        dataType: 'json',
        taintedMessage: null,
        onResult: async ({ result }) => {
            const toastSettings = toastHandler(result);
            toastSettings && toastStore.trigger(toastSettings);
        }
    });
    $: $form.transactionId = transaction?.id;
    $: $form.type = $splitStore?.type || SplitType.Evenly;
    $: {
        $form.splitShares = $splitStore?.splitShares || [];
    }

    const handleSelection = (contact: Contact, checked: boolean) => {
        if(checked) {
            splitStore.update((split) => {
                return addSplitShare(split, contact, transaction.creditAmount);
            });
        } else {
            splitStore.update((split) => {
                return removeSplitShare(split, contact, transaction.creditAmount);
            });
        }
    }

</script>

<div class="flex flex-col gap-2 mt-4">
    {#each (contacts || []) as contact (contact.id)}
        <ContactItem 
            type={$splitStore.type}
            contact={contact}
            label={$splitStore.splitShares.find((s) => s.contactId === contact.id)?.amount}
            onSelect={handleSelection}
            checked={!!$selectedContacts.find((c) => c.id === contact.id)}
        />
    {/each}
</div>
{#if $selectedContacts.length > 0}
    <div class="flex flex-row justify-between items-center mt-4">
        <div class="text-lg">You're requesting</div>
        <div class="text-sm">
            <DetailedAmount amount={calculateRequestedTotalFromSplitShares($splitStore?.type, transaction.creditAmount, $splitStore?.splitShares)} />
        </div>
    </div>
    <div class="flex flex-col gap-2">
        <ActionButton
            icon={AdjustIcon}
            title="Adjust split"
            href={`/app/account/${$page.params.accountId}/transaction/${$page.params.txnId}/split/adjust`}
        />
        <form method="POST" action="?/createSplit" use:enhance>
            <ActionButton
                type="submit"
                icon={MoneyIcon}
                title="Request funds"
            />
        </form>
    </div>
{/if}