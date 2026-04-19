import { Button } from '@/components/ui/button';
import { User, Building2 } from 'lucide-react';
import { ViewType } from '../types/carbonData';

interface ViewToggleProps {
  currentView: ViewType;
  onToggle: () => void;
}

export default function ViewToggle({ currentView, onToggle }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-950 border border-gray-800 rounded-lg p-1">
      <Button
        variant={currentView === 'personal' ? 'default' : 'ghost'}
        size="sm"
        onClick={onToggle}
        className={`gap-2 transition-all duration-200 ${
          currentView === 'personal'
            ? 'bg-green-500 text-black hover:bg-green-600'
            : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
      >
        <User className="h-4 w-4" />
        Personal
      </Button>
      <Button
        variant={currentView === 'industrial' ? 'default' : 'ghost'}
        size="sm"
        onClick={onToggle}
        className={`gap-2 transition-all duration-200 ${
          currentView === 'industrial'
            ? 'bg-green-500 text-black hover:bg-green-600'
            : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
      >
        <Building2 className="h-4 w-4" />
        Industrial
      </Button>
    </div>
  );
}
