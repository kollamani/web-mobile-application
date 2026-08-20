import { WeatherData } from '@/types';
import { CloudSun } from 'lucide-react';

export const WeatherBadge = ({ weather }: { weather?: WeatherData | null }) => {
  if (!weather) return null;

  return (
    <div className="flex items-center gap-1.5 bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-md text-xs font-medium">
      <CloudSun className="w-4 h-4 text-sky-500" />
      <span>{weather.city}: <strong>{weather.temp}°C</strong> ({weather.description})</span>
    </div>
  );
};