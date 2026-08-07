import { Wallet, AlertCircle } from 'lucide-react';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { arcTestnet } from '../wagmi';

export function Header() {
  const { address, isConnected, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const isWrongNetwork = isConnected && chainId !== arcTestnet.id;

  const handleConnect = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect({ connector: injected() });
    }
  };

  const handleSwitchNetwork = () => {
    if (switchChain) {
      switchChain({ chainId: arcTestnet.id });
    }
  };

  const formatAddress = (addr?: string) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
            <span className="font-bold text-white text-lg">L</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">BlockLottery</span>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-cyan-400 transition-colors">Play</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Dashboard</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">History</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-4">
          {isWrongNetwork && (
            <button
              onClick={handleSwitchNetwork}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-amber-500/20 text-amber-400 border border-amber-500/50 hover:bg-amber-500/30"
            >
              <AlertCircle className="w-4 h-4" />
              Switch to Arc
            </button>
          )}
          <button
            onClick={handleConnect}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              isConnected
                ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_15px_rgba(8,145,178,0.5)]'
            }`}
          >
            <Wallet className="w-4 h-4" />
            {isConnected ? formatAddress(address) : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </header>
  );
}
