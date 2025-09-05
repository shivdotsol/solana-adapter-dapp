import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

function Airdrop() {
  const walletData = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState<number>(0);

  const sendAirdrop = async () => {
    const res = await connection.requestAirdrop(
      walletData.publicKey!!,
      amount!! * 1_000_000_000
    );
    console.log(res);
  };

  return (
    <>
      {walletData.publicKey && (
        <div className="m-5 flex gap-x-2 items-center">
          <input
            className="w-20 border border-neutral-400 px-3 py-1 rounded-md"
            type="number"
            placeholder="amount (SOL)"
            onChange={(e) => setAmount(Number(e.target.value))}
            value={amount}
          />
          <div>SOL</div>
          <button
            disabled={!walletData.publicKey || !amount}
            onClick={sendAirdrop}
            className="px-4 py-2 rounded-sm bg-neutral-900 text-neutral-100 font-bold cursor-pointer active:bg-neutral-700 active:scale-[97%] transition-all duration-100 disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            Send airdrop
          </button>
        </div>
      )}
    </>
  );
}

export default Airdrop;
