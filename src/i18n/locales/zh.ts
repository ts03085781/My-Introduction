export default {
  translation: {
    sidebar: {
      introduction: '簡介',
      portfolio: '作品集 1',
      skyLog: '氣候手札',
      aiChat: 'AI 聊天',
    },

    page: {
      // 介紹頁面
      introduction: {
        name: '賴毅霖 (Dean)',
        jobTitle: '資深前端工程師 ',
        title: '歡迎來到我的作品集',
        description:
          '我是一個積極主動且擅長協作的前端工程師，曾將舊版系統重構至React，並規劃開發React & Vue共用組件。具備豐富的第三方API串接經驗，熟悉SEO優化與RWD / AWD設計。現管理9人前端團隊，重視效率與技術共享，致力於打造高效且兼具體驗的前端應用。最近則學習使用Vite建構React+TypeScript專案, 搭配Tailwind, Redux toolkit, React Router等套件建立個人Side Project',
        skills: {
          title: '技能',
          programming: '程式語言',
          framework: '框架 & 函式庫',
          other: '其他',
        },
        experience: {
          title: '工作經歷',
          company_1: {
            title: '資深前端工程師',
            company: '海科科技有限公司',
            time: '2022/09 - 2025/05',
            description: {
              item_1: '使用 Vue, React 相關技術開發網站前後台系統',
              item_2: '使用Element-UI + SCSS 建構網站基礎功能與樣式',
              item_3: '使用 i18n 多國語言系統經驗',
              item_4:
                '規劃前端資源, 並與PM、後端、設計共同協作,推動中大型開發項目的前端開發評估',
              item_5:
                '與組員共同規劃內部技術優化目標, 如解耦、增加複用性、 未來修改的彈性等等',
              item_6: '管理9人前端小組且有跨國合作開發經驗',
              item_7: '協助組員code review,確保程式碼的可讀性、維護性和一致性',
            },
            more: {
              title: '補充說明:',
              item_1:
                '帶領團隊高效開發，落地多個前端專案,在職期間帶領團隊開發 17 個前端專案 (14 個 Vue 2、2 個 Vue 3、1 個 React)，並維護 7 個線上網站，依據組員專長合理分配開發項目，提升團隊效能與技術成長。',
              item_2:
                '拆分核心模組，提升多品牌協作效率,主導將線上 7 的主要功能模組獨立為獨立專案 (Repo)，透過 iframe 內嵌方式整合，解決多品牌間功能版本不同步與開發資源重工問題，提升維護與迭代效率。',
              item_3:
                '2024 - 主導支付核心功能開發,帶領 4 人小組開發並維護 7 個品牌網站的出入金功能，負責與後端協作、串接第三方支付，確保交易流程穩定與高效。',
              item_4:
                '2025 - 管理台灣區前端團隊，推動技術優化,負責 9 人前端團隊，主導台灣區所有網站與後台支付相關功能開發與維護，規劃未來技術優化方向，提升系統穩定性與開發效率。',
            },
          },
          company_2: {
            title: '前端工程師',
            company: '聯合智網股份有限公司',
            time: '2022/04 - 2022/07',
            description: {
              item_1: '使用 Next React (ant design pro 框架) + 做為主力開發',
              item_2: '設計React共用組件',
              item_3: '使用 Formik + yup (表單驗證套件) 輔助表單開發',
              item_4: '參與頁面SSR SEO優化',
            },
            more: {
              title: '補充說明:',
              item_1:
                '優化 React 共用元件架構,帶領團隊重構 React 共用元件，降低與主頁面耦合度，減少約 40% 非必要元件，提升組件可重用性與維護效率。',
              item_2:
                '制定統一程式碼風格,建立 ESLint + Prettier 前端程式碼撰寫規範，提升團隊開發一致性，讓後續開發更易讀、更高效。',
              item_3:
                '優化 SSR，提升網站 SEO,運用 Next.js 內建 API getServerSideProps優化, 伺服器端渲染 (SSR)，改善載入效能與 SEO 表現。',
            },
          },
          company_3: {
            title: '前端工程師',
            company: '雄獅資訊股份有限公司',
            time: '2018/12 - 2022/04',
            description: {
              item_1: '使用 React、 Next、jQuery 做為主力開發',
              item_2: '使用Redux、TypeScript、Styled-Components 等做輔助開發',
              item_3: '獨立翻新舊版 JQuery 專案至 React',
              item_4: '第三方API 串接 (Google Map)',
              item_5: '頁面SEO優化經驗',
              item_6: 'RWD AWD設計經驗',
              item_7: 'Cypress E2E測試經驗',
            },
            more: {
              title: '補充說明:',
              item_1:
                'Next.js + Redux 開發響應式網頁,主要使用 Next.js + React 開發響應式網頁，負責 Redux 狀態管理，並與後端合作串接 API，確保前後端高效整合。',
              item_2:
                '獨立重構 JQuery 專案至 React,翻新 JQuery 專案至 React，套用 Styled-Components 撰寫組件樣式，開發共用組件, 提高組件程式碼複用性, 並利用Cypress E2E測試, 確保整個React頁面正常運作',
              item_3:
                '主導 API 設計與規格制定,根據需求與後端討論 API 格式，規劃 API 返回的格式與內容',
              item_4:
                '確保 UI/UX 高度還原，提升用戶體驗,設計團隊緊密合作，優化前端樣式實踐，確保設計稿高還原，提高使用者體驗與操作流暢度。',
              item_5:
                '參與並負責 雄獅旅行訂房頁面 開發與維護：雄獅旅行訂房頁面。',
            },
          },
        },
      },
      portfolio: {
        title: '作品展示',
      },
      skyLog: {
        search: '搜尋',
        selectLocation: '選擇地點',
        selectDate: '選擇日期',
        locations: {
          yilin: '宜蘭縣',
          taoyuan: '桃園市',
          hsinchu: '新竹縣',
          miaoli: '苗栗縣',
          changhua: '彰化縣',
          nantou: '南投縣',
          yunlin: '雲林縣',
          chiayi: '嘉義縣',
          pingtung: '屏東縣',
          taitung: '臺東縣',
          hualien: '花蓮縣',
          penghu: '澎湖縣',
          keelung: '基隆市',
          hsinchuCity: '新竹市',
          chiayiCity: '嘉義市',
          taipei: '臺北市',
          kaohsiung: '高雄市',
          newTaipei: '新北市',
          taichung: '臺中市',
          tainan: '臺南市',
        },
      },
      aiChat: {
        title: 'AI聊天',
        send: '送出',
        placeholder: '請輸入您的訊息...',
        aiOpeningRemarks: '你好，我是Dean的AI助手，有什麼可以幫助您的嗎？',
        clearConversation: '清除對話紀錄',
        clearConversationConfirm: '是否確認要刪除目前對話紀錄？',
        browserNotSupported: '此瀏覽器不支援語音辨識',
        microphoneNotAvailable: '麥克風無法使用',
        voiceInput: '語音輸入',
        confirm: '確認',
        cancel: '取消',
        deleteHistory: '刪除歷史對話紀錄',
        deleteHistoryConfirm: '您已經成功刪除了歷史對話紀錄',
      },
    },

    theme: {
      switch: '切換主題色',
      light: '淺色模式',
      dark: '深色模式',
    },

    language: {
      switch: '切換語言',
    },

    common: {
      learnMore: '了解更多',
      contact: '聯繫我',
    },
  },
};
