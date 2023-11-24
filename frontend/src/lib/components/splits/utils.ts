import type { Contact, Split, SplitShare } from "$lib/types";
import { SplitType } from "$lib/types";
import type { ToastSettings } from "@skeletonlabs/skeleton";
import SuccessMessage from "$lib/components/splits/Success.html?raw";
import type { ActionResult } from "@sveltejs/kit";



export const getInitialSelected = (contacts: Contact[], splitShares: SplitShare[] | undefined): Contact[] => {
    if(splitShares?.length) {
        return splitShares.map((s) => contacts.find((c) => c.id === s.contactId)) as Contact[];
    } else {
        return [];
    }
}

export const calculateRequestedTotalFromSplitShares = (type: SplitType, transactionAmount: number, splitShares: SplitShare[] = []) => {
    switch(type) {
        case SplitType.Percentage:
            return Number(splitShares.reduce((acc, share) => acc + ((share.amount * transactionAmount) / 100), 0).toPrecision(10));
        case SplitType.Evenly:
        case SplitType.Amount:
        default:
            return Number(splitShares.reduce((acc, share) => acc + share.amount, 0).toPrecision(10))
    }
}

export const getEvenShare = (txnAmount: number, numberSelected: number) => {
    return txnAmount / numberSelected
}

export const getInitialSplit = (txnAmount: number, selectedContacts: Contact[]): Split => {
    const splitShares = selectedContacts.map((c) => {
        return {
            contactId: c.id,
            amount: getEvenShare(txnAmount, selectedContacts.length + 1)
        }
    });
    return {
        type: SplitType.Evenly,
        splitShares
    }
}

export const addSplitShare = (split: Split, contact: Contact, txnAmount: number) => {
    const USER_AND_NEW_CONTACT = 2;
    const newShares = split.splitShares.map((s, _, arr) => ({ ...s, amount: getEvenShare(txnAmount, arr.length + USER_AND_NEW_CONTACT)}))
    const newShare: SplitShare = {
        contactId: contact.id,
        amount: getEvenShare(txnAmount, newShares.length + USER_AND_NEW_CONTACT)
    };
    split.splitShares = [...newShares, newShare];
    return split;
}

export const removeSplitShare = (split: Split, contact: Contact, txnAmount: number) => {
    const newSplitShares = split.splitShares.filter((s) => s.contactId !== contact.id).map((s, _, arr) => ({ ...s, amount: getEvenShare(txnAmount, arr.length + 1) }))
    split.splitShares = newSplitShares;
    return split;
}

export const updateSplitShares = (newType: SplitType, split: Split, txnAmount: number) => {
    if(newType === SplitType.Evenly) {
        split.splitShares = split.splitShares.map((s) => {
            return {
                ...s,
                amount: getEvenShare(txnAmount, split.splitShares.length + 1)
            }
        })
    }

    if([SplitType.Amount, SplitType.Evenly].includes(split.type) && newType === SplitType.Percentage) {
        split.splitShares = split.splitShares.map((s) => {
            return {
                ...s,
                amount: parseFloat(((s.amount / txnAmount) * 100).toFixed(2))
            }
        })
    }

    if(split.type === SplitType.Percentage && newType === SplitType.Amount) {
        split.splitShares = split.splitShares.map((s) => {
            return {
                ...s,
                amount: parseFloat(((s.amount / 100) * txnAmount).toFixed(2))
            }
        })
    }
    return split;
}

export const toastHandler = (formResult: ActionResult) => {
    switch(formResult.type) {
        case "success":
            const tSuccess: ToastSettings = {
                message: SuccessMessage,
                background: 'variant-filled-primary',
                classes: "text-on-primary-token rounded-lg w-full",
                hideDismiss: true,
                timeout: 3000
            };
            return tSuccess;
        case "failure":
            const tFail: ToastSettings = {
                message: formResult.data?.message || "Something went wrong",
                background: 'variant-filled-error',
                classes: "text-on-error-token rounded-lg w-full",
                hideDismiss: true,
                timeout: 3000
            };
            return tFail;
        case "error":
            const tError: ToastSettings = {
                message: formResult.error?.message || "Something went wrong",
                background: 'variant-filled-error',
                classes: "text-on-error-token rounded-lg w-full",
                hideDismiss: true,
                timeout: 3000
            };
            return tError;
    }
}
