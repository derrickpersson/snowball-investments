<script lang="ts">
    import ContactIcon from "$lib/assets/user-circle.svg?raw";
	import { SplitType } from "$lib/types";
    import ColorHash from 'color-hash';

    export let isUser: boolean;
    export let contact: any;
    export let type: SplitType;
    export let amount: number;
    export let handleUpdate: ((contactId: string, amount: number) => void) | undefined = undefined;
    export let handleSplitTypeUpdate: (type: SplitType) => void;

    const colorHash = new ColorHash();
    const hash = isUser ? "#1AC0C0": colorHash.hex(contact.email);
</script>

<div
    class="bg-surface-500 w-full rounded-lg px-3 py-2 flex flex-row gap-4 items-center justify-between"
>
    <div class="flex flex-row gap-4 items-center">
        <div class={`rounded-full w-10 h-10 flex items-center justify-center`} style={`background-color: ${hash};`}>
            {@html ContactIcon}
        </div>
        <div class="flex flex-col items-start">
            <h6 class="leading-5">{contact.firstName}</h6>
        </div>
    </div>
    <div class="flex flex-row items-center">
        {#if [SplitType.Evenly, SplitType.Amount].includes(type)}
            <h6>$</h6>
        {/if}
        <input 
            type="number"
            disabled={isUser}
            class={`input variant-form-material ${type === "percentage" ? "text-right" : "text-left"}`}
            value={Number(amount.toFixed(2))}
            on:change={(event) => {
                if (type === SplitType.Evenly) {
                    handleSplitTypeUpdate(SplitType.Amount);
                }
                handleUpdate && handleUpdate(contact.id, parseFloat(event.target?.value))
            }}
        />
        {#if type === SplitType.Percentage}
            <h6>%</h6>
        {/if}
    </div>
</div>