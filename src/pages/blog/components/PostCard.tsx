import React from 'react';
import { Card, Typography, Space, Tag, Avatar } from 'antd';
import { EyeOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import '../blog-styles.less';

const { Title, Paragraph, Text } = Typography;

interface ThuocTinhTheBaiViet {
  baiViet: any;
}

const TheBaiViet: React.FC<ThuocTinhTheBaiViet> = ({ baiViet }) => {
  return (
    <Link to={`/blog/detail/${baiViet.id}`}>
      <Card
        hoverable
        className="premium-card"
        cover={
          <div className="card-cover-wrapper">
            <img alt={baiViet.tieuDe} src={baiViet.anhDaiDien} className="card-cover-img" />
            <div className="card-tags">
              {baiViet.danhSachThe?.slice(0, 3).map((the: string) => (
                <Tag color="magenta" key={the} className="glass-tag">
                  {the}
                </Tag>
              ))}
            </div>
          </div>
        }
      >
        <div style={{ padding: '4px 0' }}>
          <Title level={4} className="card-title" ellipsis={{ rows: 2 }}>
            {baiViet.tieuDe}
          </Title>
          <Paragraph type="secondary" ellipsis={{ rows: 3 }} className="card-summary">
            {baiViet.tomTat}
          </Paragraph>
          <div className="card-footer">
            <Space className="card-author">
              <Avatar size="small" icon={<UserOutlined />} />
              <Text strong>{baiViet.tacGia}</Text>
            </Space>
            <Space split={<Text type="secondary">•</Text>} className="card-meta">
              <Space>
                <CalendarOutlined />
                <Text type="secondary">{baiViet.ngayDang}</Text>
              </Space>
              <Space>
                <EyeOutlined />
                <Text type="secondary">{baiViet.luotXem || 0}</Text>
              </Space>
            </Space>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default TheBaiViet;
