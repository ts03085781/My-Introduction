import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Switch, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  AppstoreOutlined,
  GlobalOutlined,
  SunOutlined,
  MoonOutlined,
  CloudOutlined,
  OpenAIOutlined,
} from '@ant-design/icons';
import { toggleTheme, selectTheme } from '@/store/slices/themeSlice';
import { changeLanguage, selectLanguage } from '@/store/slices/languageSlice';
import { LanguageMenuItems, SidebarMenuItems, LanguageCode } from '@/types';
import useCheckScreenSize from '@/hooks/useCheckScreenSize';
import { DeviceType } from '@/constants/enum';

const { Header, Sider, Content, Footer } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const theme = useSelector(selectTheme);
  const language = useSelector(selectLanguage);
  const deviceType = useCheckScreenSize();

  useEffect(() => {
    // 當語言改變時更新i18n
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  const handleLanguageChange = ({ key }: { key: string }) => {
    dispatch(changeLanguage(key as LanguageCode));
  };

  const languageItems: LanguageMenuItems = [
    {
      key: 'en',
      label: 'English',
    },
    {
      key: 'zh',
      label: '繁體中文',
    },
    {
      key: 'ja',
      label: '日本語',
    },
  ];

  const sidebarItems: SidebarMenuItems = [
    {
      key: '/introduction',
      icon: <HomeOutlined />,
      label: <Link to="/introduction">{t('sidebar.introduction')}</Link>,
    },
    {
      key: '/portfolio1',
      icon: <AppstoreOutlined />,
      label: <Link to="/portfolio1">{t('sidebar.portfolio')}</Link>,
    },
    {
      key: '/skyLog',
      icon: <CloudOutlined />,
      label: <Link to="/skyLog">{t('sidebar.skyLog')}</Link>,
    },
    {
      key: '/AIChat',
      icon: <OpenAIOutlined />,
      label: <Link to="/AIChat">{t('sidebar.aiChat')}</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-white">
      <Header className="sticky top-0 z-50 p-0 flex items-center justify-between bg-blue-500 dark:bg-gray-800">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="w-16 h-16 text-white"
        />
        <div className="flex items-center mr-6 space-x-4">
          <div className="flex items-center mr-2 text-white gap-2">
            {theme === 'dark' ? <MoonOutlined /> : <SunOutlined />}
            <Switch checked={theme === 'dark'} onChange={handleThemeChange} />
          </div>
          <Dropdown
            menu={{ items: languageItems, onClick: handleLanguageChange }}
            placement="bottomRight"
          >
            <Button
              type="text"
              icon={<GlobalOutlined />}
              className="text-white"
            >
              {language === 'en' ? 'English' : '繁體中文'}
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className=" bg-white text-gray-800 dark:bg-gray-900 dark:text-white !fixed top-[64px] !h-fit !max-w-fit !w-fit md:!relative md:top-auto md:!h-auto"
        >
          <Menu
            theme={theme === 'dark' ? 'dark' : 'light'}
            selectedKeys={[location.pathname]}
            className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white w-[100vw] text-center md:w-auto md:text-left"
            items={sidebarItems}
            onClick={() =>
              setCollapsed(deviceType === DeviceType.Mobile ? true : collapsed)
            }
          />
        </Sider>
        <Content className="overflow-y-auto m-5 p-6 rounded-lg min-h-[280px] bg-white dark:bg-gray-700">
          <Outlet />
        </Content>
      </Layout>
      <Footer className="text-center bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-white">
        ©{new Date().getFullYear()} My Portfolio - Created with React & Ant
        Design
      </Footer>
    </Layout>
  );
};

export default MainLayout;
