import { ethers } from "ethers";
import { useEffect } from "react";
import Button from "../../components/button";
import { addUser } from "../../service";
import {
  connectToMetamask,
  createContractInstance,
  listOfNetworks,
  switchNetwork,
} from "../../utils/connect-wallet";
import { TEST_TOKEN_CONTRACT_ADDR } from "../../utils/constants";
import { test_token_abi } from "../../utils/erc20abi";
import "./styles.css";
import { Props } from "./types";

function ConnectWallet({ userAddress, setUserAddress, setWalletData }: Props) {
  const handleClick = async () => {
    const { alchemyProvider, provider, signer } = await connectToMetamask();
    if (!provider) {
      return alert("Metamask is not install, pls install and try again");
    }

    const allAccounts = await provider.listAccounts();
    const chainId = await provider.getNetwork();
    const requiredChainId = listOfNetworks["goerli"];
    if (chainId.chainId !== requiredChainId) {
      switchNetwork(`0x${requiredChainId.toString(16)}`);
    }

    const address = allAccounts[0];

    const contractInstance = createContractInstance(
      TEST_TOKEN_CONTRACT_ADDR,
      test_token_abi,
      alchemyProvider
    );

    const name = await contractInstance.functions.name();

    const symbol = await contractInstance.functions.symbol();

    const balance = await contractInstance.functions.balanceOf(address);

    setUserAddress(address);
    setWalletData({
      provider,
      signer,
      name: name[0],
      symbol: symbol[0],
      balance: ethers.utils.formatUnits(balance[0]),
      address,
      contractInstance,
    });

    // save the user details to the db
    addUser({ walletAddress: address });
  };

  return (
    <div className="connect">
      {userAddress ? (
        <div>
          {" "}
          <span className="connect-addr">Connected address:</span>{" "}
          {userAddress?.slice(0, 10)}...
        </div>
      ) : (
        <Button btnText="Connect Wallet" handleBtnClick={handleClick} />
      )}
    </div>
  );
}

export default ConnectWallet;
