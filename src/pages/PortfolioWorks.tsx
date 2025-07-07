import { Typography, Card, Row, Col, Tag, Button, Image } from 'antd';
import { useTranslation } from 'react-i18next';
import { GithubOutlined } from '@ant-design/icons';
import { PortfolioItems } from '@/types/portfolio';
import myIntroduction from '@/assets/images/myIntroduction.png';
import webSocketServer from '@/assets/images/webSocketServer.png';

const { Title, Paragraph } = Typography;

const PortfolioWorks = () => {
  const { t } = useTranslation();

  // 模擬作品集資料
  const portfolioItems: PortfolioItems = [
    {
      id: 1,
      title: 'My-Introduction',
      image: myIntroduction,
      description:
        '使用 Vite 建立的個人介紹網站，技術架構基於 React + TypeScript。專案支援 多語系切換（react-i18next）、路由管理（react-router）、伺服器資料快取與同步管理（react-query），搭配 Tailwind CSS 建構響應式介面設計，並整合 Ant Design 元件庫提升開發效率。開發流程中導入 Storybook 進行元件開發與測試，使用 Vitest 執行單元測試，確保元件穩定性。代碼品質方面，結合 ESLint 與 Prettier 實施靜態檢查與自動格式化，並透過 Husky + lint-staged 與 Commitlint + Commitizen 建立 Git 提交流程規範，強化團隊協作與版本控制品質。',
      tags: [
        'React',
        'TypeScript',
        'Redux',
        'Redux Toolkit',
        'React-i18next',
        'React Router',
        'React Query',
        'Tailwind CSS',
        'Ant Design',
        'WebSocket',
        'Google Map API',
        'OpenAI API',
        'Storybook',
        'Vitest',
        'ESLint',
        'Prettier',
        'Husky',
        'Lint-staged',
        'Commitlint',
        'Commitizen',
      ],
      github: 'https://github.com/ts03085781/My-Introduction',
    },
    {
      id: 2,
      title: 'webSocket-server',
      image: webSocketServer,
      description:
        '由node.js建立的WebSocket伺服器專案,專門給My-Introduction專案使用者連線使用,並且使用WebSocket實現即時通訊功能',
      tags: ['Node.js', 'WebSocket'],
      github: 'https://github.com/ts03085781/webSocket-server',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Title level={1}>{t('page.portfolio.title')}</Title>
      <Paragraph className="mb-8">
        Here are some of my recent projects. Click on each project to view the
        github.
      </Paragraph>

      <Row gutter={[24, 24]}>
        {portfolioItems.map((item) => (
          <Col xs={24} sm={12} lg={8} key={item.id}>
            <Card
              hoverable
              cover={<Image alt={item.title} src={item.image} />}
              className="h-full flex flex-col cursor-default overflow-hidden"
            >
              <Title level={4}>{item.title}</Title>
              <Paragraph>{item.description}</Paragraph>

              <div className="mt-2 mb-4 flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </div>

              <div className="mt-auto pt-4 flex gap-2">
                <Button
                  icon={<GithubOutlined />}
                  href={item.github}
                  target="_blank"
                >
                  GitHub
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PortfolioWorks;
