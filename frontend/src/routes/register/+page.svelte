<script lang="ts">
	import { focusTrap } from "@skeletonlabs/skeleton";

    let isFocused: boolean = true;

    let firstName: string = "";
    let lastName: string = "";
    let email: string = "";
    let password: string = "";
</script>

<div class="container mx-auto px-2 flex flex-col gap-4">
    <h3 class="text-center">
        Sign up for a free account!
    </h3>
    <form use:focusTrap={isFocused} class="flex flex-col gap-4">
        <label class="label">
            <span>First Name</span>
            <input class="input" type="text" placeholder="Johnny" name="firstName" bind:value={firstName} />
        </label>
        <label class="label">
            <span>Last Name</span>
            <input class="input" type="text" placeholder="Appleseed" name="lastName" bind:value={lastName} />
        </label>
        <label class="label">
            <span>Email</span>
            <input class="input" type="email" placeholder="johnny@applefarm.com" name="email" bind:value={email} />
        </label>
        <label class="label">
            <span>Password</span>
            <input class="input" type="password" placeholder="Secret phrase..." name="password" bind:value={password} />
        </label>
        <button class="btn variant-filled-primary">Sign up</button>
        <p>Already have an account? <a href="/" class="anchor">Sign in</a> </p>
    </form>
</div>