import { Contract, ContractInterface, ethers } from "ethers";

let provider: ethers.providers.Web3Provider;
let signer: ethers.providers.JsonRpcSigner;
let alchemyProvider: ethers.providers.JsonRpcProvider;

export const connectToMetamask = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.enable();
      // A Web3Provider wraps a standard Web3 provider, which is
      
      alchemyProvider =  new ethers.providers.AlchemyProvider(
        "goerli",
        process.env.REACT_APP_ALCHEMY_KEY
      );

       // what Metamask injects as window.ethereum into each page
       provider = new ethers.providers.Web3Provider(window.ethereum, "any");

      // The Metamask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      signer = provider.getSigner();
    } catch (error) {
      console.log("Error ==>", error);

      throw new Error(error as any);
    }
  }

  return {
    provider,
    signer,
    alchemyProvider
  };
};

export const createTokenInstance = (abi: any) => {
  return new ethers.utils.Interface(abi);
};

export const createContractInstance = (
  contractAddress: string,
  abi: ContractInterface,
  _provider: ethers.providers.Web3Provider | ethers.Signer | ethers.providers.JsonRpcProvider
): Contract => {
  return new ethers.Contract(contractAddress, abi, _provider);
};

export const listOfNetworks: Record<string, number> = {
  mainnet: 1,
  kovan: 42,
  ropsten: 3,
  rinkeby: 4,
  goerli: 5,
  sepolia: 11155111,
};

export const switchNetwork = async (chainId: string) => {
  const metamask = window.ethereum;
  await metamask.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId }],
  });
};

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}
