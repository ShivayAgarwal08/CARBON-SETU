import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function TopBar() {
  return (
    <header className="bg-gray-950 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Welcome back, Alex</h1>
          <p className="text-sm text-gray-400">Here's your carbon footprint overview</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20">
            Climate Analyst
          </Badge>
          <Avatar className="h-10 w-10 border-2 border-green-500/20">
            <AvatarFallback className="bg-green-500/10 text-green-400 font-semibold">
              AJ
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
