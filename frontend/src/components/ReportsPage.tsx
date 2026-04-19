import { FileText, TrendingDown, TrendingUp, Activity } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      id: 1,
      title: 'Q1 2026 Emissions Report',
      date: 'January 1 - March 31, 2026',
      totalEmissions: '2,450 kg CO₂',
      reduction: '+12%',
      isPositive: false,
      efficiency: 87,
      status: 'Published',
    },
    {
      id: 2,
      title: 'Q4 2025 Emissions Report',
      date: 'October 1 - December 31, 2025',
      totalEmissions: '2,180 kg CO₂',
      reduction: '-8%',
      isPositive: true,
      efficiency: 92,
      status: 'Published',
    },
    {
      id: 3,
      title: 'Q3 2025 Emissions Report',
      date: 'July 1 - September 30, 2025',
      totalEmissions: '2,370 kg CO₂',
      reduction: '-15%',
      isPositive: true,
      efficiency: 89,
      status: 'Published',
    },
    {
      id: 4,
      title: 'Q2 2025 Emissions Report',
      date: 'April 1 - June 30, 2025',
      totalEmissions: '2,790 kg CO₂',
      reduction: '+5%',
      isPositive: false,
      efficiency: 81,
      status: 'Published',
    },
    {
      id: 5,
      title: 'Q1 2025 Emissions Report',
      date: 'January 1 - March 31, 2025',
      totalEmissions: '2,650 kg CO₂',
      reduction: '-10%',
      isPositive: true,
      efficiency: 85,
      status: 'Published',
    },
    {
      id: 6,
      title: 'Q4 2024 Emissions Report',
      date: 'October 1 - December 31, 2024',
      totalEmissions: '2,940 kg CO₂',
      reduction: '-3%',
      isPositive: true,
      efficiency: 78,
      status: 'Published',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Emissions Reports</h2>
        <p className="text-gray-400 mt-1">View your historical carbon footprint reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:bg-neutral-900/60 transition-all duration-200 cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                <FileText className="h-5 w-5 text-green-400" />
              </div>
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                {report.status}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
              {report.title}
            </h3>
            <p className="text-sm text-gray-400 mb-4">{report.date}</p>

            <div className="space-y-3 pt-4 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Total Emissions</span>
                <span className="text-sm font-semibold text-white">{report.totalEmissions}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">vs Previous Period</span>
                <div className="flex items-center gap-1">
                  {report.isPositive ? (
                    <TrendingDown className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-red-400" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      report.isPositive ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {report.reduction}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Efficiency Score</span>
                <div className="flex items-center gap-1">
                  <Activity className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-semibold text-white">{report.efficiency}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
