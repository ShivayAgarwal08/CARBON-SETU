import { useState, useMemo } from "react";
import { useCarbonTracker } from "../hooks/useCarbonTracker";
import { useToast } from "../hooks/useToast";
import { useAchievements } from "../hooks/useAchievements";
import Toast from "./Toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  TrendingDown,
  TrendingUp,
  Minus,
  Leaf,
  Calendar,
  Target,
  Zap,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Flame,
  Droplets,
  Car,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts";

// ─── Custom Tooltip ─────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e293b]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 shadow-2xl">
        <p className="text-gray-400 text-xs font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-base font-bold" style={{ color: entry.color }}>
            {entry.value?.toFixed(1)} kg CO₂
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Animated Counter ───────────────────────────────────────────
function AnimatedValue({ value, suffix = "" }: { value: number; suffix?: string }) {
  return (
    <span className="tabular-nums">
      {value.toFixed(1)}{suffix}
    </span>
  );
}

// ─── Circular Progress Ring ─────────────────────────────────────
function ProgressRing({ value, max, color, size = 80, strokeWidth = 6, children }: {
  value: number; max: number; color: string; size?: number; strokeWidth?: number; children?: React.ReactNode;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = Math.min(value / max, 1);
  const offset = circumference * (1 - percent);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// ─── Stat Card Component ────────────────────────────────────────
function StatCard({ icon: Icon, label, value, unit, trend, trendValue, color, delay }: {
  icon: any; label: string; value: string; unit: string; trend?: "up" | "down" | "neutral"; trendValue?: string; color: string; delay: number;
}) {
  return (
    <div
      className="group glass-card rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 hover:shadow-lg relative overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center`} style={{ background: `${color}15` }}>
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
              trend === "down" ? "bg-emerald-500/10 text-emerald-400" : trend === "up" ? "bg-rose-500/10 text-rose-400" : "bg-gray-500/10 text-gray-400"
            }`}>
              {trend === "down" ? <ArrowDownRight className="h-3 w-3" /> : trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <Minus className="h-3 w-3" />}
              {trendValue}
            </div>
          )}
        </div>
        <p className="text-[13px] text-gray-500 font-medium mb-1">{label}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold text-white tracking-tight">{value}</span>
          <span className="text-sm text-gray-500">{unit}</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function CarbonTrackerPage() {
  const [travelDistance, setTravelDistance] = useState("");
  const [electricity, setElectricity] = useState("");
  const [diet, setDiet] = useState<"Veg" | "Non-Veg">("Veg");
  const [lpgCylinders, setLpgCylinders] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [carbonScore, setCarbonScore] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const {
    addEntry,
    getMonthlyHistory,
    getTotalEmissions,
    getMonthlyEmissions,
    getReductionTarget,
    getEfficiencyScore,
  } = useCarbonTracker();
  const { toast, showToast, hideToast } = useToast();
  const { checkAchievements } = useAchievements();

  const monthlyData = getMonthlyHistory();
  const totalEmissions = getTotalEmissions();
  const monthlyEmissions = getMonthlyEmissions();
  const reductionTarget = getReductionTarget();
  const efficiencyScore = getEfficiencyScore();

  // ─── Derived chart data ─────────────────────────────────────
  const radarData = useMemo(() => {
    const travel = parseFloat(travelDistance) || 0;
    const elec = parseFloat(electricity) || 0;
    const lpg = parseFloat(lpgCylinders) || 0;
    const dietVal = diet === "Veg" ? 50 : 150;

    const travelScore = Math.min(travel * 0.21, 300);
    const elecScore = Math.min(elec * 0.82, 300);
    const lpgScore = Math.min(lpg * 42, 300);

    // Use submitted values if available, otherwise use live/mock
    if (carbonScore !== null) {
      return [
        { category: "Transport", value: travelScore || 60, fullMark: 300 },
        { category: "Electricity", value: elecScore || 120, fullMark: 300 },
        { category: "Cooking (LPG)", value: lpgScore || 84, fullMark: 300 },
        { category: "Diet", value: dietVal, fullMark: 300 },
        { category: "Lifestyle", value: Math.min(totalEmissions * 0.1, 300) || 45, fullMark: 300 },
      ];
    }
    return [
      { category: "Transport", value: 95, fullMark: 300 },
      { category: "Electricity", value: 140, fullMark: 300 },
      { category: "Cooking (LPG)", value: 84, fullMark: 300 },
      { category: "Diet", value: 75, fullMark: 300 },
      { category: "Lifestyle", value: 55, fullMark: 300 },
    ];
  }, [travelDistance, electricity, lpgCylinders, diet, carbonScore, totalEmissions]);

  const pieData = useMemo(() => {
    const travel = parseFloat(travelDistance) || 0;
    const elec = parseFloat(electricity) || 0;
    const lpg = parseFloat(lpgCylinders) || 0;
    const dietVal = diet === "Veg" ? 50 : 150;

    if (carbonScore !== null) {
      return [
        { name: "Transport", value: Math.round(travel * 0.21) || 60, color: "#22c55e" },
        { name: "Electricity", value: Math.round(elec * 0.82) || 120, color: "#3b82f6" },
        { name: "Cooking", value: Math.round(lpg * 42) || 84, color: "#f59e0b" },
        { name: "Diet", value: dietVal, color: "#ec4899" },
      ];
    }
    return [
      { name: "Transport", value: 95, color: "#22c55e" },
      { name: "Electricity", value: 140, color: "#3b82f6" },
      { name: "Cooking", value: 84, color: "#f59e0b" },
      { name: "Diet", value: 75, color: "#ec4899" },
    ];
  }, [travelDistance, electricity, lpgCylinders, diet, carbonScore]);

  const barComparisonData = useMemo(() => {
    if (monthlyData.length < 2) {
      return [
        { month: "Oct", yours: 520, average: 650 },
        { month: "Nov", yours: 480, average: 640 },
        { month: "Dec", yours: 610, average: 630 },
        { month: "Jan", yours: 450, average: 625 },
        { month: "Feb", yours: 390, average: 620 },
      ];
    }
    return monthlyData.map((d) => ({
      month: d.month,
      yours: d.emissions,
      average: Math.round(d.emissions * 1.25 + (Math.random() - 0.5) * 100),
    }));
  }, [monthlyData]);

  const trendAreaData = useMemo(() => {
    if (monthlyData.length === 0) {
      return [
        { month: "Sep", emissions: 620, target: 500 },
        { month: "Oct", emissions: 580, target: 490 },
        { month: "Nov", emissions: 540, target: 480 },
        { month: "Dec", emissions: 610, target: 470 },
        { month: "Jan", emissions: 490, target: 460 },
        { month: "Feb", emissions: 450, target: 450 },
      ];
    }
    return monthlyData.map((d, i) => ({
      month: d.month,
      emissions: d.emissions,
      target: Math.max(300, Math.round(d.emissions * 0.8 - i * 10)),
    }));
  }, [monthlyData]);

  // ─── Score helpers ──────────────────────────────────────────
  const calculateCarbonScore = (t: string, e: string, l: string, d: string) => {
    const travel = parseFloat(t) || 0;
    const elec = parseFloat(e) || 0;
    const lpg = parseFloat(l) || 0;
    const dietFactor = d === "Veg" ? 50 : 150;
    const score = travel * 0.21 + elec * 0.82 + lpg * 42 + dietFactor;
    return Math.round(score * 10) / 10;
  };

  const liveScore = calculateCarbonScore(travelDistance, electricity, lpgCylinders, diet);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const score = liveScore;
    await new Promise((resolve) => setTimeout(resolve, 800));
    addEntry(score);
    checkAchievements();
    setCarbonScore(score);
    setShowResult(true);
    setIsSubmitting(false);
    showToast("Carbon footprint calculated successfully!", "success");
    setTravelDistance("");
    setElectricity("");
    setDiet("Veg");
    setLpgCylinders("");
  };

  const getCategoryBadge = (score: number) => {
    if (score < 500) return { label: "Low Impact", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" };
    if (score <= 1200) return { label: "Moderate Impact", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" };
    return { label: "High Impact", color: "bg-rose-500/20 text-rose-400 border-rose-500/30" };
  };

  const badge = carbonScore !== null ? getCategoryBadge(carbonScore) : null;

  // ═══════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#0a0f1a] p-4 md:p-6 lg:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">

        {/* ─── HEADER ──────────────────────────────────────────── */}
        <div className="relative mb-2">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Personal Carbon Tracker
            </h1>
          </div>
          <p className="text-gray-500 text-sm ml-[1.6rem] max-w-md">
            Calculate your monthly carbon footprint and track your environmental impact over time.
          </p>
        </div>

        {/* ─── STAT CARDS ROW ──────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Leaf}
            label="Total Emissions"
            value={totalEmissions.toFixed(1)}
            unit="kg CO₂"
            trend={totalEmissions > 0 ? "up" : "neutral"}
            trendValue={totalEmissions > 0 ? `${monthlyData.length} mo` : "—"}
            color="#22c55e"
            delay={0}
          />
          <StatCard
            icon={Calendar}
            label="This Month"
            value={monthlyEmissions.toFixed(1)}
            unit="kg CO₂"
            trend={monthlyEmissions < (totalEmissions / Math.max(monthlyData.length, 1)) ? "down" : "up"}
            trendValue={monthlyEmissions > 0 ? `${((monthlyEmissions / Math.max(totalEmissions / Math.max(monthlyData.length, 1), 1) - 1) * 100).toFixed(0)}%` : "—"}
            color="#3b82f6"
            delay={80}
          />
          <StatCard
            icon={Target}
            label="Reduction Target"
            value={`${reductionTarget.progress.toFixed(0)}%`}
            unit={`of ${reductionTarget.target}%`}
            trend={reductionTarget.progress > 50 ? "down" : "neutral"}
            trendValue={reductionTarget.progress > 50 ? "On track" : "In progress"}
            color="#f59e0b"
            delay={160}
          />
          <StatCard
            icon={Zap}
            label="Efficiency Score"
            value={String(efficiencyScore.score)}
            unit={`/ 100`}
            trend={efficiencyScore.score >= 70 ? "down" : "up"}
            trendValue={efficiencyScore.rating}
            color="#a855f7"
            delay={240}
          />
        </div>

        {/* ─── MAIN GRID: FORM + RESULT ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── INPUT FORM (2 cols) ──────────────────────────────── */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 border border-white/[0.06] hover:border-emerald-500/20 transition-all duration-500 h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                  <h2 className="text-lg font-semibold text-white">Calculate Footprint</h2>
                </div>
                {(travelDistance || electricity || lpgCylinders) && (
                  <div className="bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                    <span className="text-[11px] text-gray-400 block leading-tight">Live</span>
                    <span className="text-emerald-400 font-bold text-sm">{liveScore} kg</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Travel */}
                <div className="space-y-1.5">
                  <Label htmlFor="travel" className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                    <Car className="h-3.5 w-3.5" /> Travel distance (km/month)
                  </Label>
                  <Input
                    id="travel"
                    type="number"
                    placeholder="e.g. 500"
                    value={travelDistance}
                    onChange={(e) => setTravelDistance(e.target.value)}
                    className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11 transition-all duration-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 placeholder:text-gray-600"
                  />
                </div>

                {/* Electricity */}
                <div className="space-y-1.5">
                  <Label htmlFor="electricity" className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                    <Lightbulb className="h-3.5 w-3.5" /> Electricity usage (units/month)
                  </Label>
                  <Input
                    id="electricity"
                    type="number"
                    placeholder="e.g. 200"
                    value={electricity}
                    onChange={(e) => setElectricity(e.target.value)}
                    className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11 transition-all duration-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 placeholder:text-gray-600"
                  />
                </div>

                {/* Diet */}
                <div className="space-y-1.5">
                  <Label className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                    <Droplets className="h-3.5 w-3.5" /> Diet type
                  </Label>
                  <Select value={diet} onValueChange={(v) => setDiet(v as "Veg" | "Non-Veg")}>
                    <SelectTrigger className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11 transition-all duration-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a2235] border-white/10 rounded-xl">
                      <SelectItem value="Veg" className="text-white hover:bg-emerald-500/10 rounded-lg">🥬 Vegetarian</SelectItem>
                      <SelectItem value="Non-Veg" className="text-white hover:bg-emerald-500/10 rounded-lg">🍖 Non-Vegetarian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* LPG */}
                <div className="space-y-1.5">
                  <Label htmlFor="lpg" className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                    <Flame className="h-3.5 w-3.5" /> LPG cylinders (per month)
                  </Label>
                  <Input
                    id="lpg"
                    type="number"
                    placeholder="e.g. 1"
                    value={lpgCylinders}
                    onChange={(e) => setLpgCylinders(e.target.value)}
                    className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11 transition-all duration-300 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 placeholder:text-gray-600"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-semibold py-5 rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.35)] disabled:opacity-50 disabled:cursor-not-allowed border-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Activity className="mr-2 h-4 w-4" />
                      Calculate Footprint
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* ── RESULT + DONUT (3 cols) ──────────────────────────── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Result Card */}
            {showResult && carbonScore !== null ? (
              <div className="glass-card rounded-2xl p-6 border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.06] to-transparent relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.04] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                  {/* Score ring */}
                  <ProgressRing value={carbonScore} max={2000} color="#22c55e" size={140} strokeWidth={10}>
                    <div className="text-center">
                      <span className="text-3xl font-bold text-white">{carbonScore}</span>
                      <span className="block text-[10px] text-gray-400 mt-0.5">kg CO₂</span>
                    </div>
                  </ProgressRing>

                  <div className="flex-1 text-center md:text-left space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Your Monthly Footprint</p>
                      <h2 className="text-4xl font-bold text-white">
                        {carbonScore} <span className="text-lg text-gray-400 font-normal">kg CO₂/mo</span>
                      </h2>
                    </div>
                    {badge && (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
                        {badge.label}
                      </span>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      {carbonScore < 500 ? (
                        <><TrendingDown className="h-4 w-4 text-emerald-400" /><span>Great job! You're below average.</span></>
                      ) : carbonScore <= 1200 ? (
                        <><Minus className="h-4 w-4 text-amber-400" /><span>Room for improvement — try reducing travel.</span></>
                      ) : (
                        <><TrendingUp className="h-4 w-4 text-rose-400" /><span>Consider reducing your carbon output.</span></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-8 border border-white/[0.06]">
                <div className="text-center space-y-3 py-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <Activity className="w-7 h-7 text-emerald-400" />
                  </div>
                  <p className="text-gray-500 text-sm max-w-xs mx-auto">
                    Fill in the form and calculate your carbon footprint to see your results and analytics here.
                  </p>
                </div>
              </div>
            )}

            {/* Donut + Radar Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Donut Chart */}
              <div className="glass-card rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <PieChartIcon className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-300">Emission Breakdown</h3>
                </div>
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-[#1e293b]/95 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                                <p className="text-xs text-gray-400">{data.name}</p>
                                <p className="text-sm font-bold text-white">{data.value} kg CO₂</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                      <span className="text-[11px] text-gray-400">{item.name}</span>
                      <span className="text-[11px] text-gray-600 ml-auto">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Radar Chart */}
              <div className="glass-card rounded-2xl p-5 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-300">Impact Radar</h3>
                </div>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                      <PolarGrid stroke="rgba(255,255,255,0.06)" />
                      <PolarAngleAxis
                        dataKey="category"
                        tick={{ fill: "#64748b", fontSize: 11 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 300]}
                        tick={false}
                        axisLine={false}
                      />
                      <Radar
                        name="Impact"
                        dataKey="value"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.15}
                        strokeWidth={2}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-[#1e293b]/95 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                                <p className="text-xs text-gray-400">{payload[0].payload.category}</p>
                                <p className="text-sm font-bold text-emerald-400">{Number(payload[0].value).toFixed(0)} kg</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── CHARTS ROW ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Area Chart — Emissions Trend */}
          <div className="glass-card rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-gray-300">Emissions Trend vs Target</h3>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-3 h-[2px] rounded bg-emerald-400 inline-block" /> Actual</span>
                <span className="flex items-center gap-1.5 text-gray-500"><span className="w-3 h-[2px] rounded bg-gray-500 inline-block" /> Target</span>
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendAreaData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="emissionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="emissions"
                    stroke="#22c55e"
                    strokeWidth={2.5}
                    fill="url(#emissionGradient)"
                    dot={{ fill: "#22c55e", stroke: "#0a0f1a", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#22c55e", strokeWidth: 2, fill: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="#475569"
                    strokeWidth={1.5}
                    strokeDasharray="6 4"
                    fill="none"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart — You vs Average */}
          <div className="glass-card rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-gray-300">You vs National Average</h3>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-[3px] bg-emerald-500 inline-block" /> You</span>
                <span className="flex items-center gap-1.5 text-gray-500"><span className="w-3 h-3 rounded-[3px] bg-[#334155] inline-block" /> Average</span>
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barComparisonData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="yours" fill="#22c55e" radius={[6, 6, 0, 0]} barSize={20} name="Your Emissions" />
                  <Bar dataKey="average" fill="#334155" radius={[6, 6, 0, 0]} barSize={20} name="Avg. Emissions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ─── EFFICIENCY + TIPS ROW ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Efficiency Ring */}
          <div className="glass-card rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex flex-col items-center justify-center">
            <h3 className="text-sm font-semibold text-gray-300 mb-6">Efficiency Score</h3>
            <ProgressRing value={efficiencyScore.score} max={100} color="#a855f7" size={160} strokeWidth={12}>
              <div className="text-center">
                <span className="text-4xl font-bold text-white">{efficiencyScore.score}</span>
                <span className="block text-xs text-gray-500 mt-1">{efficiencyScore.rating}</span>
              </div>
            </ProgressRing>
            <div className="mt-6 w-full space-y-2">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Poor</span><span>Fair</span><span>Good</span><span>Excellent</span>
              </div>
              <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${efficiencyScore.score}%`,
                    background: "linear-gradient(90deg, #ef4444, #f59e0b, #22c55e, #a855f7)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500">
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-gray-300">Personalized Tips</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { icon: Car, title: "Use Public Transport", desc: "Switching to public transport can reduce your travel emissions by up to 65%.", color: "#22c55e" },
                { icon: Lightbulb, title: "Switch to LED Lighting", desc: "LED bulbs use 75% less energy and last 25x longer than incandescent bulbs.", color: "#3b82f6" },
                { icon: Droplets, title: "Reduce Meat Consumption", desc: "Having 2 meatless days per week can cut diet emissions by 20%.", color: "#ec4899" },
                { icon: Flame, title: "Induction Cooking", desc: "Induction cooktops are 90% efficient vs 40% for LPG, cutting cooking emissions significantly.", color: "#f59e0b" },
              ].map((tip, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: `${tip.color}12` }}>
                    <tip.icon className="h-4 w-4" style={{ color: tip.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-0.5">{tip.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.visible && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
