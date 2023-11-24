<script lang="ts">
    import ContactIcon from "$lib/assets/user-circle.svg?raw";
    import ColorHash from 'color-hash';
	import DetailedAmount from "../transaction/DetailedAmount.svelte";

    export let contact: any;
    export let label: number | undefined = undefined;
    export let onSelect: (contact: any, checked: boolean) => void;

    let checked: boolean = false;

    const colorHash = new ColorHash();
    const hash = colorHash.hex(contact.email);

    $: onSelect(contact, checked);

</script>

<button
    class="bg-surface-500 w-full rounded-lg px-3 py-2 flex flex-row gap-4 items-center justify-between hover:bg-surface-600 cursor-pointer"
    on:click={() => checked = !checked}
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
            <DetailedAmount 
                amount={label}
                size="sm"
            />
        {/if}
        <input type="checkbox" class="checkbox h-5 w-5" bind:checked={checked} />
    </label>
</button>