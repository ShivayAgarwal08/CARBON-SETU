import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface LandingSectionProps {
  onLaunchDashboard: () => void;
}

export default function LandingSection({ onLaunchDashboard }: LandingSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0b0f19] via-[#0f172a] to-[#0b0f19] overflow-hidden">
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(34,197,94,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,197,94,0.05) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem'
        }}
      />
      
      {/* Green glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#22c55e]/10 rounded-full blur-[120px] animate-pulse" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main headline */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-[#22c55e] bg-clip-text text-transparent leading-tight">
          Measure. Reduce. Earn.
        </h1>
        
        {/* Subtext */}
        <p className="text-2xl md:text-3xl text-[#22c55e] mb-8 font-semibold">
          Your AI-Powered Climate Intelligence Platform
        </p>
        
        {/* Problem statement */}
        <p className="text-lg md:text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
          Climate change demands immediate action, but tracking emissions remains complex and fragmented.
        </p>
        
        {/* Vision statement */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          CarbonTrack unifies carbon tracking with AI-driven insights to accelerate your sustainability journey.
        </p>
        
        {/* CTA Button */}
        <Button
          onClick={onLaunchDashboard}
          size="lg"
          className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-black font-semibold px-10 py-7 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] group mb-16"
        >
          Launch Dashboard
          <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
        </Button>
      </div>

      {/* India AQI Heatmap Section */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-20">
        <div className="glass-card rounded-2xl p-6 border-2 border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold text-white">🌍 Live India AQI Heatmap</h3>
            <span className="text-sm text-gray-400">Real-time Air Quality Data</span>
          </div>
          <div className="relative w-full rounded-xl overflow-hidden bg-black/30" style={{ aspectRatio: '16/9' }}>
            <iframe
              src="https://www.aqi.in/dashboard/india"
              className="w-full h-full border-0"
              title="India AQI Heatmap"
              loading="lazy"
              style={{ minHeight: '500px' }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Interactive air quality monitoring across India • Data updated in real-time
          </p>
        </div>
      </div>

      {/* Decorative stats */}
      <div className="relative z-10 flex justify-center gap-16 text-sm text-gray-500 pb-12">
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-[#22c55e] mb-2">98%</div>
          <div>Accuracy</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-[#22c55e] mb-2">24/7</div>
          <div>Monitoring</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-4xl font-bold text-[#22c55e] mb-2">AI</div>
          <div>Powered</div>
        </div>
      </div>
    </section>
  );
}
