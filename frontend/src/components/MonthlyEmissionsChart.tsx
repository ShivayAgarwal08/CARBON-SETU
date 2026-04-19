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
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Filler
);

interface MonthlyEmissionsChartProps {
  data: { month: string; emissions: number }[];
}

export default function MonthlyEmissionsChart({ data }: MonthlyEmissionsChartProps) {
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

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(d => d.month),
          datasets: [{
            label: 'Carbon Emissions',
            data: data.map(d => d.emissions),
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#22c55e',
            pointBorderColor: '#0f172a',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#22c55e',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 3,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1000,
            easing: 'easeInOutQuart',
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: 'rgba(15, 23, 42, 0.95)',
              titleColor: '#fff',
              bodyColor: '#22c55e',
              borderColor: '#22c55e',
              borderWidth: 2,
              padding: 12,
              displayColors: false,
              titleFont: {
                size: 14,
                weight: 'bold',
              },
              bodyFont: {
                size: 16,
                weight: 'bold',
              },
              callbacks: {
                label: function(context: any) {
                  return `${context.parsed.y} kg CO₂`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.05)'
              },
              ticks: {
                color: '#9ca3af',
                font: {
                  size: 12,
                },
                callback: function(value: any) {
                  return value + ' kg';
                }
              },
              border: {
                display: false,
              }
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#9ca3af',
                font: {
                  size: 12,
                }
              },
              border: {
                display: false,
              }
            }
          },
          interaction: {
            intersect: false,
            mode: 'index',
          },
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
}
