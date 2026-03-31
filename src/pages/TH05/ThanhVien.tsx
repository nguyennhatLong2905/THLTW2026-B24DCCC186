import { useEffect, useState } from 'react'
import { Card, Table, Select, Button, Space, message, Typography, Row, Col } from 'antd'
import { ArrowLeftOutlined, SwapOutlined, TeamOutlined } from '@ant-design/icons'
import { dsCauLacBoMacDinh, dsDonMacDinh } from './duLieu'

const { Option } = Select
const { Title, Text } = Typography

export default function ThanhVien() {
    const [dsCauLacBo, setDsCauLacBo] = useState<any[]>([])
    const [dsDonDangKy, setDsDonDangKy] = useState<any[]>([])
    const [clbLoc, setClbLoc] = useState<any>(undefined)
    const [chonNhieu, setChonNhieu] = useState<any[]>([])
    const [view, setView] = useState<'list' | 'change'>('list')
    const [clbMoi, setClbMoi] = useState<any>(undefined)
    const [recordDon, setRecordDon] = useState<any>(null)

    useEffect(() => {
        const clb = localStorage.getItem('dsCauLacBo')
        const don = localStorage.getItem('dsDonDangKy')
        if (clb) setDsCauLacBo(JSON.parse(clb))
        else {
            localStorage.setItem('dsCauLacBo', JSON.stringify(dsCauLacBoMacDinh))
            setDsCauLacBo(dsCauLacBoMacDinh)
        }
        if (don) setDsDonDangKy(JSON.parse(don))
        else {
            localStorage.setItem('dsDonDangKy', JSON.stringify(dsDonMacDinh))
            setDsDonDangKy(dsDonMacDinh)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('dsDonDangKy', JSON.stringify(dsDonDangKy))
    }, [dsDonDangKy])

    const layTenClb = (id: number) => dsCauLacBo.find(i => i.id === id)?.ten || '---'

    const dsThanhVien = dsDonDangKy.filter(i =>
        i.trangThai === 'Approved' &&
        (!clbLoc || i.cauLacBoId === clbLoc)
    )

    const moChuyen1Nguoi = (record: any) => {
        setRecordDon(record)
        setClbMoi(undefined)
        setView('change')
    }

    const moChuyenNhieu = () => {
        if (chonNhieu.length === 0) {
            message.warning('Vui lòng chọn ít nhất 1 thành viên từ danh sách')
            return
        }
        setRecordDon(null)
        setClbMoi(undefined)
        setView('change')
    }

    const xacNhanChuyen = () => {
        if (!clbMoi) {
            message.error('Vui lòng chọn câu lạc bộ đích')
            return
        }
        if (recordDon) {
            const dsMoi = dsDonDangKy.map(i =>
                i.id === recordDon.id ? { ...i, cauLacBoId: clbMoi } : i
            )
            setDsDonDangKy(dsMoi)
            message.success(`Đã chuyển ${recordDon.hoTen} sang CLB mới`)
        } else {
            const dsMoi = dsDonDangKy.map(i =>
                chonNhieu.includes(i.id) ? { ...i, cauLacBoId: clbMoi } : i
            )
            setDsDonDangKy(dsMoi)
            message.success(`Đã chuyển ${chonNhieu.length} thành viên thành công`)
            setChonNhieu([])
        }
        setView('list')
    }

    if (view === 'change') {
        return (
            <div style={{ padding: 20 }}>
                <Card 
                    title={
                        <Space>
                            <SwapOutlined />
                            <span>Điều chuyển sinh viên giữa các câu lạc bộ</span>
                        </Space>
                    } 
                    extra={<Button icon={<ArrowLeftOutlined />} onClick={() => setView('list')}>Quay lại</Button>}
                >
                    <div style={{ maxWidth: 600, margin: '0 auto', padding: '20px 0' }}>
                        <Title level={4}>
                            {recordDon ? `Thành viên: ${recordDon.hoTen}` : `Đang chọn: ${chonNhieu.length} thành viên`}
                        </Title>
                        <Text type="secondary">Vui lòng chọn câu lạc bộ mới để thực hiện việc chuyển đổi dữ liệu hệ thống.</Text>
                        
                        <div style={{ marginTop: 30 }}>
                            <Text strong>Chọn câu lạc bộ đích:</Text>
                            <Select
                                size="large"
                                style={{ width: '100%', marginTop: 10 }}
                                placeholder="-- Chọn câu lạc bộ muốn chuyển đến --"
                                value={clbMoi}
                                onChange={setClbMoi}
                            >
                                {dsCauLacBo.map(i => (
                                    <Option key={i.id} value={i.id} disabled={recordDon && i.id === recordDon.cauLacBoId}>
                                        {i.ten} {recordDon && i.id === recordDon.cauLacBoId ? '(Hiện tại)' : ''}
                                    </Option>
                                ))}
                            </Select>
                        </div>

                        <Row gutter={16} style={{ marginTop: 40 }}>
                            <Col span={12}>
                                <Button block size="large" onClick={() => setView('list')}>Hủy bỏ</Button>
                            </Col>
                            <Col span={12}>
                                <Button block size="large" type="primary" icon={<SwapOutlined />} onClick={xacNhanChuyen}>Xác nhận chuyển</Button>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div style={{ padding: 20 }}>
            <Card
                title={
                    <Space>
                        <TeamOutlined />
                        <span>Quản lý thành viên câu lạc bộ</span>
                    </Space>
                }
                extra={
                    <Space wrap>
                        <Select
                            style={{ width: 220 }}
                            placeholder="Lọc theo CLB"
                            allowClear
                            value={clbLoc}
                            onChange={setClbLoc}
                        >
                            {dsCauLacBo.map(i => <Option key={i.id} value={i.id}>{i.ten}</Option>)}
                        </Select>
                        <Button 
                            type="primary" 
                            danger={chonNhieu.length > 0}
                            icon={<SwapOutlined />} 
                            onClick={moChuyenNhieu}
                        >
                            Chuyển CLB {chonNhieu.length > 0 ? `(${chonNhieu.length})` : 'nhiều người'}
                        </Button>
                    </Space>
                }
            >
                <Table
                    rowKey="id"
                    dataSource={dsThanhVien}
                    rowSelection={{
                        selectedRowKeys: chonNhieu,
                        onChange: (keys) => setChonNhieu(keys as any[])
                    }}
                    pagination={{ pageSize: 10 }}
                    columns={[
                        { title: 'Họ tên', dataIndex: 'hoTen', sorter: (a, b) => a.hoTen.localeCompare(b.hoTen) },
                        { title: 'Email', dataIndex: 'email' },
                        { title: 'SĐT', dataIndex: 'sdt' },
                        { title: 'Giới tính', dataIndex: 'gioiTinh', filters: [{ text: 'Nam', value: 'Nam' }, { text: 'Nữ', value: 'Nữ' }], onFilter: (v, r) => r.gioiTinh === v },
                        { title: 'Địa chỉ', dataIndex: 'diaChi', ellipsis: true },
                        { title: 'Sở trường', dataIndex: 'soTruong', ellipsis: true },
                        {
                            title: 'Câu lạc bộ hiện tại',
                            dataIndex: 'cauLacBoId',
                            render: (v) => <Text strong style={{ color: '#1890ff' }}>{layTenClb(v)}</Text>
                        },
                        {
                            title: 'Thao tác',
                            width: 120,
                            render: (r) => (
                                <Button size="small" type="primary" ghost icon={<SwapOutlined />} onClick={() => moChuyen1Nguoi(r)}>
                                    Đổi CLB
                                </Button>
                            )
                        }
                    ]}
                />
            </Card>
        </div>
    )
}