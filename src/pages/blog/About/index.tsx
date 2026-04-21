import React from 'react';
import { Card, Avatar, Typography, Row, Col, Space } from 'antd';
import { GithubOutlined, LinkedinOutlined, FacebookOutlined } from '@ant-design/icons';
import '../blog-styles.less';

const { Title, Paragraph, Text } = Typography;

const TrangGioiThieu = () => {
  return (
    <div className="blog-about-container">
      <div className="profile-card">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={8} style={{ textAlign: 'center' }}>
            <Avatar size={180} src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop" className="profile-avatar" />
          </Col>
          <Col xs={24} md={16}>
            <Title level={2}>Nguyễn Nhật Long</Title>
            <Paragraph>
              Một lập trình viên đam mê khám phá công nghệ mới, đặc biệt là các framework Front-end như React, Vue, và kiến trúc hệ thống Back-end.
            </Paragraph>
            <div style={{ marginBottom: 16 }}>
              <Text strong>Kỹ năng: </Text>
              <Text>HTML, CSS, JavaScript, TypeScript, React, Ant Design</Text>
            </div>
            <Space size="large" style={{ marginTop: 16 }}>
              <GithubOutlined className="social-icon" style={{ cursor: 'pointer' }} />
              <LinkedinOutlined className="social-icon" style={{ cursor: 'pointer', color: '#0e76a8' }} />
              <FacebookOutlined className="social-icon" style={{ cursor: 'pointer', color: '#3b5998' }} />
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TrangGioiThieu;