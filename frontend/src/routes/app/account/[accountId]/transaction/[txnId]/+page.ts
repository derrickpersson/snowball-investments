import { PUBLIC_BACKEND_API_URL } from '$env/static/public';

export async function load({ params, fetch }) {
    const response = await fetch(`${PUBLIC_BACKEND_API_URL}/account/${params.accountId}/transaction/${params.txnId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
    });
    return { 
        transaction: response.json().then(({ transaction }) => transaction) 
    };
}
