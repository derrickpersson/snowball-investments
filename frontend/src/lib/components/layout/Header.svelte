<script>
    import { AppBar } from '@skeletonlabs/skeleton';
	import Logo from "./Logo.svelte";
	import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
	import { getContext } from 'svelte';


    const userContext = getContext("user");

    const handleLogout = async () => {
        const response = await fetch(`${PUBLIC_BACKEND_API_URL}/auth/logout`, {
            credentials: "include",
        });
        if(response.ok) {
            userContext.set(null);
        }
    }

</script>

<AppBar>
    <Logo />
    <div>
        {#if $userContext}
            <button on:click={handleLogout} class="btn variant-filled-primary">Log out</button>
        {/if}
    </div>
</AppBar>