<script lang="ts">
        const { form, enhance } = superForm(data.form, {
        dataType: 'json',
        taintedMessage: null,
        onResult: async ({ result }) => {
            switch(result.type) {
                case "success":
                    const tSuccess: ToastSettings = {
                        message: SuccessMessage,
                        background: 'variant-filled-primary',
                        classes: "text-on-primary-token rounded-lg w-full",
                        hideDismiss: true,
                        timeout: 3000
                    };
                    toastStore.trigger(tSuccess);
                    break;
                case "failure":
                    const tFail: ToastSettings = {
                        message: result.data?.message || "Something went wrong",
                        background: 'variant-filled-error',
                        classes: "text-on-error-token rounded-lg w-full",
                        hideDismiss: true,
                        timeout: 3000
                    };
                    toastStore.trigger(tFail);
                    break;
                case "error":
                    const tError: ToastSettings = {
                        message: result.error?.message || "Something went wrong",
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
</script>