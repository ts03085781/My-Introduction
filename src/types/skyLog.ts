export interface WeatherTime {
  StartTime: string;
  EndTime: string;
  ElementValue: Array<Record<string, string>>;
}

export interface WeatherElement {
  ElementName: string;
  Time: WeatherTime[];
}

export interface WeatherLocation {
  LocationName: string;
  WeatherElement: WeatherElement[];
}
