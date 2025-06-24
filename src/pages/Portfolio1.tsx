import { Typography, Card, Row, Col, Image, Tag, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { GithubOutlined, LinkOutlined } from '@ant-design/icons';
import { PortfolioItems } from '@/types/portfolio';

const { Title, Paragraph } = Typography;

const Portfolio1 = () => {
  const { t } = useTranslation();

  // 模擬作品集資料
  const portfolioItems: PortfolioItems = [
    {
      id: 1,
      title: 'Project 1',
      image: 'https://via.placeholder.com/600x400',
      description: 'A modern web application built with React and TypeScript.',
      tags: ['React', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com',
      demo: 'https://example.com',
    },
    {
      id: 2,
      title: 'Project 2',
      image: 'https://via.placeholder.com/600x400',
      description: 'A responsive e-commerce website with advanced features.',
      tags: ['React', 'Redux', 'Node.js', 'MongoDB'],
      github: 'https://github.com',
      demo: 'https://example.com',
    },
    {
      id: 3,
      title: 'Project 3',
      image: 'https://via.placeholder.com/600x400',
      description: 'A mobile app developed with React Native.',
      tags: ['React Native', 'TypeScript', 'Firebase'],
      github: 'https://github.com',
      demo: 'https://example.com',
    },
    {
      id: 4,
      title: 'Project 4',
      image: 'https://via.placeholder.com/600x400',
      description: 'A dashboard application with data visualization.',
      tags: ['React', 'D3.js', 'Ant Design', 'GraphQL'],
      github: 'https://github.com',
      demo: 'https://example.com',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Title level={1}>{t('page.portfolio.title')}</Title>
      <Paragraph className="mb-8">
        Here are some of my recent projects. Click on each project to learn more
        or view the live demo.
      </Paragraph>

      <Row gutter={[24, 24]}>
        {portfolioItems.map((item) => (
          <Col xs={24} sm={12} lg={8} key={item.id}>
            <Card
              hoverable
              cover={<Image alt={item.title} src={item.image} />}
              className="h-full flex flex-col"
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
                  type="primary"
                  icon={<LinkOutlined />}
                  href={item.demo}
                  target="_blank"
                >
                  Demo
                </Button>
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

export default Portfolio1;
