import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Bell, Settings, Globe, Palette } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
        <p className="text-gray-400 mt-1">Manage your account and preferences</p>
      </div>

      {/* User Info Section */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:bg-neutral-900/60 transition-all duration-200">
        <div className="flex items-center gap-6">
          <Avatar className="h-20 w-20 border-2 border-green-500/20">
            <AvatarFallback className="bg-green-500/10 text-green-400 font-semibold text-2xl">
              AJ
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-white">Alex</h3>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20 mt-2">
              Climate Analyst
            </Badge>
          </div>
        </div>
      </div>

      {/* Profile Settings */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:bg-neutral-900/60 transition-all duration-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <User className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Profile Information</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">
              Full Name
            </Label>
            <Input
              id="name"
              defaultValue="Alex"
              className="bg-gray-900 border-gray-700 text-white focus:border-green-500 focus:ring-green-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue="alex@carbonsphere.com"
              className="bg-gray-900 border-gray-700 text-white focus:border-green-500 focus:ring-green-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-gray-300">
              Role
            </Label>
            <Input
              id="role"
              defaultValue="Climate Analyst"
              className="bg-gray-900 border-gray-700 text-white focus:border-green-500 focus:ring-green-500/20"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:bg-neutral-900/60 transition-all duration-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Bell className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Notifications</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications" className="text-gray-300 cursor-pointer">
                Email Notifications
              </Label>
              <p className="text-sm text-gray-500">Receive updates via email</p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-notifications" className="text-gray-300 cursor-pointer">
                Push Notifications
              </Label>
              <p className="text-sm text-gray-500">Receive push notifications</p>
            </div>
            <Switch id="push-notifications" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="weekly-reports" className="text-gray-300 cursor-pointer">
                Weekly Reports
              </Label>
              <p className="text-sm text-gray-500">Get weekly emission summaries</p>
            </div>
            <Switch id="weekly-reports" defaultChecked />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 hover:bg-neutral-900/60 transition-all duration-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Settings className="h-5 w-5 text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Preferences</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme" className="text-gray-300 flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Theme
            </Label>
            <Select defaultValue="dark">
              <SelectTrigger
                id="theme"
                className="bg-gray-900 border-gray-700 text-white focus:border-green-500 focus:ring-green-500/20"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="light" className="text-white hover:bg-gray-800">
                  Light
                </SelectItem>
                <SelectItem value="dark" className="text-white hover:bg-gray-800">
                  Dark
                </SelectItem>
                <SelectItem value="system" className="text-white hover:bg-gray-800">
                  System
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language" className="text-gray-300 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Language
            </Label>
            <Select defaultValue="en">
              <SelectTrigger
                id="language"
                className="bg-gray-900 border-gray-700 text-white focus:border-green-500 focus:ring-green-500/20"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="en" className="text-white hover:bg-gray-800">
                  English
                </SelectItem>
                <SelectItem value="es" className="text-white hover:bg-gray-800">
                  Spanish
                </SelectItem>
                <SelectItem value="fr" className="text-white hover:bg-gray-800">
                  French
                </SelectItem>
                <SelectItem value="de" className="text-white hover:bg-gray-800">
                  German
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone" className="text-gray-300 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Timezone
            </Label>
            <Select defaultValue="utc">
              <SelectTrigger
                id="timezone"
                className="bg-gray-900 border-gray-700 text-white focus:border-green-500 focus:ring-green-500/20"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="utc" className="text-white hover:bg-gray-800">
                  UTC (GMT+0)
                </SelectItem>
                <SelectItem value="est" className="text-white hover:bg-gray-800">
                  Eastern Time (GMT-5)
                </SelectItem>
                <SelectItem value="pst" className="text-white hover:bg-gray-800">
                  Pacific Time (GMT-8)
                </SelectItem>
                <SelectItem value="cet" className="text-white hover:bg-gray-800">
                  Central European Time (GMT+1)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
