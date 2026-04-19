import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TrendingDown, TrendingUp, Target, Gauge, Info, ArrowUp, ArrowDown } from 'lucide-react';
import { useCarbonTracker } from '../hooks/useCarbonTracker';

export default function CarbonSummaryCards() {
  const { 
    getTotalEmissions, 
    getMonthlyEmissions, 
    getReductionTarget, 
    getEfficiencyScore,
    getComparison 
  } = useCarbonTracker();

  const totalEmissions = getTotalEmissions();
  const monthlyEmissions = getMonthlyEmissions();
  const reductionTarget = getReductionTarget();
  const efficiencyScore = getEfficiencyScore();
  const comparison = getComparison();

  const cards = [
    {
      title: 'Total Emissions',
      value: totalEmissions.toFixed(1),
      unit: 'kg CO₂e',
      icon: TrendingUp,
      trend: totalEmissions > 0 ? 'Cumulative' : 'No data yet',
      trendUp: false,
      tooltip: 'Your lifetime carbon footprint tracked across all recorded activities',
      comparison: comparison.totalEmissions,
    },
    {
      title: 'Monthly Emissions',
      value: monthlyEmissions.toFixed(1),
      unit: 'kg CO₂e',
      icon: TrendingDown,
      trend: monthlyEmissions > 0 ? 'Current month' : 'No data yet',
      trendUp: false,
      tooltip: 'Carbon emissions for the current month based on your daily tracking',
      comparison: comparison.monthlyEmissions,
    },
    {
      title: 'Reduction Target',
      value: reductionTarget.target,
      unit: '%',
      icon: Target,
      trend: `${reductionTarget.progress}% achieved`,
      trendUp: true,
      tooltip: 'Your goal to reduce emissions by 20% compared to your baseline',
      comparison: null,
    },
    {
      title: 'Efficiency Score',
      value: efficiencyScore.score,
      unit: '/100',
      icon: Gauge,
      trend: efficiencyScore.rating,
      trendUp: true,
      tooltip: 'Performance metric based on your emission reduction efforts and consistency',
      comparison: comparison.efficiencyScore,
    },
  ];

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card
            key={card.title}
            className="glass-card glass-card-hover rounded-2xl group transition-all duration-500"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {card.title}
                </CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-gray-500 hover:text-[#22c55e] cursor-help transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900/95 border-[#22c55e]/30 text-gray-200 max-w-xs">
                    <p className="text-sm">{card.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <card.icon className="h-4 w-4 text-[#22c55e] group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1 transition-all duration-500">
                {card.value}
                <span className="text-lg text-gray-500 ml-1">{card.unit}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className={`text-xs flex items-center gap-1 ${card.trendUp ? 'text-[#22c55e]' : 'text-gray-400'}`}>
                  {card.trend}
                </p>
                {card.comparison && (
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    card.comparison.direction === 'down' ? 'text-[#22c55e]' : 'text-red-400'
                  }`}>
                    {card.comparison.direction === 'down' ? (
                      <ArrowDown className="h-3 w-3" />
                    ) : (
                      <ArrowUp className="h-3 w-3" />
                    )}
                    <span>{Math.abs(card.comparison.percentageChange).toFixed(1)}%</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );
}
