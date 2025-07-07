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
      description: t('page.portfolio.project_1.description'),
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
      description: t('page.portfolio.project_2.description'),
      tags: ['Node.js', 'WebSocket'],
      github: 'https://github.com/ts03085781/webSocket-server',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Title level={1}>{t('page.portfolio.title')}</Title>
      <Paragraph className="mb-8">{t('page.portfolio.description')}</Paragraph>

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
