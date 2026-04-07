import React from 'react'
import { Card, Row, Col, Typography, Space, Button } from 'antd'
import { history } from 'umi'
import {
    EnvironmentOutlined,
    CalendarOutlined,
    DollarOutlined,
    SettingOutlined,
} from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography

export default function BaiTapDuLich() {
    const dsChucNang = [
        {
            tieuDe: 'Trang chủ',
            moTa: 'Khám phá các điểm đến nổi bật, xem thông tin, hình ảnh, đánh giá và lọc theo nhu cầu.',
            icon: <EnvironmentOutlined style={{ fontSize: 28 }} />,
            mau: '#1677ff',
            url: '/th06/trang-chu',
        },
        {
            tieuDe: 'Lịch trình',
            moTa: 'Lập kế hoạch du lịch theo ngày, thêm hoặc xóa địa điểm và tính toán thời gian di chuyển.',
            icon: <CalendarOutlined style={{ fontSize: 28 }} />,
            mau: '#52c41a',
            url: '/th06/lich-trinh',
        },
        {
            tieuDe: 'Ngân sách',
            moTa: 'Theo dõi chi phí ăn uống, lưu trú, di chuyển và kiểm soát tổng ngân sách chuyến đi.',
            icon: <DollarOutlined style={{ fontSize: 28 }} />,
            mau: '#fa8c16',
            url: '/th06/ngan-sach',
        },
        {
            tieuDe: 'Admin',
            moTa: 'Quản lý điểm đến, chỉnh sửa dữ liệu, cập nhật thông tin và xem thống kê hệ thống.',
            icon: <SettingOutlined style={{ fontSize: 28 }} />,
            mau: '#722ed1',
            url: '/th06/admin',
        },
    ]

    return (
        <div style={{ padding: 16 }}>
            <Card bordered={false}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                        <Title level={2} style={{ marginBottom: 8 }}>
                            TH06 - Ứng dụng lập kế hoạch du lịch
                        </Title>
                        <Paragraph style={{ fontSize: 16, marginBottom: 0 }}>
                            Hệ thống hỗ trợ khám phá điểm đến, xây dựng lịch trình, quản lý ngân sách và quản trị dữ liệu du lịch.
                        </Paragraph>
                    </div>

                    <Row gutter={[16, 16]}>
                        {dsChucNang.map((item, index) => (
                            <Col xs={24} sm={12} lg={12} xl={6} key={index}>
                                <Card
                                    hoverable
                                    style={{
                                        height: '100%',
                                        borderRadius: 12,
                                    }}
                                    bodyStyle={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        minHeight: 250,
                                    }}
                                >
                                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                        <div
                                            style={{
                                                width: 56,
                                                height: 56,
                                                borderRadius: 14,
                                                background: `${item.mau}15`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: item.mau,
                                            }}
                                        >
                                            {item.icon}
                                        </div>

                                        <div>
                                            <Title level={4} style={{ marginBottom: 8 }}>
                                                {item.tieuDe}
                                            </Title>
                                            <Text type="secondary">{item.moTa}</Text>
                                        </div>
                                    </Space>

                                    <Button
                                        type="primary"
                                        block
                                        style={{ marginTop: 24 }}
                                        onClick={() => history.push(item.url)}
                                    >
                                        Mở chức năng
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Space>
            </Card>
        </div>
    )
}