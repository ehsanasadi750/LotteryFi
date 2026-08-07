import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { TicketPurchase } from './components/TicketPurchase';
import { UserDashboard } from './components/UserDashboard';
import { WinnersHistory } from './components/WinnersHistory';
import { AdminPanel } from './components/AdminPanel';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <HeroBanner />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            <TicketPurchase />
            <UserDashboard />
          </div>
          <div className="lg:col-span-5">
            <WinnersHistory />
          </div>
        </div>

        <AdminPanel />
      </main>
      
      <footer className="border-t border-slate-800/50 bg-slate-900/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} BlockLottery. A decentralized application.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Smart Contract</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
