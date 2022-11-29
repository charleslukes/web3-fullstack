import "./styles.css";
import Dashboard from "../../components/dashboard";
import Input from "../../components/input";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/button";
import { Props } from "./types";
import { createContractInstance } from "../../utils/connect-wallet";
import { TEST_TOKEN_CONTRACT_ADDR } from "../../utils/constants";
import { test_token_abi } from "../../utils/erc20abi";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addMint } from "../../service";

function MintToken(data: Props) {
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setReceiverAddress(newValue);
    },
    [receiverAddress]
  );

  const handleMintTokenClick = async () => {
    if (ethers.utils.isHexString(receiverAddress)) {
      setProcessing(true);
      //start listening
      // 0xd84b79a53eb1D0Adc09ce3EbacDa9343dec801e0
      // listenToContractEvents(data.contractInstance!, receiverAddress);

      // create contract instance with signer since we will call a transaction
      const contractInstance = createContractInstance(
        TEST_TOKEN_CONTRACT_ADDR,
        test_token_abi,
        data.signer!
      );
      // mint 10 tokens to receiver address
      const amount = 10;
      const res = await contractInstance?.functions.mint(
        receiverAddress,
        ethers.utils.parseUnits(`${amount}`)
      );
      const res1 = await res.wait();
      setProcessing(false);
      toast(`Token minted to address ${receiverAddress}`);
      // save mint details to backend
      addMint({
        userWalletAddress: data.address!,
        receiverAddress,
        amount,
        transactionHash: res1.transactionHash,
      });
    }
  };

  const listenToContractEvents = (contract: ethers.Contract, receiverAddress: string) => {
    contract.on("Transfer", (from, to, value, event) => {
      let info = {
        from: from,
        to: to,
        value: ethers.utils.formatUnits(value, 6),
        data: event,
        receiverAddress,
      };
      console.log(JSON.stringify(info, null, 4));
    });

    contract.on("error", (error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <Dashboard balance={data.balance} symbol={data.symbol} name={data.name} />

      <div className="mint-bottom-container">
        <div>
          {processing && <div className="processing">Processing...</div>}
          <div>
            <Input
              placeholder="Insert user address here"
              handleOnChange={handleOnChange}
            />
            <Button
              btnText="Mint Tokens"
              handleBtnClick={handleMintTokenClick}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MintToken;
