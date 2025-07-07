import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '../layout/MainLayout';

// 延遲加載頁面
const Introduction = lazy(() => import('@/pages/Introduction'));
const PortfolioWorks = lazy(() => import('@/pages/PortfolioWorks'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const SkyLog = lazy(() => import('@/pages/SkyLog'));
const AIChat = lazy(() => import('@/pages/AIChat'));
const ChatRoom = lazy(() => import('@/pages/ChatRoom'));
const RestaurantFinder = lazy(() => import('@/pages/RestaurantFinder'));

export const AppRoutes = () => (
  <Suspense
    fallback={
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    }
  >
    <Routes>
      <Route element={<MainLayout />}>
        {/* 主要路由 */}
        <Route path="/" element={<Introduction />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/portfolioWorks" element={<PortfolioWorks />} />
        <Route path="/skyLog" element={<SkyLog />} />
        <Route path="/AIChat" element={<AIChat />} />
        <Route path="/chatRoom" element={<ChatRoom />} />
        <Route path="/restaurantFinder" element={<RestaurantFinder />} />

        {/* 404 頁面 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
);
