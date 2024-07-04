export interface ITransactionToFrontendBase {
  createdAt: number;
  symbol: 'RON' | 'PIXEL' | 'AXS' | string;
  type: 'deposit' | 'withdraw' | 'codeRedeem';
  userRef: '';
  value: number;
}

export interface IDepositTransactionsToFrontend extends ITransactionToFrontendBase {
  fromAddress: string | null;
}
export interface ICashoutTransactionsToFrontend extends ITransactionToFrontendBase {
  toAddress: string;
}

export type TTransactionToFrontend = IDepositTransactionsToFrontend | ICashoutTransactionsToFrontend;
export type TTransactionsToFrontend = {
  transactions: (IDepositTransactionsToFrontend | ICashoutTransactionsToFrontend)[];
  hasMore?: boolean;
};
