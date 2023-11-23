<script lang="ts">

    export let amount: number = 0;

    let displayAmount: [string, string];
    $: displayAmount = Number(amount).toFixed(2).toString().split(".") as [string, string];
</script>

<div class="flex flex-row">
    <p class="text-2xl">
        <span class="text-lg">$</span>
        {displayAmount[0]}
    </p>
    <div class=" self-center">
        <span class="text-sm">.{displayAmount[1]}</span>
    </div>

</div>