import { Modal, Typography, Divider, Row, Col, Rate, Tag, Space, Button } from 'antd'
import { ClockCircleOutlined, EnvironmentOutlined, DollarOutlined, StarOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

export default function ModalChiTiet({ data, setData, themLichTrinh }: any) {
    const anUong = Number(data?.anUong || data?.chiPhiAnUong || 0)
    const luuTru = Number(data?.luuTru || data?.chiPhiLuuTru || 0)
    const diChuyen = Number(data?.diChuyen || data?.chiPhiDiChuyen || 0)
    const thoiGian = Number(data?.thoiGian || data?.thoiGianThamQuan || 0)
    const tongTien = anUong + luuTru + diChuyen

    return (
        <Modal
            visible={!!data}
            onCancel={() => setData(null)}
            footer={null}
            width={850}
            centered
            bodyStyle={{ padding: 0 }}
        >
            {data && (
                <div>
                    <div style={{ width: '100%', height: 320, overflow: 'hidden', background: '#f5f5f5' }}>
                        {data.hinhAnh ? (
                            <img
                                src={data.hinhAnh}
                                alt={data.ten}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#999',
                                    fontSize: 18
                                }}
                            >
                                Chưa có hình ảnh
                            </div>
                        )}
                    </div>

                    <div style={{ padding: 24 }}>
                        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    gap: 16,
                                    flexWrap: 'wrap'
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <Title level={2} style={{ marginBottom: 8 }}>
                                        {data.ten}
                                    </Title>

                                    <Space wrap size="middle">
                                        <Text type="secondary">
                                            <EnvironmentOutlined /> {data.diaDiem}
                                        </Text>

                                        <Tag color="blue">{data.loai}</Tag>

                                        <Text>
                                            <StarOutlined /> {Number(data.rating || 0).toFixed(1)}/5
                                        </Text>
                                    </Space>
                                </div>

                                {themLichTrinh && (
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            themLichTrinh(data)
                                            setData(null)
                                        }}
                                    >
                                        Thêm vào lịch trình
                                    </Button>
                                )}
                            </div>

                            <Rate disabled value={Number(data.rating || 0)} allowHalf />

                            <Divider style={{ margin: '8px 0' }} />

                            <div>
                                <Title level={4}>Mô tả điểm đến</Title>
                                <Paragraph style={{ textAlign: 'justify', marginBottom: 0 }}>
                                    {data.moTa || 'Chưa có mô tả'}
                                </Paragraph>
                            </div>

                            <Divider style={{ margin: '8px 0' }} />

                            <Row gutter={[16, 16]}>
                                <Col xs={24} md={12}>
                                    <div
                                        style={{
                                            border: '1px solid #f0f0f0',
                                            borderRadius: 10,
                                            padding: 16,
                                            height: '100%'
                                        }}
                                    >
                                        <Space direction="vertical" size="small">
                                            <Text strong>
                                                <ClockCircleOutlined /> Thời gian tham quan dự kiến
                                            </Text>
                                            <Text style={{ fontSize: 18 }}>
                                                {thoiGian} giờ
                                            </Text>
                                        </Space>
                                    </div>
                                </Col>

                                <Col xs={24} md={12}>
                                    <div
                                        style={{
                                            border: '1px solid #f0f0f0',
                                            borderRadius: 10,
                                            padding: 16,
                                            height: '100%'
                                        }}
                                    >
                                        <Space direction="vertical" size="small">
                                            <Text strong>
                                                <DollarOutlined /> Tổng chi phí dự tính
                                            </Text>
                                            <Text strong style={{ fontSize: 20, color: '#cf1322' }}>
                                                {tongTien.toLocaleString()} VNĐ
                                            </Text>
                                        </Space>
                                    </div>
                                </Col>
                            </Row>

                            <div
                                style={{
                                    marginTop: 8,
                                    background: '#fafafa',
                                    border: '1px solid #f0f0f0',
                                    borderRadius: 10,
                                    padding: 18
                                }}
                            >
                                <Title level={5} style={{ marginBottom: 16 }}>
                                    Phân bổ chi phí
                                </Title>

                                <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={8}>
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                padding: 14,
                                                borderRadius: 8,
                                                background: '#fff',
                                                border: '1px solid #f0f0f0'
                                            }}
                                        >
                                            <Text type="secondary">Ăn uống</Text>
                                            <div style={{ marginTop: 8, fontWeight: 600 }}>
                                                {anUong.toLocaleString()} VNĐ
                                            </div>
                                        </div>
                                    </Col>

                                    <Col xs={24} sm={8}>
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                padding: 14,
                                                borderRadius: 8,
                                                background: '#fff',
                                                border: '1px solid #f0f0f0'
                                            }}
                                        >
                                            <Text type="secondary">Lưu trú</Text>
                                            <div style={{ marginTop: 8, fontWeight: 600 }}>
                                                {luuTru.toLocaleString()} VNĐ
                                            </div>
                                        </div>
                                    </Col>

                                    <Col xs={24} sm={8}>
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                padding: 14,
                                                borderRadius: 8,
                                                background: '#fff',
                                                border: '1px solid #f0f0f0'
                                            }}
                                        >
                                            <Text type="secondary">Di chuyển</Text>
                                            <div style={{ marginTop: 8, fontWeight: 600 }}>
                                                {diChuyen.toLocaleString()} VNĐ
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Space>
                    </div>
                </div>
            )}
        </Modal>
    )
}