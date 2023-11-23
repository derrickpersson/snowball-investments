import { PUBLIC_BACKEND_API_URL } from "$env/static/public";
import { registerUserSchema } from "$lib/schemas";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import { superValidate } from 'sveltekit-superforms/server';

export const load = (async () => {
    const form = await superValidate(registerUserSchema);
    return { form };
});

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, registerUserSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		// Submit the form to the backend
        const response = await fetch(`${PUBLIC_BACKEND_API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form.data)
        });

        if(response.status !== 200) {
            const { error } = await response.json();
            return fail(400, {
                form,
                message: error,
            });
        }

        if(response.headers.get("set-cookie")) {
            event.cookies.set("jwt", response.headers.get("set-cookie")!);
        }

        const { user } = await response.json();
        
        return {
            form,
            user,
        };
	}
};