import React, { useState, useEffect } from 'react';
import { Card, Progress, Drawer, Button, Form, Input, Select, InputNumber, DatePicker, Popconfirm, Segmented, Row, Col, Space, message } from 'antd';
import { PlusOutlined, DeleteOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { fitnessUtils, MucTieu } from '@/utils/fitness';

const { Option } = Select;

const GoalManagement: React.FC = () => {
	const [danhSach, setDanhSach] = useState<MucTieu[]>([]);
	const [danhSachLoc, setDanhSachLoc] = useState<MucTieu[]>([]);
	const [isDrawerVisible, setIsDrawerVisible] = useState(false);
	const [filterTrangThai, setFilterTrangThai] = useState<string>('Tất cả');
	const [form] = Form.useForm();

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		handleFilter(filterTrangThai);
	}, [danhSach, filterTrangThai]);

	const loadData = () => {
		const data = fitnessUtils.getMucTieu();
		setDanhSach(data);
	};

	const handleFilter = (trangThai: string) => {
		if (trangThai === 'Tất cả') {
			setDanhSachLoc(danhSach);
		} else {
			setDanhSachLoc(danhSach.filter(mt => mt.trangThai === trangThai));
		}
	};

	const showDrawer = () => {
		form.resetFields();
		setIsDrawerVisible(true);
	};

	const onClose = () => {
		setIsDrawerVisible(false);
	};

	const handleSave = () => {
		form.validateFields().then(values => {
			const newData: MucTieu = {
				id: Date.now().toString(),
				tenMucTieu: values.tenMucTieu,
				loai: values.loai,
				giaTriMucTieu: values.giaTriMucTieu,
				giaTriHienTai: values.giaTriHienTai || 0,
				deadline: values.deadline.format('YYYY-MM-DD'),
				trangThai: 'Đang thực hiện',
			};

			const updatedList = [...danhSach, newData];
			fitnessUtils.saveMucTieu(updatedList);
			setDanhSach(updatedList);
			message.success('Thêm mục tiêu thành công!');
			setIsDrawerVisible(false);
		});
	};

	const handleDelete = (id: string) => {
		const updatedList = danhSach.filter(mt => mt.id !== id);
		fitnessUtils.saveMucTieu(updatedList);
		setDanhSach(updatedList);
		message.success('Đã xóa mục tiêu!');
	};

	const handleUpdateProgress = (id: string, newValStr: string) => {
		const newVal = parseFloat(newValStr);
		if (isNaN(newVal)) return;

		const updatedList = danhSach.map(mt => {
			if (mt.id === id) {
				const isCompleted = newVal >= mt.giaTriMucTieu;
				return { 
					...mt, 
					giaTriHienTai: newVal,
					trangThai: isCompleted ? 'Đã đạt' : mt.trangThai
				};
			}
			return mt;
		});

		fitnessUtils.saveMucTieu(updatedList);
		setDanhSach(updatedList);
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case 'Đã đạt': return <CheckCircleOutlined style={{ color: 'green' }} />;
			case 'Đã hủy': return <CloseCircleOutlined style={{ color: 'red' }} />;
			default: return <SyncOutlined spin style={{ color: '#1890ff' }} />;
		}
	};

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<Card title="Quản Lý Mục Tiêu" style={{ borderRadius: 10 }}>
				<div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Segmented 
						options={['Tất cả', 'Đang thực hiện', 'Đã đạt', 'Đã hủy']} 
						value={filterTrangThai}
						onChange={(val) => setFilterTrangThai(val as string)}
					/>
					<Button type="primary" icon={<PlusOutlined />} onClick={showDrawer}>
						Thêm Mục Tiêu
					</Button>
				</div>

				<Row gutter={[16, 16]}>
					{danhSachLoc.map(mt => {
						const percent = Math.min(Math.round((mt.giaTriHienTai / mt.giaTriMucTieu) * 100), 100);
						return (
							<Col xs={24} sm={12} lg={8} xl={6} key={mt.id}>
								<Card 
									hoverable
									style={{ borderRadius: 10, height: '100%', opacity: mt.trangThai === 'Đã hủy' ? 0.6 : 1 }}
									actions={[
										<Popconfirm title="Xóa mục tiêu này?" onConfirm={() => handleDelete(mt.id)}>
											<DeleteOutlined key="delete" style={{ color: 'red' }} />
										</Popconfirm>
									]}
								>
									<Card.Meta 
										title={
											<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
												<span>{mt.tenMucTieu}</span>
												{getStatusIcon(mt.trangThai)}
											</div>
										}
										description={
											<div style={{ marginTop: 10 }}>
												<p><strong>Loại:</strong> {mt.loai}</p>
												<p><strong>Deadline:</strong> {mt.deadline}</p>
												
												<div style={{ marginTop: 15 }}>
													<Progress percent={percent} status={percent >= 100 ? 'success' : 'active'} />
												</div>

												<div style={{ marginTop: 15, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
													<span>Hiện tại:</span>
													<Input 
														style={{ width: 80, textAlign: 'center' }}
														defaultValue={mt.giaTriHienTai}
														onBlur={(e) => handleUpdateProgress(mt.id, e.target.value)}
														onPressEnter={(e: any) => handleUpdateProgress(mt.id, e.target.value)}
														disabled={mt.trangThai !== 'Đang thực hiện'}
													/>
													<span>/ {mt.giaTriMucTieu}</span>
												</div>
											</div>
										}
									/>
								</Card>
							</Col>
						)
					})}
				</Row>
			</Card>

			<Drawer
				title="Thêm Mục Tiêu Mới"
				width={400}
				onClose={onClose}
				visible={isDrawerVisible}
				extra={
					<Space>
						<Button onClick={onClose}>Hủy</Button>
						<Button onClick={handleSave} type="primary">Lưu</Button>
					</Space>
				}
			>
				<Form form={form} layout="vertical">
					<Form.Item name="tenMucTieu" label="Tên mục tiêu" rules={[{ required: true, message: 'Nhập tên mục tiêu' }]}>
						<Input placeholder="Ví dụ: Giảm 5kg" />
					</Form.Item>
					<Form.Item name="loai" label="Loại" rules={[{ required: true, message: 'Chọn loại mục tiêu' }]}>
						<Select>
							<Option value="Giảm cân">Giảm cân</Option>
							<Option value="Tăng cơ">Tăng cơ</Option>
							<Option value="Cải thiện sức bền">Cải thiện sức bền</Option>
							<Option value="Khác">Khác</Option>
						</Select>
					</Form.Item>
					<Form.Item name="giaTriMucTieu" label="Giá trị mục tiêu" rules={[{ required: true, message: 'Nhập giá trị đích' }]}>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name="giaTriHienTai" label="Giá trị hiện tại" initialValue={0}>
						<InputNumber style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name="deadline" label="Ngày hoàn thành (Deadline)" rules={[{ required: true, message: 'Chọn ngày' }]}>
						<DatePicker style={{ width: '100%' }} />
					</Form.Item>
				</Form>
			</Drawer>
		</div>
	);
};

export default GoalManagement;
