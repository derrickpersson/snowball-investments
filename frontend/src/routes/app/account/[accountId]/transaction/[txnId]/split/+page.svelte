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

    export let data: PageData & PageServerData;

    $: ({ contacts, transaction } = data);

    const { form, enhance } = superForm(data.form, {
        dataType: 'json',
        onResult: async ({ result }) => {
            if(result.type === "success") {
                alert("Success!");
            }
        }
    });
    $: $form.transactionId = transaction?.id;
    $form.type = "evenly";

    const selectedContacts = writable([]) as Writable<Contact[]>;

    const handleSelection = (contact: Contact, checked: boolean) => {
        selectedContacts.update((contacts: Contact[]) => {
            if(checked) {
                return [...contacts, contact];
            } else {
                return contacts.filter((c) => c.id !== contact.id);
            }
        })
    }

    let totalSelected: number = 0;
    $: {
        totalSelected = $selectedContacts.length + 1;
    }


    let splitAmounts: { [contactId: string]: number } = {};
    let requestedTotal: number = 0;
    $: {
        splitAmounts = $selectedContacts.reduce((acc, contact) => {
            acc[contact.id] = transaction.creditAmount / totalSelected;
            return acc;
        }, {} as { [contactId: string]: number });
        requestedTotal = Number(Object.values(splitAmounts).reduce((acc, amount) => acc + amount, 0).toPrecision(10));
    }
    
    $: {
        $form.splitShares = Object.entries(splitAmounts).map(([contactId, amount]) => ({
            contactId,
            amount
        }));
    }

</script>

<div class="container mx-auto max-w-md">
    <TransactionHeader
        transaction={transaction}
        backLocation={$navigating?.from?.url.pathname}
    />
    <div class="flex flex-col gap-2 mt-4">
        {#each (contacts || []) as contact}
            <ContactItem 
                contact={contact}
                label={splitAmounts[contact.id]}
                onSelect={handleSelection}
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