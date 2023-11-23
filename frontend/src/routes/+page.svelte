<script lang="ts">
	import { ProgressRadial, focusTrap } from "@skeletonlabs/skeleton";
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
	import Input from "$lib/components/form/Input.svelte";
	import type { Writable } from "svelte/store";
	import { getContext } from "svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

    export let data: PageData;

    const userContext = getContext("user") as Writable<any | null>;

    const { form, errors, enhance, delayed } = superForm(data.form, {
        onResult: async ({ result }) => {
            if(result.type === "success") {
                userContext.set(result.data?.user);
                await goto("/app");
            }
        }
    });

    let isFocused: boolean = true;

    $: $page.url.searchParams.has("invalidateSession") && userContext.set(null);
</script>

<div class="container mx-auto max-w-md px-2 flex flex-col gap-4">
    <h3 class="text-center">
        Sign in to your account
    </h3>
    <form method="POST" use:enhance use:focusTrap={isFocused} class="flex flex-col gap-4">
        <Input 
            fieldName="email"
            label="Email"
            value={$form.email} 
            error={$errors.email} 
            placeholder="johnny@applefarm.com"
        />
        <Input 
            fieldName="password"
            label="Password"
            value={$form.password} 
            error={$errors.password} 
            type="password"
            placeholder="Secret phrase..."
        />
        <button class="btn variant-filled-primary">
            {#if !delayed}
                <ProgressRadial value={undefined} class="h-6 w-6" />
            {:else}
                Sign in
            {/if}
        </button>
        <p>Don't have an account? <a href="/sign-up" class="anchor">Sign up</a> </p>
    </form>
</div>