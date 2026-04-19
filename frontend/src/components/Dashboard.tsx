import { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import TopBar from './TopBar';
import ReportsPage from './ReportsPage';
import RecommendationsPage from './RecommendationsPage';
import ProfilePage from './ProfilePage';
import CarbonTrackerPage from './CarbonTrackerPage';
import ClimateCoachPage from './ClimateCoachPage';
import SolarSchemesPage from './SolarSchemesPage';
import MarketplacePage from './MarketplacePage';

type PageType = 'carbon-tracker' | 'climate-coach' | 'solar-schemes' | 'marketplace' | 'reports' | 'recommendations' | 'profile';

export default function Dashboard() {
  const [activePage, setActivePage] = useState<PageType>('carbon-tracker');

  return (
    <DashboardLayout activePage={activePage} onNavigate={setActivePage}>
      <div className="flex-1 flex flex-col min-h-screen bg-[#0f172a]">
        <TopBar />
        
        <main className="flex-1 p-6 space-y-6">
          {activePage === 'carbon-tracker' && <CarbonTrackerPage />}
          {activePage === 'climate-coach' && <ClimateCoachPage />}
          {activePage === 'solar-schemes' && <SolarSchemesPage />}
          {activePage === 'marketplace' && <MarketplacePage />}
          {activePage === 'reports' && <ReportsPage />}
          {activePage === 'recommendations' && <RecommendationsPage />}
          {activePage === 'profile' && <ProfilePage />}
        </main>
      </div>
    </DashboardLayout>
  );
}
