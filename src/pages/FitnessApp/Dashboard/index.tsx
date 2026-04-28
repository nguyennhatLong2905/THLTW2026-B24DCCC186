import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Timeline } from 'antd';
import { FireOutlined, CalendarOutlined, TrophyOutlined, SyncOutlined } from '@ant-design/icons';
import { fitnessUtils, BuoiTap, ChiSoSucKhoe, MucTieu } from '@/utils/fitness';
import ReactApexChart from 'react-apexcharts';

const Dashboard: React.FC = () => {
	const [danhSachBuoiTap, setDanhSachBuoiTap] = useState<BuoiTap[]>([]);
	const [danhSachChiSo, setDanhSachChiSo] = useState<ChiSoSucKhoe[]>([]);
	const [danhSachMucTieu, setDanhSachMucTieu] = useState<MucTieu[]>([]);

	useEffect(() => {
		fitnessUtils.initData();
		setDanhSachBuoiTap(fitnessUtils.getBuoiTap());
		setDanhSachChiSo(fitnessUtils.getChiSo());
		setDanhSachMucTieu(fitnessUtils.getMucTieu());
	}, []);

	const thangHienTai = new Date().getMonth() + 1;
	const buoiTapTrongThang = danhSachBuoiTap.filter(bt => {
		const date = new Date(bt.ngayTap);
		return date.getMonth() + 1 === thangHienTai && bt.trangThai === 'Hoàn thành';
	});

	const tongBuoiTap = buoiTapTrongThang.length;
	const tongCaloDot = buoiTapTrongThang.reduce((sum, bt) => sum + bt.caloDot, 0);

	const phanTramMucTieu = danhSachMucTieu.length > 0 
		? danhSachMucTieu.reduce((sum, mt) => {
				const percent = Math.min((mt.giaTriHienTai / mt.giaTriMucTieu) * 100, 100);
				return sum + percent;
		  }, 0) / danhSachMucTieu.length
		: 0;

	const dataBieuDoCot = {
		series: [{
			name: 'Số buổi tập',
			data: [2, 3, 4, tongBuoiTap - 9 > 0 ? tongBuoiTap - 9 : 1]
		}],
		options: {
			chart: { type: 'bar' as const, height: 300 },
			xaxis: { categories: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'] },
			colors: ['#1890ff'],
			plotOptions: { bar: { borderRadius: 4, dataLabels: { position: 'top' } } }
		}
	};

	const dataBieuDoDuong = {
		series: [{
			name: 'Cân nặng (kg)',
			data: danhSachChiSo.slice(-7).map(cs => cs.canNang)
		}],
		options: {
			chart: { type: 'line' as const, height: 300 },
			xaxis: { categories: danhSachChiSo.slice(-7).map(cs => cs.ngay) },
			stroke: { curve: 'smooth' as const },
			colors: ['#52c41a'],
			markers: { size: 4 }
		}
	};

	const buoiTapGanNhat = [...danhSachBuoiTap].sort((a, b) => new Date(b.ngayTap).getTime() - new Date(a.ngayTap).getTime()).slice(0, 5);

	return (
		<div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
			<h2 style={{ marginBottom: 20 }}>Tổng quan sức khỏe</h2>
			
			<Row gutter={[16, 16]}>
				<Col xs={24} sm={12} lg={6}>
					<Card hoverable style={{ borderRadius: 10 }}>
						<Statistic title="Buổi tập tháng này" value={tongBuoiTap} prefix={<CalendarOutlined style={{ color: '#1890ff' }} />} suffix="buổi" />
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card hoverable style={{ borderRadius: 10 }}>
						<Statistic title="Calo đã đốt" value={tongCaloDot} prefix={<FireOutlined style={{ color: '#ff4d4f' }} />} suffix="kcal" />
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card hoverable style={{ borderRadius: 10 }}>
						<Statistic title="Chuỗi ngày tập" value={3} prefix={<SyncOutlined style={{ color: '#faad14' }} />} suffix="ngày" />
					</Card>
				</Col>
				<Col xs={24} sm={12} lg={6}>
					<Card hoverable style={{ borderRadius: 10 }}>
						<Statistic title="Mục tiêu hoàn thành" value={phanTramMucTieu} precision={1} prefix={<TrophyOutlined style={{ color: '#52c41a' }} />} suffix="%" />
					</Card>
				</Col>
			</Row>

			<Row gutter={[16, 16]} style={{ marginTop: 24 }}>
				<Col xs={24} lg={16}>
					<Card title="Số buổi tập trong tháng" bordered={false} style={{ borderRadius: 10 }}>
						<ReactApexChart options={dataBieuDoCot.options} series={dataBieuDoCot.series} type="bar" height={300} />
					</Card>
					
					<Card title="Thay đổi cân nặng" bordered={false} style={{ borderRadius: 10, marginTop: 16 }}>
						<ReactApexChart options={dataBieuDoDuong.options} series={dataBieuDoDuong.series} type="line" height={300} />
					</Card>
				</Col>
				
				<Col xs={24} lg={8}>
					<Card title="5 buổi tập gần nhất" bordered={false} style={{ borderRadius: 10, height: '100%' }}>
						<Timeline>
							{buoiTapGanNhat.map((bt) => (
								<Timeline.Item key={bt.id} color={bt.trangThai === 'Hoàn thành' ? 'green' : 'red'}>
									<p style={{ fontWeight: 'bold', margin: 0 }}>{bt.loaiBaiTap} - {bt.thoiLuong} phút</p>
									<p style={{ margin: 0, color: 'gray' }}>{bt.ngayTap}</p>
									<p style={{ margin: 0 }}>{bt.ghiChu}</p>
								</Timeline.Item>
							))}
						</Timeline>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
