import { WeatherCard } from '@/components/WeatherCard';
import { WeatherElement } from '@/types/skyLog';

export const WeatherElementSection: React.FC<{ element: WeatherElement }> = ({
  element,
}) => (
  <div
    className="card-2 flex flex-row flex-wrap gap-4"
    key={element.ElementName}
  >
    {element.Time.map((time) => (
      <WeatherCard key={time.StartTime} time={time} />
    ))}
  </div>
);
