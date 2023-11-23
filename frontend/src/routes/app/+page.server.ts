import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
import type { PageServerLoad, PageServerLoadEvent } from './$types';

export const load: PageServerLoad = async (event: PageServerLoadEvent) => {
    
    const resp = await event.fetch(`${PUBLIC_BACKEND_API_URL}/account`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    return {
        accounts: resp.json(),
    };    
}
