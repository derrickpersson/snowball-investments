<script lang="ts">

    export let amount: number = 0;
    export let size: "sm" | "md" = "md";

    let displayAmount: [string, string];
    $: displayAmount = Number(amount).toPrecision(10).toString().split(".") as [string, string];

    const dollarSizes = {
        sm: "text-lg",
        md: "text-2xl"
    }
    const centSizes = {
        sm: "text-xs",
        md: "text-sm"
    }
</script>

<div class="flex flex-row">
    <p class={`${dollarSizes[size]}`}>
        <span class="text-lg">$</span>
        {displayAmount[0]}
    </p>
    <div class=" self-center">
        <span class={`${centSizes[size]}`}>.{displayAmount[1].slice(0, 2)}</span>
    </div>

</div>