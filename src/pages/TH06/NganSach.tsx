import React, { useState } from 'react'
import { Card, Statistic, Alert, Row, Col, Typography, Progress, Table, InputNumber } from 'antd'
import { PieChartOutlined } from '@ant-design/icons'
import { useDuLich } from './context'

const { Text } = Typography

export default function NganSach() {
    const { dsLichTrinh } = useDuLich()
    const [nganSachToiDa, setNganSachToiDa] = useState<any>(10000000)

    const chiPhi = (Array.isArray(dsLichTrinh) ? dsLichTrinh : []).reduce(
        (acc: any, item: any) => {
            acc.anUong += Number(item?.anUong || item?.chiPhiAnUong || 0)
            acc.luuTru += Number(item?.luuTru || item?.chiPhiLuuTru || 0)
            acc.diChuyen += Number(item?.diChuyen || item?.chiPhiDiChuyen || 0)
            return acc
        },
        { anUong: 0, luuTru: 0, diChuyen: 0 }
    )

    const tongTien = chiPhi.anUong + chiPhi.luuTru + chiPhi.diChuyen
    const phanTram = nganSachToiDa > 0 ? Math.min(Math.round((tongTien / nganSachToiDa) * 100), 100) : 0

    return (
        <div style={{ padding: 10 }}>
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={8}>
                    <Card title="Thiết lập ngân sách">
                        <div style={{ marginBottom: 16 }}>
                            <Text strong>Ngân sách tối đa (VNĐ)</Text>
                            <div style={{ marginTop: 8 }}>
                                <InputNumber
                                    min={0}
                                    value={nganSachToiDa}
                                    onChange={(v) => setNganSachToiDa(Number(v || 0))}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        </div>

                        <Statistic
                            title="Tổng chi phí lịch trình"
                            value={tongTien}
                            precision={0}
                            suffix="VNĐ"
                            prefix={<PieChartOutlined />}
                            valueStyle={{ color: tongTien > nganSachToiDa ? '#cf1322' : '#3f8600' }}
                        />

                        <div style={{ marginTop: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text strong>Tiến độ sử dụng</Text>
                                <Text>
                                    {tongTien.toLocaleString()} / {Number(nganSachToiDa || 0).toLocaleString()}
                                </Text>
                            </div>

                            <Progress
                                percent={phanTram}
                                status={tongTien > nganSachToiDa ? 'exception' : 'active'}
                            />
                        </div>

                        <div style={{ marginTop: 20 }}>
                            {tongTien > nganSachToiDa ? (
                                <Alert
                                    message="Cảnh báo vượt ngân sách"
                                    description={`Bạn đã vượt ${(tongTien - nganSachToiDa).toLocaleString()} VNĐ.`}
                                    type="error"
                                    showIcon
                                />
                            ) : (
                                <Alert
                                    message="Ngân sách hợp lệ"
                                    description="Lịch trình hiện vẫn nằm trong khả năng chi trả."
                                    type="success"
                                    showIcon
                                />
                            )}
                        </div>
                    </Card>
                </Col>

                <Col xs={24} lg={16}>
                    <Card title="Phân bổ chi phí">
                        <Table
                            pagination={false}
                            dataSource={[
                                { key: '1', hangMuc: 'Ăn uống', soTien: chiPhi.anUong },
                                { key: '2', hangMuc: 'Lưu trú', soTien: chiPhi.luuTru },
                                { key: '3', hangMuc: 'Di chuyển', soTien: chiPhi.diChuyen },
                            ]}
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
                                    render: (val: number) => <Text>{Number(val || 0).toLocaleString()} VNĐ</Text>,
                                },
                                {
                                    title: 'Tỷ lệ',
                                    key: 'tyLe',
                                    render: (_: any, record: any) => (
                                        <Text>
                                            {tongTien > 0 ? ((Number(record?.soTien || 0) / tongTien) * 100).toFixed(1) : 0}%
                                        </Text>
                                    ),
                                },
                            ]}
                            summary={() => (
                                <Table.Summary fixed>
                                    <Table.Summary.Row>
                                        <Table.Summary.Cell index={0}>
                                            <Text strong>Tổng cộng</Text>
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell index={1} colSpan={2}>
                                            <Text strong type="danger">
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