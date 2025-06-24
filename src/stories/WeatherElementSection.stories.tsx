import type { Meta, StoryObj } from '@storybook/react-vite';
import { WeatherElementSection } from '@/components/WeatherElementSection';
import { WeatherElement } from '@/types/skyLog';

const meta: Meta<typeof WeatherElementSection> = {
  title: 'Components/WeatherElementSection',
  component: WeatherElementSection,
  tags: ['autodocs'],
  argTypes: {
    element: { control: 'object' },
  },
};

export default meta;

// 定義 Story 類型
type Story = StoryObj<typeof WeatherElementSection>;

const mockElement: WeatherElement = {
  ElementName: '天氣預報',
  Time: [
    {
      StartTime: '2024-07-29 18:00:00',
      EndTime: '2024-07-30 06:00:00',
      ElementValue: [
        { parameterName: '天氣現象', parameterValue: '晴時多雲' },
        { parameterName: '溫度', parameterValue: '26 ~ 29 C' },
        { parameterName: '舒適度', parameterValue: '舒適' },
      ],
    },
    {
      StartTime: '2024-07-30 06:00:00',
      EndTime: '2024-07-30 18:00:00',
      ElementValue: [
        { parameterName: '天氣現象', parameterValue: '多雲午後短暫雷陣雨' },
        { parameterName: '溫度', parameterValue: '28 ~ 32 C' },
        { parameterName: '舒適度', parameterValue: '悶熱' },
      ],
    },
    {
      StartTime: '2024-07-30 18:00:00',
      EndTime: '2024-07-31 06:00:00',
      ElementValue: [
        { parameterName: '天氣現象', parameterValue: '多雲' },
        { parameterName: '溫度', parameterValue: '27 ~ 30 C' },
        { parameterName: '舒適度', parameterValue: '舒適' },
      ],
    },
  ],
};

export const Default: Story = {
  args: {
    element: mockElement,
  },
};
