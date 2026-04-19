import { useState, useEffect } from 'react';

interface MonthlyEntry {
  month: string;
  emissions: number;
}

const STORAGE_KEY = 'carbontrack_monthly_history';

// Generate last 6 months with mock data
const generateMockMonthlyData = (): MonthlyEntry[] => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  
  const mockData: MonthlyEntry[] = [];
  
  // Generate last 6 months of data
  for (let i = 5; i >= 0; i--) {
    const monthIndex = (currentMonthIndex - i + 12) % 12;
    const monthName = monthNames[monthIndex];
    
    // Generate varied emissions between 400-900 kg CO₂
    const baseEmission = 600;
    const variation = (Math.random() - 0.5) * 300;
    const emissions = Math.round(baseEmission + variation);
    
    mockData.push({
      month: monthName,
      emissions: emissions,
    });
  }
  
  return mockData;
};

export function useCarbonTracker() {
  const [monthlyHistory, setMonthlyHistory] = useState<MonthlyEntry[]>([]);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMonthlyHistory(parsed);
      } catch (e) {
        // If parsing fails, use mock data
        const mockData = generateMockMonthlyData();
        setMonthlyHistory(mockData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
      }
    } else {
      // Initialize with mock data
      const mockData = generateMockMonthlyData();
      setMonthlyHistory(mockData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));
    }
  }, []);

  const addEntry = (emissions: number) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = monthNames[new Date().getMonth()];
    
    const updatedHistory = [...monthlyHistory];
    
    // Check if current month already exists
    const existingIndex = updatedHistory.findIndex(entry => entry.month === currentMonth);
    
    if (existingIndex >= 0) {
      // Update existing month
      updatedHistory[existingIndex].emissions = emissions;
    } else {
      // Add new month
      updatedHistory.push({
        month: currentMonth,
        emissions: emissions,
      });
      
      // Keep only last 6 months
      if (updatedHistory.length > 6) {
        updatedHistory.shift();
      }
    }
    
    setMonthlyHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const getMonthlyHistory = (): MonthlyEntry[] => {
    return monthlyHistory;
  };

  // Legacy methods for backward compatibility with CarbonSummaryCards
  const getTotalEmissions = (): number => {
    return monthlyHistory.reduce((sum, entry) => sum + entry.emissions, 0);
  };

  const getMonthlyEmissions = (): number => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = monthNames[new Date().getMonth()];
    const currentMonthData = monthlyHistory.find(entry => entry.month === currentMonth);
    return currentMonthData ? currentMonthData.emissions : 0;
  };

  const getReductionTarget = (): { target: number; progress: number } => {
    if (monthlyHistory.length < 2) {
      return { target: 20, progress: 0 };
    }
    
    const firstEmission = monthlyHistory[0].emissions;
    const latestEmission = monthlyHistory[monthlyHistory.length - 1].emissions;
    const reduction = ((firstEmission - latestEmission) / firstEmission) * 100;
    const progress = Math.min((reduction / 20) * 100, 100);
    
    return {
      target: 20,
      progress: Math.max(0, progress),
    };
  };

  const getEfficiencyScore = (): { score: number; rating: string } => {
    if (monthlyHistory.length === 0) {
      return { score: 0, rating: 'No data' };
    }

    const avgEmission = monthlyHistory.reduce((sum, e) => sum + e.emissions, 0) / monthlyHistory.length;
    const latestEmission = monthlyHistory[monthlyHistory.length - 1].emissions;
    
    let efficiency = 50;
    
    if (latestEmission < avgEmission) {
      efficiency += 30;
    }
    
    if (monthlyHistory.length >= 3) {
      efficiency += 20;
    }
    
    efficiency = Math.min(100, efficiency);
    
    let rating = 'Poor';
    if (efficiency >= 80) rating = 'Excellent';
    else if (efficiency >= 60) rating = 'Good';
    else if (efficiency >= 40) rating = 'Fair';
    
    return { score: efficiency, rating };
  };

  const getComparison = () => {
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return { percentageChange: 0, direction: 'neutral' as const };
      const change = ((current - previous) / previous) * 100;
      return {
        percentageChange: change,
        direction: change < 0 ? 'down' as const : 'up' as const,
      };
    };

    const currentTotal = getTotalEmissions();
    const currentMonthly = getMonthlyEmissions();
    const currentEfficiency = getEfficiencyScore().score;

    // Mock previous values for comparison
    const previousTotal = currentTotal > 0 ? currentTotal * 0.95 : 0;
    const previousMonthly = currentMonthly > 0 ? currentMonthly * 1.05 : 0;
    const previousEfficiency = Math.max(0, currentEfficiency - 5);

    return {
      totalEmissions: calculateChange(currentTotal, previousTotal),
      monthlyEmissions: calculateChange(currentMonthly, previousMonthly),
      efficiencyScore: calculateChange(currentEfficiency, previousEfficiency),
    };
  };

  return {
    addEntry,
    getMonthlyHistory,
    getTotalEmissions,
    getMonthlyEmissions,
    getReductionTarget,
    getEfficiencyScore,
    getComparison,
  };
}
