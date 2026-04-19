import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMarketplace } from '../hooks/useMarketplace';
import { useToast } from '../hooks/useToast';
import Toast from './Toast';
import { Coins, TreePine, Sun, TrendingUp, Wallet } from 'lucide-react';

export default function MarketplacePage() {
  const { balance, purchaseItem, sellCredits } = useMarketplace();
  const { toast, showToast, hideToast } = useToast();

  const handlePurchase = (item: string, cost: number) => {
    const success = purchaseItem(cost, item);
    if (success) {
      showToast(`Successfully purchased: ${item}`, 'success');
    } else {
      showToast('Insufficient balance!', 'error');
    }
  };

  const handleSell = () => {
    sellCredits(100);
    showToast('Successfully sold 100 credits to companies!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Carbon Credit Marketplace</h2>
        <p className="text-gray-400">Trade carbon credits and support sustainability projects</p>
      </div>

      {/* Wallet Balance */}
      <Card className="glass-card rounded-2xl border-2 border-[#22c55e]/30 shadow-green-glow">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-2 flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Your Wallet Balance
              </p>
              <div className="text-6xl font-bold text-[#22c55e] drop-shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                {balance}
                <span className="text-2xl text-gray-400 ml-2">Credits</span>
              </div>
            </div>
            <Coins className="h-24 w-24 text-[#22c55e]/20" />
          </div>
        </CardContent>
      </Card>

      {/* Marketplace Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Plant Trees */}
        <Card className="glass-card glass-card-hover rounded-2xl group cursor-pointer transform transition-all duration-300 hover:-translate-y-2">
          <CardHeader>
            <div className="w-16 h-16 rounded-2xl bg-[#22c55e]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TreePine className="h-8 w-8 text-[#22c55e]" />
            </div>
            <CardTitle className="text-white">Plant 10 Trees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">Support reforestation projects and offset your carbon footprint</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#22c55e]">100 Credits</span>
              <Button
                onClick={() => handlePurchase('Plant 10 Trees', 100)}
                className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-black rounded-xl"
              >
                Purchase
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rooftop Solar */}
        <Card className="glass-card glass-card-hover rounded-2xl group cursor-pointer transform transition-all duration-300 hover:-translate-y-2">
          <CardHeader>
            <div className="w-16 h-16 rounded-2xl bg-[#22c55e]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sun className="h-8 w-8 text-[#22c55e]" />
            </div>
            <CardTitle className="text-white">Rooftop Solar Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">Fund solar panel installations for rural communities</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#22c55e]">500 Credits</span>
              <Button
                onClick={() => handlePurchase('Rooftop Solar Support', 500)}
                className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-black rounded-xl"
              >
                Purchase
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sell Credits */}
        <Card className="glass-card glass-card-hover rounded-2xl group cursor-pointer transform transition-all duration-300 hover:-translate-y-2">
          <CardHeader>
            <div className="w-16 h-16 rounded-2xl bg-[#22c55e]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="h-8 w-8 text-[#22c55e]" />
            </div>
            <CardTitle className="text-white">Sell Credits to Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">Trade your earned credits with corporations</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#22c55e]">+100 Credits</span>
              <Button
                onClick={handleSell}
                className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-black rounded-xl"
              >
                Sell Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {toast.visible && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
}
