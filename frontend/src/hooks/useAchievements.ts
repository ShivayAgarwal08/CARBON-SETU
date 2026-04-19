import { useState, useEffect } from 'react';
import { useToast } from './useToast';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

const ACHIEVEMENTS_KEY = 'carbontrack_achievements';
const DAILY_STORAGE_KEY = 'carbontrack_daily_entries';

export function useAchievements() {
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [newlyUnlockedBadges, setNewlyUnlockedBadges] = useState<Badge[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (stored) {
      setEarnedBadges(JSON.parse(stored));
    }
  }, []);

  const checkAchievements = (): Badge[] => {
    const dailyStored = localStorage.getItem(DAILY_STORAGE_KEY);
    const dailyEntries = dailyStored ? JSON.parse(dailyStored) : [];
    
    const newBadges: Badge[] = [];
    const currentBadgeIds = earnedBadges.map(b => b.id);

    // Achievement: First Entry
    if (dailyEntries.length >= 1 && !currentBadgeIds.includes('first_entry')) {
      newBadges.push({
        id: 'first_entry',
        title: 'Getting Started',
        description: 'Track your first emission entry',
        icon: '/assets/generated/trophy-badge.dim_64x64.png',
        earned: true,
        earnedDate: new Date().toISOString(),
      });
    }

    // Achievement: 7-Day Streak
    if (hasStreak(dailyEntries, 7) && !currentBadgeIds.includes('7_day_streak')) {
      newBadges.push({
        id: '7_day_streak',
        title: '7-Day Streak',
        description: 'Track emissions for 7 consecutive days',
        icon: '/assets/generated/streak-flame.dim_64x64.png',
        earned: true,
        earnedDate: new Date().toISOString(),
      });
    }

    // Achievement: First Month
    if (hasMonthOfData(dailyEntries) && !currentBadgeIds.includes('first_month')) {
      newBadges.push({
        id: 'first_month',
        title: 'Monthly Tracker',
        description: 'Complete your first full month of tracking',
        icon: '/assets/generated/trophy-badge.dim_64x64.png',
        earned: true,
        earnedDate: new Date().toISOString(),
      });
    }

    // Achievement: 10% Reduction
    if (hasReduction(dailyEntries, 10) && !currentBadgeIds.includes('10_percent_reduction')) {
      newBadges.push({
        id: '10_percent_reduction',
        title: '10% Reduction',
        description: 'Reduce emissions by 10% from baseline',
        icon: '/assets/generated/target-badge.dim_64x64.png',
        earned: true,
        earnedDate: new Date().toISOString(),
      });
    }

    // Achievement: 30-Day Streak
    if (hasStreak(dailyEntries, 30) && !currentBadgeIds.includes('30_day_streak')) {
      newBadges.push({
        id: '30_day_streak',
        title: '30-Day Champion',
        description: 'Track emissions for 30 consecutive days',
        icon: '/assets/generated/streak-flame.dim_64x64.png',
        earned: true,
        earnedDate: new Date().toISOString(),
      });
    }

    // Achievement: Consistent Tracker
    if (hasConsistentWeek(dailyEntries) && !currentBadgeIds.includes('consistent_tracker')) {
      newBadges.push({
        id: 'consistent_tracker',
        title: 'Consistent Tracker',
        description: 'Log emissions every day for a week',
        icon: '/assets/generated/trophy-badge.dim_64x64.png',
        earned: true,
        earnedDate: new Date().toISOString(),
      });
    }

    if (newBadges.length > 0) {
      const updatedBadges = [...earnedBadges, ...newBadges];
      setEarnedBadges(updatedBadges);
      setNewlyUnlockedBadges(newBadges);
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updatedBadges));
      
      // Notify user of new achievements
      newBadges.forEach(badge => {
        showToast(`Achievement Unlocked: ${badge.title}!`, 'success');
      });
    }

    return newBadges;
  };

  const hasStreak = (entries: any[], days: number): boolean => {
    if (entries.length < days) return false;
    
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < days; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      if (sortedEntries.some(e => e.date === dateStr)) {
        streak++;
      } else {
        break;
      }
    }

    return streak >= days;
  };

  const hasMonthOfData = (entries: any[]): boolean => {
    if (entries.length < 20) return false;
    
    const dates = entries.map(e => new Date(e.date));
    const months = new Set(dates.map(d => `${d.getFullYear()}-${d.getMonth()}`));
    
    return months.size >= 1 && entries.length >= 20;
  };

  const hasReduction = (entries: any[], percentage: number): boolean => {
    if (entries.length < 14) return false;
    
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const firstWeek = sortedEntries.slice(0, 7);
    const lastWeek = sortedEntries.slice(-7);

    const firstAvg = firstWeek.reduce((sum, e) => sum + e.emissions, 0) / firstWeek.length;
    const lastAvg = lastWeek.reduce((sum, e) => sum + e.emissions, 0) / lastWeek.length;

    const reduction = ((firstAvg - lastAvg) / firstAvg) * 100;
    return reduction >= percentage;
  };

  const hasConsistentWeek = (entries: any[]): boolean => {
    return hasStreak(entries, 7);
  };

  return {
    earnedBadges,
    newlyUnlockedBadges,
    checkAchievements,
  };
}
