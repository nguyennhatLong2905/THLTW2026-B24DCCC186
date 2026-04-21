import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Input, Pagination } from 'antd';
import TheBaiViet from '../components/PostCard';
import BoLocThe from '../components/Filter';
import { layDanhSachBaiViet } from '@/services/blog/posts';
import { layDanhSachThe } from '@/services/blog/tag';
import { taoDebounce } from '@/utils/debounce';
import '../blog-styles.less';

const TrangChu = () => {
  const [danhSachBaiViet, datDanhSachBaiViet] = useState<any[]>([]);
  const [danhSachThe, datDanhSachThe] = useState<any[]>([]);
  const [trangHienTai, datTrangHienTai] = useState(1);
  const [tuKhoa, datTuKhoa] = useState('');
  const [theDuocChon, datTheDuocChon] = useState<string | null>(null);

  const soBaiTrenTrang = 9;

  const taiDuLieu = async (tuKhoaTimKiem: string, theLoc: string | null) => {
    const ketQuaBaiViet = await layDanhSachBaiViet(tuKhoaTimKiem, theLoc || '');
    datDanhSachBaiViet(ketQuaBaiViet);
  };

  const taiDuLieuThe = async () => {
    const ketQuaThe = await layDanhSachThe();
    datDanhSachThe(ketQuaThe);
  };

  useEffect(() => {
    taiDuLieuThe();
    taiDuLieu('', null);
  }, []);

  const xuLyTimKiem = useCallback(
    taoDebounce((giaTri: string) => {
      datTuKhoa(giaTri);
      datTrangHienTai(1);
      taiDuLieu(giaTri, theDuocChon);
    }, 300),
    [theDuocChon]
  );

  const xuLyChonThe = (tenThe: string) => {
    const theMoi = tenThe === '' ? null : tenThe;
    datTheDuocChon(theMoi);
    datTrangHienTai(1);
    taiDuLieu(tuKhoa, theMoi);
  };

  const chiSoBatDau = (trangHienTai - 1) * soBaiTrenTrang;
  const baiVietHienThi = danhSachBaiViet.slice(chiSoBatDau, chiSoBatDau + soBaiTrenTrang);

  return (
    <div className="blog-home-container">
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Input.Search
            placeholder="Tìm kiếm bài viết..."
            onChange={(suKien) => xuLyTimKiem(suKien.target.value)}
          />
        </Col>
        <Col span={16}>
          <BoLocThe danhSachThe={danhSachThe} theDuocChon={theDuocChon} xuLyChonThe={xuLyChonThe} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {baiVietHienThi.map((baiViet) => (
          <Col xs={24} sm={12} md={8} key={baiViet.id}>
            <TheBaiViet baiViet={baiViet} />
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Pagination
          current={trangHienTai}
          pageSize={soBaiTrenTrang}
          total={danhSachBaiViet.length}
          onChange={(trangMoi) => datTrangHienTai(trangMoi)}
        />
      </div>
    </div>
  );
};

export default TrangChu;