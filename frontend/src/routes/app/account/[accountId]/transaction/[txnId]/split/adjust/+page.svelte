<script lang="ts">
	import AdjustItem from "$lib/components/splits/AdjustItem.svelte";
    import type { PageData } from "./$types";
	import type { Writable } from "svelte/store";
	import DetailedAmount from "$lib/components/transaction/DetailedAmount.svelte";
    import MoneyIcon from "$lib/assets/cash.svg?raw";
	import ActionButton from "$lib/components/ActionButton.svelte";
	import { getContext } from "svelte";
	import { SplitType, type Contact, type Split } from "$lib/types";
	import { calculateRequestedTotalFromSplitShares, toastHandler, updateSplitShares } from "$lib/components/splits/utils";
	import { RadioGroup, RadioItem, getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
	import type { LayoutData } from "../$types";
	import { superForm } from "sveltekit-superforms/client";

    const toastStore = getToastStore();

    export let data: PageData & LayoutData;
    $: ({ transaction } = data);

    const selectedContacts = getContext("selectedContacts") as Writable<Contact[]>;
    const splitStore = getContext("splitStore") as Writable<Split>;

    let type: SplitType = $splitStore?.type || SplitType.Evenly;

    let userShare = 0;
    $: {
        if($splitStore.type === SplitType.Percentage) {
            // If it's type is percentage, we need to display a percentage
            userShare = Number((((transaction.creditAmount - calculateRequestedTotalFromSplitShares(type, transaction.creditAmount, $splitStore.splitShares)) / transaction.creditAmount) * 100).toFixed(2));
        } else {
            userShare = Number((transaction.creditAmount - calculateRequestedTotalFromSplitShares(type, transaction.creditAmount, $splitStore.splitShares)).toFixed(2));
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
    $: $form.type = $splitStore.type;
    $: {
        $form.splitShares = $splitStore.splitShares;
    }


    const handleUserSplitShareUpdate = (_:string, amount: number) => {
        userShare = amount;
    }

    const handleSplitTypeUpdate = (type: SplitType) => {
        splitStore.update((split) => {
            const newSplit = updateSplitShares(type, split, transaction.creditAmount);

            return {
                ...newSplit,
                type
            }
        });
    }

    const handleSplitShareUpdate = (contactId: string, amount: number) => {
        splitStore.update((split) => {
            const updatedSplitShares = split.splitShares.map((s) => {
                if(s.contactId === contactId) {
                    return {
                        ...s,
                        amount
                    }
                }
                return s;
            });

            return {
                ...split,
                splitShares: updatedSplitShares
            }
        })
    }
</script>


<div class="flex flex-col gap-2 mt-4">
    <RadioGroup display="flex" active="variant-filled-primary" hover="hover:variant-soft-primary" >
        <RadioItem 
            name="type"
            on:change={() => handleSplitTypeUpdate(SplitType.Evenly)}
            bind:group={type}
            value={SplitType.Evenly}
        >
            Split evenly
        </RadioItem>
        <RadioItem 
            name="type"
            on:change={() => handleSplitTypeUpdate(SplitType.Percentage)}
            bind:group={type}
            value={SplitType.Percentage}
        >
            Split by %
        </RadioItem>
        <RadioItem 
            name="type"
            on:change={() => handleSplitTypeUpdate(SplitType.Amount)}
            bind:group={type}
            value={SplitType.Amount}
        >
            Split by $
        </RadioItem>

    </RadioGroup>
        <AdjustItem
            isUser={true}
            contact={{ id: 0, firstName: "Your share"}}
            handleUpdate={handleUserSplitShareUpdate}
            handleSplitTypeUpdate={handleSplitTypeUpdate}
            amount={userShare}
            bind:type={type}
        />
    {#each ($selectedContacts || []) as contact (contact.id)}
        <AdjustItem 
            isUser={false}
            contact={contact}
            handleUpdate={handleSplitShareUpdate}
            handleSplitTypeUpdate={handleSplitTypeUpdate}
            amount={$splitStore?.splitShares.find((s) => s.contactId === contact.id)?.amount || 0}
            bind:type={type}
        />
    {/each}
</div>
<div class="flex flex-row justify-between items-center mt-4">
    <div class="text-lg">You're requesting</div>
    <div class="text-sm">
        <DetailedAmount amount={calculateRequestedTotalFromSplitShares($splitStore.type, transaction.creditAmount, $splitStore.splitShares)} />
    </div>
</div>
<div class="flex flex-col gap-2">
    <form method="POST" action="../split?/createSplit" use:enhance>
        <ActionButton
            type="submit"
            icon={MoneyIcon}
            title="Request funds"
        />
    </form>
</div>