import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '../layout/MainLayout';

// 延遲加載頁面
const Introduction = lazy(() => import('@/pages/Introduction'));
const Portfolio1 = lazy(() => import('@/pages/Portfolio1'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const SkyLog = lazy(() => import('@/pages/SkyLog'));
const AIChat = lazy(() => import('@/pages/AIChat'));

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
        <Route path="/portfolio1" element={<Portfolio1 />} />
        <Route path="/skyLog" element={<SkyLog />} />
        <Route path="/AIChat" element={<AIChat />} />

        {/* 404 頁面 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
);
