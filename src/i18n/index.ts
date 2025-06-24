import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nInitOptions } from '../types';

// 導入翻譯文件
import en from './locales/en';
import zh from './locales/zh';
import ja from './locales/ja';

const i18nConfig: I18nInitOptions = {
  resources: {
    en,
    zh,
    ja,
  },
  lng: 'en', // 默認語言
  fallbackLng: 'en', // 如果當前語言沒有對應的翻譯，則使用該語言
  interpolation: {
    escapeValue: false, // 不轉義插值，React已經處理了XSS攻擊
  },
};

i18n.use(initReactI18next).init(i18nConfig);

export default i18n;
