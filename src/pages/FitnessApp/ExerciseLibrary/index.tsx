import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input, Select, Tag, Button, Modal, Form, InputNumber, Space, Popconfirm, message } from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, FireOutlined, EyeOutlined } from '@ant-design/icons';
import { fitnessUtils, BaiTap } from '@/utils/fitness';

const { Option } = Select;
const { Meta } = Card;

const ExerciseLibrary: React.FC = () => {
	const [danhSach, setDanhSach] = useState<BaiTap[]>([]);
	const [danhSachLoc, setDanhSachLoc] = useState<BaiTap[]>([]);
	
	const [tuKhoa, setTuKhoa] = useState('');
	const [nhomCoLoc, setNhomCoLoc] = useState<string | undefined>(undefined);
	const [doKhoLoc, setDoKhoLoc] = useState<string | undefined>(undefined);

	const [chiTietItem, setChiTietItem] = useState<BaiTap | null>(null);
	const [isDetailVisible, setIsDetailVisible] = useState(false);

	const [form] = Form.useForm();
	const [isFormVisible, setIsFormVisible] = useState(false);
	const [editingItem, setEditingItem] = useState<BaiTap | null>(null);

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		handleFilter();
	}, [danhSach, tuKhoa, nhomCoLoc, doKhoLoc]);

	const loadData = () => {
		const data = fitnessUtils.getBaiTap();
		setDanhSach(data);
	};

	const handleFilter = () => {
		let result = [...danhSach];

		if (tuKhoa) {
			result = result.filter(item => item.tenBaiTap.toLowerCase().includes(tuKhoa.toLowerCase()));
		}
		if (nhomCoLoc) {
			result = result.filter(item => item.nhomCoTacDong === nhomCoLoc);
		}
		if (doKhoLoc) {
			result = result.filter(item => item.mucDoKho === doKhoLoc);
		}

		setDanhSachLoc(result);
	};

	const getDifficultyTag = (level: string) => {
		switch (level) {
			case 'Dễ': return <Tag color="green">{level}</Tag>;
			case 'Trung bình': return <Tag color="orange">{level}</Tag>;
			case 'Khó': return <Tag color="red">{level}</Tag>;
			default: return <Tag>{level}</Tag>;
		}
	};

	const showForm = (item?: BaiTap) => {
		if (item) {
			setEditingItem(item);
			form.setFieldsValue(item);
		} else {
			setEditingItem(null);
			form.resetFields();
		}
		setIsFormVisible(true);
	};

	const handleSaveForm = () => {
		form.validateFields().then(values => {
			const newData: BaiTap = {
				id: editingItem ? editingItem.id : Date.now().toString(),
				tenBaiTap: values.tenBaiTap,
				nhomCoTacDong: values.nhomCoTacDong,
				mucDoKho: values.mucDoKho,
				moTaNgan: values.moTaNgan,
				caloDotTrungBinh: values.caloDotTrungBinh,
				huongDan: values.huongDan,
			};

			let updatedList = [...danhSach];
			if (editingItem) {
				updatedList = updatedList.map(item => item.id === editingItem.id ? newData : item);
				message.success('Cập nhật bài tập thành công!');
			} else {
				updatedList.push(newData);
				message.success('Thêm bài tập thành công!');
			}

			fitnessUtils.saveBaiTap(updatedList);
			setDanhSach(updatedList);
			setIsFormVisible(false);
		});
	};

	const handleDelete = (id: string) => {
		const updatedList = danhSach.filter(item => item.id !== id);
		fitnessUtils.saveBaiTap(updatedList);
		setDanhSach(updatedList);
		message.success('Đã xóa bài tập!');
	};

	const showDetail = (item: BaiTap) => {
		setChiTietItem(item);
		setIsDetailVisible(true);
	};

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<Card title="Thư Viện Bài Tập" style={{ borderRadius: 10 }}>
				<div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
					<Space wrap>
						<Input 
							placeholder="Tìm tên bài tập..." 
							prefix={<SearchOutlined />} 
							onChange={e => setTuKhoa(e.target.value)} 
							style={{ width: 250 }} 
						/>
						<Select 
							placeholder="Nhóm cơ" 
							style={{ width: 150 }} 
							allowClear 
							onChange={val => setNhomCoLoc(val)}
						>
							<Option value="Chest">Chest</Option>
							<Option value="Back">Back</Option>
							<Option value="Legs">Legs</Option>
							<Option value="Shoulders">Shoulders</Option>
							<Option value="Arms">Arms</Option>
							<Option value="Core">Core</Option>
							<Option value="Full Body">Full Body</Option>
						</Select>
						<Select 
							placeholder="Độ khó" 
							style={{ width: 150 }} 
							allowClear 
							onChange={val => setDoKhoLoc(val)}
						>
							<Option value="Dễ">Dễ</Option>
							<Option value="Trung bình">Trung bình</Option>
							<Option value="Khó">Khó</Option>
						</Select>
					</Space>
					<Button type="primary" icon={<PlusOutlined />} onClick={() => showForm()}>
						Thêm Bài Tập
					</Button>
				</div>

				<Row gutter={[16, 16]}>
					{danhSachLoc.map(item => (
						<Col xs={24} sm={12} lg={8} key={item.id}>
							<Card
								hoverable
								style={{ borderRadius: 10, height: '100%', display: 'flex', flexDirection: 'column' }}
								bodyStyle={{ flex: 1 }}
								actions={[
									<EyeOutlined key="view" onClick={() => showDetail(item)} />,
									<EditOutlined key="edit" onClick={() => showForm(item)} />,
									<Popconfirm title="Xóa bài tập này?" onConfirm={() => handleDelete(item.id)}>
										<DeleteOutlined key="delete" style={{ color: 'red' }} />
									</Popconfirm>
								]}
							>
								<Meta 
									title={
										<div style={{ display: 'flex', justifyContent: 'space-between' }}>
											<span>{item.tenBaiTap}</span>
											{getDifficultyTag(item.mucDoKho)}
										</div>
									}
									description={
										<div style={{ marginTop: 10 }}>
											<p style={{ color: '#1890ff', fontWeight: 'bold' }}>Nhóm cơ: {item.nhomCoTacDong}</p>
											<p style={{ minHeight: 44 }}>{item.moTaNgan}</p>
											<p style={{ marginTop: 10 }}>
												<FireOutlined style={{ color: '#ff4d4f' }} /> {item.caloDotTrungBinh} kcal/giờ
											</p>
										</div>
									}
								/>
							</Card>
						</Col>
					))}
				</Row>
			</Card>

			<Modal
				title="Chi Tiết Bài Tập"
				visible={isDetailVisible}
				onCancel={() => setIsDetailVisible(false)}
				footer={[
					<Button key="close" onClick={() => setIsDetailVisible(false)}>
						Đóng
					</Button>
				]}
			>
				{chiTietItem && (
					<div>
						<h2 style={{ color: '#1890ff' }}>{chiTietItem.tenBaiTap}</h2>
						<Space style={{ marginBottom: 16 }}>
							<Tag color="purple">{chiTietItem.nhomCoTacDong}</Tag>
							{getDifficultyTag(chiTietItem.mucDoKho)}
							<Tag color="red"><FireOutlined /> {chiTietItem.caloDotTrungBinh} kcal/h</Tag>
						</Space>
						<p><strong>Mô tả ngắn:</strong> {chiTietItem.moTaNgan}</p>
						<div style={{ background: '#fafafa', padding: 15, borderRadius: 8, marginTop: 16 }}>
							<h3>Hướng dẫn thực hiện:</h3>
							<div style={{ whiteSpace: 'pre-wrap' }}>
								{chiTietItem.huongDan}
							</div>
						</div>
					</div>
				)}
			</Modal>

			<Modal
				title={editingItem ? "Sửa Bài Tập" : "Thêm Bài Tập Mới"}
				visible={isFormVisible}
				onOk={handleSaveForm}
				onCancel={() => setIsFormVisible(false)}
				destroyOnClose
				width={600}
			>
				<Form form={form} layout="vertical">
					<Form.Item name="tenBaiTap" label="Tên bài tập" rules={[{ required: true, message: 'Nhập tên bài tập!' }]}>
						<Input />
					</Form.Item>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name="nhomCoTacDong" label="Nhóm cơ tác động" rules={[{ required: true, message: 'Chọn nhóm cơ!' }]}>
								<Select>
									<Option value="Chest">Chest</Option>
									<Option value="Back">Back</Option>
									<Option value="Legs">Legs</Option>
									<Option value="Shoulders">Shoulders</Option>
									<Option value="Arms">Arms</Option>
									<Option value="Core">Core</Option>
									<Option value="Full Body">Full Body</Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="mucDoKho" label="Mức độ khó" rules={[{ required: true, message: 'Chọn độ khó!' }]}>
								<Select>
									<Option value="Dễ">Dễ</Option>
									<Option value="Trung bình">Trung bình</Option>
									<Option value="Khó">Khó</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Form.Item name="caloDotTrungBinh" label="Calo đốt trung bình (kcal/h)" rules={[{ required: true, message: 'Nhập calo!' }]}>
						<InputNumber min={0} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name="moTaNgan" label="Mô tả ngắn" rules={[{ required: true, message: 'Nhập mô tả ngắn!' }]}>
						<Input.TextArea rows={2} />
					</Form.Item>
					<Form.Item name="huongDan" label="Hướng dẫn chi tiết" rules={[{ required: true, message: 'Nhập hướng dẫn!' }]}>
						<Input.TextArea rows={4} placeholder="Ghi chú từng bước thực hiện..." />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default ExerciseLibrary;
