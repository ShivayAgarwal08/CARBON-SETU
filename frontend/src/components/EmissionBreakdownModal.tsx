import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Car, Zap, Utensils, Flame } from 'lucide-react';

interface EmissionBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
  totalEmissions: number;
  breakdown: {
    travel: number;
    electricity: number;
    diet: number;
    lpg: number;
  };
}

export default function EmissionBreakdownModal({
  isOpen,
  onClose,
  date,
  totalEmissions,
  breakdown,
}: EmissionBreakdownModalProps) {
  const categories = [
    { name: 'Travel', value: breakdown.travel, icon: Car, color: '#3b82f6' },
    { name: 'Electricity', value: breakdown.electricity, icon: Zap, color: '#eab308' },
    { name: 'Diet', value: breakdown.diet, icon: Utensils, color: '#f97316' },
    { name: 'LPG', value: breakdown.lpg, icon: Flame, color: '#ef4444' },
  ];

  const formatDate = (dateStr: string) => {
    // Check if it's a month name or date
    if (dateStr.length <= 3) {
      return dateStr; // It's a month abbreviation
    }
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/95 border-[#22c55e]/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#22c55e]">
            Emission Breakdown
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {formatDate(date)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Total Emissions */}
          <div className="glass-card rounded-xl p-4 border border-[#22c55e]/30 bg-[#22c55e]/5">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-1">Total Emissions</p>
              <p className="text-4xl font-bold text-[#22c55e]">
                {totalEmissions.toFixed(1)} <span className="text-lg text-gray-400">kg CO₂</span>
              </p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-3">
            {categories.map((category) => {
              const percentage = (category.value / totalEmissions) * 100;
              const Icon = category.icon;
              
              return (
                <div key={category.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" style={{ color: category.color }} />
                      <span className="text-sm text-gray-300">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-white">
                        {category.value.toFixed(1)} kg
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
