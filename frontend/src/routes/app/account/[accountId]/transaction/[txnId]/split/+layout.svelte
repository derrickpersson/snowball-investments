<script lang="ts">
	import { getInitialSelected } from "$lib/components/splits/utils";
	import { writable, type Writable } from "svelte/store";
	import type { LayoutData } from "./$types";
	import { setContext } from "svelte";
	import type { Contact, Split } from "$lib/types";

    export let data: LayoutData;

    $: ({ contacts, split } = data);

    const splitStore = writable(null) as Writable<Split | null>;
    $: splitStore.set(split);

    const selectedContacts = writable([]) as Writable<Contact[]>;
    $: selectedContacts.update(() => getInitialSelected(contacts, $splitStore?.splitShares || []));

    const selectedContactsContext = setContext("selectedContacts", selectedContacts) as Writable<Contact[]>;
    const splitStoreContext = setContext("splitStore", splitStore) as Writable<Split>;
</script>


<slot />