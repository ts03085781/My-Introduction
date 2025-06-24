import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import '@ant-design/v5-patch-for-react-19';
import './index.css';
import App from './App.tsx';
import './i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // 1. 匯入必要的模組
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; // 匯入開發工具

// 2. 建立一個全局的 QueryClient 實例
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* 3. 用 QueryClientProvider 包裹您的 App 元件 */}
      <QueryClientProvider client={queryClient}>
        <App />
        {/* 4. 在這裡放置開發工具，它只會在開發模式下顯示 */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
