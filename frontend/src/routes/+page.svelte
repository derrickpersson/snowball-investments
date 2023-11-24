<script lang="ts">
	import { ProgressRadial, focusTrap, type ToastSettings, getToastStore } from "@skeletonlabs/skeleton";
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
	import Input from "$lib/components/form/Input.svelte";
	import type { Writable } from "svelte/store";
	import { getContext } from "svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import Header from "$lib/components/layout/Header.svelte";

    export let data: PageData;

    const toastStore = getToastStore();
    const userContext = getContext("user") as Writable<any | null>;

    const { form, errors, enhance, delayed } = superForm(data.form, {
        onResult: async ({ result }) => {
            switch(result.type) {
                case "success":
                    userContext.set(result.data?.user);
                    await goto("/app");
                    break;
                case "failure":
                case "error":
                const tError: ToastSettings = {
                        message: "Check your details and try again.",
                        background: 'variant-filled-error',
                        classes: "text-on-error-token rounded-lg w-full",
                        hideDismiss: true,
                        timeout: 3000
                    };
                    toastStore.trigger(tError);
                    break;
            }
        }
    });

    let isFocused: boolean = true;

    $: $page.url.searchParams.has("invalidateSession") && userContext.set(null);
</script>

<Header />
<div class="container mx-auto max-w-md px-2 py-4 flex flex-col gap-4">
    <h3 class="text-center">
        Sign in to your account
    </h3>
    <form method="POST" use:enhance use:focusTrap={isFocused} class="flex flex-col gap-4">
        <Input 
            fieldName="email"
            label="Email"
            type="email"
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