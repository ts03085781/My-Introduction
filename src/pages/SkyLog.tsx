import { useState } from 'react';
import { Select, DatePicker, DatePickerProps, Button, Collapse } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { WeatherLocation } from '../types/skyLog';
import { WeatherElementSection } from '../components/WeatherElementSection';
import { useQuery } from '@tanstack/react-query'; // 1. 匯入 useQuery

import {
  apiUrl,
  AuthorizationCode,
  elementNameMap,
  locations,
} from '../constants/skyLog';

interface WeatherApiResponse {
  records: {
    Locations: Array<{
      Location: WeatherLocation[];
    }>;
  };
}

const returnWeatherElementArray = (
  data: WeatherApiResponse
): WeatherLocation[] => {
  const weatherElementArray: WeatherLocation[] = [];
  data.records.Locations.forEach((location) => {
    location.Location.forEach((weatherElement) => {
      weatherElementArray.push(weatherElement);
    });
  });
  return weatherElementArray;
};

const fetchWeatherData = async (
  locationCode: string,
  selectedElementName: string,
  startTime: string,
  endTime: string
): Promise<WeatherLocation[]> => {
  const response = await fetch(
    `${apiUrl}/${locationCode}?Authorization=${AuthorizationCode}&ElementName=${selectedElementName}&timeFrom=${startTime}&timeTo=${endTime}`
  );
  const data: WeatherApiResponse = await response.json();
  const weatherElementArray: WeatherLocation[] =
    returnWeatherElementArray(data);
  return weatherElementArray;
};

const SkyLog = () => {
  const { t } = useTranslation();
  const [locationCode, setLocationCode] = useState<string>(locations[0].value);
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [selectedElementName, setSelectedElementName] = useState<string>(
    elementNameMap[0]
  );
  const { data, isFetching, isPending, refetch } = useQuery({
    queryKey: ['weatherData'],
    queryFn: () =>
      fetchWeatherData(locationCode, selectedElementName, startTime, endTime),
    enabled: false,
  });

  const datePickerOnChange: DatePickerProps['onChange'] = (date) => {
    if (date === null) {
      setStartTime('');
      setEndTime('');
      return;
    }

    const selectedDate = dayjs(date);
    const today = dayjs();
    const isToday = selectedDate.isSame(today, 'day');

    const startTime = isToday
      ? today.format('YYYY-MM-DDTHH:mm:ss')
      : selectedDate.subtract(1, 'day').format('YYYY-MM-DDT18:00:00');

    const endTime = selectedDate.add(1, 'day').format('YYYY-MM-DDT00:00:00');

    setStartTime(startTime);
    setEndTime(endTime);
  };

  const returnCollapseChildItem = () => {
    if (!data) return [];

    return data.map((item: WeatherLocation, index: number) => ({
      key: index,
      label: item.LocationName,
      children: (
        <>
          {item.WeatherElement.map((element) => (
            <WeatherElementSection
              key={element.ElementName}
              element={element}
            />
          ))}
        </>
      ),
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Weather Forecast</h1>
      <div className="flex flex-row gap-4 mb-8 border-solid border p-4 border-gray-300 rounded-lg">
        <Select
          className="w-[120px]"
          value={locationCode}
          onChange={(value) => setLocationCode(value)}
          size="large"
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          disabled={isFetching}
        >
          {locations.map((location) => (
            <Select.Option key={location.value} value={location.value}>
              {t(location.label)}
            </Select.Option>
          ))}
        </Select>
        <Select
          value={selectedElementName}
          onChange={(value) => setSelectedElementName(value)}
          style={{ width: 120 }}
          size="large"
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
          disabled={isFetching}
        >
          {elementNameMap.map((elementName) => (
            <Select.Option key={elementName} value={elementName}>
              {elementName}
            </Select.Option>
          ))}
        </Select>
        <DatePicker
          onChange={datePickerOnChange}
          minDate={dayjs()}
          maxDate={dayjs().add(6, 'day')}
          placeholder={t('page.skyLog.selectDate')}
          size="large"
          disabled={isFetching}
        />
        <Button
          onClick={() => refetch()}
          icon={<SearchOutlined />}
          type="primary"
          size="large"
          loading={isFetching}
        >
          {t('page.skyLog.search')}
        </Button>
      </div>
      {isPending && (
        <p className="text-3xl font-bold mb-4">please click search button</p>
      )}
      {isFetching && <p className="text-3xl font-bold mb-4">Fetching...</p>}
      {data && !isFetching && (
        <Collapse
          items={returnCollapseChildItem()}
          defaultActiveKey={0}
          size="large"
          accordion
        />
      )}
    </div>
  );
};

export default SkyLog;
