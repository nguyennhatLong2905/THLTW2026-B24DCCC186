import { Modal, Input, InputNumber, Select, Space, Rate, Row, Col, Upload, Button, message, Image } from 'antd'
import { useState, useEffect } from 'react'
import { UploadOutlined } from '@ant-design/icons'

const { Option } = Select
const { TextArea } = Input

export default function ModalDiemDen({ mo, setMo, ds, setDs, sua }: any) {
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
    }, [sua, mo])

    const chonAnh = (file: any) => {
        const reader = new FileReader()
        reader.onload = (e: any) => {
            setHinhAnh(String(e.target?.result || ""))
        }
        reader.readAsDataURL(file)
        return false
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
            setDs(ds.map((i: any) => (i.ma === sua.ma ? item : i)))
            message.success("Đã cập nhật điểm đến")
        } else {
            setDs([...ds, item])
            message.success("Đã thêm điểm đến")
        }

        setMo(false)
    }

    return (
        <Modal
            title={sua ? "Sửa điểm đến" : "Thêm điểm đến"}
            open={mo}
            onCancel={() => setMo(false)}
            onOk={ok}
            width={900}
            okText={sua ? "Cập nhật" : "Thêm mới"}
            cancelText="Đóng"
        >
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Input
                            value={ma}
                            onChange={e => setMa(e.target.value)}
                            placeholder="Mã điểm đến"
                            disabled={!!sua}
                        />
                    </Col>

                    <Col xs={24} md={12}>
                        <Input
                            value={ten}
                            onChange={e => setTen(e.target.value)}
                            placeholder="Tên điểm đến"
                        />
                    </Col>

                    <Col xs={24} md={12}>
                        <Input
                            value={diaDiem}
                            onChange={e => setDiaDiem(e.target.value)}
                            placeholder="Địa danh / Tỉnh thành"
                        />
                    </Col>

                    <Col xs={24} md={12}>
                        <Select value={loai} onChange={setLoai} style={{ width: '100%' }}>
                            <Option value="Biển">Biển</Option>
                            <Option value="Núi">Núi</Option>
                            <Option value="Thành phố">Thành phố</Option>
                        </Select>
                    </Col>

                    <Col xs={24}>
                        <TextArea
                            value={moTa}
                            onChange={e => setMoTa(e.target.value)}
                            placeholder="Mô tả chi tiết điểm đến"
                            rows={4}
                        />
                    </Col>
                </Row>

                <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, padding: 16 }}>
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} md={12}>
                            <div style={{ marginBottom: 8, fontWeight: 500 }}>Link hình ảnh</div>
                            <Input
                                value={hinhAnh}
                                onChange={e => setHinhAnh(e.target.value)}
                                placeholder="Dán link ảnh hoặc upload ảnh từ máy"
                            />

                            <Upload
                                beforeUpload={chonAnh}
                                showUploadList={false}
                                accept="image/*"
                            >
                                <Button icon={<UploadOutlined />} style={{ marginTop: 12 }}>
                                    Chọn ảnh từ máy
                                </Button>
                            </Upload>
                        </Col>

                        <Col xs={24} md={12}>
                            <div style={{ marginBottom: 8, fontWeight: 500 }}>Xem trước ảnh</div>
                            {hinhAnh ? (
                                <Image
                                    src={hinhAnh}
                                    style={{ width: '100%', maxHeight: 220, objectFit: 'cover', borderRadius: 8 }}
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
                </div>

                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <div style={{ marginBottom: 6, fontWeight: 500 }}>Thời gian tham quan (giờ)</div>
                        <InputNumber
                            min={1}
                            value={thoiGian}
                            onChange={(v: any) => setThoiGian(v || 0)}
                            style={{ width: '100%' }}
                        />
                    </Col>

                    <Col xs={24} md={12}>
                        <div style={{ marginBottom: 6, fontWeight: 500 }}>Đánh giá</div>
                        <Rate value={rating} onChange={setRating} />
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                        <div style={{ marginBottom: 6, fontWeight: 500 }}>Chi phí ăn uống (VNĐ)</div>
                        <InputNumber
                            min={0}
                            value={anUong}
                            onChange={(v: any) => setAnUong(v || 0)}
                            style={{ width: '100%' }}
                        />
                    </Col>

                    <Col xs={24} md={8}>
                        <div style={{ marginBottom: 6, fontWeight: 500 }}>Chi phí lưu trú (VNĐ)</div>
                        <InputNumber
                            min={0}
                            value={luuTru}
                            onChange={(v: any) => setLuuTru(v || 0)}
                            style={{ width: '100%' }}
                        />
                    </Col>

                    <Col xs={24} md={8}>
                        <div style={{ marginBottom: 6, fontWeight: 500 }}>Chi phí di chuyển (VNĐ)</div>
                        <InputNumber
                            min={0}
                            value={diChuyen}
                            onChange={(v: any) => setDiChuyen(v || 0)}
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
            </Space>
        </Modal>
    )
}