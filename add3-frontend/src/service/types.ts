export interface IUser {
  walletAddress: string;
}
export interface IMint {
  receiverAddress: string;
  amount: number;
  transactionHash: string;
  userWalletAddress: string;
}
