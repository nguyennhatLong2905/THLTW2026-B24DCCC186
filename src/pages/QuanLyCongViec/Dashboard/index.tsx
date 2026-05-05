import { Card, Col, Row, Statistic, Typography } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ProjectOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import moment from 'moment';

const { Title } = Typography;

export default function Dashboard() {
  const { danhSachCongViec } = useModel('quanLyCongViec');

  const tongSoTask = danhSachCongViec.length;
  const soTaskHoanThanh = danhSachCongViec.filter((cv: any) => cv.trangThai === 'Hoàn thành').length;
  const soTaskQuaHan = danhSachCongViec.filter((cv: any) => {
    return cv.trangThai !== 'Hoàn thành' && moment(cv.hanChot).isBefore(moment(), 'day');
  }).length;

  return (
    <div style={{ padding: '32px 24px', minHeight: '80vh', background: '#f5f7fa' }}>
      <Title level={2} style={{ marginBottom: 24, fontWeight: 700, color: '#1f2937' }}>
        Tổng Quan Công Việc
      </Title>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <Card 
            hoverable
            style={{ borderRadius: 16, border: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', boxShadow: '0 10px 20px -5px rgba(118, 75, 162, 0.4)' }}
            bodyStyle={{ padding: 24 }}
          >
            <Statistic 
              title={<span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 500 }}>Tổng số công việc</span>} 
              value={tongSoTask} 
              prefix={<ProjectOutlined style={{ marginRight: 8, opacity: 0.8 }} />}
              valueStyle={{ color: '#fff', fontSize: 36, fontWeight: 700 }} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card 
            hoverable
            style={{ borderRadius: 16, border: 'none', background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', boxShadow: '0 10px 20px -5px rgba(56, 239, 125, 0.4)' }}
            bodyStyle={{ padding: 24 }}
          >
            <Statistic 
              title={<span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 500 }}>Đã hoàn thành</span>} 
              value={soTaskHoanThanh} 
              prefix={<CheckCircleOutlined style={{ marginRight: 8, opacity: 0.8 }} />}
              valueStyle={{ color: '#fff', fontSize: 36, fontWeight: 700 }} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card 
            hoverable
            style={{ borderRadius: 16, border: 'none', background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)', boxShadow: '0 10px 20px -5px rgba(255, 75, 43, 0.4)' }}
            bodyStyle={{ padding: 24 }}
          >
            <Statistic 
              title={<span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: 500 }}>Quá hạn</span>} 
              value={soTaskQuaHan} 
              prefix={<ClockCircleOutlined style={{ marginRight: 8, opacity: 0.8 }} />}
              valueStyle={{ color: '#fff', fontSize: 36, fontWeight: 700 }} 
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
