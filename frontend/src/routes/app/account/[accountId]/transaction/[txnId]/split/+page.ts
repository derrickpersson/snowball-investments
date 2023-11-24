import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
import type { Contact, Split, Transaction } from '$lib/types.js';

export async function load({ params, fetch }) {
    const contactsResponse = fetch(`${PUBLIC_BACKEND_API_URL}/contact`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    const splitsResponse = fetch(`${PUBLIC_BACKEND_API_URL}/account/${params.accountId}/transaction/${params.txnId}/splits`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    return { 
        contacts: contactsResponse.then(r => r.json()).then(({ contacts }) => contacts) as Promise<Contact[]>,
        split: splitsResponse.then(r => r.json()).then(({ split }) => split) as Promise<Split | null>,
    };
}


