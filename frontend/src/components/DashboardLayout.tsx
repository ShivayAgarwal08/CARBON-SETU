import { useState } from 'react';
import { FileText, Lightbulb, User, Menu, X, Activity, MessageSquare, Sun, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PageType = 'carbon-tracker' | 'climate-coach' | 'solar-schemes' | 'marketplace' | 'reports' | 'recommendations' | 'profile';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

export default function DashboardLayout({ children, activePage, onNavigate }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems: Array<{ icon: typeof Activity; label: string; page: PageType }> = [
    { icon: Activity, label: 'Carbon Tracker', page: 'carbon-tracker' },
    { icon: MessageSquare, label: 'Climate Coach', page: 'climate-coach' },
    { icon: Sun, label: 'Solar Schemes', page: 'solar-schemes' },
    { icon: ShoppingCart, label: 'Marketplace', page: 'marketplace' },
    { icon: FileText, label: 'Reports', page: 'reports' },
    { icon: Lightbulb, label: 'Recommendations', page: 'recommendations' },
    { icon: User, label: 'Profile', page: 'profile' },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0f172a]">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden text-white hover:bg-white/10"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 glass-card border-r border-white/10 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#22c55e] to-green-400 bg-clip-text text-transparent">
              CarbonTrack
            </h1>
            <p className="text-xs text-gray-500 mt-1">Climate Intelligence</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  activePage === item.page
                    ? 'bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/30 shadow-green-glow-sm'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer spacer */}
          <div className="p-4" />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
