<script lang="ts">
    export let balance: number | undefined = 0;

    let displayBalance: [string, string] = ["0", "00"];
    $: displayBalance = Number(balance).toFixed(2).toString().split(".") as [string, string];

    /**
     * Adds commas for every group of 3 digits
     * @param dollarBalance
     */
    const formatThousands = (dollarBalance: string) => {
        return dollarBalance.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
</script>

<div class="flex flex-row items-end">
    <div class="text-xl text-[#B2B2B2] leading-7">${formatThousands(displayBalance[0])}</div>
    <div class="text-2xl">.{displayBalance[1]}</div>
</div>