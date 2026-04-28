import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, InputNumber, DatePicker, Popconfirm, message, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { fitnessUtils, BuoiTap } from '@/utils/fitness';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

const WorkoutLog: React.FC = () => {
	const [danhSach, setDanhSach] = useState<BuoiTap[]>([]);
	const [danhSachLoc, setDanhSachLoc] = useState<BuoiTap[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingItem, setEditingItem] = useState<BuoiTap | null>(null);
	const [form] = Form.useForm();
	
	const [tuKhoa, setTuKhoa] = useState('');
	const [loaiLoc, setLoaiLoc] = useState<string | undefined>(undefined);
	const [ngayLoc, setNgayLoc] = useState<[moment.Moment, moment.Moment] | null>(null);

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		handleFilter();
	}, [danhSach, tuKhoa, loaiLoc, ngayLoc]);

	const loadData = () => {
		const data = fitnessUtils.getBuoiTap();
		setDanhSach(data);
	};

	const handleFilter = () => {
		let result = [...danhSach];

		if (tuKhoa) {
			result = result.filter(item => 
				item.ghiChu.toLowerCase().includes(tuKhoa.toLowerCase()) ||
				item.loaiBaiTap.toLowerCase().includes(tuKhoa.toLowerCase())
			);
		}

		if (loaiLoc) {
			result = result.filter(item => item.loaiBaiTap === loaiLoc);
		}

		if (ngayLoc && ngayLoc[0] && ngayLoc[1]) {
			result = result.filter(item => {
				const ngayTap = moment(item.ngayTap);
				return ngayTap.isBetween(ngayLoc[0], ngayLoc[1], 'day', '[]');
			});
		}

		setDanhSachLoc(result);
	};

	const showModal = (item?: BuoiTap) => {
		if (item) {
			setEditingItem(item);
			form.setFieldsValue({
				...item,
				ngayTap: moment(item.ngayTap),
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
			const newData: BuoiTap = {
				id: editingItem ? editingItem.id : Date.now().toString(),
				ngayTap: values.ngayTap.format('YYYY-MM-DD'),
				loaiBaiTap: values.loaiBaiTap,
				thoiLuong: values.thoiLuong,
				caloDot: values.caloDot,
				ghiChu: values.ghiChu || '',
				trangThai: values.trangThai,
			};

			let updatedList = [...danhSach];
			if (editingItem) {
				updatedList = updatedList.map(item => item.id === editingItem.id ? newData : item);
				message.success('Cập nhật buổi tập thành công!');
			} else {
				updatedList.push(newData);
				message.success('Thêm buổi tập thành công!');
			}

			fitnessUtils.saveBuoiTap(updatedList);
			setDanhSach(updatedList);
			setIsModalVisible(false);
		});
	};

	const handleDelete = (id: string) => {
		const updatedList = danhSach.filter(item => item.id !== id);
		fitnessUtils.saveBuoiTap(updatedList);
		setDanhSach(updatedList);
		message.success('Đã xóa buổi tập!');
	};

	const columns = [
		{ title: 'Ngày tập', dataIndex: 'ngayTap', key: 'ngayTap', sorter: (a: BuoiTap, b: BuoiTap) => moment(a.ngayTap).unix() - moment(b.ngayTap).unix() },
		{ title: 'Loại bài tập', dataIndex: 'loaiBaiTap', key: 'loaiBaiTap' },
		{ title: 'Thời lượng (phút)', dataIndex: 'thoiLuong', key: 'thoiLuong' },
		{ title: 'Calo đốt', dataIndex: 'caloDot', key: 'caloDot' },
		{ title: 'Ghi chú', dataIndex: 'ghiChu', key: 'ghiChu' },
		{ 
			title: 'Trạng thái', 
			dataIndex: 'trangThai', 
			key: 'trangThai',
			render: (trangThai: string) => (
				<span style={{ color: trangThai === 'Hoàn thành' ? 'green' : 'red' }}>
					{trangThai}
				</span>
			)
		},
		{
			title: 'Thao tác',
			key: 'action',
			render: (_: any, record: BuoiTap) => (
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
			<Card title="Nhật Ký Tập Luyện" style={{ borderRadius: 10 }}>
				<div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
					<Space wrap>
						<Input 
							placeholder="Tìm kiếm..." 
							prefix={<SearchOutlined />} 
							onChange={e => setTuKhoa(e.target.value)} 
							style={{ width: 200 }} 
						/>
						<Select 
							placeholder="Chọn loại bài tập" 
							style={{ width: 150 }} 
							allowClear 
							onChange={value => setLoaiLoc(value)}
						>
							<Option value="Cardio">Cardio</Option>
							<Option value="Strength">Strength</Option>
							<Option value="Yoga">Yoga</Option>
							<Option value="HIIT">HIIT</Option>
							<Option value="Other">Other</Option>
						</Select>
						<RangePicker onChange={(dates: any) => setNgayLoc(dates)} />
					</Space>
					<Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
						Thêm buổi tập
					</Button>
				</div>
				
				<Table 
					columns={columns} 
					dataSource={danhSachLoc} 
					rowKey="id" 
					pagination={{ pageSize: 10 }}
				/>
			</Card>

			<Modal
				title={editingItem ? "Sửa buổi tập" : "Thêm buổi tập"}
				visible={isModalVisible}
				onOk={handleSave}
				onCancel={handleCancel}
				destroyOnClose
			>
				<Form form={form} layout="vertical">
					<Form.Item name="ngayTap" label="Ngày tập" rules={[{ required: true, message: 'Vui lòng chọn ngày tập!' }]}>
						<DatePicker style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name="loaiBaiTap" label="Loại bài tập" rules={[{ required: true, message: 'Vui lòng chọn loại bài tập!' }]}>
						<Select>
							<Option value="Cardio">Cardio</Option>
							<Option value="Strength">Strength</Option>
							<Option value="Yoga">Yoga</Option>
							<Option value="HIIT">HIIT</Option>
							<Option value="Other">Other</Option>
						</Select>
					</Form.Item>
					<Form.Item name="thoiLuong" label="Thời lượng (phút)" rules={[{ required: true, message: 'Vui lòng nhập thời lượng!' }]}>
						<InputNumber min={1} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name="caloDot" label="Calo đốt" rules={[{ required: true, message: 'Vui lòng nhập calo!' }]}>
						<InputNumber min={0} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name="trangThai" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
						<Select>
							<Option value="Hoàn thành">Hoàn thành</Option>
							<Option value="Bỏ lỡ">Bỏ lỡ</Option>
						</Select>
					</Form.Item>
					<Form.Item name="ghiChu" label="Ghi chú">
						<Input.TextArea rows={3} />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default WorkoutLog;
