import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface DateRangeFilterProps {
  startDate: Date;
  endDate: Date;
  onChange: (startDate: Date, endDate: Date) => void;
}

export default function DateRangeFilter({ startDate, endDate, onChange }: DateRangeFilterProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>('30days');
  const [isCustomOpen, setIsCustomOpen] = useState(false);

  const handlePresetClick = (preset: string) => {
    setSelectedPreset(preset);
    const end = new Date();
    let start = new Date();

    switch (preset) {
      case '7days':
        start.setDate(start.getDate() - 7);
        break;
      case '30days':
        start.setDate(start.getDate() - 30);
        break;
      case '3months':
        start.setMonth(start.getMonth() - 3);
        break;
      case '1year':
        start.setDate(start.getDate() - 365);
        break;
    }

    onChange(start, end);
  };

  const handleCustomDateChange = (date: Date | undefined) => {
    if (!date) return;
    
    // Simple range selection: first click sets start, second sets end
    if (!startDate || (startDate && endDate)) {
      onChange(date, date);
    } else {
      if (date > startDate) {
        onChange(startDate, date);
      } else {
        onChange(date, startDate);
      }
      setIsCustomOpen(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-gray-300">Time Period:</span>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedPreset === '7days' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePresetClick('7days')}
            className={selectedPreset === '7days' 
              ? 'bg-[#22c55e] text-black hover:bg-[#22c55e]/90' 
              : 'border-white/20 text-gray-300 hover:bg-white/5'
            }
          >
            Last 7 Days
          </Button>
          
          <Button
            variant={selectedPreset === '30days' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePresetClick('30days')}
            className={selectedPreset === '30days' 
              ? 'bg-[#22c55e] text-black hover:bg-[#22c55e]/90' 
              : 'border-white/20 text-gray-300 hover:bg-white/5'
            }
          >
            Last 30 Days
          </Button>
          
          <Button
            variant={selectedPreset === '3months' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePresetClick('3months')}
            className={selectedPreset === '3months' 
              ? 'bg-[#22c55e] text-black hover:bg-[#22c55e]/90' 
              : 'border-white/20 text-gray-300 hover:bg-white/5'
            }
          >
            Last 3 Months
          </Button>

          <Button
            variant={selectedPreset === '1year' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handlePresetClick('1year')}
            className={selectedPreset === '1year' 
              ? 'bg-[#22c55e] text-black hover:bg-[#22c55e]/90' 
              : 'border-white/20 text-gray-300 hover:bg-white/5'
            }
          >
            1 Year
          </Button>

          <Popover open={isCustomOpen} onOpenChange={setIsCustomOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-gray-300 hover:bg-white/5"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                Custom Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-slate-900/95 border-[#22c55e]/30" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={handleCustomDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="ml-auto text-sm text-gray-400">
          {format(startDate, 'MMM d, yyyy')} - {format(endDate, 'MMM d, yyyy')}
        </div>
      </div>
    </div>
  );
}
