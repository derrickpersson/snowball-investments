import { PUBLIC_BACKEND_API_URL } from '$env/static/public';

export async function load({ params, fetch }) {
    const contactsResponse = await fetch(`${PUBLIC_BACKEND_API_URL}/contact`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    const transactionResponse = await fetch(`${PUBLIC_BACKEND_API_URL}/account/${params.accountId}/transaction/${params.txnId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });

    return { 
        contacts: contactsResponse.json().then(({ contacts }) => contacts),
        transaction: transactionResponse.json().then(({ transaction }) => transaction),
    };
}


