<script lang="ts">
    import type { PageData, PageServerData } from "./$types";
    import TransactionHeader from "$lib/components/transaction/Header.svelte";
	import { navigating } from "$app/stores";
	import ContactItem from "$lib/components/splits/ContactItem.svelte";
	import { writable, type Writable } from "svelte/store";
	import DetailedAmount from "$lib/components/transaction/DetailedAmount.svelte";
    import AdjustIcon from "$lib/assets/adjust.svg?raw";
    import MoneyIcon from "$lib/assets/cash.svg?raw";
	import ActionButton from "$lib/components/ActionButton.svelte";
	import type { Contact } from "$lib/types";
	import { superForm } from "sveltekit-superforms/client";
    import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
    import SuccessMessage from "$lib/components/splits/Success.html?raw";
	import { getInitialAmounts, getSplitSharesArray, calculateRequestedTotal, getInitialSelected, hasExactMembers, getEvenShare } from "$lib/components/splits/utils";

    const toastStore = getToastStore();

    export let data: PageData & PageServerData;

    $: ({ contacts, transaction, split } = data);

    const { form, enhance } = superForm(data.form, {
        dataType: 'json',
        onResult: async ({ result }) => {
            if(result.type === "success") {
                const t: ToastSettings = {
                    message: SuccessMessage,
                    background: 'variant-filled-primary',
                    classes: "text-on-primary-token rounded-lg w-full",
                    hideDismiss: true,
                    timeout: 3000
                };
                toastStore.trigger(t);
            }
        }
    });
    $: $form.transactionId = transaction?.id;
    $form.type = "evenly";

    const selectedContacts = writable([]) as Writable<Contact[]>;
    $: selectedContacts.update(() => getInitialSelected(contacts, split?.splitShares || []));

    let totalSelected: number = 0;
    $: {
        totalSelected = $selectedContacts.length + 1; // Include current user in the split
    }

    let splitAmounts: { [contactId: string]: number } = {};
    $: {
        splitAmounts = getInitialAmounts(split?.splitShares);
    }

    let requestedTotal: number = 0;
    $: {
        splitAmounts = $selectedContacts.reduce((acc, contact) => {
            // If all contacts are selected from the existing split shares, use those split share amounts
            if(hasExactMembers($selectedContacts, split?.splitShares)) {
                acc[contact.id] = split?.splitShares.find((s) => s.contactId === contact.id)?.amount || 0;
                return acc;
            }
            acc[contact.id] = getEvenShare(transaction?.creditAmount, totalSelected);
            return acc;
        }, {} as { [contactId: string]: number });
        requestedTotal = calculateRequestedTotal(splitAmounts);
    }
    
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

<div class="container mx-auto max-w-md">
    <TransactionHeader
        transaction={transaction}
        backLocation={$navigating?.from?.url.pathname}
    />
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
            />
            <form method="POST" use:enhance>
                <ActionButton
                    type="submit"
                    icon={MoneyIcon}
                    title="Request funds"
                />
            </form>
        </div>
    {/if}
</div>