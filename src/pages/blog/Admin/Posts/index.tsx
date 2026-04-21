import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, Input, Select, Tag } from 'antd';
import { layDanhSachBaiViet, xoaBaiViet } from '@/services/blog/posts';
import BieuMauBaiViet from './Form';

const QuanLyBaiViet = () => {
  const [danhSachDuLieu, datDanhSachDuLieu] = useState<any[]>([]);
  const [hienThiBieuMau, datHienThiBieuMau] = useState(false);
  const [baiVietChinhSua, datBaiVietChinhSua] = useState<any>(null);

  const taiDuLieu = async () => {
    const ketQua = await layDanhSachBaiViet();
    datDanhSachDuLieu(ketQua);
  };

  useEffect(() => {
    taiDuLieu();
  }, []);

  const xuLyXoa = async (id: string) => {
    await xoaBaiViet(id);
    taiDuLieu();
  };

  const xuLyMoBieuMau = (baiViet?: any) => {
    datBaiVietChinhSua(baiViet || null);
    datHienThiBieuMau(true);
  };

  const dongBieuMau = () => {
    datHienThiBieuMau(false);
    taiDuLieu();
  };

  const cotBang = [
    { title: 'Tiêu đề', dataIndex: 'tieuDe', key: 'tieuDe' },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (trangThai: string) => (
        <Tag color={trangThai === 'Đã đăng' ? 'green' : 'orange'}>{trangThai}</Tag>
      ),
    },
    {
      title: 'Thẻ',
      dataIndex: 'danhSachThe',
      key: 'danhSachThe',
      render: (danhSachThe: string[]) => danhSachThe.join(', '),
    },
    { title: 'Lượt xem', dataIndex: 'luotXem', key: 'luotXem' },
    { title: 'Ngày tạo', dataIndex: 'ngayDang', key: 'ngayDang' },
    {
      title: 'Hành động',
      key: 'hanhDong',
      render: (_: any, banGhi: any) => (
        <Space>
          <Button type="link" onClick={() => xuLyMoBieuMau(banGhi)}>Sửa</Button>
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => xuLyXoa(banGhi.id)}>
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search placeholder="Tìm kiếm theo tiêu đề" />
        <Select placeholder="Trạng thái" style={{ width: 120 }} allowClear>
          <Select.Option value="Đã đăng">Đã đăng</Select.Option>
          <Select.Option value="Nháp">Nháp</Select.Option>
        </Select>
        <Button type="primary" onClick={() => xuLyMoBieuMau()}>Thêm bài viết mới</Button>
      </Space>
      <Table rowKey="id" columns={cotBang} dataSource={danhSachDuLieu} />
      {hienThiBieuMau && (
        <BieuMauBaiViet hienThi={hienThiBieuMau} baiViet={baiVietChinhSua} dongBieuMau={dongBieuMau} />
      )}
    </div>
  );
};

export default QuanLyBaiViet;