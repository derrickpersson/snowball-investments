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
	import { getInitialAmounts, getSplitSharesArray, calculateRequestedTotal, hasExactMembers, getEvenShare, toastHandler } from "$lib/components/splits/utils";
	import { getContext } from "svelte";
	import { page } from "$app/stores";

    const toastStore = getToastStore();

    export let data: PageData & PageServerData;

    $: ({ contacts, transaction } = data);

    const selectedContacts = getContext("selectedContacts") as Writable<Contact[]>;
    const split = getContext("splitStore") as Writable<Split>;

    let totalSelected: number = 0;
    $: {
        totalSelected = $selectedContacts.length + 1; // Include current user in the split
    }

    let splitAmounts: { [contactId: string]: number } = {};
    $: {
        splitAmounts = getInitialAmounts($split?.splitShares);
    }

    let requestedTotal: number = 0;
    $: {
        splitAmounts = $selectedContacts.reduce((acc, contact) => {
            // If all contacts are selected from the current split shares, use those split share amounts
            if(hasExactMembers($selectedContacts, $split?.splitShares)) {
                acc[contact.id] = $split?.splitShares.find((s) => s.contactId === contact.id)?.amount || 0;
                return acc;
            }
            acc[contact.id] = getEvenShare(transaction?.creditAmount, totalSelected);
            return acc;
        }, {} as { [contactId: string]: number });
        requestedTotal = calculateRequestedTotal(splitAmounts);
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
    $form.type = SplitType.Evenly;
    
    $: {
        $form.splitShares = getSplitSharesArray(splitAmounts);
    }

    const handleSelection = (contact: Contact, checked: boolean) => {
        selectedContacts.update((contacts: Contact[]) => {
            if(checked) {
                return [...contacts, contact];
            } else {
                return contacts.filter((c) => c.id !== contact.id);
            }
        });
    }

</script>

<div class="flex flex-col gap-2 mt-4">
    {#each (contacts || []) as contact (contact.id)}
        <ContactItem 
            contact={contact}
            label={splitAmounts[contact.id]}
            onSelect={handleSelection}
            checked={!!$selectedContacts.find((c) => c.id === contact.id)}
        />
    {/each}
</div>
{#if totalSelected > 1}
    <div class="flex flex-row justify-between items-center mt-4">
        <div class="text-lg">You're requesting</div>
        <div class="text-sm">
            <DetailedAmount amount={requestedTotal} />
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