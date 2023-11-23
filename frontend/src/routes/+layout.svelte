<script lang="ts">
    import Header from "$lib/components/layout/Header.svelte";
	import { writable } from "svelte/store";
    import "../app.pcss";
    import { AppShell } from '@skeletonlabs/skeleton';
	import { setContext } from "svelte";

    const userStore = writable(null);
    const userContext = setContext("user", userStore);
    
</script>

<AppShell>
	<svelte:fragment slot="header"><Header /></svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>