import { PUBLIC_BACKEND_API_URL } from "$env/static/public";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {

    const jwt = event.cookies.get('jwt');

    if(!jwt) {
        event.locals.user = null;
        if(event.url.pathname.startsWith('/app')){
            throw redirect(303, '/');
        }
        return resolve(event);
    } else {
        const currentUserResp = await event.fetch(`${PUBLIC_BACKEND_API_URL}/auth/current-user`);

        if(currentUserResp.status === 401) {
            event.locals.user = null;
            if(event.url.pathname.startsWith('/app')){
                throw redirect(303, '/');
            }
            return resolve(event);
        }

        const currentUser = await currentUserResp.json();
        event.locals.user = currentUser.user;
        return resolve(event);
    }
};