import React, { useMemo, useState } from 'react'
import {
    Card,
    Table,
    Button,
    Space,
    Typography,
    Row,
    Col,
    Statistic,
    Tag,
    Modal,
    message,
    Progress,
} from 'antd'
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    DollarOutlined,
    RiseOutlined,
} from '@ant-design/icons'
import ModalDiemDen from './ModalDiemDen'

const { Text } = Typography
const { confirm } = Modal

export default function Admin(props: any) {
    const dsDiemDen = Array.isArray(props?.dsDiemDen) ? props.dsDiemDen : []
    const setDsDiemDen =
        typeof props?.setDsDiemDen === 'function' ? props.setDsDiemDen : () => {}
    const dsLichTrinh = Array.isArray(props?.dsLichTrinh) ? props.dsLichTrinh : []

    const [mo, setMo] = useState(false)
    const [sua, setSua] = useState<any>(null)

    const xoa = (ma: string) => {
        confirm({
            title: 'Bạn chắc chắn muốn xóa điểm đến này?',
            onOk() {
                setDsDiemDen(dsDiemDen.filter((i: any) => i.ma !== ma))
                message.success('Đã xóa điểm đến')
            },
        })
    }

    const tongTienThuVe = useMemo(() => {
        return dsLichTrinh.reduce((tong: number, item: any) => {
            const anUong = Number(item?.anUong ?? item?.chiPhiAnUong ?? 0)
            const luuTru = Number(item?.luuTru ?? item?.chiPhiLuuTru ?? 0)
            const diChuyen = Number(item?.diChuyen ?? item?.chiPhiDiChuyen ?? 0)
            return tong + anUong + luuTru + diChuyen
        }, 0)
    }, [dsLichTrinh])

    const thongKeLoai = useMemo(() => {
        const ketQua: any[] = []
        dsDiemDen.forEach((item: any) => {
            const loai = item?.loai || 'Khác'
            const tim = ketQua.find((i: any) => i.loai === loai)
            if (tim) {
                tim.soLuong += 1
            } else {
                ketQua.push({ loai, soLuong: 1 })
            }
        })
        return ketQua
    }, [dsDiemDen])

    const dsPhoBien = useMemo(() => {
        const ketQua: any[] = []
        dsLichTrinh.forEach((item: any) => {
            const ten = item?.ten || item?.tenDiemDen || item?.diaDiem || 'Chưa rõ'
            const ma = item?.ma || item?.maDiemDen || ten
            const tim = ketQua.find((i: any) => i.ma === ma)
            if (tim) {
                tim.soLuot += 1
            } else {
                ketQua.push({ ma, ten, soLuot: 1 })
            }
        })
        return ketQua.sort((a: any, b: any) => b.soLuot - a.soLuot)
    }, [dsLichTrinh])

    const thongKeHangMuc = useMemo(() => {
        let anUong = 0
        let luuTru = 0
        let diChuyen = 0

        dsLichTrinh.forEach((item: any) => {
            anUong += Number(item?.anUong ?? item?.chiPhiAnUong ?? 0)
            luuTru += Number(item?.luuTru ?? item?.chiPhiLuuTru ?? 0)
            diChuyen += Number(item?.diChuyen ?? item?.chiPhiDiChuyen ?? 0)
        })

        return [
            { key: '1', hangMuc: 'Ăn uống', soTien: anUong },
            { key: '2', hangMuc: 'Lưu trú', soTien: luuTru },
            { key: '3', hangMuc: 'Di chuyển', soTien: diChuyen },
        ]
    }, [dsLichTrinh])

    const thongKeThang = useMemo(() => {
        const ketQua: any[] = []
        dsLichTrinh.forEach((item: any, index: number) => {
            const ngayRaw = item?.ngayTao || item?.createdAt || item?.ngay || new Date()
            const ngay = new Date(ngayRaw)
            const thang = `${String(ngay.getMonth() + 1).padStart(2, '0')}/${ngay.getFullYear()}`
            const tim = ketQua.find((i: any) => i.thang === thang)
            if (tim) {
                tim.soLuong += 1
            } else {
                ketQua.push({ key: `${thang}-${index}`, thang, soLuong: 1 })
            }
        })
        return ketQua.sort((a: any, b: any) => {
            const [ma, na] = a.thang.split('/').map(Number)
            const [mb, nb] = b.thang.split('/').map(Number)
            return nb * 100 + mb - (na * 100 + ma)
        })
    }, [dsLichTrinh])

    const cotDiemDen = [
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            key: 'hinhAnh',
            width: 90,
            render: (url: string) => (
                <img
                    src={url || 'https://via.placeholder.com/80x60?text=No+Image'}
                    alt="thumb"
                    style={{ width: 70, height: 50, objectFit: 'cover', borderRadius: 8 }}
                />
            ),
        },
        {
            title: 'Mã',
            dataIndex: 'ma',
            key: 'ma',
            width: 100,
        },
        {
            title: 'Tên điểm đến',
            dataIndex: 'ten',
            key: 'ten',
            width: 180,
        },
        {
            title: 'Địa điểm',
            dataIndex: 'diaDiem',
            key: 'diaDiem',
            width: 140,
        },
        {
            title: 'Loại',
            dataIndex: 'loai',
            key: 'loai',
            width: 120,
            render: (loai: string) => {
                let mau = 'blue'
                if (loai === 'Biển') mau = 'cyan'
                if (loai === 'Núi') mau = 'green'
                if (loai === 'Thành phố') mau = 'orange'
                return <Tag color={mau}>{loai}</Tag>
            },
        },
        {
            title: 'TG tham quan',
            dataIndex: 'thoiGianThamQuan',
            key: 'thoiGianThamQuan',
            width: 130,
            render: (val: number) => `${Number(val || 0)} giờ`,
            sorter: (a: any, b: any) =>
                Number(a?.thoiGianThamQuan || 0) - Number(b?.thoiGianThamQuan || 0),
        },
        {
            title: 'Ăn uống',
            dataIndex: 'chiPhiAnUong',
            key: 'chiPhiAnUong',
            width: 130,
            render: (val: number) => `${Number(val || 0).toLocaleString()}đ`,
            sorter: (a: any, b: any) =>
                Number(a?.chiPhiAnUong || 0) - Number(b?.chiPhiAnUong || 0),
        },
        {
            title: 'Lưu trú',
            dataIndex: 'chiPhiLuuTru',
            key: 'chiPhiLuuTru',
            width: 130,
            render: (val: number) => `${Number(val || 0).toLocaleString()}đ`,
            sorter: (a: any, b: any) =>
                Number(a?.chiPhiLuuTru || 0) - Number(b?.chiPhiLuuTru || 0),
        },
        {
            title: 'Di chuyển',
            dataIndex: 'chiPhiDiChuyen',
            key: 'chiPhiDiChuyen',
            width: 130,
            render: (val: number) => `${Number(val || 0).toLocaleString()}đ`,
            sorter: (a: any, b: any) =>
                Number(a?.chiPhiDiChuyen || 0) - Number(b?.chiPhiDiChuyen || 0),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            width: 100,
            render: (val: number) => Number(val || 0),
            sorter: (a: any, b: any) => Number(a?.rating || 0) - Number(b?.rating || 0),
        },
        {
            title: 'Thao tác',
            key: 'thaoTac',
            fixed: 'right' as const,
            width: 180,
            render: (_: any, r: any) => (
                <Space>
                    <Button
                        type="primary"
                        ghost
                        icon={<EditOutlined />}
                        onClick={() => {
                            setSua(r)
                            setMo(true)
                        }}
                    >
                        Sửa
                    </Button>
                    <Button danger icon={<DeleteOutlined />} onClick={() => xoa(r.ma)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ]

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng điểm đến"
                            value={dsDiemDen.length}
                            prefix={<EnvironmentOutlined />}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Lịch trình đã tạo"
                            value={dsLichTrinh.length}
                            prefix={<CalendarOutlined />}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <Statistic
                            title="Tổng tiền thu về"
                            value={tongTienThuVe}
                            suffix="VNĐ"
                            prefix={<DollarOutlined />}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        <div style={{ fontSize: 14, color: '#8c8c8c', marginBottom: 8 }}>
                            Địa điểm phổ biến nhất
                        </div>
                        <div style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.3 }}>
                            {dsPhoBien.length > 0 ? dsPhoBien[0].ten : 'Chưa có'}
                        </div>
                        <div style={{ marginTop: 8, color: '#1677ff', fontWeight: 500 }}>
                            {dsPhoBien.length > 0 ? `${dsPhoBien[0].soLuot} lượt` : '0 lượt'}
                        </div>
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card title="Thống kê loại hình điểm đến">
                        <Space direction="vertical" style={{ width: '100%' }} size="middle">
                            {thongKeLoai.length > 0 ? (
                                thongKeLoai.map((item: any, index: number) => (
                                    <div key={index}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: 6,
                                            }}
                                        >
                                            <Text strong>{item.loai}</Text>
                                            <Text>{item.soLuong} điểm đến</Text>
                                        </div>
                                        <Progress
                                            percent={Math.round(
                                                (item.soLuong / Math.max(dsDiemDen.length, 1)) * 100,
                                            )}
                                        />
                                    </div>
                                ))
                            ) : (
                                <Text type="secondary">Chưa có dữ liệu</Text>
                            )}
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Thống kê doanh thu theo hạng mục">
                        <Table
                            pagination={false}
                            size="small"
                            rowKey="key"
                            dataSource={thongKeHangMuc}
                            columns={[
                                {
                                    title: 'Hạng mục',
                                    dataIndex: 'hangMuc',
                                    key: 'hangMuc',
                                    render: (text: string) => <Text strong>{text}</Text>,
                                },
                                {
                                    title: 'Số tiền',
                                    dataIndex: 'soTien',
                                    key: 'soTien',
                                    render: (val: number) => `${Number(val || 0).toLocaleString()} VNĐ`,
                                },
                                {
                                    title: 'Tỷ lệ',
                                    key: 'tyLe',
                                    render: (_: any, record: any) => {
                                        const tyLe =
                                            tongTienThuVe > 0
                                                ? ((Number(record?.soTien || 0) / tongTienThuVe) * 100).toFixed(1)
                                                : '0.0'
                                        return `${tyLe}%`
                                    },
                                },
                            ]}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]}>
                <Col xs={24} lg={12}>
                    <Card title="Lịch trình được tạo theo tháng">
                        <Table
                            pagination={false}
                            size="small"
                            rowKey="key"
                            dataSource={thongKeThang}
                            columns={[
                                {
                                    title: 'Tháng',
                                    dataIndex: 'thang',
                                    key: 'thang',
                                },
                                {
                                    title: 'Số lịch trình',
                                    dataIndex: 'soLuong',
                                    key: 'soLuong',
                                    render: (val: number) => <Tag color="blue">{val}</Tag>,
                                },
                            ]}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card title="Top địa điểm phổ biến">
                        <Table
                            pagination={false}
                            size="small"
                            rowKey="ma"
                            dataSource={dsPhoBien.slice(0, 10)}
                            columns={[
                                {
                                    title: 'Tên địa điểm',
                                    dataIndex: 'ten',
                                    key: 'ten',
                                },
                                {
                                    title: 'Số lượt',
                                    dataIndex: 'soLuot',
                                    key: 'soLuot',
                                    render: (val: number) => (
                                        <Tag color="purple" icon={<RiseOutlined />}>
                                            {val}
                                        </Tag>
                                    ),
                                },
                            ]}
                        />
                    </Card>
                </Col>
            </Row>

            <Card
                title="Quản lý điểm đến"
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            setSua(null)
                            setMo(true)
                        }}
                    >
                        Thêm điểm đến
                    </Button>
                }
            >
                <Table
                    dataSource={dsDiemDen}
                    columns={cotDiemDen}
                    rowKey="ma"
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 1600 }}
                />
            </Card>

            <ModalDiemDen
                mo={mo}
                setMo={setMo}
                ds={dsDiemDen}
                setDs={setDsDiemDen}
                sua={sua}
            />
        </Space>
    )
}