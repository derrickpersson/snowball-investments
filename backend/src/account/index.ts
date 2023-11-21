import BigNumber from "bignumber.js";

export interface IBankAccountService {
    getBalance(accountId: string): Promise<BigNumber>;
}