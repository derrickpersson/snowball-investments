import { splitSchema } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/server";

export const load = (async () => {
    const form = await superValidate(splitSchema);
    return { form };
});