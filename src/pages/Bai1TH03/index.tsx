import { useState } from "react"
import { Card, Table, Button, Input, Select, Row, Col, Modal, message, DatePicker, Tag, InputNumber } from "antd"
import dayjs from "dayjs"
import weekday from "dayjs/plugin/weekday"
import localeData from "dayjs/plugin/localeData"
import weekOfYear from "dayjs/plugin/weekOfYear"

dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)

const { Option } = Select

export default function Bai1TH03() {
const [view, setView] = useState<"main" | "feedback" | "reply">("main")
const [dsNhanVien, setDsNhanVien] = useState<any[]>([])
const [dsDichVu, setDsDichVu] = useState<any[]>([])
const [dsLichHen, setDsLichHen] = useState<any[]>([])
const [dsDanhGia, setDsDanhGia] = useState<any[]>([])

const [idNhanVienSua, setIdNhanVienSua] = useState<any>(null)
const [tenNhanVien, setTenNhanVien] = useState("")
const [chuyenMon, setChuyenMon] = useState<any>([])
const [gioBatDau, setGioBatDau] = useState("")
const [gioKetThuc, setGioKetThuc] = useState("")
const [ngayThangCuThe, setNgayThangCuThe] = useState<any>(null)
const [soKhachToiDa, setSoKhachToiDa] = useState<number | null>(null)

const [idDichVuSua, setIdDichVuSua] = useState<any>(null)
const [tenDichVu, setTenDichVu] = useState("")
const [gia, setGia] = useState<number | null>(null)
const [thoiGian, setThoiGian] = useState<number | null>(null)

const [tenKhach, setTenKhach] = useState("")
const [ngayHen, setNgayHen] = useState("")
const [gioHen, setGioHen] = useState("")
const [nhanVienHen, setNhanVienHen] = useState("")
const [dichVuHen, setDichVuHen] = useState("")

const [diemDanhGia, setDiemDanhGia] = useState<number | null>(null)
const [noiDungDanhGia, setNoiDungDanhGia] = useState("")
const [inputPhanHoi, setInputPhanHoi] = useState<{ [key: string]: string }>({})

const [lichDangDanhGia, setLichDangDanhGia] = useState<any>(null)
const [danhGiaDangPhanHoi, setDanhGiaDangPhanHoi] = useState<any>(null)

const phutTuGio = (gioStr: string) => {
if (!gioStr) return 0
const [h, m] = gioStr.split(":").map(Number)
return h * 60 + (m || 0)
}

const dinhDangTien = (so: number) => {
return so.toLocaleString("vi-VN")
}

const danhGiaTrungBinh = (id: any) => {
const ds = dsDanhGia.filter(i => i.nhanVienHen === id)
if (ds.length === 0) return "0.0"
const tong = ds.reduce((a, b) => a + b.diem, 0)
return (tong / ds.length).toFixed(1)
}

const themNhanVien = () => {
if (!tenNhanVien || !ngayThangCuThe || !soKhachToiDa || !gioBatDau || !gioKetThuc || !chuyenMon || chuyenMon.length === 0) {
message.warning("Vui lòng điền đủ thông tin nhân viên và chọn dịch vụ phụ trách")
return
}
const thongTinNhanVien = {
id: idNhanVienSua || Date.now(),
tenNhanVien,
chuyenMon,
gioBatDau,
gioKetThuc,
ngayThangCuThe: ngayThangCuThe.format("YYYY-MM-DD"),
soKhachToiDa: Number(soKhachToiDa)
}

if (idNhanVienSua) {
  setDsNhanVien(dsNhanVien.map(i => i.id === idNhanVienSua ? thongTinNhanVien : i))
  setIdNhanVienSua(null)
} else {
  setDsNhanVien([...dsNhanVien, thongTinNhanVien])
}

setTenNhanVien("")
setChuyenMon([])
setGioBatDau("")
setGioKetThuc("")
setNgayThangCuThe(null)
setSoKhachToiDa(null)
}

const suaNhanVien = (nv: any) => {
setIdNhanVienSua(nv.id)
setTenNhanVien(nv.tenNhanVien)
setChuyenMon(nv.chuyenMon)
setGioBatDau(nv.gioBatDau)
setGioKetThuc(nv.gioKetThuc)
setNgayThangCuThe(nv.ngayThangCuThe ? dayjs(nv.ngayThangCuThe) : null)
setSoKhachToiDa(nv.soKhachToiDa)
}

const xoaNhanVien = (id: any) => {
setDsNhanVien(dsNhanVien.filter(i => i.id !== id))
}

const themDichVu = () => {
if (!tenDichVu || gia === null || thoiGian === null) return
if (idDichVuSua) {
setDsDichVu(dsDichVu.map(i => i.id === idDichVuSua ? {
...i, tenDichVu, gia: Number(gia), thoiGian: Number(thoiGian)
} : i))
setIdDichVuSua(null)
} else {
setDsDichVu([...dsDichVu, {
id: Date.now().toString(),
tenDichVu,
gia: Number(gia),
thoiGian: Number(thoiGian)
}])
}
setTenDichVu("")
setGia(null)
setThoiGian(null)
}

const suaDichVu = (dv: any) => {
setIdDichVuSua(dv.id)
setTenDichVu(dv.tenDichVu)
setGia(dv.gia)
setThoiGian(dv.thoiGian)
}

const xoaDichVu = (id: any) => {
setDsDichVu(dsDichVu.filter(i => i.id !== id))
setDsNhanVien(dsNhanVien.map(nv => ({
...nv,
chuyenMon: nv.chuyenMon?.filter((cid: any) => cid !== id)
})))
}

const datLich = () => {
if (!tenKhach || !ngayHen || !gioHen || !nhanVienHen || !dichVuHen) return

const nv = dsNhanVien.find(i => i.id === nhanVienHen)
const dv = dsDichVu.find(i => i.id === dichVuHen)
if (!nv || !dv) return

if (!nv.chuyenMon?.includes(dichVuHen)) {
  message.error(`Nhân viên ${nv.tenNhanVien} không thực hiện dịch vụ này`)
  return
}

if (nv.ngayThangCuThe !== ngayHen) {
  message.error(`Nhân viên không trực ngày này`)
  return
}

const phutHen = phutTuGio(gioHen)
const phutBatDau = phutTuGio(nv.gioBatDau)
const phutKetThuc = phutTuGio(nv.gioKetThuc)

if (phutHen < phutBatDau || phutHen > phutKetThuc) {
  message.error(`Nhân viên chỉ làm việc từ ${nv.gioBatDau} đến ${nv.gioKetThuc}`)
  return
}

const soKhachDaDat = dsLichHen.filter(i => i.nhanVienHen === nhanVienHen && i.ngayHen === ngayHen && i.trangThai !== "Huy").length
if (soKhachDaDat >= nv.soKhachToiDa) {
  message.error("Nhân viên đã hết chỗ")
  return
}

const thoiGianHenMoi = dayjs(`${ngayHen}T${gioHen}`)
const thoiGianKetThucMoi = thoiGianHenMoi.add(dv.thoiGian, 'minute')

const trung = dsLichHen.find(i => {
  if (i.ngayHen !== ngayHen || i.nhanVienHen !== nhanVienHen || i.trangThai === "Huy") return false
  const dvDaDat = dsDichVu.find(d => d.id === i.dichVuHen)
  const batDauCu = dayjs(`${i.ngayHen}T${i.gioHen}`)
  const ketThucCu = batDauCu.add(dvDaDat?.thoiGian || 0, 'minute')
  return (thoiGianHenMoi.isBefore(ketThucCu) && thoiGianKetThucMoi.isAfter(batDauCu))
})

if (trung) {
  message.error("Thời gian này nhân viên đã bận")
  return
}

setDsLichHen([...dsLichHen, {
  id: Date.now(),
  tenKhach,
  ngayHen,
  gioHen,
  nhanVienHen,
  dichVuHen,
  trangThai: "ChoDuyet"
}])

setTenKhach("")
setDichVuHen("")
message.success("Đặt lịch thành công")
}

const capNhatTrangThai = (id: any, trangThai: any) => {
setDsLichHen(dsLichHen.map(i => i.id === id ? { ...i, trangThai } : i))
}

const moDanhGia = (lich: any) => {
setLichDangDanhGia(lich)
setView("feedback")
}

const guiDanhGia = () => {
if (!diemDanhGia) {
message.warning("Vui lòng chọn số sao")
return
}
setDsDanhGia([...dsDanhGia, {
id: Date.now(),
lichHenId: lichDangDanhGia.id,
nhanVienHen: lichDangDanhGia.nhanVienHen,
dichVuHen: lichDangDanhGia.dichVuHen,
tenKhach: lichDangDanhGia.tenKhach,
diem: Number(diemDanhGia),
noiDungDanhGia,
phanHoi: ""
}])
setView("main")
setDiemDanhGia(null)
setNoiDungDanhGia("")
message.success("Đã lưu đánh giá khách hàng")
}

const moPhanHoi = (dg: any) => {
setDanhGiaDangPhanHoi(dg)
setView("reply")
}

const guiPhanHoiNhanVien = () => {
const id = danhGiaDangPhanHoi.id
const noiDung = inputPhanHoi[id]
if (!noiDung) {
  message.warning("Vui lòng nhập nội dung phản hồi")
  return
}
setDsDanhGia(dsDanhGia.map(i => i.id === id ? { ...i, phanHoi: noiDung } : i))
setView("main")
message.success("Đã gửi phản hồi")
}

const thongKeSoLuongLichTheoNgay = () => {
const kq: any = {}
dsLichHen.forEach(l => {
if (l.trangThai !== "Huy") {
kq[l.ngayHen] = (kq[l.ngayHen] || 0) + 1
}
})
return Object.keys(kq).map(k => ({ ngay: k, soLuong: kq[k] }))
}

const thongKeSoLuongLichTheoThang = () => {
const kq: any = {}
dsLichHen.forEach(l => {
if (l.trangThai !== "Huy") {
const thang = dayjs(l.ngayHen).format("YYYY-MM")
kq[thang] = (kq[thang] || 0) + 1
}
})
return Object.keys(kq).map(k => ({ thang: k, soLuong: kq[k] }))
}

const doanhThuDichVu = () => {
let kq: any = {}
dsLichHen.forEach(l => {
if (l.trangThai === "HoanThanh") {
const dv = dsDichVu.find(d => d.id === l.dichVuHen)
if (dv) {
if (!kq[dv.tenDichVu]) kq[dv.tenDichVu] = 0
kq[dv.tenDichVu] += dv.gia
}
}
})
return Object.keys(kq).map(i => ({ dichVu: i, tien: kq[i] }))
}

const doanhThuNhanVien = () => {
let kq: any = {}
dsLichHen.forEach(l => {
if (l.trangThai === "HoanThanh") {
const nv = dsNhanVien.find(n => n.id === l.nhanVienHen)
const dv = dsDichVu.find(d => d.id === l.dichVuHen)
if (nv && dv) {
if (!kq[nv.tenNhanVien]) kq[nv.tenNhanVien] = 0
kq[nv.tenNhanVien] += dv.gia
}
}
})
return Object.keys(kq).map(i => ({ nhanVien: i, tien: kq[i] }))
}

if (view === "feedback") {
return (
<div style={{ padding: 20 }}>
<Card title="Nhân viên nhập đánh giá khách hàng" extra={<Button onClick={() => setView("main")}>Quay lại</Button>}>
<div style={{ marginBottom: 15 }}>
<strong>Khách hàng:</strong> {lichDangDanhGia?.tenKhach}
</div>
<div style={{ marginBottom: 10 }}>Số sao khách tặng:</div>
<InputNumber min={1} max={5} style={{ width: "100%" }} value={diemDanhGia} onChange={v => setDiemDanhGia(v)} />
<div style={{ marginTop: 10, marginBottom: 10 }}>Nội dung khách đánh giá:</div>
<Input.TextArea rows={4} placeholder="Nhập nội dung đánh giá của khách..." value={noiDungDanhGia} onChange={e => setNoiDungDanhGia(e.target.value)} />
<Button type="primary" style={{ marginTop: 20 }} onClick={guiDanhGia} block>Lưu đánh giá</Button>
</Card>
</div>
)
}

if (view === "reply") {
return (
<div style={{ padding: 20 }}>
<Card title="Nhân viên phản hồi đánh giá" extra={<Button onClick={() => setView("main")}>Quay lại</Button>}>
<div style={{ marginBottom: 15 }}>
<strong>Khách hàng:</strong> {danhGiaDangPhanHoi?.tenKhach} <br />
<strong>Đánh giá:</strong> {danhGiaDangPhanHoi?.diem} ⭐ <br />
<strong>Nội dung:</strong> {danhGiaDangPhanHoi?.noiDungDanhGia}
</div>
<div style={{ marginTop: 10, marginBottom: 10 }}>Nội dung phản hồi:</div>
<Input.TextArea rows={5} placeholder="Nhập nội dung phản hồi của nhân viên..." value={inputPhanHoi[danhGiaDangPhanHoi?.id] || ""} onChange={e => setInputPhanHoi({ ...inputPhanHoi, [danhGiaDangPhanHoi?.id]: e.target.value })} />
<Button type="primary" style={{ marginTop: 20 }} onClick={guiPhanHoiNhanVien} block>Gửi phản hồi</Button>
</Card>
</div>
)
}

return (
<div style={{ padding: 20 }}>
<Row gutter={20}>
<Col span={12}>
<Card title="Quản lý Nhân viên">
<Input placeholder="Tên nhân viên" value={tenNhanVien} onChange={e => setTenNhanVien(e.target.value)} />
<Select mode="multiple" style={{ width: "100%", marginTop: 10 }} placeholder="Chọn dịch vụ đảm nhận" value={chuyenMon} onChange={setChuyenMon}>
{dsDichVu.map(dv => <Option key={dv.id} value={dv.id}>{dv.tenDichVu}</Option>)}
</Select>
<Row gutter={10} style={{ marginTop: 10 }}>
<Col span={12}><Input placeholder="Bắt đầu (VD: 09:00)" value={gioBatDau} onChange={e => setGioBatDau(e.target.value)} /></Col>
<Col span={12}><Input placeholder="Kết thúc (VD: 17:00)" value={gioKetThuc} onChange={e => setGioKetThuc(e.target.value)} /></Col>
</Row>
<DatePicker style={{ width: "100%", marginTop: 10 }} placeholder="Ngày trực" value={ngayThangCuThe} onChange={setNgayThangCuThe} />
<InputNumber placeholder="Khách tối đa" style={{ width: "100%", marginTop: 10 }} value={soKhachToiDa} onChange={v => setSoKhachToiDa(v)} />
<Button type="primary" onClick={themNhanVien} style={{ marginTop: 10 }}>{idNhanVienSua ? "Cập nhật" : "Thêm"}</Button>
<Table
style={{ marginTop: 20 }}
dataSource={dsNhanVien}
rowKey="id"
columns={[
{ title: "Tên", dataIndex: "tenNhanVien" },
{ title: "Đánh giá TB", render: (r) => <Tag color="gold">{danhGiaTrungBinh(r.id)} ⭐</Tag> },
{ title: "Giờ", render: (r) => <Tag color="blue">{r.gioBatDau} - {r.gioKetThuc}</Tag> },
{ title: "Ngày", render: (r) => <Tag color="green">{r.ngayThangCuThe}</Tag> },
{
title: "Thao tác", render: (r: any) => (
<>
<Button size="small" onClick={() => suaNhanVien(r)} style={{ marginRight: 5 }}>Sửa</Button>
<Button size="small" danger onClick={() => xoaNhanVien(r.id)}>Xóa</Button>
</>
)
}
]}
/>
</Card>
</Col>

    <Col span={12}>
      <Card title="Quản lý Dịch vụ">
        <Input placeholder="Tên dịch vụ" value={tenDichVu} onChange={e => setTenDichVu(e.target.value)} />
        <InputNumber placeholder="Giá" style={{ width: "100%", marginTop: 10 }} value={gia} onChange={v => setGia(v)} />
        <InputNumber placeholder="Phút" style={{ width: "100%", marginTop: 10 }} value={thoiGian} onChange={v => setThoiGian(v)} />
        <Button type="primary" onClick={themDichVu} style={{ marginTop: 10 }}>{idDichVuSua ? "Cập nhật" : "Thêm"}</Button>
        <Table
          style={{ marginTop: 20 }}
          dataSource={dsDichVu}
          rowKey="id"
          columns={[
            { title: "Dịch vụ", dataIndex: "tenDichVu" },
            { title: "Giá", render: (r) => dinhDangTien(r.gia) },
            { title: "Phút", dataIndex: "thoiGian" },
            {
              title: "Thao tác", render: (r: any) => (
                <>
                  <Button size="small" onClick={() => suaDichVu(r)} style={{ marginRight: 5 }}>Sửa</Button>
                  <Button size="small" danger onClick={() => xoaDichVu(r.id)}>Xóa</Button>
                </>
              )
            }
          ]}
        />
      </Card>
    </Col>
  </Row>

  <Card title="Đặt lịch hẹn" style={{ marginTop: 20 }}>
    <Row gutter={10}>
      <Col span={4}><Input placeholder="Tên khách" value={tenKhach} onChange={e => setTenKhach(e.target.value)} /></Col>
      <Col span={4}><Input type="date" value={ngayHen} onChange={e => setNgayHen(e.target.value)} /></Col>
      <Col span={4}><Input type="time" value={gioHen} onChange={e => setGioHen(e.target.value)} /></Col>
      <Col span={5}>
        <Select style={{ width: "100%" }} placeholder="Nhân viên" value={nhanVienHen || undefined} onChange={(v) => { setNhanVienHen(v); setDichVuHen(""); }}>
          {dsNhanVien.map(i => <Option key={i.id} value={i.id}>{i.tenNhanVien} ({i.ngayThangCuThe})</Option>)}
        </Select>
      </Col>
      <Col span={5}>
        <Select style={{ width: "100%" }} placeholder="Dịch vụ" value={dichVuHen || undefined} onChange={setDichVuHen} disabled={!nhanVienHen}>
          {dsDichVu
            .filter(dv => dsNhanVien.find(nv => nv.id === nhanVienHen)?.chuyenMon?.includes(dv.id))
            .map(i => <Option key={i.id} value={i.id}>{i.tenDichVu}</Option>)}
        </Select>
      </Col>
      <Col span={2}><Button type="primary" onClick={datLich} block>Đặt</Button></Col>
    </Row>
    <Table
      style={{ marginTop: 20 }}
      dataSource={dsLichHen}
      rowKey="id"
      columns={[
        { title: "Khách", dataIndex: "tenKhach" },
        { title: "Ngày", dataIndex: "ngayHen" },
        { title: "Giờ", dataIndex: "gioHen" },
        { title: "Trạng thái", dataIndex: "trangThai" },
        {
          title: "Cập nhật", render: (r: any) => (
            <Select value={r.trangThai} style={{ width: 120 }} onChange={(v) => capNhatTrangThai(r.id, v)}>
              <Option value="ChoDuyet">Chờ duyệt</Option>
              <Option value="XacNhan">Xác nhận</Option>
              <Option value="HoanThanh">Hoàn thành</Option>
              <Option value="Huy">Hủy</Option>
            </Select>
          )
        },
        { title: "Thao tác", render: (r: any) => r.trangThai === "HoanThanh" && !dsDanhGia.find(dg => dg.lichHenId === r.id) && <Button onClick={() => moDanhGia(r)}>Đánh giá</Button> }
      ]}
    />
  </Card>

  <Row gutter={20} style={{ marginTop: 20 }}>
    <Col span={10}>
      <Card title="Thống kê">
        <Tag color="blue">Doanh thu dịch vụ</Tag>
        <Table dataSource={doanhThuDichVu()} rowKey="dichVu" size="small" pagination={false} style={{ marginTop: 5, marginBottom: 15 }} columns={[{ title: "Dịch vụ", dataIndex: "dichVu" }, { title: "Tiền", render: (r) => dinhDangTien(r.tien) }]} />
        <Tag color="green">Doanh thu nhân viên</Tag>
        <Table dataSource={doanhThuNhanVien()} rowKey="nhanVien" size="small" pagination={false} style={{ marginTop: 5, marginBottom: 15 }} columns={[{ title: "Nhân viên", dataIndex: "nhanVien" }, { title: "Tiền", render: (r) => dinhDangTien(r.tien) }]} />
        <Tag color="purple">Lịch hẹn theo ngày</Tag>
        <Table dataSource={thongKeSoLuongLichTheoNgay()} rowKey="ngay" size="small" pagination={false} style={{ marginTop: 5, marginBottom: 15 }} columns={[{ title: "Ngày", dataIndex: "ngay" }, { title: "Số lượng", dataIndex: "soLuong" }]} />
        <Tag color="volcano">Lịch hẹn theo tháng</Tag>
        <Table dataSource={thongKeSoLuongLichTheoThang()} rowKey="thang" size="small" pagination={false} style={{ marginTop: 5 }} columns={[{ title: "Tháng", dataIndex: "thang" }, { title: "Số lượng", dataIndex: "soLuong" }]} />
      </Card>
    </Col>
    <Col span={14}>
      <Card title="Phản hồi đánh giá">
        <Table
          dataSource={dsDanhGia}
          rowKey="id"
          columns={[
            { title: "⭐", dataIndex: "diem", width: 50 },
            { title: "Khách", dataIndex: "tenKhach", width: 90 },
            { 
              title: "NV / Dịch vụ", 
              render: (r) => (
                <div style={{ fontSize: '12px' }}>
                  <div>NV: <b>{dsNhanVien.find(nv => nv.id === r.nhanVienHen)?.tenNhanVien}</b></div>
                  <div style={{ color: '#666' }}>DV: {dsDichVu.find(dv => dv.id === r.dichVuHen)?.tenDichVu}</div>
                </div>
              ),
              width: 140
            },
            { title: "Nội dung", render: (r) => (
              <div>
                <div style={{ fontWeight: 'bold' }}>{r.noiDungDanhGia}</div>
                {r.phanHoi && <div style={{ color: 'blue', fontSize: '12px' }}>Phản hồi: {r.phanHoi}</div>}
              </div>
            )},
            { title: "Thao tác", render: (r) => !r.phanHoi && <Button size="small" onClick={() => moPhanHoi(r)}>Phản hồi</Button>, width: 100 }
          ]}
        />
      </Card>
    </Col>
  </Row>
</div>
)
}