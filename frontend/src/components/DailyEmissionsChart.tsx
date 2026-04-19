import { useEffect, useRef } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface DailyEmissionsChartProps {
  data: { date: string; emissions: number }[];
  onDataPointClick?: (date: string, emissions: number) => void;
}

export default function DailyEmissionsChart({ data, onDataPointClick }: DailyEmissionsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && data.length > 0) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      // Destroy existing chart
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Format dates for display
      const labels = data.map(d => {
        const date = new Date(d.date);
        return `${date.getMonth() + 1}/${date.getDate()}`;
      });

      // Calculate appropriate tick spacing based on data length
      const maxTicks = data.length > 90 ? 12 : data.length > 30 ? 10 : Math.min(data.length, 7);

      // @ts-ignore - Chart.js is loaded via CDN
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Daily Emissions (kg CO₂)',
            data: data.map(d => d.emissions),
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#22c55e',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: data.length > 90 ? 0 : 3,
            pointHoverRadius: 6,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 750,
            easing: 'easeInOutQuart',
          },
          onClick: (event: any, elements: any) => {
            if (elements.length > 0 && onDataPointClick) {
              const index = elements[0].index;
              const clickedData = data[index];
              onDataPointClick(clickedData.date, clickedData.emissions);
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#9ca3af',
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              titleColor: '#fff',
              bodyColor: '#22c55e',
              borderColor: '#22c55e',
              borderWidth: 1,
              padding: 12,
              displayColors: false,
              callbacks: {
                label: function(context: any) {
                  return `${context.parsed.y.toFixed(2)} kg CO₂`;
                },
                footer: function() {
                  return 'Click for breakdown';
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Emissions (kg CO₂)',
                color: '#9ca3af',
                font: {
                  size: 12
                }
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.05)',
              },
              ticks: {
                color: '#9ca3af',
                callback: function(value: any) {
                  return value.toFixed(0);
                }
              }
            },
            x: {
              title: {
                display: true,
                text: 'Date',
                color: '#9ca3af',
                font: {
                  size: 12
                }
              },
              grid: {
                display: false,
              },
              ticks: {
                color: '#9ca3af',
                maxRotation: 45,
                minRotation: 45,
                maxTicksLimit: maxTicks,
                autoSkip: true,
                autoSkipPadding: 10
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data, onDataPointClick]);

  return (
    <div className="h-80">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
