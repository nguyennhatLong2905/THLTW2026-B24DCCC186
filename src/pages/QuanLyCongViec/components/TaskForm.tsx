import { Modal, Form, Input, DatePicker, Select, Button } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

export default function TaskForm({ isVisible, onClose, onSave, task }: any) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isVisible) {
      if (task) {
        form.setFieldsValue({
          ...task,
          hanChot: task.hanChot ? moment(task.hanChot) : undefined,
        });
      } else {
        form.resetFields();
      }
    }
  }, [isVisible, task, form]);

  const xuLyLuu = () => {
    form.validateFields().then(values => {
      onSave({
        ...values,
        hanChot: values.hanChot ? values.hanChot.format('YYYY-MM-DD') : null,
      });
      form.resetFields();
    });
  };

  return (
    <Modal
      title={<div style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>{task ? "Cập Nhật Công Việc" : "Thêm Công Việc Mới"}</div>}
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose} style={{ borderRadius: 8, fontWeight: 500 }}>
          Hủy Bỏ
        </Button>,
        <Button key="submit" type="primary" onClick={xuLyLuu} style={{ borderRadius: 8, fontWeight: 600, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none' }}>
          {task ? "Cập Nhật" : "Lưu Công Việc"}
        </Button>,
      ]}
      style={{ top: 40 }}
      bodyStyle={{ padding: '24px 0 12px' }}
      width={520}
      destroyOnClose
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item name="tenCongViec" label={<span style={{ fontWeight: 500, color: '#475569' }}>Tên công việc</span>} rules={[{ required: true, message: 'Vui lòng nhập tên công việc!' }]}>
          <Input placeholder="Nhập tên công việc" size="large" style={{ borderRadius: 8 }} />
        </Form.Item>
        <Form.Item name="moTa" label={<span style={{ fontWeight: 500, color: '#475569' }}>Mô tả chi tiết</span>}>
          <Input.TextArea placeholder="Nhập mô tả (tùy chọn)" rows={4} style={{ borderRadius: 8 }} />
        </Form.Item>
        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item name="hanChot" label={<span style={{ fontWeight: 500, color: '#475569' }}>Hạn chót</span>} rules={[{ required: true, message: 'Vui lòng chọn hạn chót!' }]} style={{ flex: 1 }}>
            <DatePicker style={{ width: '100%', borderRadius: 8 }} size="large" format="DD/MM/YYYY" placeholder="Chọn ngày" />
          </Form.Item>
          <Form.Item name="mucDoUuTien" label={<span style={{ fontWeight: 500, color: '#475569' }}>Mức độ ưu tiên</span>} rules={[{ required: true, message: 'Vui lòng chọn ưu tiên!' }]} style={{ flex: 1 }}>
            <Select size="large" placeholder="Chọn ưu tiên">
              <Select.Option value="Cao">🔴 Cao</Select.Option>
              <Select.Option value="Trung bình">🟠 Trung bình</Select.Option>
              <Select.Option value="Thấp">🔵 Thấp</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <Form.Item name="tag" label={<span style={{ fontWeight: 500, color: '#475569' }}>Nhãn (Tag)</span>} style={{ flex: 1 }}>
            <Input placeholder="Ví dụ: HocTap" size="large" style={{ borderRadius: 8 }} />
          </Form.Item>
          <Form.Item name="trangThai" label={<span style={{ fontWeight: 500, color: '#475569' }}>Trạng thái</span>} initialValue="Cần làm" style={{ flex: 1 }}>
            <Select size="large">
              <Select.Option value="Cần làm">Cần làm</Select.Option>
              <Select.Option value="Đang làm">Đang làm</Select.Option>
              <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
}
