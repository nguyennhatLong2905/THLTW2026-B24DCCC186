import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Popconfirm, Modal, Form, Input } from 'antd';
import { layDanhSachThe, themThe, suaThe, xoaThe } from '@/services/blog/tag';

const QuanLyThe = () => {
  const [danhSachThe, datDanhSachThe] = useState<any[]>([]);
  const [hienThiModal, datHienThiModal] = useState(false);
  const [theChinhSua, datTheChinhSua] = useState<any>(null);
  const [thucTheBieuMau] = Form.useForm();

  const taiDuLieu = async () => {
    const ketQua = await layDanhSachThe();
    datDanhSachThe(ketQua);
  };

  useEffect(() => {
    taiDuLieu();
  }, []);

  const xuLyXoa = async (id: string) => {
    await xoaThe(id);
    taiDuLieu();
  };

  const moModal = (the?: any) => {
    datTheChinhSua(the || null);
    if (the) {
      thucTheBieuMau.setFieldsValue(the);
    } else {
      thucTheBieuMau.resetFields();
    }
    datHienThiModal(true);
  };

  const xuLyLuuThe = async (giaTri: any) => {
    if (theChinhSua) {
      await suaThe(theChinhSua.id, giaTri);
    } else {
      await themThe(giaTri);
    }
    datHienThiModal(false);
    taiDuLieu();
  };

  const cotBang = [
    { title: 'Tên thẻ', dataIndex: 'tenThe', key: 'tenThe' },
    { title: 'Số bài viết sử dụng', dataIndex: 'soBaiViet', key: 'soBaiViet' },
    {
      title: 'Hành động',
      key: 'hanhDong',
      render: (_: any, banGhi: any) => (
        <Space>
          <Button type="link" onClick={() => moModal(banGhi)}>Sửa</Button>
          <Popconfirm title="Xóa thẻ này?" onConfirm={() => xuLyXoa(banGhi.id)}>
            <Button type="link" danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Button type="primary" onClick={() => moModal()} style={{ marginBottom: 16 }}>
        Thêm thẻ mới
      </Button>
      <Table rowKey="id" columns={cotBang} dataSource={danhSachThe} />
      <Modal
        title={theChinhSua ? 'Sửa thẻ' : 'Thêm thẻ'}
        visible={hienThiModal}
        onCancel={() => datHienThiModal(false)}
        onOk={() => thucTheBieuMau.submit()}
      >
        <Form form={thucTheBieuMau} layout="vertical" onFinish={xuLyLuuThe}>
          <Form.Item name="tenThe" label="Tên thẻ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default QuanLyThe;