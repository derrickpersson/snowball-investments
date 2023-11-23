<script lang="ts">
	import { getContext } from "svelte";
	import type { PageData } from "./$types";
    import type { Writable } from "svelte/store";
    import groupBy from 'lodash.groupby';
	import type { Account, Transaction } from "$lib/types";
	import Amount from "$lib/components/transaction/Amount.svelte";
	import { capitalize } from "$lib/strings";
    import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import Balance from "$lib/components/account/Balance.svelte";


    export let data: PageData;

    const userContext = getContext("user") as Writable<any>;

    let tabSet: number = 0;
    let selectedAccount: Account | null = null;
    $: selectedAccount = data?.accounts ? data.accounts[tabSet] : null;

    let accountTransactions: { [dateString: string]: Transaction[] } = {};
    $: accountTransactions = groupBy(selectedAccount?.recentTransactions || [], (transaction) => {
        return new Date(transaction.createdAt).toLocaleDateString();
    });

    $: console.log(data);
</script>

<div class="container mx-auto max-w-md">
    <div class="flex flex-col gap-2 mb-4">
        <h4>👋 Hey {$userContext?.firstName}!</h4>
        <Balance 
            balance={selectedAccount?.balance}
        />
    </div>
    <div>
        {#if data?.accounts}
            <TabGroup>
                {#each (data?.accounts || []) as account, idx}
                    <Tab bind:group={tabSet} name={account.id} value={idx}>
                        <span>{capitalize(account.accountType)}</span>
                    </Tab>
                {/each}
            
                <svelte:fragment slot="panel">
                    <div class="flex flex-col gap-6">
                        
                        {#each (Object.entries(accountTransactions) || []) as groupedTransactions}
                        <div>
                            <h6 class="text-sm">
                                {new Date(groupedTransactions[0]).toLocaleDateString(undefined, {
                                    weekday: 'long',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </h6>
                            {#each (groupedTransactions[1] || []) as transaction}
                                <div class="flex flex-row justify-between w-full">
                                    <div class="flex flex-row gap-4 py-2 items-center">
                                        {#if transaction.vendor.logoURL}
                                            <img src={transaction.vendor.logoURL} alt={transaction.vendor.name} class="w-10 h-10" />
                                        {/if}
                                        <div>{transaction.vendor.name}</div>
                                    </div>
                                    <div class="flex flex-row items-center">
                                        <Amount 
                                            accountType={selectedAccount.category}
                                            transaction={transaction}
                                        />
                                    </div>
                                </div>
                            {/each}
                            </div>
                        {/each}
                    </div>
                </svelte:fragment>
            </TabGroup>
        {/if}
    </div>
</div>

