import { Button, Card, Space, Table, Tag, Popconfirm, Input, Typography } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { useState } from 'react';
import moment from 'moment';
import TaskForm from '../components/TaskForm';

const { Title } = Typography;

export default function DanhSach() {
  const { danhSachCongViec, themCongViec, capNhatCongViec, xoaCongViec } = useModel('quanLyCongViec');
  const [hienThiForm, setHienThiForm] = useState(false);
  const [taskSua, setTaskSua] = useState<any>(null);
  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');

  const layMauUuTien = (mucDo: string) => {
    if (mucDo === 'Cao') return 'volcano';
    if (mucDo === 'Trung bình') return 'orange';
    return 'blue';
  };

  const layMauTrangThai = (trangThai: string) => {
    if (trangThai === 'Hoàn thành') return 'success';
    if (trangThai === 'Đang làm') return 'processing';
    return 'default';
  };

  const cotDuLieu = [
    {
      title: 'Tên công việc',
      dataIndex: 'tenCongViec',
      key: 'tenCongViec',
      render: (text: string) => <span style={{ fontWeight: 600, color: '#1e293b' }}>{text}</span>,
      sorter: (a: any, b: any) => a.tenCongViec.localeCompare(b.tenCongViec),
    },
    {
      title: 'Hạn chót',
      dataIndex: 'hanChot',
      key: 'hanChot',
      render: (text: string) => text ? <span style={{ color: '#64748b' }}>{moment(text).format('DD/MM/YYYY')}</span> : '',
      sorter: (a: any, b: any) => moment(a.hanChot).unix() - moment(b.hanChot).unix(),
    },
    {
      title: 'Mức độ',
      dataIndex: 'mucDoUuTien',
      key: 'mucDoUuTien',
      render: (text: string) => <Tag color={layMauUuTien(text)} style={{ borderRadius: 12, padding: '0 8px' }}>{text}</Tag>,
      filters: [
        { text: 'Cao', value: 'Cao' },
        { text: 'Trung bình', value: 'Trung bình' },
        { text: 'Thấp', value: 'Thấp' },
      ],
      onFilter: (value: any, record: any) => record.mucDoUuTien === value,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (text: string) => <Tag color={layMauTrangThai(text)} style={{ borderRadius: 12, padding: '0 8px' }}>{text}</Tag>,
      filters: [
        { text: 'Cần làm', value: 'Cần làm' },
        { text: 'Đang làm', value: 'Đang làm' },
        { text: 'Hoàn thành', value: 'Hoàn thành' },
      ],
      onFilter: (value: any, record: any) => record.trangThai === value,
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
      render: (text: string) => text ? <Tag style={{ borderRadius: 12, background: '#f1f5f9', border: 'none', color: '#475569' }}>#{text}</Tag> : null,
    },
    {
      title: 'Hành động',
      key: 'hanhDong',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="text" style={{ color: '#1890ff', background: '#e6f7ff', borderRadius: 8 }} icon={<EditOutlined />} onClick={() => moFormSua(record)} />
          <Popconfirm title="Bạn có chắc muốn xoá công việc này?" onConfirm={() => xoaCongViec(record.id)}>
            <Button type="text" danger style={{ background: '#fff1f0', borderRadius: 8 }} icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const duLieuHienThi = danhSachCongViec.filter((cv: any) => 
    cv.tenCongViec?.toLowerCase().includes(tuKhoaTimKiem.toLowerCase())
  );

  const moFormThem = () => {
    setTaskSua(null);
    setHienThiForm(true);
  };

  const moFormSua = (task: any) => {
    setTaskSua(task);
    setHienThiForm(true);
  };

  const dongForm = () => {
    setHienThiForm(false);
    setTaskSua(null);
  };

  const luuDuLieu = (values: any) => {
    if (taskSua) {
      capNhatCongViec(taskSua.id, values);
    } else {
      themCongViec(values);
    }
    dongForm();
  };

  return (
    <div style={{ padding: '32px 24px', minHeight: '80vh', background: '#f5f7fa' }}>
      <Title level={2} style={{ marginBottom: 24, fontWeight: 700, color: '#1f2937' }}>
        Quản Lý Danh Sách
      </Title>
      <Card
        bordered={false}
        style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
        bodyStyle={{ padding: 24 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <Input
            prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
            placeholder="Tìm kiếm công việc..."
            allowClear
            onChange={(e) => setTuKhoaTimKiem(e.target.value)}
            style={{ width: 320, borderRadius: 20, padding: '6px 16px', border: '1px solid #e2e8f0' }}
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={moFormThem}
            style={{ borderRadius: 20, height: 40, padding: '0 24px', fontWeight: 600, background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)', border: 'none', boxShadow: '0 4px 15px rgba(79, 172, 254, 0.4)' }}
          >
            Thêm Mới
          </Button>
        </div>
        <Table 
          columns={cotDuLieu} 
          dataSource={duLieuHienThi} 
          rowKey="id" 
          pagination={{ pageSize: 8, style: { padding: '16px 0 0 0' } }}
          rowClassName={() => 'custom-table-row'}
        />
      </Card>
      
      <TaskForm 
        isVisible={hienThiForm} 
        onClose={dongForm} 
        onSave={luuDuLieu} 
        task={taskSua} 
      />
    </div>
  );
}
