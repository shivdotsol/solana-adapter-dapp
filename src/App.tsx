import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import Airdrop from "./Airdrop";
import SignMessage from "./SignMessage";

function App() {
  return (
    <ConnectionProvider
      endpoint={
        "https://solana-devnet.g.alchemy.com/v2/1Gc10b6c3_nM4Wk-Im50fmCtKwky6elD"
      }
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="px-10 py-8 h-screen flex gap-x-3 items-center justify-center ">
            <div className="absolute top-0 right-0 flex gap-x-1 m-5">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <div className="flex gap-x-5 flex-wrap gap-y-5">
              <Airdrop />
              <SignMessage />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
