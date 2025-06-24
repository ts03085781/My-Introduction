import { MenuProps } from 'antd';
import { ReactNode } from 'react';

export interface SidebarMenuItem {
  key: string;
  icon?: ReactNode;
  label: ReactNode;
}

export type SidebarMenuItems = SidebarMenuItem[];

export type LanguageMenuItems = MenuProps['items'];
