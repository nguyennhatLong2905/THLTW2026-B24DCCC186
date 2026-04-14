import { useState } from "react"
import { KhoaHoc, TrangThai } from "./types"
import * as api from "./service"
import BangKhoaHoc from "./component/BangKhoaHoc"
import FormKhoaHoc from "./component/FormKhoaHoc"
import LocKhoaHoc from "./component/LocKhoaHoc"

export default function QuanLyKhoaHoc() {
  const [ds, setDs] = useState<KhoaHoc[]>(api.layDanhSach())
  const [tuKhoa, setTuKhoa] = useState("")
  const [giangVien, setGiangVien] = useState("")
  const [trangThai, setTrangThai] = useState<TrangThai | "">("")
  const [chon, setChon] = useState<KhoaHoc | null>(null)

  const capNhat = () => setDs([...api.layDanhSach()])

  let loc = ds.filter(i => i.ten.toLowerCase().includes(tuKhoa.toLowerCase()))
  if (giangVien) loc = loc.filter(i => i.giangVien === giangVien)
  if (trangThai) loc = loc.filter(i => i.trangThai === trangThai)
  loc = loc.sort((a, b) => b.soLuong - a.soLuong)

  const handleAddCourse = (kh: KhoaHoc) => {
    api.them(kh)
    capNhat()
    setChon(null)
  }

  const handleUpdateCourse = (kh: KhoaHoc) => {
    api.sua(kh)
    capNhat()
    setChon(null)
  }

  const handleDeleteCourse = (id: number) => {
    api.xoa(id)
    capNhat()
    setChon(null)
  }

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ marginBottom: "30px" }}>
        <h1 style={{ marginTop: 0, marginBottom: "10px", color: "#333", fontSize: "28px", fontWeight: "700" }}>
          Quản Lý Khóa Học
        </h1>
        <div style={{ height: "3px", width: "50px", backgroundColor: "#D32F2F", borderRadius: "2px" }}></div>
      </div>

      <FormKhoaHoc
        ds={ds}
        them={handleAddCourse}
        sua={handleUpdateCourse}
        chon={chon}
      />

      <LocKhoaHoc
        tuKhoa={tuKhoa}
        setTuKhoa={setTuKhoa}
        giangVien={giangVien}
        setGiangVien={setGiangVien}
        trangThai={trangThai}
        setTrangThai={setTrangThai}
      />

      <BangKhoaHoc
        ds={loc}
        chon={chon => {
          setChon(chon)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
        xoa={handleDeleteCourse}
      />
    </div>
  )
}
