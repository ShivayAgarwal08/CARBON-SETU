import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { ViewType, aiRecommendations } from '../types/carbonData';

interface AIRecommendationBoxProps {
  viewType: ViewType;
}

export default function AIRecommendationBox({ viewType }: AIRecommendationBoxProps) {
  const recommendation = aiRecommendations[viewType];

  return (
    <Card className="bg-gradient-to-br from-green-950/30 to-gray-950 border-green-500/20">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-green-400" />
          AI-Powered Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-2 h-2 bg-green-400 rounded-full mt-2 animate-pulse" />
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-2">{recommendation.title}</h3>
            <p className="text-gray-300 leading-relaxed">{recommendation.description}</p>
          </div>
        </div>
        
        <div className="bg-black/30 rounded-lg p-4 border border-green-500/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Potential Impact</span>
            <span className="text-sm font-semibold text-green-400">{recommendation.impact}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-1000"
              style={{ width: recommendation.impact }}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {recommendation.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
