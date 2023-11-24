import { PUBLIC_BACKEND_API_URL } from "$env/static/public";
import { splitSchema } from "$lib/schemas";
import { fail, type Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";

export const load = (async () => {
    const form = await superValidate(splitSchema);
    return { form };
});

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, splitSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		// Submit the form to the backend
        const response = await event.fetch(`${PUBLIC_BACKEND_API_URL}/account/${event.params.accountId}/transaction/${event.params.transactionId}/splits`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(form.data)
        });

        if(response.status !== 200) {
            const { error } = await response.json();
            return fail(400, {
                form,
                message: error,
            });
        }
        
        return {
            form,
            message: "Request sent",
        };
	}
};