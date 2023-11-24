import type { Contact, SplitShare } from "$lib/types";

export const getInitialSelected = (contacts: Contact[], splitShares: SplitShare[] | undefined): Contact[] => {
    if(splitShares?.length) {
        return splitShares.map((s) => contacts.find((c) => c.id === s.contactId)) as Contact[];
    } else {
        return [];
    }
}

export const getInitialAmounts = (splitShares: SplitShare[] | undefined): { [contactId: string]: number } => {
    return splitShares?.reduce((acc, share) => {
        acc[share.contactId] = share.amount;
        return acc;
    }, {} as { [contactId: string]: number }) || {};
}

export const getSplitSharesArray = (splitAmounts: { [contactId: string]: number }) => {
    return Object.entries(splitAmounts).map(([contactId, amount]) => ({
        contactId,
        amount
    }));
}

export const calculateRequestedTotal = (splitAmounts: { [contactId: string]: number }) => {
    return Number(Object.values(splitAmounts).reduce((acc, amount) => acc + amount, 0).toPrecision(10))
};


export const hasExactMembers = (contacts: Contact[], splitShares: SplitShare[] | undefined): boolean => {
    return splitShares?.length === contacts.length && splitShares.map(s => s.contactId).every((id) => contacts.find((c) => c.id === id));
}

export const getEvenShare = (txnAmount: number, numberSelected: number) => {
    return txnAmount / numberSelected
}
