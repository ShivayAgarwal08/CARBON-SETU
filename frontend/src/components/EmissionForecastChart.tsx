import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ViewType, forecastData } from '../types/carbonData';
import { TrendingDown } from 'lucide-react';

interface EmissionForecastChartProps {
  viewType: ViewType;
}

export default function EmissionForecastChart({ viewType }: EmissionForecastChartProps) {
  const data = forecastData[viewType];
  
  // Calculate chart dimensions and scaling
  const width = 800;
  const height = 300;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  
  // Find min and max values for scaling
  const maxValue = Math.max(...data.values);
  const minValue = Math.min(...data.values);
  const valueRange = maxValue - minValue;
  
  // Calculate points for the line
  const points = data.values.map((value, index) => {
    const x = padding.left + (index / (data.values.length - 1)) * chartWidth;
    const y = padding.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
    return { x, y, value, label: data.labels[index] };
  });
  
  // Create path for the line
  const linePath = points.map((point, index) => {
    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }).join(' ');
  
  // Create path for the filled area
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${padding.left} ${height - padding.bottom} Z`;
  
  // Generate Y-axis labels
  const yAxisSteps = 5;
  const yAxisLabels = Array.from({ length: yAxisSteps }, (_, i) => {
    const value = minValue + (valueRange * i / (yAxisSteps - 1));
    return Math.round(value);
  }).reverse();

  return (
    <Card className="bg-gray-950 border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-green-500" />
              Emission Forecast
            </CardTitle>
            <p className="text-sm text-gray-400 mt-1">
              Projected emissions for the next 12 months
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">-18%</div>
            <div className="text-xs text-gray-500">vs last year</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full overflow-x-auto">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto"
            style={{ minHeight: '300px' }}
          >
            {/* Grid lines */}
            {yAxisLabels.map((_, index) => {
              const y = padding.top + (chartHeight * index / (yAxisSteps - 1));
              return (
                <line
                  key={`grid-${index}`}
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.05)"
                  strokeWidth="1"
                />
              );
            })}
            
            {/* Y-axis labels */}
            {yAxisLabels.map((label, index) => {
              const y = padding.top + (chartHeight * index / (yAxisSteps - 1));
              return (
                <text
                  key={`y-label-${index}`}
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fill="#9ca3af"
                  fontSize="11"
                >
                  {label}t
                </text>
              );
            })}
            
            {/* X-axis labels */}
            {points.map((point, index) => (
              <text
                key={`x-label-${index}`}
                x={point.x}
                y={height - padding.bottom + 20}
                textAnchor="middle"
                fill="#9ca3af"
                fontSize="11"
              >
                {point.label}
              </text>
            ))}
            
            {/* Filled area under the line */}
            <path
              d={areaPath}
              fill="rgba(34, 197, 94, 0.1)"
            />
            
            {/* Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Data points */}
            {points.map((point, index) => (
              <g key={`point-${index}`}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  fill="#22c55e"
                  stroke="#000"
                  strokeWidth="2"
                  className="hover:r-6 transition-all cursor-pointer"
                />
                {/* Tooltip on hover */}
                <title>{`${point.label}: ${point.value} tons CO₂`}</title>
              </g>
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
