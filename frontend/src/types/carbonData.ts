export type ViewType = 'personal' | 'industrial';

export interface CarbonMetrics {
  totalEmissions: number;
  monthlyEmissions: number;
  reductionTarget: number;
  efficiencyScore: number;
}

export interface ForecastData {
  labels: string[];
  values: number[];
}

export interface AIRecommendation {
  title: string;
  description: string;
  impact: string;
  tags: string[];
}

export const carbonData: Record<ViewType, CarbonMetrics> = {
  personal: {
    totalEmissions: 12.5,
    monthlyEmissions: 1.2,
    reductionTarget: 30,
    efficiencyScore: 78,
  },
  industrial: {
    totalEmissions: 8450,
    monthlyEmissions: 720,
    reductionTarget: 45,
    efficiencyScore: 82,
  },
};

export const forecastData: Record<ViewType, ForecastData> = {
  personal: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [1.4, 1.3, 1.2, 1.1, 1.0, 0.9, 0.9, 0.8, 0.8, 0.7, 0.7, 0.6],
  },
  industrial: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [820, 790, 760, 730, 700, 680, 660, 640, 620, 600, 580, 560],
  },
};

export const aiRecommendations: Record<ViewType, AIRecommendation> = {
  personal: {
    title: 'Switch to Renewable Energy',
    description: 'Based on your consumption patterns, transitioning to a renewable energy provider could reduce your carbon footprint by up to 40%. We recommend exploring solar panel installation or green energy tariffs available in your area.',
    impact: '40%',
    tags: ['High Impact', 'Energy', 'Cost Effective'],
  },
  industrial: {
    title: 'Optimize Manufacturing Process',
    description: 'Our AI analysis identified inefficiencies in your production line during peak hours. Implementing smart scheduling and upgrading to energy-efficient machinery could reduce emissions by 25% while improving output quality.',
    impact: '25%',
    tags: ['High Impact', 'Manufacturing', 'ROI: 18 months'],
  },
};
