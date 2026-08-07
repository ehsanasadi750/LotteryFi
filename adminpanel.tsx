import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ShieldAlert, Loader2 } from 'lucide-react';
import { LOTTERY_ADDRESS, LOTTERY_ABI } from '../constants';
import { arcTestnet } from '../wagmi';

export function AdminPanel() {
  const { address, chainId } = useAccount();

  const { data: owner } = useReadContract({
    address: LOTTERY_ADDRESS,
    abi: LOTTERY_ABI,
    functionName: 'owner',
  });

  const { data: hash, isPending: isWritePending, writeContract } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  if (!address || !owner || address.toLowerCase() !== (owner as string).toLowerCase()) {
    return null;
  }

  const isWrongNetwork = chainId !== arcTestnet.id;

  const handlePickWinner = () => {
    if (isWrongNetwork) return;
    writeContract({
      address: LOTTERY_ADDRESS,
      abi: LOTTERY_ABI,
      functionName: 'pickWinner',
    });
  };

  return (
    <div className="bg-rose-950/20 border border-rose-900/50 rounded-2xl p-6 md:p-8 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-rose-900/30 flex items-center justify-center text-rose-400">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Admin Controls</h2>
          <p className="text-sm text-rose-400/80">Only visible to contract owner</p>
        </div>
      </div>

      <button
        onClick={handlePickWinner}
        disabled={isWritePending || isConfirming || isWrongNetwork}
        className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {(isWritePending || isConfirming) && <Loader2 className="w-4 h-4 animate-spin" />}
        {isWrongNetwork ? 'Switch to Arc Testnet' : (isWritePending || isConfirming ? 'Processing...' : 'Pick Winner')}
      </button>
    </div>
  );
}
