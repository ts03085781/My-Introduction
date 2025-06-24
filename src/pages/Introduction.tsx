import {
  Typography,
  Card,
  Row,
  Col,
  Button,
  Avatar,
  Space,
  Divider,
  Timeline,
} from 'antd';
import { useTranslation } from 'react-i18next';
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import avatarImage from '@/assets/images/avatarImage.jpg';

const { Title, Paragraph } = Typography;

const Introduction = () => {
  const { t } = useTranslation();

  // 在組件外部定義數據
  const SKILLS_DATA = [
    {
      title: t('page.introduction.skills.programming'),
      items: ['JavaScript', 'TypeScript', 'HTML', 'Tailwind CSS', 'Css, Sass'],
    },
    {
      title: t('page.introduction.skills.framework'),
      items: ['Vue', 'React', 'Next', 'jQuery', 'Vite'],
    },
    {
      title: t('page.introduction.skills.other'),
      items: [
        'Vuex, Redux',
        'Element-UI',
        'Ant Design',
        'Tailwind CSS',
        'Styled-components',
        'i18n',
        'Storybook',
        'Cypress',
        'CI/CD',
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <Row gutter={[24, 24]} className="flex flex-col md:flex-row">
        <Col xs={24} md={8}>
          <Card className="text-center mb-6">
            <Avatar
              src={avatarImage}
              size={200}
              className="mb-4"
              alt="avatar"
            />
            <Title level={3}>{t('page.introduction.name')}</Title>
            <Paragraph>{t('page.introduction.jobTitle')}</Paragraph>
            <Space size="middle">
              <Button
                type="link"
                icon={<GithubOutlined />}
                href="https://github.com/ts03085781"
                target="_blank"
              />
              <Button
                type="link"
                icon={<LinkedinOutlined />}
                href="https://www.linkedin.com/in/%E6%AF%85%E9%9C%96-%E8%B3%B4-773966173/"
                target="_blank"
              />
              <Button
                type="link"
                icon={<MailOutlined />}
                href="mailto:ts03085781@gmail.com"
              />
              <Button
                type="link"
                icon={<PhoneOutlined />}
                href="tel:+886 0960081103"
              />
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card>
            <Title level={2}>{t('page.introduction.title')}</Title>
            <Paragraph>{t('page.introduction.description')}</Paragraph>
            <Divider />

            <Title level={3}>{t('page.introduction.skills.title')}</Title>
            <Row gutter={[16, 16]}>
              {SKILLS_DATA.map((skillGroup) => (
                <Col key={skillGroup.title} xs={24} sm={12} md={8}>
                  <Card size="small" title={skillGroup.title}>
                    <ul className="list-disc list-inside">
                      {skillGroup.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </Card>
                </Col>
              ))}
            </Row>

            <Divider className="color-gray-500" />
            <Title level={3}>{t('page.introduction.experience.title')}</Title>
            <Timeline
              className="mt-4"
              items={[
                {
                  children: (
                    <>
                      <Title level={4}>
                        {t('page.introduction.experience.company_1.title')}
                      </Title>
                      <Paragraph className="font-bold text-green-700 dark:text-green-600">
                        {t('page.introduction.experience.company_1.company')}
                      </Paragraph>
                      <Paragraph className="font-bold text-gray-500 dark:text-gray-400">
                        {t('page.introduction.experience.company_1.time')}
                      </Paragraph>
                      <Paragraph>
                        <ul className="list-disc">
                          <li>
                            {t(
                              'page.introduction.experience.company_1.description.item_1'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_1.description.item_2'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_1.description.item_3'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_1.description.item_4'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_1.description.item_5'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_1.description.item_6'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_1.description.item_7'
                            )}
                          </li>
                        </ul>
                      </Paragraph>
                      <Paragraph className="font-bold text-green-700 dark:text-green-600">
                        {t('page.introduction.experience.company_1.more.title')}
                      </Paragraph>
                      <Paragraph>
                        <ul className="list-disc">
                          <li>
                            {t(
                              'page.introduction.experience.company_1.more.item_1'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_1.more.item_2'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_1.more.item_3'
                            )}
                          </li>
                        </ul>
                      </Paragraph>
                      <Paragraph className="font-bold text-green-700 dark:text-green-600">
                        {t(
                          'page.introduction.experience.company_1.websitesDeveloped'
                        )}
                      </Paragraph>
                      <Divider />
                    </>
                  ),
                },
                {
                  children: (
                    <>
                      <Title level={4}>
                        {t('page.introduction.experience.company_2.title')}
                      </Title>
                      <Paragraph className="font-bold text-green-700 dark:text-green-600">
                        {t('page.introduction.experience.company_2.company')}
                      </Paragraph>
                      <Paragraph className="font-bold text-gray-500 dark:text-gray-400">
                        {t('page.introduction.experience.company_2.time')}
                      </Paragraph>
                      <Paragraph>
                        <ul className="list-disc">
                          <li>
                            {t(
                              'page.introduction.experience.company_2.description.item_1'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_2.description.item_2'
                            )}
                          </li>
                        </ul>
                      </Paragraph>
                      <Paragraph className="font-bold text-green-700 dark:text-green-600">
                        {t('page.introduction.experience.company_2.more.title')}
                      </Paragraph>
                      <Paragraph>
                        <ul className="list-disc">
                          <li>
                            {t(
                              'page.introduction.experience.company_2.more.item_1'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_2.more.item_2'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_2.more.item_3'
                            )}
                          </li>
                        </ul>
                      </Paragraph>
                      <Divider />
                    </>
                  ),
                },
                {
                  children: (
                    <>
                      <Title level={4}>
                        {t('page.introduction.experience.company_3.title')}
                      </Title>
                      <Paragraph className="font-bold text-green-700 dark:text-green-600">
                        {t('page.introduction.experience.company_3.company')}
                      </Paragraph>
                      <Paragraph className="font-bold text-gray-500 dark:text-gray-400">
                        {t('page.introduction.experience.company_3.time')}
                      </Paragraph>
                      <Paragraph>
                        <ul className="list-disc">
                          <li>
                            {t(
                              'page.introduction.experience.company_3.description.item_1'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_3.description.item_2'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_3.description.item_3'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_3.description.item_4'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_3.description.item_5'
                            )}
                          </li>
                        </ul>
                      </Paragraph>
                      <Paragraph className="font-bold text-green-700 dark:text-green-600">
                        {t('page.introduction.experience.company_3.more.title')}
                      </Paragraph>
                      <Paragraph>
                        <ul className="list-disc">
                          <li>
                            {t(
                              'page.introduction.experience.company_3.more.item_1'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_3.more.item_2'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_3.more.item_3'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_3.more.item_4'
                            )}
                          </li>
                          <li>
                            {t(
                              'page.introduction.experience.company_3.more.item_5'
                            )}
                          </li>
                        </ul>
                      </Paragraph>
                    </>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Introduction;
