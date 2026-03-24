import { useState } from 'react'
import { Card, Table, Button, Input, DatePicker, Select, Row, Col, message, Space, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { Option } = Select

export default function Bai1TH03() {
    const [dsSo, setDsSo] = useState<any[]>([])
    const [dsQuyetDinh, setDsQuyetDinh] = useState<any[]>([])
    const [dsTruong, setDsTruong] = useState<any[]>([])
    const [dsVanBang, setDsVanBang] = useState<any[]>([])
    const [dsTraCuu, setDsTraCuu] = useState<any[]>([])

    const [namSo, setNamSo] = useState("")
    const [soDangChon, setSoDangChon] = useState<any>(null)

    const [soQD, setSoQD] = useState("")
    const [ngayQD, setNgayQD] = useState<any>(null)
    const [noiDung, setNoiDung] = useState("")
    const [soApDung, setSoApDung] = useState("")

    const [tenTruong, setTenTruong] = useState("")
    const [kieuDuLieu, setKieuDuLieu] = useState("")

    const [soHieu, setSoHieu] = useState("")
    const [maSV, setMaSV] = useState("")
    const [hoTen, setHoTen] = useState("")
    const [ngaySinh, setNgaySinh] = useState<any>(null)
    const [qdThuoc, setQdThuoc] = useState("")
    const [anhSinhVien, setAnhSinhVien] = useState("")
    const [giaTriThem, setGiaTriThem] = useState<any>({})

    const [timSoHieu, setTimSoHieu] = useState("")
    const [timSoVaoSo, setTimSoVaoSo] = useState("")
    const [timMSV, setTimMSV] = useState("")
    const [timTen, setTimTen] = useState("")
    const [timNgaySinh, setTimNgaySinh] = useState<any>(null)

    const xuLyTaiAnh = (info: any) => {
        const file = info.file.originFileObj || info.file
        if (file instanceof File || file instanceof Blob) {
            const reader = new FileReader()
            reader.onload = (e: any) => setAnhSinhVien(e.target.result)
            reader.readAsDataURL(file)
        }
    }

    const themSo = () => {
        if (!namSo) return
        if (dsSo.some(i => i.nam === namSo)) {
            message.warning("Sổ năm này đã tồn tại")
            return
        }
        setDsSo([...dsSo, { nam: namSo, stt: 1 }])
        setNamSo("")
    }

    const themQuyetDinh = () => {
        if (!soQD || !soApDung || !ngayQD) {
            message.error("Vui lòng nhập đầy đủ thông tin")
            return
        }
        setDsQuyetDinh([...dsQuyetDinh, { soQD, ngayQD, noiDung, soApDung, luotTra: 0 }])
        setSoQD("")
        setNoiDung("")
        setNgayQD(null)
    }

    const themTruong = () => {
        if (!tenTruong || !kieuDuLieu) return
        setDsTruong([...dsTruong, { tenTruong, kieuDuLieu }])
        setTenTruong("")
    }

    const themVanBang = () => {
        if (!soDangChon || !soHieu || !maSV || !hoTen || !qdThuoc) {
            message.error("Vui lòng nhập đầy đủ thông tin bắt buộc")
            return
        }
        const soHienTai = dsSo.find(i => i.nam === soDangChon)
        if (!soHienTai) return

        const soVaoSo = soHienTai.stt
        const duLieuThem: any = {}
        dsTruong.forEach(t => {
            duLieuThem[t.tenTruong] = giaTriThem[t.tenTruong]
        })

        const vanBangMoi = {
            soVaoSo,
            soHieu,
            maSV,
            hoTen,
            ngaySinh,
            qdThuoc,
            anhSinhVien,
            namSo: soDangChon,
            ...duLieuThem
        }

        setDsVanBang([...dsVanBang, vanBangMoi])
        setDsSo(dsSo.map(i => i.nam === soDangChon ? { ...i, stt: i.stt + 1 } : i))
        setSoHieu("")
        setMaSV("")
        setHoTen("")
        setAnhSinhVien("")
        setGiaTriThem({})
        message.success(`Đã cấp văn bằng thành công`)
    }

    const traCuu = () => {
        const dieuKien = [timSoHieu, timSoVaoSo, timMSV, timTen, timNgaySinh].filter(Boolean).length
        if (dieuKien < 2) {
            message.error("Nhập ít nhất 2 điều kiện")
            return
        }
        const kq = dsVanBang.filter(i =>
            (!timSoHieu || i.soHieu.includes(timSoHieu)) &&
            (!timSoVaoSo || i.soVaoSo.toString() === timSoVaoSo) &&
            (!timMSV || i.maSV.includes(timMSV)) &&
            (!timTen || i.hoTen.toLowerCase().includes(timTen.toLowerCase())) &&
            (!timNgaySinh || (i.ngaySinh && dayjs(i.ngaySinh).isSame(timNgaySinh, 'day')))
        )
        setDsTraCuu(kq)
    }

    const chuyenTrangChiTiet = (record: any) => {
        if (record.qdThuoc) {
            setDsQuyetDinh(prev => prev.map(i =>
                i.soQD === record.qdThuoc ? { ...i, luotTra: (i.luotTra || 0) + 1 } : i
            ))
        }

        const win = window.open("", "_blank")
        if (!win) return

        const htmlTruongBoSung = dsTruong.map(t => `
            <div style="margin-bottom: 10px;">
                <span style="font-weight: bold;">${t.tenTruong}:</span> ${record[t.tenTruong] || '---'}
            </div>
        `).join('')

        win.document.write(`
            <html>
                <head>
                    <title>Văn bằng - ${record.hoTen}</title>
                    <style>
                        body { font-family: 'Times New Roman', Times, serif; padding: 40px; background: #f0f2f5; }
                        .no-print { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
                        .btn { padding: 8px 20px; cursor: pointer; border: none; border-radius: 4px; font-weight: bold; }
                        .btn-print { background: #1677ff; color: white; }
                        .btn-return { background: #ff4d4f; color: white; }
                        .diploma-card { border: 8px double #d4af37; padding: 40px; max-width: 850px; margin: auto; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); position: relative; min-height: 500px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .title { font-size: 28px; font-weight: bold; color: #b8860b; margin: 15px 0; }
                        .info-row { display: flex; margin-bottom: 12px; font-size: 19px; border-bottom: 1px dotted #ccc; }
                        .label { width: 220px; font-style: italic; }
                        .value { font-weight: bold; }
                        .student-photo { position: absolute; top: 40px; right: 40px; width: 120px; height: 160px; border: 1px solid #ccc; object-fit: cover; }
                        @media print { .no-print { display: none; } body { background: white; padding: 0; } .diploma-card { box-shadow: none; border-width: 5px; } }
                    </style>
                </head>
                <body>
                    <div class="no-print">
                        <button class="btn btn-return" onclick="window.close()">← Quay lại hệ thống</button>
                        <button class="btn btn-print" onclick="window.print()">In văn bằng</button>
                    </div>
                    <div class="diploma-card">
                        ${record.anhSinhVien ? `<img src="${record.anhSinhVien}" class="student-photo" />` : '<div class="student-photo" style="display:flex; align-items:center; justify-content:center; font-size:12px; color:#999">Không có ảnh</div>'}
                        <div class="header">
                            <div style="font-size: 18px; font-weight: bold;">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                            <div style="font-size: 16px;">Độc lập - Tự do - Hạnh phúc</div>
                            <div class="title">BẰNG TỐT NGHIỆP</div>
                        </div>
                        <div class="content" style="width: 70%;">
                            <div class="info-row"><span class="label">Họ và tên sinh viên:</span><span class="value">${record.hoTen}</span></div>
                            <div class="info-row"><span class="label">Ngày sinh:</span><span class="value">${record.ngaySinh ? dayjs(record.ngaySinh).format('DD/MM/YYYY') : '---'}</span></div>
                            <div class="info-row"><span class="label">Mã số sinh viên:</span><span class="value">${record.maSV}</span></div>
                            <div class="info-row"><span class="label">Số hiệu văn bằng:</span><span class="value">${record.soHieu}</span></div>
                            <div class="info-row"><span class="label">Số vào sổ:</span><span class="value">${record.soVaoSo} (Sổ năm ${record.namSo})</span></div>
                            <div class="info-row"><span class="label">Quyết định số:</span><span class="value">${record.qdThuoc}</span></div>
                            <div style="margin-top: 20px; padding: 15px; border: 1px dashed #d4af37; border-radius: 4px;">
                                ${htmlTruongBoSung || '<i>Không có thông tin bổ sung</i>'}
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        `)
        win.document.close()
    }

    return (
        <div style={{ padding: 20 }}>
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Card title="Sổ văn bằng" size="small">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Input placeholder="Năm mở sổ" value={namSo} onChange={e => setNamSo(e.target.value)} />
                            <Button onClick={themSo} type="primary" block>Mở sổ mới</Button>
                        </Space>
                        <Table
                            style={{ marginTop: 15 }}
                            dataSource={dsSo}
                            rowKey="nam"
                            size="small"
                            pagination={{ pageSize: 5 }}
                            columns={[
                                { title: "Năm", dataIndex: "nam" },
                                { title: "STT", dataIndex: "stt" },
                                { render: (r) => <Button danger size="small" onClick={() => setDsSo(dsSo.filter(i => i.nam !== r.nam))}>Xóa</Button> }
                            ]}
                        />
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="Quyết định" size="small">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Input placeholder="Số QĐ" value={soQD} onChange={e => setSoQD(e.target.value)} />
                            <DatePicker style={{ width: "100%" }} placeholder="Ngày ký" value={ngayQD} onChange={setNgayQD} format="DD/MM/YYYY" />
                            <Input placeholder="Nội dung" value={noiDung} onChange={e => setNoiDung(e.target.value)} />
                            <Select style={{ width: "100%" }} placeholder="Sổ áp dụng" value={soApDung || undefined} onChange={setSoApDung}>
                                {dsSo.map(i => <Option key={i.nam} value={i.nam}>{i.nam}</Option>)}
                            </Select>
                            <Button type="primary" onClick={themQuyetDinh} block>Lưu QĐ</Button>
                        </Space>
                        <Table
                            style={{ marginTop: 15 }}
                            dataSource={dsQuyetDinh}
                            rowKey="soQD"
                            size="small"
                            pagination={{ pageSize: 5 }}
                            columns={[
                                { title: "Số QĐ", dataIndex: "soQD" },
                                { title: "Lượt xem", dataIndex: "luotTra" },
                                { render: (r) => <Button danger size="small" onClick={() => setDsQuyetDinh(dsQuyetDinh.filter(i => i.soQD !== r.soQD))}>Xóa</Button> }
                            ]}
                        />
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="Trường dữ liệu" size="small">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Input placeholder="Tên trường" value={tenTruong} onChange={e => setTenTruong(e.target.value)} />
                            <Select style={{ width: "100%" }} placeholder="Kiểu" value={kieuDuLieu || undefined} onChange={setKieuDuLieu}>
                                <Option value="string">Văn bản</Option>
                                <Option value="number">Số học</Option>
                            </Select>
                            <Button onClick={themTruong} type="dashed" block>Thêm</Button>
                        </Space>
                        <Table
                            style={{ marginTop: 15 }}
                            dataSource={dsTruong}
                            rowKey="tenTruong"
                            size="small"
                            pagination={{ pageSize: 5 }}
                            columns={[
                                { title: "Trường", dataIndex: "tenTruong" },
                                { render: (r) => <Button danger size="small" onClick={() => setDsTruong(dsTruong.filter(i => i.tenTruong !== r.tenTruong))}>Xóa</Button> }
                            ]}
                        />
                    </Card>
                </Col>
            </Row>

            <Card title="Cấp phát văn bằng" style={{ marginTop: 20 }}>
                <Row gutter={[10, 10]}>
                    <Col span={4}>
                        <Select style={{ width: "100%" }} placeholder="Chọn sổ" value={soDangChon} onChange={setSoDangChon}>
                            {dsSo.map(i => <Option key={i.nam} value={i.nam}>{i.nam}</Option>)}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select style={{ width: "100%" }} placeholder="Chọn QĐ" value={qdThuoc || undefined} onChange={setQdThuoc}>
                            {dsQuyetDinh.filter(q => q.soApDung === soDangChon).map(i => (
                                <Option key={i.soQD} value={i.soQD}>{i.soQD}</Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={4}><Input placeholder="Số hiệu" value={soHieu} onChange={e => setSoHieu(e.target.value)} /></Col>
                    <Col span={4}><Input placeholder="Mã SV" value={maSV} onChange={e => setMaSV(e.target.value)} /></Col>
                    <Col span={4}><Input placeholder="Họ và tên" value={hoTen} onChange={e => setHoTen(e.target.value)} /></Col>
                    <Col span={4}><DatePicker style={{ width: "100%" }} placeholder="Ngày sinh" value={ngaySinh} onChange={setNgaySinh} format="DD/MM/YYYY" /></Col>
                </Row>
                <Row gutter={[10, 10]} style={{ marginTop: 10 }}>
                    <Col span={4}>
                        <Upload maxCount={1} showUploadList={false} onChange={xuLyTaiAnh} beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />} style={{ width: '100%' }}>
                                {anhSinhVien ? "Đã chọn ảnh" : "Tải ảnh SV"}
                            </Button>
                        </Upload>
                    </Col>
                    {dsTruong.map(t => (
                        <Col span={4} key={t.tenTruong}>
                            <Input placeholder={t.tenTruong} value={giaTriThem[t.tenTruong] || ""} onChange={e => setGiaTriThem({ ...giaTriThem, [t.tenTruong]: e.target.value })} />
                        </Col>
                    ))}
                </Row>
                <Button type="primary" onClick={themVanBang} style={{ marginTop: 15 }}>Ghi sổ và Cấp bằng</Button>
            </Card>

            <Card title="Bộ lọc tra cứu" style={{ marginTop: 20 }}>
                <Row gutter={[10, 10]} align="bottom">
                    <Col span={4}><div>Số hiệu</div><Input onChange={e => setTimSoHieu(e.target.value)} /></Col>
                    <Col span={4}><div>Số vào sổ</div><Input onChange={e => setTimSoVaoSo(e.target.value)} /></Col>
                    <Col span={4}><div>Mã SV</div><Input onChange={e => setTimMSV(e.target.value)} /></Col>
                    <Col span={4}><div>Tên SV</div><Input onChange={e => setTimTen(e.target.value)} /></Col>
                    <Col span={4}><div>Ngày sinh</div><DatePicker style={{ width: "100%" }} onChange={setTimNgaySinh} format="DD/MM/YYYY" /></Col>
                    <Col span={4}><Button type="primary" block onClick={traCuu}>Tìm kiếm</Button></Col>
                </Row>
                <Table
                    style={{ marginTop: 20 }}
                    dataSource={dsTraCuu}
                    rowKey="soHieu"
                    columns={[
                        { title: "Số hiệu", dataIndex: "soHieu" },
                        { title: "Số vào sổ", dataIndex: "soVaoSo" },
                        { title: "Sinh viên", dataIndex: "hoTen" },
                        { title: "Mã số", dataIndex: "maSV" },
                        {
                            render: (r) => (
                                <Space>
                                    <Button size="small" type="primary" onClick={() => chuyenTrangChiTiet(r)}>Xem bằng</Button>
                                    <Button size="small" danger onClick={() => setDsVanBang(dsVanBang.filter(v => v.soHieu !== r.soHieu))}>Xóa</Button>
                                </Space>
                            )
                        }
                    ]}
                />
            </Card>
        </div>
    )
} 