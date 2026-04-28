import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, InputNumber, DatePicker, Popconfirm, message, Card, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { fitnessUtils, ChiSoSucKhoe } from '@/utils/fitness';
import moment from 'moment';

const HealthMetrics: React.FC = () => {
	const [danhSach, setDanhSach] = useState<ChiSoSucKhoe[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingItem, setEditingItem] = useState<ChiSoSucKhoe | null>(null);
	const [form] = Form.useForm();

	useEffect(() => {
		loadData();
	}, []);

	const loadData = () => {
		const data = fitnessUtils.getChiSo();
		setDanhSach(data);
	};

	const showModal = (item?: ChiSoSucKhoe) => {
		if (item) {
			setEditingItem(item);
			form.setFieldsValue({
				...item,
				ngay: moment(item.ngay),
			});
		} else {
			setEditingItem(null);
			form.resetFields();
		}
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		form.resetFields();
	};

	const handleSave = () => {
		form.validateFields().then(values => {
			const newData: ChiSoSucKhoe = {
				id: editingItem ? editingItem.id : Date.now().toString(),
				ngay: values.ngay.format('YYYY-MM-DD'),
				canNang: values.canNang,
				chieuCao: values.chieuCao,
				nhipTimLucNghi: values.nhipTimLucNghi,
				gioNgu: values.gioNgu,
			};

			let updatedList = [...danhSach];
			if (editingItem) {
				updatedList = updatedList.map(item => item.id === editingItem.id ? newData : item);
				message.success('Cập nhật chỉ số thành công!');
			} else {
				updatedList.push(newData);
				message.success('Thêm chỉ số thành công!');
			}

			fitnessUtils.saveChiSo(updatedList);
			setDanhSach(updatedList);
			setIsModalVisible(false);
		});
	};

	const handleDelete = (id: string) => {
		const updatedList = danhSach.filter(item => item.id !== id);
		fitnessUtils.saveChiSo(updatedList);
		setDanhSach(updatedList);
		message.success('Đã xóa chỉ số!');
	};

	const calculateBMI = (weight: number, heightCm: number) => {
		const heightM = heightCm / 100;
		return (weight / (heightM * heightM)).toFixed(1);
	};

	const renderBMITag = (bmiStr: string) => {
		const bmi = parseFloat(bmiStr);
		if (bmi < 18.5) return <Tag color="blue">Thiếu cân ({bmi})</Tag>;
		if (bmi >= 18.5 && bmi <= 24.9) return <Tag color="green">Bình thường ({bmi})</Tag>;
		if (bmi >= 25 && bmi <= 29.9) return <Tag color="orange">Thừa cân ({bmi})</Tag>;
		return <Tag color="red">Béo phì ({bmi})</Tag>;
	};

	const columns = [
		{ title: 'Ngày', dataIndex: 'ngay', key: 'ngay', sorter: (a: ChiSoSucKhoe, b: ChiSoSucKhoe) => moment(a.ngay).unix() - moment(b.ngay).unix() },
		{ title: 'Cân nặng (kg)', dataIndex: 'canNang', key: 'canNang' },
		{ title: 'Chiều cao (cm)', dataIndex: 'chieuCao', key: 'chieuCao' },
		{ 
			title: 'BMI', 
			key: 'bmi',
			render: (_: any, record: ChiSoSucKhoe) => {
				const bmi = calculateBMI(record.canNang, record.chieuCao);
				return renderBMITag(bmi);
			}
		},
		{ title: 'Nhịp tim nghỉ (bpm)', dataIndex: 'nhipTimLucNghi', key: 'nhipTimLucNghi' },
		{ title: 'Giờ ngủ', dataIndex: 'gioNgu', key: 'gioNgu' },
		{
			title: 'Thao tác',
			key: 'action',
			render: (_: any, record: ChiSoSucKhoe) => (
				<Space size="middle">
					<Button type="text" icon={<EditOutlined />} onClick={() => showModal(record)} />
					<Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => handleDelete(record.id)}>
						<Button type="text" danger icon={<DeleteOutlined />} />
					</Popconfirm>
				</Space>
			),
		},
	];

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<Card title="Nhật Ký Chỉ Số Sức Khỏe" style={{ borderRadius: 10 }}>
				<div style={{ marginBottom: 16 }}>
					<Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
						Thêm chỉ số
					</Button>
				</div>
				
				<Table 
					columns={columns} 
					dataSource={danhSach} 
					rowKey="id" 
					pagination={{ pageSize: 10 }}
				/>
			</Card>

			<Modal
				title={editingItem ? "Sửa chỉ số" : "Thêm chỉ số"}
				visible={isModalVisible}
				onOk={handleSave}
				onCancel={handleCancel}
				destroyOnClose
			>
				<Form form={form} layout="vertical">
					<Form.Item name="ngay" label="Ngày" rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
						<DatePicker style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name="canNang" label="Cân nặng (kg)" rules={[{ required: true, message: 'Vui lòng nhập cân nặng!' }]}>
						<InputNumber min={1} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name="chieuCao" label="Chiều cao (cm)" rules={[{ required: true, message: 'Vui lòng nhập chiều cao!' }]}>
						<InputNumber min={1} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name="nhipTimLucNghi" label="Nhịp tim lúc nghỉ (bpm)" rules={[{ required: true, message: 'Vui lòng nhập nhịp tim!' }]}>
						<InputNumber min={30} max={200} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name="gioNgu" label="Giờ ngủ (tiếng)" rules={[{ required: true, message: 'Vui lòng nhập giờ ngủ!' }]}>
						<InputNumber min={0} max={24} step={0.5} style={{ width: '100%' }} />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default HealthMetrics;
