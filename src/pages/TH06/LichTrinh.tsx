import React from 'react'
import { Card, Row, Col, Select, Button, Table, Space, Typography, Popconfirm, Empty, Statistic } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useDuLich } from './context'

const { Option } = Select
const { Text } = Typography

export default function LichTrinh() {
    const { dsDiemDen, dsLichTrinh, setDsLichTrinh } = useDuLich()
    const [chonMa, setChonMa] = React.useState<string>('')

    const themVaoLichTrinh = () => {
        const diem = (Array.isArray(dsDiemDen) ? dsDiemDen : []).find((i: any) => i.ma === chonMa)
        if (!diem) return

        const itemMoi = {
            ...diem,
            idLichTrinh: `${diem.ma}-${Date.now()}`,
            ngayTao: new Date().toISOString(),
        }

        setDsLichTrinh([...(Array.isArray(dsLichTrinh) ? dsLichTrinh : []), itemMoi])
        setChonMa('')
    }

    const xoaKhoiLichTrinh = (id: string) => {
        setDsLichTrinh((Array.isArray(dsLichTrinh) ? dsLichTrinh : []).filter((item: any) => item.idLichTrinh !== id))
    }

    const tongNganSach = (Array.isArray(dsLichTrinh) ? dsLichTrinh : []).reduce((sum: number, item: any) => {
        return sum + Number(item?.chiPhiAnUong || 0) + Number(item?.chiPhiLuuTru || 0) + Number(item?.chiPhiDiChuyen || 0)
    }, 0)

    const tongThoiGian = (Array.isArray(dsLichTrinh) ? dsLichTrinh : []).reduce((sum: number, item: any) => {
        return sum + Number(item?.thoiGianThamQuan || 0)
    }, 0)

    const cot = [
        {
            title: 'Tên điểm đến',
            dataIndex: 'ten',
            key: 'ten',
        },
        {
            title: 'Địa điểm',
            dataIndex: 'diaDiem',
            key: 'diaDiem',
        },
        {
            title: 'Loại',
            dataIndex: 'loai',
            key: 'loai',
        },
        {
            title: 'Thời gian',
            dataIndex: 'thoiGianThamQuan',
            key: 'thoiGianThamQuan',
            render: (val: number) => `${Number(val || 0)} giờ`,
        },
        {
            title: 'Chi phí',
            key: 'chiPhi',
            render: (_: any, record: any) => {
                const tong =
                    Number(record?.chiPhiAnUong || 0) +
                    Number(record?.chiPhiLuuTru || 0) +
                    Number(record?.chiPhiDiChuyen || 0)
                return `${tong.toLocaleString()} VNĐ`
            },
        },
        {
            title: 'Thao tác',
            key: 'thaoTac',
            render: (_: any, record: any) => (
                <Popconfirm title="Xóa điểm đến này khỏi lịch trình?" onConfirm={() => xoaKhoiLichTrinh(record.idLichTrinh)}>
                    <Button danger icon={<DeleteOutlined />}>
                        Xóa
                    </Button>
                </Popconfirm>
            ),
        },
    ]

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Card title="Tạo lịch trình du lịch">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={18}>
                        <Select
                            value={chonMa}
                            onChange={setChonMa}
                            placeholder="Chọn điểm đến để thêm vào lịch trình"
                            style={{ width: '100%' }}
                            showSearch
                            optionFilterProp="children"
                        >
                            {(Array.isArray(dsDiemDen) ? dsDiemDen : []).map((item: any) => (
                                <Option key={item.ma} value={item.ma}>
                                    {item.ten} - {item.diaDiem}
                                </Option>
                            ))}
                        </Select>
                    </Col>

                    <Col xs={24} md={6}>
                        <Button type="primary" icon={<PlusOutlined />} block onClick={themVaoLichTrinh}>
                            Thêm vào lịch trình
                        </Button>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card>
                        <Statistic title="Tổng ngân sách dự kiến" value={tongNganSach} suffix="VNĐ" />
                    </Card>
                </Col>

                <Col xs={24} md={12}>
                    <Card>
                        <Statistic title="Tổng thời gian tham quan" value={tongThoiGian} suffix="giờ" />
                    </Card>
                </Col>
            </Row>

            <Card title="Danh sách lịch trình đã chọn">
                {(Array.isArray(dsLichTrinh) ? dsLichTrinh : []).length > 0 ? (
                    <Table
                        rowKey="idLichTrinh"
                        dataSource={dsLichTrinh}
                        columns={cot}
                        pagination={{ pageSize: 5 }}
                        scroll={{ x: true }}
                    />
                ) : (
                    <Empty description="Chưa có điểm đến nào trong lịch trình" />
                )}
            </Card>
        </Space>
    )
}