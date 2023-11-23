<script lang="ts">
    export let fieldName: string;
    export let label: string;
    export let value: any;
    export let error: string[] | undefined = undefined;
</script>


<label class="label" for={fieldName}>
    <span>{label}</span>
    <input 
        class="input" 
        name={fieldName}
        type="text"
        bind:value={value} 
        aria-invalid={error ? 'true' : undefined}
        {...$$restProps}  
    />
    {#if error}<span class="text-error-500">{error}</span>{/if}
</label>