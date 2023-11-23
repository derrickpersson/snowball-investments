import { PUBLIC_BACKEND_API_URL } from "$env/static/public";
import { redirect, type RequestHandler, error } from "@sveltejs/kit";

export const POST: RequestHandler = async ( event ) => {
    const response = await fetch(`${PUBLIC_BACKEND_API_URL}/auth/logout`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    if(response.status !== 200) {
        const { error: respError } = await response.json();
        throw error(500, respError || "Error logging you out, try again");
    }

    throw redirect(303, "/?invalidateSession=true");
};