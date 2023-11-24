<script lang="ts">
    import Header from "$lib/components/layout/Header.svelte";
	import { writable } from "svelte/store";
    import "../app.pcss";
    import { AppShell, Toast } from '@skeletonlabs/skeleton';
	import { setContext } from "svelte";
	import { initializeStores } from '@skeletonlabs/skeleton';

    const userStore = writable(null);
    const userContext = setContext("user", userStore);
	initializeStores();
    
</script>

<Toast 
	width="max-w-md" 
	rounded="rounded-lg"
/>
<AppShell>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>