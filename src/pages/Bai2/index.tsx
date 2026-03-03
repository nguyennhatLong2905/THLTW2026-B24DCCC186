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
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const mainFont = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"

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

  const xuLySuaMonHoc = (e: React.MouseEvent, id: number, ten: string) => {
    e.stopPropagation()
    setIdMonHocDangSua(id)
    setTenMonHocMoi(ten)
  }

  const xuLyXoaMonHoc = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
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
    <div style={{ backgroundColor: "#f3f4f6", minHeight: "100vh", padding: "40px 20px", fontFamily: mainFont }}>
      <div style={{ maxWidth: "1400px", margin: "auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "32px", color: "#111827", margin: 0, fontWeight: "700", letterSpacing: "-0.025em" }}>📊 Quản lý học tập</h1>
          <div style={{ display: "flex", gap: "15px" }}>
            <input 
              value={tenMonHocMoi} 
              onChange={e => setTenMonHocMoi(e.target.value)} 
              placeholder="Tên môn học mới..." 
              style={{ padding: "12px 18px", borderRadius: "10px", border: "1px solid #d1d5db", width: "280px", outline: "none", fontSize: "16px", fontFamily: mainFont }}
            />
            <button onClick={xuLyThemHoacCapNhatMonHoc} style={{ padding: "12px 25px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "600", fontSize: "16px", fontFamily: mainFont }}>
              {idMonHocDangSua ? "Cập nhật" : "Thêm môn"}
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "25px", marginBottom: "40px" }}>
          {danhSachMonHoc.map(m => {
            const tongGio = tinhTongSoGio(m.id)
            const tienDo = layTienDo(m.id)
            const laMonDangChon = monHocDangChon === m.id
            const mucTieu = danhSachMucTieu.find(mt => mt.idMonHoc === m.id)?.soGioMucTieu || 0
            const isHovered = hoveredId === m.id
            const isOtherHovered = hoveredId !== null && hoveredId !== m.id

            return (
              <div 
                key={m.id} 
                onClick={() => setMonHocDangChon(m.id)}
                onMouseEnter={() => setHoveredId(m.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ 
                  backgroundColor: "white", 
                  border: laMonDangChon ? "3px solid #007bff" : "1px solid #e5e7eb", 
                  padding: "24px", 
                  borderRadius: "16px", 
                  boxShadow: isHovered ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)" : "0 2px 4px rgba(0,0,0,0.05)",
                  transform: isHovered ? "scale(1.05) translateY(-10px)" : "scale(1) translateY(0)",
                  opacity: isOtherHovered ? 0.4 : 1,
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", 
                  cursor: "pointer",
                  zIndex: isHovered ? 10 : 1,
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {isHovered && !laMonDangChon && (
                  <div style={{
                    position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
                    backgroundColor: "rgba(0, 123, 255, 0.1)", display: "flex",
                    alignItems: "center", justifyContent: "center", zIndex: 2
                  }}>
                    <span style={{ 
                      backgroundColor: "#007bff", color: "white", padding: "8px 24px", 
                      borderRadius: "50px", fontWeight: "800", fontSize: "14px",
                      boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
                      animation: "fadeInUp 0.3s ease-out"
                    }}>CHỌN MÔN</span>
                  </div>
                )}

                <div style={{ filter: isHovered && !laMonDangChon ? "blur(2px)" : "none", transition: "filter 0.3s" }}>
                  <h4 style={{ margin: "0 0 12px 0", fontSize: "22px", color: "#111827", fontWeight: "700" }}>{m.ten}</h4>
                  <p style={{ fontSize: "16px", color: "#4b5563" }}>Thực tế: <b>{tongGio}h</b> / Mục tiêu: {mucTieu}h</p>
                  <div style={{ background: "#f3f4f6", height: "12px", borderRadius: "6px", overflow: "hidden", margin: "16px 0" }}>
                    <div style={{ width: `${tienDo}%`, background: tienDo >= 100 ? "#10b981" : "#007bff", height: "100%" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "15px", fontWeight: "700", color: tienDo >= 100 ? "#059669" : "#007bff" }}>{tienDo.toFixed(0)}% hoàn thành</span>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button onClick={(e) => xuLySuaMonHoc(e, m.id, m.ten)} style={{ padding: "8px 14px", border: "1px solid #d1d5db", background: "white", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: "600", fontFamily: mainFont, position: "relative", zIndex: 3 }}>Sửa</button>
                      <button onClick={(e) => xuLyXoaMonHoc(e, m.id)} style={{ padding: "8px 14px", border: "none", background: "#fee2e2", color: "#dc2626", borderRadius: "8px", fontSize: "14px", cursor: "pointer", fontWeight: "600", fontFamily: mainFont, position: "relative", zIndex: 3 }}>Xóa</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", minHeight: "75vh" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
              <h3 style={{ marginTop: 0, marginBottom: "20px", fontSize: "20px", fontWeight: "700", color: "#111827" }}>
                🎯 Thiết lập mục tiêu: {monHocDangChon ? <span style={{color: "#007bff"}}>{monHocHienTai?.ten}</span> : <span style={{color: "#9ca3af", fontStyle: "italic", fontWeight: "400"}}>vui lòng chọn môn</span>}
              </h3>
              <div style={{ display: "flex", gap: "12px" }}>
                <input 
                  type="number" 
                  disabled={!monHocDangChon}
                  placeholder="Giờ mục tiêu/tháng" 
                  value={nhapMucTieu} 
                  onChange={e => setNhapMucTieu(e.target.value)} 
                  style={{ padding: "15px", borderRadius: "12px", border: "1px solid #d1d5db", flex: 1, outline: "none", fontSize: "16px", fontFamily: mainFont }}
                />
                <button disabled={!monHocDangChon} onClick={xuLyDatMucTieu} style={{ padding: "0 35px", backgroundColor: "#1f2937", color: "white", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "700", fontSize: "16px", fontFamily: mainFont }}>Lưu</button>
              </div>
            </div>

            <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", flex: 1 }}>
              <h3 style={{ marginTop: 0, marginBottom: "25px", fontSize: "20px", fontWeight: "700", color: "#111827" }}>📝 Ghi nhận buổi học: {monHocDangChon ? <span style={{color: "#10b981"}}>{monHocHienTai?.ten}</span> : <span style={{color: "#9ca3af", fontStyle: "italic", fontWeight: "400"}}>vui lòng chọn môn</span>}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "14px", fontWeight: "700", color: "#374151" }}>Thời gian</label>
                      <input type="datetime-local" value={thoiGianInput} onChange={e => setThoiGianInput(e.target.value)} style={{ padding: "15px", borderRadius: "12px", border: "1px solid #d1d5db", fontSize: "16px", fontFamily: mainFont }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ fontSize: "14px", fontWeight: "700", color: "#374151" }}>Số phút</label>
                      <input type="number" placeholder="Ví dụ: 90" value={thoiLuongInput} onChange={e => setThoiLuongInput(e.target.value)} style={{ padding: "15px", borderRadius: "12px", border: "1px solid #d1d5db", fontSize: "16px", fontFamily: mainFont }} />
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: "700", color: "#374151" }}>Nội dung học</label>
                  <input placeholder="Hôm nay bạn học những gì?" value={noiDungInput} onChange={e => setNoiDungInput(e.target.value)} style={{ padding: "15px", borderRadius: "12px", border: "1px solid #d1d5db", fontSize: "16px", fontFamily: mainFont }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: "700", color: "#374151" }}>Ghi chú</label>
                  <input placeholder="Ghi chú nhanh..." value={ghiChuInput} onChange={e => setGhiChuInput(e.target.value)} style={{ padding: "15px", borderRadius: "12px", border: "1px solid #d1d5db", fontSize: "16px", fontFamily: mainFont }} />
                </div>
                <button 
                  disabled={!monHocDangChon} 
                  onClick={xuLyThemHoacCapNhatBuoiHoc}
                  style={{ padding: "18px", backgroundColor: monHocDangChon ? "#10b981" : "#d1d5db", color: "white", border: "none", borderRadius: "12px", fontWeight: "800", cursor: "pointer", fontSize: "18px", fontFamily: mainFont, marginTop: "10px" }}
                >
                  {idBuoiHocDangSua ? "CẬP NHẬT BUỔI HỌC" : "LƯU VÀO NHẬT KÝ"}
                </button>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
            <h3 style={{ marginTop: 0, marginBottom: "25px", fontSize: "22px", fontWeight: "700", color: "#111827", borderBottom: "2px solid #f3f4f6", paddingBottom: "15px" }}>📜 Nhật ký học tập</h3>
            <div style={{ overflowY: "auto", flex: 1, paddingRight: "10px" }}>
              {danhSachBuoiHoc.length === 0 && <p style={{ color: "#9ca3af", textAlign: "center", marginTop: "100px", fontSize: "18px" }}>Chưa có nhật ký nào.</p>}
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "15px" }}>
                {danhSachBuoiHoc.slice().reverse().map(b => (
                  <div key={b.id} style={{ border: "1px solid #e5e7eb", padding: "20px", borderRadius: "16px", display: "flex", justifyContent: "space-between", alignItems: "start", backgroundColor: "#f9fafb" }}>
                    <div style={{flex: 1}}>
                      <div style={{display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px"}}>
                        <span style={{ color: "#007bff", fontWeight: "800", fontSize: "18px" }}>{danhSachMonHoc.find(m => m.id === b.idMonHoc)?.ten}</span>
                        <span style={{ fontSize: "13px", padding: "4px 12px", backgroundColor: "#eff6ff", color: "#1d4ed8", borderRadius: "8px", fontWeight: "700" }}>{b.thoiLuong} phút</span>
                      </div>
                      <small style={{ color: "#6b7280", display: "block", marginBottom: "10px", fontSize: "14px", fontWeight: "500" }}>📅 {new Date(b.thoiGian).toLocaleString('vi-VN')}</small>
                      <div style={{ fontSize: "16px", color: "#374151", lineHeight: "1.6" }}><b>Nội dung:</b> {b.noiDung}</div>
                      {b.ghiChu && <div style={{ fontSize: "15px", color: "#6b7280", fontStyle: "italic", marginTop: "6px" }}>Ghi chú: {b.ghiChu}</div>}
                    </div>
                    <div style={{ display: "flex", gap: "10px", marginLeft: "15px" }}>
                      <button onClick={() => xuLySuaBuoiHoc(b)} style={{ border: "none", background: "#ffffff", color: "#007bff", cursor: "pointer", fontSize: "14px", fontWeight: "700", padding: "8px 15px", borderRadius: "8px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>Sửa</button>
                      <button onClick={() => setDanhSachBuoiHoc(danhSachBuoiHoc.filter(x => x.id !== b.id))} style={{ border: "none", background: "#fee2e2", color: "#dc2626", cursor: "pointer", fontSize: "14px", fontWeight: "700", padding: "8px 15px", borderRadius: "8px" }}>Xóa</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default Bai2