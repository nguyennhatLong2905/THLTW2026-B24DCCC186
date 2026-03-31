import { useEffect, useState } from 'react'
import { Card, Row, Col, Statistic, Table, Progress, Typography, Space } from 'antd'
import { PieChartOutlined, BarChartOutlined, ApartmentOutlined } from '@ant-design/icons'
import { dsCauLacBoMacDinh, dsDonMacDinh } from './duLieu'

const { Title, Text } = Typography

export default function BaoCao() {
    const [dsCauLacBo, setDsCauLacBo] = useState<any[]>([])
    const [dsDonDangKy, setDsDonDangKy] = useState<any[]>([])

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

    const soPending = dsDonDangKy.filter(i => i.trangThai === 'Pending').length
    const soApproved = dsDonDangKy.filter(i => i.trangThai === 'Approved').length
    const soRejected = dsDonDangKy.filter(i => i.trangThai === 'Rejected').length
    const tong = dsDonDangKy.length || 1

    const duLieuThongKe = dsCauLacBo.map(clb => {
        const dsTheoClb = dsDonDangKy.filter(i => i.cauLacBoId === clb.id)
        const pending = dsTheoClb.filter(i => i.trangThai === 'Pending').length
        const approved = dsTheoClb.filter(i => i.trangThai === 'Approved').length
        const rejected = dsTheoClb.filter(i => i.trangThai === 'Rejected').length
        const tongClb = dsTheoClb.length || 1

        return {
            id: clb.id,
            ten: clb.ten,
            pending,
            approved,
            rejected,
            tong: dsTheoClb.length,
            pendingTiLe: Math.round((pending / tongClb) * 100),
            approvedTiLe: Math.round((approved / tongClb) * 100),
            rejectedTiLe: Math.round((rejected / tongClb) * 100),
        }
    })

    return (
        <div style={{ padding: 20 }}>
            <Title level={3}>Báo cáo & Thống kê hệ thống</Title>
            
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <Statistic 
                            title="Tổng số câu lạc bộ" 
                            value={dsCauLacBo.length} 
                            prefix={<ApartmentOutlined style={{ color: '#1890ff' }} />} 
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <Statistic 
                            title="Đơn đang chờ (Pending)" 
                            value={soPending} 
                            valueStyle={{ color: '#faad14' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <Statistic 
                            title="Đơn đã duyệt (Approved)" 
                            value={soApproved} 
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                        <Statistic 
                            title="Đơn từ chối (Rejected)" 
                            value={soRejected} 
                            valueStyle={{ color: '#ff4d4f' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Card 
                title={<Space><PieChartOutlined /><span>Tỷ lệ trạng thái đơn tổng quan</span></Space>} 
                style={{ marginTop: 20, borderRadius: 8 }}
            >
                <Row gutter={[32, 16]}>
                    <Col xs={24} md={8}>
                        <Text strong>Pending ({soPending})</Text>
                        <Progress percent={Math.round((soPending / tong) * 100)} status="active" strokeColor="#faad14" />
                    </Col>
                    <Col xs={24} md={8}>
                        <Text strong>Approved ({soApproved})</Text>
                        <Progress percent={Math.round((soApproved / tong) * 100)} strokeColor="#52c41a" />
                    </Col>
                    <Col xs={24} md={8}>
                        <Text strong>Rejected ({soRejected})</Text>
                        <Progress percent={Math.round((soRejected / tong) * 100)} status="exception" strokeColor="#ff4d4f" />
                    </Col>
                </Row>
            </Card>

            <Card 
                title={<Space><BarChartOutlined /><span>Thống kê chi tiết theo từng Câu lạc bộ</span></Space>} 
                style={{ marginTop: 20, borderRadius: 8 }}
            >
                <Table
                    rowKey="id"
                    dataSource={duLieuThongKe}
                    pagination={false}
                    bordered
                    columns={[
                        { 
                            title: 'Tên CLB', 
                            dataIndex: 'ten', 
                            key: 'ten',
                            render: (text) => <Text strong>{text}</Text>
                        },
                        { 
                            title: 'Chi tiết số lượng',
                            children: [
                                { title: 'P', dataIndex: 'pending', align: 'center' },
                                { title: 'A', dataIndex: 'approved', align: 'center' },
                                { title: 'R', dataIndex: 'rejected', align: 'center' },
                                { title: 'Tổng', dataIndex: 'tong', align: 'center', render: (v) => <Text strong>{v}</Text> }
                            ]
                        },
                        {
                            title: 'Biểu đồ tỷ lệ (%)',
                            key: 'bieuDo',
                            width: '40%',
                            render: (r) => (
                                <div style={{ padding: '8px 0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                                        <span>Pending</span>
                                        <span>{r.pendingTiLe}%</span>
                                    </div>
                                    <Progress percent={r.pendingTiLe} size="small" strokeColor="#faad14" showInfo={false} />
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: 8 }}>
                                        <span>Approved</span>
                                        <span>{r.approvedTiLe}%</span>
                                    </div>
                                    <Progress percent={r.approvedTiLe} size="small" strokeColor="#52c41a" showInfo={false} />
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginTop: 8 }}>
                                        <span>Rejected</span>
                                        <span>{r.rejectedTiLe}%</span>
                                    </div>
                                    <Progress percent={r.rejectedTiLe} size="small" strokeColor="#ff4d4f" showInfo={false} />
                                </div>
                            )
                        }
                    ]}
                />
            </Card>
        </div>
    )
}