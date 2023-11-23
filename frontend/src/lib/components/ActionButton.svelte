<script lang="ts">
    export let title: string;
    export let description: string | undefined = undefined;
    export let icon: string;
    export let href: string | undefined = undefined;
</script>


<svelte:element 
    this={href ? "a" : "button"} 
    class="bg-surface-500 w-full rounded-lg px-3 py-2 flex flex-row gap-4 items-center hover:bg-surface-700"
    href={href}
    {...$$restProps}
>
    <div class="bg-primary-500 rounded-lg w-10 h-10 flex items-center justify-center">
        {@html icon}
    </div>
    <div class="flex flex-col items-start">
        <h6 class="leading-5">{title}</h6>
        {#if description}
            <p class="text-xs">{description}</p>
        {/if}
    </div>
</svelte:element>