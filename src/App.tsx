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
import Send from "./Send";

function App() {
  return (
    <ConnectionProvider
      endpoint={"https://solana-devnet.g.alchemy.com/v2/S2hTvPuHMw8Ysaa0AMfgi"}
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
              <Send />
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
