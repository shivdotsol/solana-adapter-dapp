import { useWallet } from "@solana/wallet-adapter-react";
import { ed25519 } from "@noble/curves/ed25519";
import { useState } from "react";

function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSignMessage = async () => {
    setIsLoading(true);
    if (!signMessage) {
      setError("Wallet does not support signing.");
      return;
    }
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);
    if (!ed25519.verify(signature, encodedMessage, publicKey!!.toBytes())) {
      setError("Message signature invalid.");
    }
    setSuccess("Message signature valid.");
    setIsLoading(false);
  };
  return (
    <div>
      {publicKey && (
        <div className="p-5 pb-7 flex flex-col rounded-xl bg-neutral-100 border border-neutral-300">
          <div className="w-fit rounded-lg px-5 py-2 mb-8 text-xl font-bold bg-neutral-800 text-neutral-100">
            Sign Message
          </div>
          <div className="mb-5 flex gap-x-2 items-center">
            <input
              className="w-52 border border-neutral-400 px-3 py-1 rounded-md"
              type="text"
              placeholder="your message here"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <button
              disabled={!message.trim() || isLoading}
              onClick={handleSignMessage}
              className="px-4 py-2 rounded-sm bg-neutral-900 text-neutral-100 font-bold cursor-pointer active:bg-neutral-700 active:scale-[97%] transition-all duration-100 disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isLoading ? "Signing..." : "Sign message"}
            </button>
          </div>
          <div>
            {error && (
              <div className="px-3 py-1 rounded-lg bg-red-600 text-white">
                {" "}
                {error}{" "}
              </div>
            )}
          </div>
          <div>
            {success && (
              <div className="px-3 py-1 rounded-lg bg-green-600 text-white">
                {" "}
                {success}{" "}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* <div className=" w-fit rounded-lg px-5 py-2 mb-8 text-xl font-bold bg-neutral-800 text-neutral-100">
              Airdrop
            </div>
             */
}

export default SignMessage;
