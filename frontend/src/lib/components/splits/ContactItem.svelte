<script lang="ts">
    import ContactIcon from "$lib/assets/user-circle.svg?raw";
    import ColorHash from 'color-hash';
	import DetailedAmount from "../transaction/DetailedAmount.svelte";
	import { SplitType } from "$lib/types";

    export let contact: any;
    export let label: number | undefined = undefined;
    export let onSelect: (contact: any, checked: boolean) => void;
    export let checked: boolean = false;
    export let type: SplitType;

    const colorHash = new ColorHash();
    const hash = colorHash.hex(contact.email);
</script>

<button
    class="bg-surface-500 w-full rounded-lg px-3 py-2 flex flex-row gap-4 items-center justify-between hover:bg-surface-600 cursor-pointer"
    on:click={() => {
        checked = !checked
        onSelect(contact, checked);
    }}
>
    <div class="flex flex-row gap-4 items-center">
        <div class={`rounded-full w-10 h-10 flex items-center justify-center`} style={`background-color: ${hash};`}>
            {@html ContactIcon}
        </div>
        <div class="flex flex-col items-start">
            <h6 class="leading-5">{contact.firstName}</h6>
        </div>
    </div>
    <label class="pr-1 flex flex-row gap-2 items-center">
        {#if label !== undefined}
            {#if [SplitType.Evenly, SplitType.Amount].includes(type)}
            <DetailedAmount 
                amount={label}
                size="sm"
            />
            {:else if SplitType.Percentage === type}
                <span>{label}%</span>
            {/if}
        {/if}
        <input 
            type="checkbox" 
            class="checkbox h-5 w-5" 
            bind:checked={checked} 
            on:change={() => {
                onSelect(contact, checked);
            }}
        />
    </label>
</button>