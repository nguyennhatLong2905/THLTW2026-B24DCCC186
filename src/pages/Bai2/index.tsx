import React, { useEffect, useState } from "react"

interface MonHoc {
  id: number
  ten: string
}

interface BuoiHoc {
  id: number
  idMonHoc: number
  thoiGian: string
  thoiLuong: number
  noiDung: string
  ghiChu: string
}

interface MucTieuThang {
  idMonHoc: number
  soGioMucTieu: number
}

const Bai2: React.FC = () => {
  const [danhSachMonHoc, setDanhSachMonHoc] = useState<MonHoc[]>([])
  const [danhSachBuoiHoc, setDanhSachBuoiHoc] = useState<BuoiHoc[]>([])
  const [danhSachMucTieu, setDanhSachMucTieu] = useState<MucTieuThang[]>([])
  const [monHocDangChon, setMonHocDangChon] = useState<number>(0)

  const [tenMonHocMoi, setTenMonHocMoi] = useState("")
  const [idMonHocDangSua, setIdMonHocDangSua] = useState<number | null>(null)

  const [thoiGianInput, setThoiGianInput] = useState("")
  const [thoiLuongInput, setThoiLuongInput] = useState("")
  const [noiDungInput, setNoiDungInput] = useState("")
  const [ghiChuInput, setGhiChuInput] = useState("")
  const [idBuoiHocDangSua, setIdBuoiHocDangSua] = useState<number | null>(null)

  const [nhapMucTieu, setNhapMucTieu] = useState("")

  useEffect(() => {
    const monHocLuuTru = localStorage.getItem("subjects")
    const buoiHocLuuTru = localStorage.getItem("sessions")
    const mucTieuLuuTru = localStorage.getItem("goals")

    if (monHocLuuTru) setDanhSachMonHoc(JSON.parse(monHocLuuTru))
    if (buoiHocLuuTru) setDanhSachBuoiHoc(JSON.parse(buoiHocLuuTru))
    if (mucTieuLuuTru) setDanhSachMucTieu(JSON.parse(mucTieuLuuTru))
  }, [])

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(danhSachMonHoc))
  }, [danhSachMonHoc])

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(danhSachBuoiHoc))
  }, [danhSachBuoiHoc])

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(danhSachMucTieu))
  }, [danhSachMucTieu])

  const xuLyThemHoacCapNhatMonHoc = () => {
    if (!tenMonHocMoi.trim()) return
    if (idMonHocDangSua) {
      setDanhSachMonHoc(danhSachMonHoc.map(m => m.id === idMonHocDangSua ? { ...m, ten: tenMonHocMoi } : m))
      setIdMonHocDangSua(null)
    } else {
      const monHocMoi: MonHoc = { id: Date.now(), ten: tenMonHocMoi }
      setDanhSachMonHoc([...danhSachMonHoc, monHocMoi])
    }
    setTenMonHocMoi("")
  }

  const xuLySuaMonHoc = (id: number, ten: string) => {
    setIdMonHocDangSua(id)
    setTenMonHocMoi(ten)
  }

  const xuLyXoaMonHoc = (id: number) => {
    setDanhSachMonHoc(danhSachMonHoc.filter(m => m.id !== id))
    setDanhSachBuoiHoc(danhSachBuoiHoc.filter(b => b.idMonHoc !== id))
    setDanhSachMucTieu(danhSachMucTieu.filter(mt => mt.idMonHoc !== id))
    if (monHocDangChon === id) setMonHocDangChon(0)
  }

  const xuLyThemHoacCapNhatBuoiHoc = () => {
    if (!monHocDangChon || !thoiGianInput || !thoiLuongInput) {
      alert("Vui lòng nhập đầy đủ thông tin")
      return
    }

    const batDauMoi = new Date(thoiGianInput).getTime()
    const ketThucMoi = batDauMoi + Number(thoiLuongInput) * 60000

    const biXungDot = danhSachBuoiHoc.some(b => {
      if (b.id === idBuoiHocDangSua) return false
      const batDauCu = new Date(b.thoiGian).getTime()
      const ketThucCu = batDauCu + b.thoiLuong * 60000
      return batDauMoi < ketThucCu && ketThucMoi > batDauCu
    })

    if (biXungDot) {
      alert("Thời gian biểu bị trùng với một lịch học khác")
      return
    }

    if (idBuoiHocDangSua) {
      setDanhSachBuoiHoc(
        danhSachBuoiHoc.map(b =>
          b.id === idBuoiHocDangSua
            ? { ...b, thoiGian: thoiGianInput, thoiLuong: Number(thoiLuongInput), noiDung: noiDungInput, ghiChu: ghiChuInput }
            : b
        )
      )
      setIdBuoiHocDangSua(null)
    } else {
      const buoiHocMoi: BuoiHoc = {
        id: Date.now(),
        idMonHoc: monHocDangChon,
        thoiGian: thoiGianInput,
        thoiLuong: Number(thoiLuongInput),
        noiDung: noiDungInput,
        ghiChu: ghiChuInput
      }
      setDanhSachBuoiHoc([...danhSachBuoiHoc, buoiHocMoi])
    }
    setThoiGianInput("")
    setThoiLuongInput("")
    setNoiDungInput("")
    setGhiChuInput("")
  }

  const xuLySuaBuoiHoc = (buoiHoc: BuoiHoc) => {
    setIdBuoiHocDangSua(buoiHoc.id)
    setThoiGianInput(buoiHoc.thoiGian)
    setThoiLuongInput(buoiHoc.thoiLuong.toString())
    setNoiDungInput(buoiHoc.noiDung)
    setGhiChuInput(buoiHoc.ghiChu)
    setMonHocDangChon(buoiHoc.idMonHoc)
  }

  const xuLyDatMucTieu = () => {
    if (!monHocDangChon || !nhapMucTieu) return
    const mucTieuCapNhat = danhSachMucTieu.filter(mt => mt.idMonHoc !== monHocDangChon)
    mucTieuCapNhat.push({ idMonHoc: monHocDangChon, soGioMucTieu: Number(nhapMucTieu) })
    setDanhSachMucTieu(mucTieuCapNhat)
    setNhapMucTieu("")
  }

  const tinhTongSoGio = (idMonHoc: number) => {
    const bayGio = new Date()
    const tongPhut = danhSachBuoiHoc
      .filter(b => {
        const d = new Date(b.thoiGian)
        return b.idMonHoc === idMonHoc && d.getMonth() === bayGio.getMonth() && d.getFullYear() === bayGio.getFullYear()
      })
      .reduce((tong, b) => tong + b.thoiLuong, 0)
    return Number((tongPhut / 60).toFixed(1))
  }

  const layTienDo = (idMonHoc: number) => {
    const mucTieu = danhSachMucTieu.find(mt => mt.idMonHoc === idMonHoc)
    if (!mucTieu || mucTieu.soGioMucTieu === 0) return 0
    const tongGio = tinhTongSoGio(idMonHoc)
    return Math.min((tongGio / mucTieu.soGioMucTieu) * 100, 100)
  }

  const monHocHienTai = danhSachMonHoc.find(m => m.id === monHocDangChon)

  return (
    <div style={{ padding: 20, maxWidth: 1100, margin: "auto", fontFamily: "Arial", color: "#333" }}>
      <h2>Quản lý tiến độ học tập</h2>

      <div style={{ marginBottom: 20 }}>
        <input 
          value={tenMonHocMoi} 
          onChange={e => setTenMonHocMoi(e.target.value)} 
          placeholder="Tên môn học mới" 
          style={{ padding: "8px", width: "200px" }}
        />
        <button onClick={xuLyThemHoacCapNhatMonHoc} style={{ padding: "8px 15px", marginLeft: "5px", cursor: "pointer" }}>
          {idMonHocDangSua ? "Cập nhật tên" : "Thêm môn"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 30 }}>
        {danhSachMonHoc.map(m => {
          const tongGio = tinhTongSoGio(m.id)
          const tienDo = layTienDo(m.id)
          const laMonDangChon = monHocDangChon === m.id
          const mucTieu = danhSachMucTieu.find(mt => mt.idMonHoc === m.id)?.soGioMucTieu || 0

          return (
            <div key={m.id} style={{ 
              border: laMonDangChon ? "2px solid #007bff" : "1px solid #ccc", 
              padding: 15, width: 240, borderRadius: 10,
              backgroundColor: laMonDangChon ? "#f0f7ff" : "#fff"
            }}>
              <h4 style={{ margin: "0 0 10px 0" }}>{m.ten}</h4>
              <p style={{ fontSize: "14px" }}>Thực tế: {tongGio}h / Mục tiêu: {mucTieu}h</p>
              <div style={{ background: "#eee", height: 10, borderRadius: 5, overflow: "hidden", marginBottom: "5px" }}>
                <div style={{ width: `${tienDo}%`, background: tienDo >= 100 ? "#28a745" : "#ffc107", height: "100%" }} />
              </div>
              <p style={{ fontSize: "13px", textAlign: "right", margin: 0 }}>{tienDo.toFixed(0)}%</p>
              <div style={{ marginTop: 15, display: "flex", gap: 5 }}>
                <button onClick={() => xuLySuaMonHoc(m.id, m.ten)} style={{ flex: 1 }}>Sửa</button>
                <button onClick={() => xuLyXoaMonHoc(m.id)} style={{ flex: 1 }}>Xóa</button>
                <button 
                  onClick={() => setMonHocDangChon(m.id)} 
                  style={{ flex: 1.5, backgroundColor: laMonDangChon ? "#007bff" : "", color: laMonDangChon ? "#fff" : "" }}
                >
                  {laMonDangChon ? "Đang chọn" : "Chọn"}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <hr />

      <div style={{ padding: "15px", backgroundColor: "#f8f9fa", borderRadius: "8px", marginBottom: "20px" }}>
        <h3>Thiết lập mục tiêu: {monHocHienTai?.ten || "(Chưa chọn môn)"}</h3>
        <input 
          type="number" 
          disabled={!monHocDangChon}
          placeholder="Số giờ mục tiêu/tháng" 
          value={nhapMucTieu} 
          onChange={e => setNhapMucTieu(e.target.value)} 
          style={{ padding: "8px", width: "150px" }}
        />
        <button 
          disabled={!monHocDangChon} 
          onClick={xuLyDatMucTieu}
          style={{ marginLeft: "10px", padding: "8px 15px" }}
        >
          Đặt mục tiêu
        </button>
      </div>

      <div style={{ padding: "15px", border: "1px solid #dee2e6", borderRadius: "8px" }}>
        <h3>Ghi nhận buổi học: {monHocHienTai?.ten || "(Chưa chọn môn)"}</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input type="datetime-local" value={thoiGianInput} onChange={e => setThoiGianInput(e.target.value)} style={{ padding: "5px" }} />
          <input 
            type="number" 
            placeholder="Số phút học" 
            value={thoiLuongInput} 
            onChange={e => setThoiLuongInput(e.target.value)} 
            style={{ padding: "5px", width: "150px" }}
          />
          <input placeholder="Nội dung" value={noiDungInput} onChange={e => setNoiDungInput(e.target.value)} style={{ padding: "5px", flex: 1 }} />
          <input placeholder="Ghi chú" value={ghiChuInput} onChange={e => setGhiChuInput(e.target.value)} style={{ padding: "5px" }} />
          <button 
            disabled={!monHocDangChon} 
            onClick={xuLyThemHoacCapNhatBuoiHoc}
            style={{ padding: "5px 20px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "4px" }}
          >
            {idBuoiHocDangSua ? "Cập nhật" : "Thêm buổi học"}
          </button>
        </div>
      </div>

      <hr />

      <h3>Nhật ký học tập</h3>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {danhSachBuoiHoc.length === 0 && <p style={{ color: "#888" }}>Chưa có dữ liệu</p>}
        {danhSachBuoiHoc.slice().reverse().map(b => (
          <div key={b.id} style={{ borderBottom: "1px solid #eee", padding: "12px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <b style={{ color: "#007bff" }}>{danhSachMonHoc.find(m => m.id === b.idMonHoc)?.ten}</b>
              <span style={{ margin: "0 10px", color: "#666" }}>|</span>
              <span style={{ fontWeight: "bold" }}>{b.thoiLuong} phút</span>
              <span style={{ margin: "0 10px", color: "#666" }}>|</span>
              <small>{new Date(b.thoiGian).toLocaleString()}</small>
              <div style={{ marginTop: "5px", fontSize: "14px" }}>{b.noiDung} {b.ghiChu && <i style={{ color: "#888" }}>({b.ghiChu})</i>}</div>
            </div>
            <div>
              <button onClick={() => xuLySuaBuoiHoc(b)} style={{ marginRight: "5px" }}>Sửa</button>
              <button onClick={() => setDanhSachBuoiHoc(danhSachBuoiHoc.filter(x => x.id !== b.id))}>Xóa</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Bai2 