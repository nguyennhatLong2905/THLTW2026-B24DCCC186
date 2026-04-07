import { useMemo, useState } from 'react'
import { Card, Statistic, Alert, Row, Col, Typography, Progress, Table, InputNumber, Space, Tag, Tooltip } from 'antd'
import { AlertOutlined, CheckCircleOutlined, DollarOutlined } from '@ant-design/icons'
import { useDuLich } from './context'

const { Text } = Typography

export default function NganSach() {
    const { dsLichTrinh } = useDuLich()
    const [nganSachToiDa, setNganSachToiDa] = useState<any>(10000000)

    const chiPhi = useMemo(() => {
        return (Array.isArray(dsLichTrinh) ? dsLichTrinh : []).reduce(
            (acc: any, item: any) => {
                acc.anUong += Number(item?.anUong || item?.chiPhiAnUong || 0)
                acc.luuTru += Number(item?.luuTru || item?.chiPhiLuuTru || 0)
                acc.diChuyen += Number(item?.diChuyen || item?.chiPhiDiChuyen || 0)
                return acc
            },
            { anUong: 0, luuTru: 0, diChuyen: 0 }
        )
    }, [dsLichTrinh])

    const tongTien = useMemo(() => chiPhi.anUong + chiPhi.luuTru + chiPhi.diChuyen, [chiPhi])
    
    const phanTram = useMemo(() => {
        return nganSachToiDa > 0 ? Math.min(Math.round((tongTien / nganSachToiDa) * 100), 100) : 0
    }, [tongTien, nganSachToiDa])

    const soTienConLai = useMemo(() => {
        return Math.max(nganSachToiDa - tongTien, 0)
    }, [nganSachToiDa, tongTien])

    const trangThai = useMemo(() => {
        if (tongTien > nganSachToiDa) return 'vượt'
        if (tongTien > nganSachToiDa * 0.8) return 'canh-bao'
        return 'ok'
    }, [tongTien, nganSachToiDa])

    const chiPhiTable = useMemo(() => [
        { key: '1', hangMuc: 'Ăn uống', soTien: chiPhi.anUong, icon: '🍽️' },
        { key: '2', hangMuc: 'Lưu trú', soTien: chiPhi.luuTru, icon: '🏨' },
        { key: '3', hangMuc: 'Di chuyển', soTien: chiPhi.diChuyen, icon: '🚗' },
    ], [chiPhi])

    return (
        <div style={{ padding: '16px' }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={8}>
                    <Card title="Thiết lập ngân sách" bordered={false}>
                        <Space direction="vertical" style={{ width: '100%' }} size="large">
                            <div>
                                <Text strong style={{ fontSize: 14 }}>Ngân sách tối đa (VNĐ)</Text>
                                <div style={{ marginTop: 8 }}>
                                    <InputNumber
                                        min={0}
                                        value={nganSachToiDa}
                                        onChange={(v) => setNganSachToiDa(Number(v || 0))}
                                        style={{ width: '100%' }}
                                        formatter={(value) => `${Number(value || 0).toLocaleString()}`}
                                        parser={(value) => Number(value?.replace(/\D/g, '')) || 0}
                                    />
                                </div>
                            </div>

                            <div style={{ 
                                padding: '12px', 
                                background: '#f6f8fb', 
                                borderRadius: '8px',
                                border: '1px solid #e6f7ff'
                            }}>
                                <Statistic
                                    title="Tổng chi phí lịch trình"
                                    value={tongTien}
                                    precision={0}
                                    suffix="VNĐ"
                                    prefix={<DollarOutlined />}
                                    valueStyle={{ 
                                        color: trangThai === 'vượt' ? '#cf1322' : (trangThai === 'canh-bao' ? '#faad14' : '#3f8600'),
                                        fontSize: '20px'
                                    }}
                                />
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <Text strong>Tiến độ sử dụng</Text>
                                    <Text type={trangThai === 'ok' ? 'success' : 'danger'}>
                                        {phanTram}%
                                    </Text>
                                </div>
                                <Progress
                                    percent={phanTram}
                                    status={trangThai === 'vượt' ? 'exception' : (trangThai === 'canh-bao' ? 'active' : 'success')}
                                    strokeColor={trangThai === 'ok' ? '#52c41a' : (trangThai === 'canh-bao' ? '#faad14' : '#ff4d4f')}
                                />
                                <div style={{ marginTop: 8, fontSize: 12, color: '#666', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Chi tiêu: {tongTien.toLocaleString()} VNĐ</span>
                                    <span>Còn lại: {soTienConLai.toLocaleString()} VNĐ</span>
                                </div>
                            </div>

                            {trangThai === 'vượt' ? (
                                <Alert
                                    message="Vượt ngân sách"
                                    description={`Bạn đã vượt ${(tongTien - nganSachToiDa).toLocaleString()} VNĐ (${((tongTien - nganSachToiDa) / nganSachToiDa * 100).toFixed(1)}%)`}
                                    type="error"
                                    icon={<AlertOutlined />}
                                    showIcon
                                />
                            ) : trangThai === 'canh-bao' ? (
                                <Alert
                                    message="Cảnh báo ngân sách"
                                    description={`Đã sử dụng ${phanTram}% ngân sách. Còn ${soTienConLai.toLocaleString()} VNĐ`}
                                    type="warning"
                                    showIcon
                                />
                            ) : (
                                <Alert
                                    message="Ngân sách hợp lệ"
                                    description={`Lịch trình nằm trong khả năng chi trả. Còn ${soTienConLai.toLocaleString()} VNĐ`}
                                    type="success"
                                    icon={<CheckCircleOutlined />}
                                    showIcon
                                />
                            )}
                        </Space>
                    </Card>
                </Col>

                <Col xs={24} lg={16}>
                    <Card title="Phân bổ chi phí chi tiết" bordered={false}>
                        <Table
                            pagination={false}
                            size="small"
                            dataSource={chiPhiTable}
                            columns={[
                                {
                                    title: 'Hạng mục',
                                    dataIndex: 'hangMuc',
                                    key: 'hangMuc',
                                    width: '25%',
                                    render: (text: string) => <Text strong>{text}</Text>,
                                },
                                {
                                    title: 'Số tiền',
                                    dataIndex: 'soTien',
                                    key: 'soTien',
                                    width: '30%',
                                    render: (val: number) => (
                                        <Text strong style={{ color: val > 0 ? '#1890ff' : '#8c8c8c' }}>
                                            {Number(val || 0).toLocaleString()} VNĐ
                                        </Text>
                                    ),
                                },
                                {
                                    title: 'Tỷ lệ',
                                    key: 'tyLe',
                                    width: '20%',
                                    render: (_: any, record: any) => {
                                        const tyLe = tongTien > 0 ? ((Number(record?.soTien || 0) / tongTien) * 100).toFixed(1) : 0
                                        return (
                                            <Tag color="blue">
                                                {tyLe}%
                                            </Tag>
                                        )
                                    },
                                },
                                {
                                    title: 'So với ngân sách',
                                    key: 'soVoiNganSach',
                                    width: '25%',
                                    render: (_: any, record: any) => {
                                        const tyLe = nganSachToiDa > 0 ? ((Number(record?.soTien || 0) / nganSachToiDa) * 100).toFixed(1) : 0
                                        return (
                                            <Tooltip title={`${tyLe}% ngân sách tối đa`}>
                                                <Progress type="circle" percent={Number(tyLe)} width={40} />
                                            </Tooltip>
                                        )
                                    },
                                },
                            ]}
                            summary={() => (
                                <Table.Summary fixed>
                                    <Table.Summary.Row style={{ background: '#fafafa' }}>
                                        <Table.Summary.Cell index={0}>
                                            <Text strong>Tổng cộng</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1} colSpan={3}>
                                            <Text strong type="danger" style={{ fontSize: 14 }}>
                                                {tongTien.toLocaleString()} VNĐ
                                            </Text>
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}