import { PUBLIC_BACKEND_API_URL } from "$env/static/public";
import { loginUserSchema } from "$lib/schemas";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import { superValidate } from 'sveltekit-superforms/server';

export const load = (async () => {
    const form = await superValidate(loginUserSchema);
    return { form };
});

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, loginUserSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		// Submit the form to the backend
        const response = await fetch(`${PUBLIC_BACKEND_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form.data)
        });

        if(response.status !== 200) {
            const { message } = await response.json();
            return fail(400, {
                form: {
                    ...form,
                    errors: {
                        ...form.errors,
                        email: message
                    }
                }
            });
        }

        // TODO: save token & use in authentication header
	
		throw redirect(303, "/app");
	}
};