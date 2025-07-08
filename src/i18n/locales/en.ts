export default {
  translation: {
    // 导航
    sidebar: {
      introduction: 'Introduction',
      portfolio: 'Portfolio Works',
      skyLog: 'SkyLog',
      aiChat: 'AI Chat',
      chatRoom: 'Chat Room',
    },

    // 頁面標題
    page: {
      // 介紹頁面
      introduction: {
        name: 'Yi-Lin Lai (Dean)',
        jobTitle: 'Front-End Engineer Sr.',
        title: 'Welcome to My Portfolio',
        description:
          'I am a proactive and collaborative front-end engineer with experience in refactoring legacy systems to React and designing shared components for both React and Vue. I have extensive experience integrating third-party APIs and am well-versed in SEO optimization, as well as responsive and adaptive web design. Currently, I lead a front-end team of nine members, focusing on efficiency and knowledge sharing while striving to build high-performance, user-centric applications. Recently, I’ve been exploring building React + TypeScript projects using Vite, along with Tailwind CSS, Redux Toolkit, and React Router as part of my personal side projects.',
        skills: {
          title: 'Skills',
          programming: 'Programming skill',
          framework: 'Framework & Library',
          other: 'Other',
        },
        experience: {
          title: 'Experience',
          company_1: {
            title: 'Senior Front-End Engineer Sr.',
            company: 'Hytech Consulting Management Sdn Bhd',
            time: '2022/09 - 2025/05',
            description: {
              item_1:
                'Developed front-end and back-end admin systems using Vue and React technologies',
              item_2:
                'Built core website features and styles with Element-UI and SCSS',
              item_3:
                'Experienced in implementing multilingual systems using i18n',
              item_4:
                'Planned front-end resources and collaborated closely with PMs, back-end developers, and designers to evaluate and drive front-end development for mid-to-large scale projects',
              item_5:
                'Co-defined internal technical improvement goals with team members, such as decoupling, increasing reusability, and enhancing flexibility for future updates',
              item_6:
                'Managed a front-end team of 9 members and participated in cross-border collaborative development',
              item_7:
                'Conducted code reviews to help team members ensure code readability, maintainability, and consistency',
            },
            more: {
              title: 'More:',

              item_1:
                'Led the team in delivering multiple front-end projects efficiently During my tenure, I led the development of 17 front-end projects (14 with Vue 2, 2 with Vue 3, and 1 with React), and maintained 7 live websites. I assigned development tasks based on each team member’s expertise, improving overall team productivity and fostering technical growth.',

              item_2:
                'Modularized core features to enhance multi-brand collaboration, I led the separation of major functional modules from 7 live sites into standalone repositories, integrating them via iframes. This resolved issues with inconsistent feature versions across brands and reduced duplicated development efforts, resulting in more efficient maintenance and faster iterations.',

              item_3:
                '2024 – Led development of core payment features, Managed a 4-member team to develop and maintain deposit and withdrawal functions across 7 brand websites. Responsible for back-end coordination and third-party payment integration to ensure a stable and efficient transaction flow.',

              item_4:
                '2025 – Managed Taiwan front-end team and drove technical improvements, Led a 9-person front-end team overseeing all websites and admin-side payment features in the Taiwan region. Took charge of planning technical optimization initiatives to improve system stability and development efficiency.',
            },
          },
          company_2: {
            title: 'Front-End Engineer',
            company: 'United Digital Intelligence Co., Ltd.',
            time: '2022/04 - 2022/07',
            description: {
              item_1:
                'Primarily developed with Next.js and React using the Ant Design Pro framework',
              item_2: 'Designed reusable React components',
              item_3:
                'Utilized Formik and Yup for efficient form development and validation',
              item_4: 'Participated in SSR and SEO optimization for pages',
            },
            more: {
              title: 'More:',
              item_1:
                'Optimized React component architecture, Led the team in refactoring shared React components to reduce coupling with main pages, eliminate around 40% of unnecessary components, and improve component reusability and maintainability.',
              item_2:
                'Established a unified code style, Introduced ESLint and Prettier to define consistent front-end coding standards, enhancing code readability and development efficiency across the team.',
              item_3:
                "Enhanced SSR for better SEO, Improved server-side rendering (SSR) and website SEO performance by utilizing Next.js's built-in getServerSideProps API to optimize page load speed and search engine visibility.",
            },
          },
          company_3: {
            title: 'Front-End Engineer',
            company: 'LION TRAVEL SERVICE CO., LTD',
            time: '2018/12 - 2022/04',
            description: {
              item_1: 'Primarily developed using React, Next.js, and jQuery',
              item_2:
                'Supported development with Redux, TypeScript, and Styled-Components',
              item_3:
                'Independently refactored a legacy jQuery project into React',
              item_4: 'Integrated third-party APIs (e.g., Google Maps)',
              item_5: 'Experienced in SEO optimization',
              item_6:
                'Skilled in both RWD (Responsive Web Design) and AWD (Adaptive Web Design)',
              item_7:
                'Hands-on experience with Cypress for end-to-end (E2E) testing',
            },
            more: {
              title: 'More:',
              item_1:
                'Developed responsive websites with Next.js and Redux, Primarily used Next.js and React to build responsive web applications. Handled Redux for state management and collaborated with the back-end team to integrate APIs, ensuring efficient front- and back-end integration.',

              item_2:
                'Independently refactored a jQuery project to React,Refactored a legacy jQuery project into React. Used Styled-Components to style components and developed reusable components to improve code reusability. Employed Cypress for end-to-end (E2E) testing to ensure overall React page functionality.',

              item_3:
                'Led API design and specification planning,Worked closely with back-end developers to define API structure and response formats based on project requirements.',

              item_4:
                'Ensured high-fidelity UI/UX for an enhanced user experience,Collaborated closely with the design team to implement highly accurate and user-friendly UI, improving user experience and interaction flow.',

              item_5:
                'Contributed to and maintained Lion Travel’s hotel booking page, Participated in the development and ongoing maintenance of Lion Travel’s hotel booking system.',
            },
          },
        },
      },
      portfolio: {
        title: 'Portfolio Works',
        description:
          'Here are some of my recent projects. Click on each project to view the github.',
        project_1: {
          description:
            'A personal portfolio website built with Vite, based on React + TypeScript. Supports multi-language switching (react-i18next), routing management (react-router), server-side data caching and synchronization management (react-query), responsive design built with Tailwind CSS, and integration of Ant Design component library to improve development efficiency. Introduced Storybook for component development and testing, used Vitest for unit testing to ensure component stability. In terms of code quality, combined ESLint and Prettier for static analysis and automatic formatting, and introduced Husky + lint-staged and Commitlint + Commitizen to establish Git flow specifications, improving team collaboration and version control quality.',
        },
        project_2: {
          description:
            'A WebSocket server project built with Node.js, adopting a front-end and back-end separation architecture, specializing in connecting to the chat room in the My-Introduction project using WebSocket to implement real-time communication functionality.',
        },
      },
      skyLog: {
        search: 'Search',
        selectLocation: 'Select Location',
        selectDate: 'Select Date',
        locations: {
          yilin: 'Yilin',
          taoyuan: 'Taoyuan',
          hsinchu: 'Hsinchu',
          miaoli: 'Miaoli',
          changhua: 'Changhua',
          nantou: 'Nantou',
          yunlin: 'Yunlin',
          chiayi: 'Chiayi',
          pingtung: 'Pingtung',
          taitung: 'Taitung',
          hualien: 'Hualien',
          penghu: 'Penghu',
          keelung: 'Keelung',
          hsinchuCity: 'Hsinchu City',
          chiayiCity: 'Chiayi City',
          taipei: 'Taipei',
          kaohsiung: 'Kaohsiung',
          newTaipei: 'New Taipei',
          taichung: 'Taichung',
          tainan: 'Tainan',
        },
      },
      aiChat: {
        title: 'AI Chat',
        send: 'Send',
        placeholder: 'Please enter your message...',
        aiOpeningRemarks:
          "Hello, I am Dean's AI assistant, how can I help you?",
        clearConversation: 'Clear Conversation',
        clearConversationConfirm:
          'Are you sure you want to delete the current conversation?',
        browserNotSupported: 'This browser does not support speech recognition',
        microphoneNotAvailable: 'Microphone is not available',
        voiceInput: 'Voice Input',
        confirm: 'Confirm',
        cancel: 'Cancel',
        deleteHistory: 'Delete History',
        deleteHistoryConfirm: 'You have successfully deleted the history.',
      },
      chatRoom: {
        title: 'Chat Room',
        connectionStatus: 'Connection Status',
        connected: 'Connected',
        disconnected: 'Disconnected',
        onlineUsers: 'Currently {onlineUsers} users online',
        chatRoomClosed: 'Chat room closed',
        chatRoomNotConnected: 'Not connected to chat room',
        connectToChatRoom: 'Connect to chat room',
        closeConnection: 'Close connection',
        latestMessage: 'Latest message',
        sendMessage: 'Send message',
        joinChatRoom: 'Join chat room',
        leaveChatRoom: 'Leave chat room',
        pleaseEnterYourName: 'Please enter your name',
        pleaseEnterYourMessage: 'Please enter your message',
        avatarColor: 'Avatar Color',
      },
    },

    // 主題切換
    theme: {
      switch: 'Switch Theme',
      light: 'Light mode',
      dark: 'Dark mode',
    },

    // 語言切換
    language: {
      switch: 'Change Language',
    },

    // 通用文本
    common: {
      learnMore: 'Learn More:',
      contact: 'Contact Me',
    },
  },
};
