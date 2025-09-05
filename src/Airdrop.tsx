import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

function Airdrop() {
  const walletData = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState(1);
  const [balance, setBalance] = useState(0);
  const [isAirdropLoading, setIsAirdropLoading] = useState(false);
  const [isBalanceLoading, setIsBalanceLoading] = useState(false);

  const sendAirdrop = async () => {
    setIsAirdropLoading(true);
    const res = await connection.requestAirdrop(
      walletData.publicKey!!,
      amount!! * 1_000_000_000
    );
    await getBalance();
    setIsAirdropLoading(false);
    console.log(res);
  };

  const getBalance = async () => {
    setIsBalanceLoading(true);
    const newBalance = await connection.getBalance(walletData.publicKey!!);
    setBalance(newBalance);
    setIsBalanceLoading(false);
  };

  const formatBalance = () => {
    return (balance / 1000000000).toString().split(".");
  };

  useEffect(() => {
    getBalance();
  }, [walletData]);

  return (
    <>
      {walletData.publicKey && (
        <div>
          <div className="m-5 flex gap-x-2 items-center">
            <input
              className="w-52 border border-neutral-400 px-3 py-1 rounded-md"
              type="number"
              placeholder="amount (SOL)"
              onChange={(e) => setAmount(Number(e.target.value))}
              value={amount}
            />
            <div>SOL</div>
            <button
              disabled={!walletData.publicKey || !amount || isAirdropLoading}
              onClick={sendAirdrop}
              className="px-4 py-2 rounded-sm bg-neutral-900 text-neutral-100 font-bold cursor-pointer active:bg-neutral-700 active:scale-[97%] transition-all duration-100 disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {isAirdropLoading ? "Sending..." : "Send airdrop"}
            </button>
          </div>
          <div className="w-fit mx-auto px-4 py-3 rounded-md flex items-center gap-x-1 bg-slate-800 text-neutral-100 font-bold">
            <div>Balance:</div>{" "}
            <div className="w-44 bg-slate-700 px-3 py-1 rounded-md text-white ml-2">
              {isBalanceLoading ? (
                "updating..."
              ) : (
                <span className="mr-2">
                  <span>{formatBalance()[0] + "."}</span>
                  <span className="text-sm text-slate-300">
                    {formatBalance()[1]}
                  </span>
                </span>
              )}
              {isBalanceLoading ? "" : "SOL"}
            </div>
            <div
              className={`ml-2 w-8 h-8 ${
                isBalanceLoading ? "bg-green-600" : "bg-green-500"
              } flex items-center justify-center rounded-lg cursor-pointer`}
              title="refresh"
              onClick={getBalance}
            >
              <img src="/refresh.png" alt="refresh" className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Airdrop;
