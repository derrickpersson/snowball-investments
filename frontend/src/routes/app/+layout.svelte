<script lang="ts">
	import { getContext } from "svelte";
	import type { LayoutData } from "./$types";
	import type { Writable } from "svelte/store";
	import type { User } from "$lib/types";

    export let data: LayoutData;

    $: ({ user } = data);

    const userContext = getContext("user") as Writable<User | null>;

    $: userContext.set(user);

</script>

<slot />