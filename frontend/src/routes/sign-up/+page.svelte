<script lang="ts">
	import { ProgressRadial, focusTrap } from "@skeletonlabs/skeleton";
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
	import Input from "$lib/components/form/Input.svelte";
    

    export let data: PageData;
    const { form, errors, enhance, delayed } = superForm(data.form);

    let isFocused: boolean = true;
</script>

<div class="container mx-auto max-w-md px-2 flex flex-col gap-4">
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