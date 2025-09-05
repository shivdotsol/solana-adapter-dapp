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

function App() {
  return (
    <ConnectionProvider
      endpoint={
        "https://solana-devnet.g.alchemy.com/v2/1Gc10b6c3_nM4Wk-Im50fmCtKwky6elD"
      }
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="h-screen flex flex-col gap-y-1 items-center justify-center">
            <WalletMultiButton />
            <WalletDisconnectButton />
            <Airdrop />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
