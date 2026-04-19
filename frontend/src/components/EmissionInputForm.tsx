import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, Leaf } from 'lucide-react';

interface EmissionInputFormProps {
  travelDistance: string;
  electricity: string;
  diet: 'veg' | 'non-veg';
  lpgCylinders: string;
  onTravelChange: (value: string) => void;
  onElectricityChange: (value: string) => void;
  onDietChange: (value: 'veg' | 'non-veg') => void;
  onLpgChange: (value: string) => void;
  isSubmitting: boolean;
}

export default function EmissionInputForm({
  travelDistance,
  electricity,
  diet,
  lpgCylinders,
  onTravelChange,
  onElectricityChange,
  onDietChange,
  onLpgChange,
  isSubmitting,
}: EmissionInputFormProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateNumeric = (value: string, fieldName: string) => {
    if (value && (isNaN(Number(value)) || Number(value) < 0)) {
      setErrors(prev => ({ ...prev, [fieldName]: 'Please enter a valid positive number' }));
      return false;
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
    return true;
  };

  const handleTravelChange = (value: string) => {
    validateNumeric(value, 'travel');
    onTravelChange(value);
  };

  const handleElectricityChange = (value: string) => {
    validateNumeric(value, 'electricity');
    onElectricityChange(value);
  };

  const handleLpgChange = (value: string) => {
    validateNumeric(value, 'lpg');
    onLpgChange(value);
  };

  // Calculate live CO2 preview
  const livePreview = useMemo(() => {
    const travel = parseFloat(travelDistance) || 0;
    const elec = parseFloat(electricity) || 0;
    const dietValue = diet === 'veg' ? 50 : 120;
    const lpg = parseFloat(lpgCylinders) || 0;

    const travelEmissions = travel * 0.12;
    const electricityEmissions = elec * 0.85;
    const dietEmissions = dietValue;
    const lpgEmissions = lpg * 45;

    return travelEmissions + electricityEmissions + dietEmissions + lpgEmissions;
  }, [travelDistance, electricity, diet, lpgCylinders]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="travel" className="text-gray-300">Travel Distance (km/month)</Label>
        <Input
          id="travel"
          type="number"
          placeholder="e.g., 500"
          value={travelDistance}
          onChange={(e) => handleTravelChange(e.target.value)}
          onFocus={() => setFocusedField('travel')}
          onBlur={() => setFocusedField(null)}
          className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 transition-all duration-300 ${
            focusedField === 'travel' ? 'ring-2 ring-[#22c55e] border-[#22c55e] shadow-green-glow' : ''
          } ${errors.travel ? 'border-red-500' : ''}`}
        />
        {errors.travel && <p className="text-xs text-red-400">{errors.travel}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="electricity" className="text-gray-300">Electricity Usage (kWh/month)</Label>
        <Input
          id="electricity"
          type="number"
          placeholder="e.g., 300"
          value={electricity}
          onChange={(e) => handleElectricityChange(e.target.value)}
          onFocus={() => setFocusedField('electricity')}
          onBlur={() => setFocusedField(null)}
          className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 transition-all duration-300 ${
            focusedField === 'electricity' ? 'ring-2 ring-[#22c55e] border-[#22c55e] shadow-green-glow' : ''
          } ${errors.electricity ? 'border-red-500' : ''}`}
        />
        {errors.electricity && <p className="text-xs text-red-400">{errors.electricity}</p>}
      </div>

      <div className="space-y-2">
        <Label className="text-gray-300">Diet Type</Label>
        <RadioGroup value={diet} onValueChange={(value) => onDietChange(value as 'veg' | 'non-veg')}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="veg" id="veg" className="border-white/20 text-[#22c55e]" />
            <Label htmlFor="veg" className="text-gray-300 cursor-pointer">Vegetarian</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="non-veg" id="non-veg" className="border-white/20 text-[#22c55e]" />
            <Label htmlFor="non-veg" className="text-gray-300 cursor-pointer">Non-Vegetarian</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lpg" className="text-gray-300">LPG Cylinders (per month)</Label>
        <Input
          id="lpg"
          type="number"
          placeholder="e.g., 1"
          value={lpgCylinders}
          onChange={(e) => handleLpgChange(e.target.value)}
          onFocus={() => setFocusedField('lpg')}
          onBlur={() => setFocusedField(null)}
          className={`bg-white/5 border-white/10 text-white placeholder:text-gray-500 transition-all duration-300 ${
            focusedField === 'lpg' ? 'ring-2 ring-[#22c55e] border-[#22c55e] shadow-green-glow' : ''
          } ${errors.lpg ? 'border-red-500' : ''}`}
        />
        {errors.lpg && <p className="text-xs text-red-400">{errors.lpg}</p>}
      </div>

      {/* Live CO2 Preview */}
      {livePreview > 0 && (
        <div className="glass-card rounded-xl p-4 border border-[#22c55e]/30 bg-[#22c55e]/5 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-[#22c55e]" />
              <span className="text-sm text-gray-300">Estimated Emissions:</span>
            </div>
            <span className="text-2xl font-bold text-[#22c55e]">
              {livePreview.toFixed(1)} <span className="text-sm text-gray-400">kg CO₂</span>
            </span>
          </div>
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || Object.keys(errors).length > 0}
        className={`w-full bg-[#22c55e] hover:bg-[#22c55e]/90 text-black font-semibold rounded-xl transition-all duration-300 hover:shadow-green-glow ${
          isSubmitting ? 'scale-95' : 'hover:scale-105'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Tracking...
          </>
        ) : (
          'Track Emissions'
        )}
      </Button>
    </div>
  );
}
