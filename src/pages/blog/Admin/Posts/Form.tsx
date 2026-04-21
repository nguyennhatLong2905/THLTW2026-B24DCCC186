import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { themBaiViet, suaBaiViet } from '@/services/blog/posts';

interface ThuocTinhBieuMau {
  hienThi: boolean;
  baiViet: any;
  dongBieuMau: () => void;
}

const BieuMauBaiViet: React.FC<ThuocTinhBieuMau> = ({ hienThi, baiViet, dongBieuMau }) => {
  const [thucTheBieuMau] = Form.useForm();

  useEffect(() => {
    if (baiViet) {
      thucTheBieuMau.setFieldsValue(baiViet);
    } else {
      thucTheBieuMau.resetFields();
    }
  }, [baiViet, thucTheBieuMau]);

  const xuLyHoanThanh = async (giaTri: any) => {
    if (baiViet) {
      await suaBaiViet(baiViet.id, giaTri);
    } else {
      await themBaiViet(giaTri);
    }
    dongBieuMau();
  };

  return (
    <Modal
      title={baiViet ? 'Sửa bài viết' : 'Thêm bài viết mới'}
      visible={hienThi}
      onCancel={dongBieuMau}
      onOk={() => thucTheBieuMau.submit()}
      width={800}
    >
      <Form form={thucTheBieuMau} layout="vertical" onFinish={xuLyHoanThanh}>
        <Form.Item name="tieuDe" label="Tiêu đề" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="slug" label="Slug">
          <Input />
        </Form.Item>
        <Form.Item name="anhDaiDien" label="Ảnh đại diện (URL)">
          <Input />
        </Form.Item>
        <Form.Item name="danhSachThe" label="Thẻ">
          <Select mode="tags" />
        </Form.Item>
        <Form.Item name="trangThai" label="Trạng thái" initialValue="Nháp">
          <Select>
            <Select.Option value="Nháp">Nháp</Select.Option>
            <Select.Option value="Đã đăng">Đã đăng</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="noiDung" label="Nội dung" rules={[{ required: true }]}>
          <Input.TextArea rows={10} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BieuMauBaiViet;