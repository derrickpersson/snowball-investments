<script lang="ts">
	import { ProgressRadial, focusTrap, type ToastSettings, getToastStore } from "@skeletonlabs/skeleton";
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
	import Input from "$lib/components/form/Input.svelte";
	import { goto } from "$app/navigation";
	import { getContext } from "svelte";
	import type { Writable } from "svelte/store";
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
</script>

<Header />
<div class="container mx-auto max-w-md py-4 px-2 flex flex-col gap-4">
    <h3 class="text-center">
        Sign up for a free account!
    </h3>
    <form method="POST" use:enhance use:focusTrap={isFocused} class="flex flex-col gap-4">
        <Input 
            fieldName="firstName"
            label="First Name"
            value={$form.firstName} 
            error={$errors.firstName} 
            placeholder="Johnny"
        />
        <Input 
            fieldName="lastName"
            label="Last Name"
            value={$form.lastName} 
            error={$errors.lastName} 
            placeholder="Appleseed"
        />
        <Input 
            fieldName="email"
            label="Email"
            value={$form.email} 
            error={$errors.email} 
            type="email"
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
        
        <button type="submit" class="btn variant-filled-primary">
            {#if !delayed}
                <ProgressRadial value={undefined} class="h-6 w-6" />
            {:else}
                Sign up
            {/if}
        </button>
        <p>Already have an account? <a href="/" class="anchor">Sign in</a> </p>
    </form>
</div>