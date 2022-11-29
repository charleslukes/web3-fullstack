import { ethers } from "ethers";

export type UserWalletTypes = {
  provider: ethers.providers.Web3Provider;
  signer: ethers.providers.JsonRpcSigner;
  name: string;
  symbol: string;
  balance: string;
  address: string;
  contractInstance: ethers.Contract
};
