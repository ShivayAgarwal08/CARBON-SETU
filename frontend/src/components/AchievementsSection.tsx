import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Lock } from 'lucide-react';

interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
}

interface AchievementsSectionProps {
  badges: Badge[];
}

const ALL_ACHIEVEMENTS: Badge[] = [
  {
    id: 'first_entry',
    title: 'Getting Started',
    description: 'Track your first emission entry',
    icon: '/assets/generated/trophy-badge.dim_64x64.png',
    earned: false,
  },
  {
    id: '7_day_streak',
    title: '7-Day Streak',
    description: 'Track emissions for 7 consecutive days',
    icon: '/assets/generated/streak-flame.dim_64x64.png',
    earned: false,
  },
  {
    id: 'first_month',
    title: 'Monthly Tracker',
    description: 'Complete your first full month of tracking',
    icon: '/assets/generated/trophy-badge.dim_64x64.png',
    earned: false,
  },
  {
    id: '10_percent_reduction',
    title: '10% Reduction',
    description: 'Reduce emissions by 10% from baseline',
    icon: '/assets/generated/target-badge.dim_64x64.png',
    earned: false,
  },
  {
    id: '30_day_streak',
    title: '30-Day Champion',
    description: 'Track emissions for 30 consecutive days',
    icon: '/assets/generated/streak-flame.dim_64x64.png',
    earned: false,
  },
  {
    id: 'consistent_tracker',
    title: 'Consistent Tracker',
    description: 'Log emissions every day for a week',
    icon: '/assets/generated/trophy-badge.dim_64x64.png',
    earned: false,
  },
];

export default function AchievementsSection({ badges }: AchievementsSectionProps) {
  // Merge earned badges with all achievements
  const allBadges = ALL_ACHIEVEMENTS.map(achievement => {
    const earnedBadge = badges.find(b => b.id === achievement.id);
    return earnedBadge || achievement;
  });

  const earnedCount = allBadges.filter(b => b.earned).length;

  return (
    <Card className="glass-card rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[#22c55e]" />
            Achievements
          </CardTitle>
          <span className="text-sm text-gray-400">
            {earnedCount} / {allBadges.length} Unlocked
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {earnedCount === 0 ? (
          <div className="text-center py-8">
            <Trophy className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No badges earned yet</p>
            <p className="text-sm text-gray-500 mt-1">Start tracking to unlock achievements!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {allBadges.map((badge) => (
              <div
                key={badge.id}
                className={`glass-card rounded-xl p-4 text-center transition-all duration-300 ${
                  badge.earned
                    ? 'border-[#22c55e]/30 hover:border-[#22c55e]/50 hover:scale-105'
                    : 'opacity-40 grayscale'
                }`}
              >
                <div className="relative mb-2">
                  <img
                    src={badge.icon}
                    alt={badge.title}
                    className="w-16 h-16 mx-auto"
                  />
                  {!badge.earned && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="h-6 w-6 text-gray-500" />
                    </div>
                  )}
                </div>
                <h4 className="text-xs font-semibold text-white mb-1">{badge.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-2">{badge.description}</p>
                {badge.earned && badge.earnedDate && (
                  <p className="text-xs text-[#22c55e] mt-1">
                    {new Date(badge.earnedDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
