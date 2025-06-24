import { Card } from 'antd';
import dayjs from 'dayjs';
import { WeatherTime } from '@/types/skyLog';

export const WeatherCard: React.FC<{ time: WeatherTime }> = ({ time }) => (
  <Card className="card-3 flex flex-col w-[240px] hover:scale-110 transition-all duration-300">
    <p className="font-bold mb-2 text-blue-500">
      {`${dayjs(time.StartTime).format('MM/DD HH:mm')} ~ ${dayjs(time.EndTime).format('MM/DD HH:mm')}`}
    </p>
    {time.ElementValue.map((value, index) => (
      <div key={index}>
        {Object.entries(value).map(([key, val]) => (
          <p className="text-xl text-gray-600" key={key}>
            {val}
          </p>
        ))}
      </div>
    ))}
  </Card>
);
