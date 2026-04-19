import { Lightbulb, Zap, Car, Trash2, Droplet, Wind } from 'lucide-react';

export default function RecommendationsPage() {
  const recommendations = [
    {
      id: 1,
      category: 'Energy',
      icon: Zap,
      impact: 'High',
      title: 'Switch to Renewable Energy',
      description:
        'Transition to solar or wind energy sources for your home or business. This can reduce your carbon footprint by up to 40%.',
      steps: [
        'Research local renewable energy providers',
        'Get quotes for solar panel installation',
        'Apply for government incentives and rebates',
        'Schedule installation with certified professionals',
      ],
    },
    {
      id: 2,
      category: 'Transport',
      icon: Car,
      impact: 'High',
      title: 'Adopt Electric or Hybrid Vehicles',
      description:
        'Replace fossil fuel vehicles with electric or hybrid alternatives to significantly reduce transportation emissions.',
      steps: [
        'Compare electric vehicle models and ranges',
        'Identify charging infrastructure in your area',
        'Calculate total cost of ownership vs traditional vehicles',
        'Test drive and purchase suitable EV model',
      ],
    },
    {
      id: 3,
      category: 'Waste',
      icon: Trash2,
      impact: 'Medium',
      title: 'Implement Comprehensive Recycling',
      description:
        'Establish a robust recycling program to minimize waste sent to landfills and reduce methane emissions.',
      steps: [
        'Audit current waste streams and volumes',
        'Set up separate bins for recyclables and compost',
        'Partner with local recycling facilities',
        'Train team members on proper sorting',
      ],
    },
    {
      id: 4,
      category: 'Water',
      icon: Droplet,
      impact: 'Medium',
      title: 'Optimize Water Usage',
      description:
        'Reduce water consumption and associated energy costs through efficient fixtures and smart monitoring.',
      steps: [
        'Install low-flow faucets and toilets',
        'Fix leaks and drips promptly',
        'Implement rainwater harvesting systems',
        'Monitor usage with smart meters',
      ],
    },
    {
      id: 5,
      category: 'Energy',
      icon: Wind,
      impact: 'Low',
      title: 'Improve Building Insulation',
      description:
        'Enhance thermal efficiency to reduce heating and cooling energy requirements throughout the year.',
      steps: [
        'Conduct energy audit to identify heat loss areas',
        'Upgrade windows to double or triple glazing',
        'Add insulation to walls, roof, and floors',
        'Seal gaps and cracks around doors and windows',
      ],
    },
    {
      id: 6,
      category: 'Energy',
      icon: Lightbulb,
      impact: 'Low',
      title: 'Upgrade to LED Lighting',
      description:
        'Replace traditional bulbs with energy-efficient LED alternatives to reduce electricity consumption.',
      steps: [
        'Inventory all current lighting fixtures',
        'Calculate potential energy savings',
        'Purchase LED bulbs with appropriate lumens',
        'Replace bulbs systematically across all spaces',
      ],
    },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Low':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">AI Recommendations</h2>
        <p className="text-gray-400 mt-1">Personalized actions to reduce your carbon footprint</p>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:bg-neutral-900/60 transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg flex-shrink-0">
                <rec.icon className="h-6 w-6 text-green-400" />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        {rec.category}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded border ${getImpactColor(
                          rec.impact
                        )}`}
                      >
                        {rec.impact} Impact
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{rec.title}</h3>
                    <p className="text-gray-400">{rec.description}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <h4 className="text-sm font-semibold text-white mb-3">Action Steps:</h4>
                  <ol className="space-y-2">
                    {rec.steps.map((step, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold flex items-center justify-center">
                          {index + 1}
                        </span>
                        <span className="text-sm text-gray-300 pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
