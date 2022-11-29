import React, { useState } from 'react';
import './App.css';
import ConnectWallet from './modules/connect-wallet';
import MintToken from './modules/mint';
import { UserWalletTypes } from './utils/sharedTypes';

function App() {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [walletData, setWalletData] = useState<UserWalletTypes | null>(null);

  return (
    <div className="App">
      <ConnectWallet setUserAddress={setUserAddress} userAddress={userAddress} setWalletData={setWalletData}  />
      <MintToken {...walletData} />
    </div>
  );
}

export default App;
