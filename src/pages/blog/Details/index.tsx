import { useEffect, useState } from 'react';
import { useParams, Link } from 'umi';
import { Typography, Tag, Button, Row, Col, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { layChiTietBaiViet, tangLuotXem, layDanhSachBaiViet } from '@/services/blog/posts';
import TheBaiViet from '../components/PostCard';
import '../blog-styles.less';

const { Title, Text } = Typography;

const ChiTietBaiViet = () => {
  const { id } = useParams<{ id: string }>();
  const [baiViet, datBaiViet] = useState<any>(null);
  const [baiVietLienQuan, datBaiVietLienQuan] = useState<any[]>([]);

  useEffect(() => {
    const taiDuLieu = async () => {
      if (id) {
        await tangLuotXem(id);
        const duLieu = await layChiTietBaiViet(id);
        datBaiViet(duLieu);

        if (duLieu && duLieu.danhSachThe.length > 0) {
          const danhSachTatCa = await layDanhSachBaiViet('', duLieu.danhSachThe[0]);
          const danhSachLoc = danhSachTatCa.filter((bai: any) => bai.id !== id);
          datBaiVietLienQuan(danhSachLoc);
        }
      }
    };
    taiDuLieu();
  }, [id]);

  if (!baiViet) return null;

  return (
    <div className="blog-detail-container">
      <div className="premium-card" style={{ maxWidth: 800, margin: '0 auto', padding: '24px 40px', background: 'rgba(255,255,255,0.95)' }}>
        <Link to="/blog/home">
        <Button icon={<ArrowLeftOutlined />} type="link" style={{ paddingLeft: 0 }}>
          Quay lại danh sách
        </Button>
      </Link>
      <Title>{baiViet.tieuDe}</Title>
      <div style={{ marginBottom: 24 }}>
        <Text type="secondary" style={{ marginRight: 16 }}>Tác giả: {baiViet.tacGia}</Text>
        <Text type="secondary" style={{ marginRight: 16 }}>Ngày đăng: {baiViet.ngayDang}</Text>
        <Text type="secondary">Lượt xem: {baiViet.luotXem}</Text>
      </div>
      <div style={{ marginBottom: 24 }}>
        {baiViet.danhSachThe.map((the: string) => (
          <Tag color="blue" key={the}>{the}</Tag>
        ))}
      </div>
      <div className="markdown-content" style={{ marginTop: 32 }}>
        <ReactMarkdown>{baiViet.noiDung}</ReactMarkdown>
      </div>
      <Divider />
      <Title level={3}>Bài viết liên quan</Title>
      <Row gutter={[16, 16]}>
        {baiVietLienQuan.map((baiLienQuan) => (
          <Col xs={24} md={12} key={baiLienQuan.id}>
            <TheBaiViet baiViet={baiLienQuan} />
          </Col>
        ))}
      </Row>
      </div>
    </div>
  );
};

export default ChiTietBaiViet;