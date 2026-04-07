import React, { useMemo, useState } from 'react'
import { Row, Col, Card, Select, Input, Rate, Typography, Button, Tag, Empty } from 'antd'
import { EnvironmentOutlined, EyeOutlined } from '@ant-design/icons'
import ModalChiTiet from './ModalChiTiet'
import { useDuLich } from './context'

const { Text, Paragraph } = Typography
const { Option } = Select
const { Search } = Input

export default function TrangChu() {
    const { dsDiemDen } = useDuLich()
    const [loai, setLoai] = useState<string>('')
    const [sapXep, setSapXep] = useState<string>('')
    const [tuKhoa, setTuKhoa] = useState<string>('')
    const [xem, setXem] = useState<any>(null)

    const filteredData = useMemo(() => {
        const ds = Array.isArray(dsDiemDen) ? dsDiemDen : []
        return ds.filter((i: any) => {
            const hopLoai = !loai || i?.loai === loai
            const text = `${i?.ten || ''} ${i?.diaDiem || ''}`.toLowerCase()
            const hopTuKhoa = !tuKhoa || text.includes(tuKhoa.toLowerCase())
            return hopLoai && hopTuKhoa
        })
    }, [dsDiemDen, loai, tuKhoa])

    const sortedData = useMemo(() => {
        const ds = [...filteredData]
        ds.sort((a: any, b: any) => {
            const giaA = Number(a?.chiPhiAnUong || 0) + Number(a?.chiPhiLuuTru || 0) + Number(a?.chiPhiDiChuyen || 0)
            const giaB = Number(b?.chiPhiAnUong || 0) + Number(b?.chiPhiLuuTru || 0) + Number(b?.chiPhiDiChuyen || 0)

            if (sapXep === 'giaTang') return giaA - giaB
            if (sapXep === 'giaGiam') return giaB - giaA
            if (sapXep === 'ratingGiam') return Number(b?.rating || 0) - Number(a?.rating || 0)
            if (sapXep === 'ratingTang') return Number(a?.rating || 0) - Number(b?.rating || 0)
            return 0
        })
        return ds
    }, [filteredData, sapXep])

    return (
        <div>
            <Card style={{ marginBottom: 16 }}>
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <Search
                            placeholder="Tìm theo tên hoặc địa điểm"
                            allowClear
                            onChange={(e) => setTuKhoa(e.target.value)}
                        />
                    </Col>

                    <Col xs={24} md={8}>
                        <Select
                            value={loai}
                            onChange={setLoai}
                            style={{ width: '100%' }}
                            placeholder="Chọn loại hình"
                        >
                            <Option value="">Tất cả loại hình</Option>
                            <Option value="Biển">Biển</Option>
                            <Option value="Núi">Núi</Option>
                            <Option value="Thành phố">Thành phố</Option>
                        </Select>
                    </Col>

                    <Col xs={24} md={8}>
                        <Select
                            value={sapXep}
                            onChange={setSapXep}
                            style={{ width: '100%' }}
                            placeholder="Sắp xếp"
                        >
                            <Option value="">Mặc định</Option>
                            <Option value="giaTang">Giá tăng dần</Option>
                            <Option value="giaGiam">Giá giảm dần</Option>
                            <Option value="ratingGiam">Đánh giá cao nhất</Option>
                            <Option value="ratingTang">Đánh giá thấp nhất</Option>
                        </Select>
                    </Col>
                </Row>
            </Card>

            <Row gutter={[16, 16]}>
                {sortedData.length > 0 ? (
                    sortedData.map((item: any) => {
                        const tongTien =
                            Number(item?.chiPhiAnUong || 0) +
                            Number(item?.chiPhiLuuTru || 0) +
                            Number(item?.chiPhiDiChuyen || 0)

                        return (
                            <Col xs={24} sm={12} lg={8} xl={6} key={item.ma}>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt={item.ten}
                                            src={item.hinhAnh}
                                            style={{ height: 220, objectFit: 'cover' }}
                                        />
                                    }
                                    actions={[
                                        <Button type="link" icon={<EyeOutlined />} onClick={() => setXem(item)}>
                                            Xem chi tiết
                                        </Button>,
                                    ]}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 8 }}>
                                        <Text strong style={{ fontSize: 18 }}>
                                            {item.ten}
                                        </Text>
                                        <Tag color="blue">{item.loai}</Tag>
                                    </div>

                                    <div style={{ marginBottom: 8 }}>
                                        <Text type="secondary">
                                            <EnvironmentOutlined /> {item.diaDiem}
                                        </Text>
                                    </div>

                                    <div style={{ marginBottom: 8 }}>
                                        <Rate allowHalf disabled value={Number(item.rating || 0)} />
                                    </div>

                                    <Paragraph ellipsis={{ rows: 2 }} style={{ minHeight: 44 }}>
                                        {item.moTa}
                                    </Paragraph>

                                    <div style={{ marginTop: 12 }}>
                                        <Text strong style={{ color: '#cf1322', fontSize: 16 }}>
                                            {tongTien.toLocaleString()} VNĐ
                                        </Text>
                                    </div>
                                </Card>
                            </Col>
                        )
                    })
                ) : (
                    <Col span={24}>
                        <Card>
                            <Empty description="Không có điểm đến phù hợp" />
                        </Card>
                    </Col>
                )}
            </Row>

            <ModalChiTiet data={xem} setData={setXem} />
        </div>
    )
}