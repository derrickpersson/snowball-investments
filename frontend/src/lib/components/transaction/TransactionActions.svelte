<script lang="ts">
	import { capitalize } from "$lib/strings";
	import type { Transaction } from "$lib/types";
    import CutleryIcon from "$lib/assets/cutlery.svg?raw";
    import HandDollarIcon from "$lib/assets/hand-holding-dollar.svg?raw";
    import ListIcon from "$lib/assets/list.svg?raw";
    import PencilIcon from "$lib/assets/pencil.svg?raw";
    import CameraIcon from "$lib/assets/camera.svg?raw";
	import ActionButton from "../ActionButton.svelte";

    export let transactionType: "credit" | "debit" = "debit";
    export let transaction: Transaction;

    type Action = {
        availableOnTypes: ("credit" | "debit")[];
        currentAction: "credit" | "debit";
        title: string;
        description?: string;
        icon: string;
    }

    let actions = [{
            availableOnTypes: ["debit", "credit"],
            currentAction: transactionType,
            icon: CutleryIcon,
            title: capitalize(transaction.category),
            description: "Change category",
        },{
            availableOnTypes: ["credit"],
            currentAction: transactionType,
            icon: HandDollarIcon,
            href: `/app/account/${transaction.bankAccountId}/transaction/${transaction.id}/split`,
            title: "Split this bill",
            description: "Instantly get paid back by your friends",
        },{
            availableOnTypes: ["credit"],
            currentAction: transactionType,
            icon: ListIcon,
            title: "Add to shared tab",
            description: "A simple way to manage shared experiences",
        },{
            availableOnTypes: ["debit", "credit"],
            currentAction: transactionType,
            icon: PencilIcon,
            title: "Add notes",
            description: "Describe this transaction",
        },{
            availableOnTypes: ["debit", "credit"],
            currentAction: transactionType,
            icon: CameraIcon,
            title: "Add receipt",
        }
    ];

    let displayedActions: {
        availableOnTypes: ("credit" | "debit")[];
        currentAction: "credit" | "debit";
        title: string;
        description?: string;
        icon: string;
    }[] = [];
    $: displayedActions = actions.filter(action => action.availableOnTypes.includes(transactionType)) as Action[];

</script>

{#each displayedActions as action}
    <ActionButton
        title={action.title}
        description={action.description}
        icon={action.icon}
        href={action.href}
    />
{/each}
