import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

function Send() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);
  const wallet = useWallet();
  const { connection } = useConnection();
  const sendSol = async () => {
    if (!wallet.publicKey) {
      alert("Wallet not connected.");
      return;
    }
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    await wallet.sendTransaction(transaction, connection);
  };
  return (
    <>
      {wallet.publicKey && (
        <div className="p-5 pb-7 flex flex-col rounded-xl bg-neutral-100 border border-neutral-300">
          <div className="w-fit rounded-lg px-5 py-2 mb-8 text-xl font-bold bg-neutral-800 text-neutral-100">
            Send SOL
          </div>
          <div className="flex flex-col">
            <label htmlFor="to">To: </label>
            <input
              id="to"
              className="mb-5 w-52 border border-neutral-400 px-3 py-1 rounded-md"
              type="text"
              placeholder="recipient's address here"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            <label htmlFor="amount">Amount: </label>

            <input
              id="amount"
              className="mb-5 w-52 border border-neutral-400 px-3 py-1 rounded-md"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <button
              className="px-4 py-2 rounded-sm bg-neutral-900 text-neutral-100 font-bold cursor-pointer active:bg-neutral-700 active:scale-[97%] transition-all duration-100 disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:active:scale-100"
              onClick={sendSol}
            >
              send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// <div>
//       {publicKey && (
//         <div className="p-5 pb-7 flex flex-col rounded-xl bg-neutral-100 border border-neutral-300">
//           <div className="w-fit rounded-lg px-5 py-2 mb-8 text-xl font-bold bg-neutral-800 text-neutral-100">
//             Sign Message
//           </div>
//           <div className="mb-5 flex gap-x-2 items-center">
//             <input
//               className="w-52 border border-neutral-400 px-3 py-1 rounded-md"
//               type="text"
//               placeholder="your message here"
//               onChange={(e) => setMessage(e.target.value)}
//               value={message}
//             />
//             <button
//               disabled={!message.trim() || isLoading}
//               onClick={handleSignMessage}
//               className="px-4 py-2 rounded-sm bg-neutral-900 text-neutral-100 font-bold cursor-pointer active:bg-neutral-700 active:scale-[97%] transition-all duration-100 disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:active:scale-100"
//             >
//               {isLoading ? "Signing..." : "Sign message"}
//             </button>
//           </div>
//           <div>
//             {error && (
//               <div className="px-3 py-1 rounded-lg bg-red-600 text-white">
//                 {" "}
//                 {error}{" "}
//               </div>
//             )}
//           </div>
//           <div>
//             {success && (
//               <div className="px-3 py-1 rounded-lg bg-green-600 text-white">
//                 {" "}
//                 {success}{" "}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>

export default Send;
