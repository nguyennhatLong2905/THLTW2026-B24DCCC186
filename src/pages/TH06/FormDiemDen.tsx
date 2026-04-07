import { Input, InputNumber, Select, Space, Rate, Row, Col, Button, message, Image, Card } from 'antd'
import { useState, useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input

export default function FormDiemDen({ ds, setDs, sua, onClose }: any) {
    const [ma, setMa] = useState("")
    const [ten, setTen] = useState("")
    const [diaDiem, setDiaDiem] = useState("")
    const [loai, setLoai] = useState("Biển")
    const [hinhAnh, setHinhAnh] = useState("")
    const [moTa, setMoTa] = useState("")
    const [thoiGian, setThoiGian] = useState<any>(2)
    const [anUong, setAnUong] = useState<any>(0)
    const [luuTru, setLuuTru] = useState<any>(0)
    const [diChuyen, setDiChuyen] = useState<any>(0)
    const [rating, setRating] = useState<any>(5)
    const [errors, setErrors] = useState<any>({})

    useEffect(() => {
        if (sua) {
            setMa(sua.ma || "")
            setTen(sua.ten || "")
            setDiaDiem(sua.diaDiem || "")
            setLoai(sua.loai || "Biển")
            setHinhAnh(sua.hinhAnh || "")
            setMoTa(sua.moTa || "")
            setThoiGian(sua.thoiGian || sua.thoiGianThamQuan || 2)
            setAnUong(sua.anUong || sua.chiPhiAnUong || 0)
            setLuuTru(sua.luuTru || sua.chiPhiLuuTru || 0)
            setDiChuyen(sua.diChuyen || sua.chiPhiDiChuyen || 0)
            setRating(sua.rating || 5)
        } else {
            setMa("")
            setTen("")
            setDiaDiem("")
            setLoai("Biển")
            setHinhAnh("")
            setMoTa("")
            setThoiGian(2)
            setAnUong(0)
            setLuuTru(0)
            setDiChuyen(0)
            setRating(5)
        }
    }, [sua])

    const validateNumber = (value: any, field: string) => {
        if (value === '' || value === null || value === undefined) {
            return true
        }
        const num = Number(value)
        if (isNaN(num) || num < 0) {
            return false
        }
        return true
    }

    const validateAllNumbers = () => {
        const newErrors: any = {}
        
        if (!validateNumber(thoiGian, 'thoiGian')) {
            newErrors.thoiGian = 'Thời gian phải là số không âm'
        }
        if (!validateNumber(anUong, 'anUong')) {
            newErrors.anUong = 'Chi phí ăn uống phải là số không âm'
        }
        if (!validateNumber(luuTru, 'luuTru')) {
            newErrors.luuTru = 'Chi phí lưu trú phải là số không âm'
        }
        if (!validateNumber(diChuyen, 'diChuyen')) {
            newErrors.diChuyen = 'Chi phí di chuyển phải là số không âm'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const ok = () => {
        if (!ma.trim()) {
            message.error("Vui lòng nhập mã điểm đến")
            return
        }

        if (!ten.trim()) {
            message.error("Vui lòng nhập tên điểm đến")
            return
        }

        if (!diaDiem.trim()) {
            message.error("Vui lòng nhập địa danh / tỉnh thành")
            return
        }

        if (!moTa.trim()) {
            message.error("Vui lòng nhập mô tả")
            return
        }

        if (!validateAllNumbers()) {
            message.error("Vui lòng kiểm tra lại các trường số liệu")
            return
        }

        if (!sua && ds.some((i: any) => i.ma === ma.trim())) {
            message.error("Mã điểm đến đã tồn tại")
            return
        }

        const item = {
            ma: ma.trim(),
            ten: ten.trim(),
            diaDiem: diaDiem.trim(),
            loai,
            hinhAnh,
            moTa: moTa.trim(),
            rating: Number(rating || 0),
            thoiGian: Number(thoiGian || 0),
            anUong: Number(anUong || 0),
            luuTru: Number(luuTru || 0),
            diChuyen: Number(diChuyen || 0),
            thoiGianThamQuan: Number(thoiGian || 0),
            chiPhiAnUong: Number(anUong || 0),
            chiPhiLuuTru: Number(luuTru || 0),
            chiPhiDiChuyen: Number(diChuyen || 0)
        }

        if (sua) {
            const updated = ds.map((i: any) => (i.ma === sua.ma ? item : i))
            setDs(updated)
            console.log('Update:', updated)
            message.success("Đã cập nhật điểm đến")
        } else {
            const added = [...ds, item]
            setDs(added)
            console.log('Added:', added)
            message.success("Đã thêm điểm đến")
        }

        setTimeout(() => {
            onClose()
        }, 100)
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h1 style={{ margin: 0 }}>{sua ? "Sửa điểm đến" : "Thêm điểm đến"}</h1>
                <Button icon={<ArrowLeftOutlined />} onClick={onClose}>
                    Quay lại
                </Button>
            </div>

            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Card>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <div style={{ marginBottom: 8, fontWeight: 500 }}>Mã điểm đến</div>
                            <Input
                                value={ma}
                                onChange={e => setMa(e.target.value)}
                                placeholder="Mã điểm đến"
                                disabled={!!sua}
                            />
                        </Col>

                        <Col xs={24} md={12}>
                            <div style={{ marginBottom: 8, fontWeight: 500 }}>Tên điểm đến</div>
                            <Input
                                value={ten}
                                onChange={e => setTen(e.target.value)}
                                placeholder="Tên điểm đến"
                            />
                        </Col>

                        <Col xs={24} md={12}>
                            <div style={{ marginBottom: 8, fontWeight: 500 }}>Địa danh / Tỉnh thành</div>
                            <Input
                                value={diaDiem}
                                onChange={e => setDiaDiem(e.target.value)}
                                placeholder="Địa danh / Tỉnh thành"
                            />
                        </Col>

                        <Col xs={24} md={12}>
                            <div style={{ marginBottom: 8, fontWeight: 500 }}>Loại hình</div>
                            <Select value={loai} onChange={setLoai} style={{ width: '100%' }}>
                                <Option value="Biển">Biển</Option>
                                <Option value="Núi">Núi</Option>
                                <Option value="Thành phố">Thành phố</Option>
                            </Select>
                        </Col>

                        <Col xs={24}>
                            <div style={{ marginBottom: 8, fontWeight: 500 }}>Mô tả chi tiết</div>
                            <TextArea
                                value={moTa}
                                onChange={e => setMoTa(e.target.value)}
                                placeholder="Mô tả chi tiết điểm đến"
                                rows={4}
                            />
                        </Col>
                    </Row>
                </Card>

                <Card title="Hình ảnh">
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} md={12}>
                            <div style={{ marginBottom: 8, fontWeight: 500 }}>Link hình ảnh (URL)</div>
                            <Input
                                value={hinhAnh}
                                onChange={e => setHinhAnh(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                            />
                            <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                                Dán link ảnh từ web (ưu tiên Unsplash, Pexels, v.v)
                            </div>
                        </Col>

                        <Col xs={24} md={12}>
                            <div style={{ marginBottom: 8, fontWeight: 500 }}>Xem trước ảnh</div>
                            {hinhAnh ? (
                                <Image
                                    src={hinhAnh}
                                    style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 8 }}
                                    preview={false}
                                    onError={() => {
                                        message.error("Link ảnh không hợp lệ")
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '100%',
                                        height: 220,
                                        background: '#f5f5f5',
                                        borderRadius: 8,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#999'
                                    }}
                                >
                                    Chưa có hình ảnh
                                </div>
                            )}
                        </Col>
                    </Row>
                </Card>

                <Card title="Thông tin chi tiết">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <div style={{ marginBottom: 6, fontWeight: 500 }}>Thời gian tham quan (giờ)</div>
                            <InputNumber
                                min={1}
                                value={thoiGian}
                                onChange={(v: any) => {
                                    setThoiGian(v || 0)
                                    setErrors({ ...errors, thoiGian: undefined })
                                }}
                                style={{ width: '100%', borderColor: errors.thoiGian ? '#ff4d4f' : undefined }}
                            />
                            {errors.thoiGian && (
                                <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
                                    {errors.thoiGian}
                                </div>
                            )}
                        </Col>

                        <Col xs={24} md={12}>
                            <div style={{ marginBottom: 6, fontWeight: 500 }}>Đánh giá</div>
                            <Rate value={rating} onChange={setRating} />
                        </Col>
                    </Row>
                </Card>

                <Card title="Chi phí">
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <div style={{ marginBottom: 6, fontWeight: 500 }}>Chi phí ăn uống (VNĐ)</div>
                            <InputNumber
                                min={0}
                                value={anUong}
                                onChange={(v: any) => {
                                    setAnUong(v || 0)
                                    setErrors({ ...errors, anUong: undefined })
                                }}
                                style={{ width: '100%', borderColor: errors.anUong ? '#ff4d4f' : undefined }}
                            />
                            {errors.anUong && (
                                <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
                                    {errors.anUong}
                                </div>
                            )}
                        </Col>

                        <Col xs={24} md={8}>
                            <div style={{ marginBottom: 6, fontWeight: 500 }}>Chi phí lưu trú (VNĐ)</div>
                            <InputNumber
                                min={0}
                                value={luuTru}
                                onChange={(v: any) => {
                                    setLuuTru(v || 0)
                                    setErrors({ ...errors, luuTru: undefined })
                                }}
                                style={{ width: '100%', borderColor: errors.luuTru ? '#ff4d4f' : undefined }}
                            />
                            {errors.luuTru && (
                                <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
                                    {errors.luuTru}
                                </div>
                            )}
                        </Col>

                        <Col xs={24} md={8}>
                            <div style={{ marginBottom: 6, fontWeight: 500 }}>Chi phí di chuyển (VNĐ)</div>
                            <InputNumber
                                min={0}
                                value={diChuyen}
                                onChange={(v: any) => {
                                    setDiChuyen(v || 0)
                                    setErrors({ ...errors, diChuyen: undefined })
                                }}
                                style={{ width: '100%', borderColor: errors.diChuyen ? '#ff4d4f' : undefined }}
                            />
                            {errors.diChuyen && (
                                <div style={{ color: '#ff4d4f', fontSize: 12, marginTop: 4 }}>
                                    {errors.diChuyen}
                                </div>
                            )}
                        </Col>
                    </Row>
                </Card>

                <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Space>
                            <Button onClick={onClose}>Hủy</Button>
                            <Button type="primary" onClick={ok}>
                                {sua ? "Cập nhật" : "Thêm mới"}
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Space>
        </div>
    )
}
