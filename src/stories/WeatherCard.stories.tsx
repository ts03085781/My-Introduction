import type { Meta, StoryObj } from '@storybook/react-vite';
import { WeatherCard } from '@/components/WeatherCard';
import { WeatherTime } from '@/types/skyLog';

const meta: Meta<typeof WeatherCard> = {
  title: 'Components/WeatherCard',
  component: WeatherCard,
  tags: ['autodocs'],
  argTypes: {
    time: { control: 'object' },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '6em', backgroundColor: 'gray' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

// 定義 Story 類型
type Story = StoryObj<typeof WeatherCard>;

const mockTime: WeatherTime = {
  StartTime: '2024-07-29 18:00:00',
  EndTime: '2024-07-30 06:00:00',
  ElementValue: [
    { value: '晴時多雲' },
    { value: '26 ~ 29 C' },
    { value: '舒適' },
  ],
};

export const Default: Story = {
  args: {
    time: mockTime,
  },
};
