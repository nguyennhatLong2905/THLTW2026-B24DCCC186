import { useState, useEffect } from "react"
import { KhoaHoc, TrangThai } from "../types"

const TEACHERS = ["A", "B", "C", "D", "E"]
const MAX_COURSE_NAME_LENGTH = 100

interface Props {
  ds: KhoaHoc[]
  them: (kh: KhoaHoc) => void
  sua: (kh: KhoaHoc) => void
  chon?: KhoaHoc | null
}

export default function FormKhoaHoc(p: Props) {
  const [id, setId] = useState(0)
  const [ten, setTen] = useState("")
  const [giangVien, setGiangVien] = useState(TEACHERS[0])
  const [soLuong, setSoLuong] = useState(0)
  const [moTa, setMoTa] = useState("")
  const [trangThai, setTrangThai] = useState<TrangThai>("dang_mo")
  const [error, setError] = useState("")
  const isEditing = !!p.chon

  useEffect(() => {
    if (p.chon) {
      setId(p.chon.id)
      setTen(p.chon.ten)
      setGiangVien(p.chon.giangVien)
      setSoLuong(p.chon.soLuong)
      setMoTa(p.chon.moTa)
      setTrangThai(p.chon.trangThai)
      setError("")
    }
  }, [p.chon])

  const resetForm = () => {
    setId(0)
    setTen("")
    setGiangVien(TEACHERS[0])
    setSoLuong(0)
    setMoTa("")
    setTrangThai("dang_mo")
    setError("")
  }

  const validateForm = (): boolean => {
    if (!ten.trim()) {
      setError("Vui lòng nhập tên khóa học")
      return false
    }
    if (ten.length > MAX_COURSE_NAME_LENGTH) {
      setError(`Tên khóa học tối đa ${MAX_COURSE_NAME_LENGTH} ký tự`)
      return false
    }
    if (p.ds.some(i => i.ten.toLowerCase() === ten.toLowerCase() && i.id !== id)) {
      setError("Tên khóa học này đã tồn tại")
      return false
    }
    if (!giangVien) {
      setError("Vui lòng chọn giảng viên")
      return false
    }
    if (!Number.isInteger(soLuong)) {
      setError("Số học viên phải là số nguyên")
      return false
    }
    if (soLuong < 0) {
      setError("Số học viên phải là số nguyên dương (≥ 0)")
      return false
    }
    setError("")
    return true
  }

  const submit = () => {
    if (!validateForm()) return

    const kh: KhoaHoc = { id: id || Date.now(), ten, giangVien, soLuong, moTa, trangThai }

    if (p.chon) {
      p.sua(kh)
      alert("Cập nhật khóa học thành công")
    } else {
      p.them(kh)
      alert("Thêm khóa học thành công")
    }

    resetForm()
  }

  return (
    <div style={{ padding: "25px", backgroundColor: "#ffffff", borderRadius: "8px", marginBottom: "25px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
      <h3 style={{ marginTop: 0, marginBottom: "20px", color: "#333", fontSize: "18px" }}>
        {isEditing ? "Chỉnh Sửa Khóa Học" : "Thêm Khóa Học Mới"}
      </h3>

      {error && (
        <div
          style={{
            color: "#D32F2F",
            marginBottom: "15px",
            padding: "12px 15px",
            backgroundColor: "#FFEBEE",
            borderRadius: "6px",
            fontSize: "14px",
            borderLeft: "4px solid #D32F2F",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px", color: "#333" }}>
          Tên Khóa Học (Tối đa {MAX_COURSE_NAME_LENGTH} ký tự)
        </label>
        <input
          type="text"
          value={ten}
          onChange={e => setTen(e.target.value)}
          placeholder="Nhập tên khóa học"
          maxLength={MAX_COURSE_NAME_LENGTH}
          style={{
            width: "100%",
            padding: "10px 12px",
            boxSizing: "border-box",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
            fontSize: "14px",
            fontFamily: "inherit",
            transition: "border-color 0.2s",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "#d32f2f")}
          onBlur={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
        />
        <small style={{ display: "block", marginTop: "5px", color: "#999", fontSize: "12px" }}>
          {ten.length}/{MAX_COURSE_NAME_LENGTH}
        </small>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px", color: "#333" }}>
          Giảng Viên
        </label>
        <select
          value={giangVien}
          onChange={e => setGiangVien(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            boxSizing: "border-box",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
            fontSize: "14px",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "#d32f2f")}
          onBlur={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
        >
          {TEACHERS.map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px", color: "#333" }}>
          Số Học Viên
        </label>
        <input
          type="number"
          value={soLuong}
          onChange={e => {
            const val = e.target.value
            if (val === "") {
              setSoLuong(0)
            } else {
              const num = Number(val)
              if (Number.isInteger(num) && num >= 0) {
                setSoLuong(num)
              }
            }
          }}
          min="0"
          step="1"
          style={{
            width: "100%",
            padding: "10px 12px",
            boxSizing: "border-box",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
            fontSize: "14px",
            fontFamily: "inherit",
            transition: "border-color 0.2s",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "#d32f2f")}
          onBlur={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
        />
        <small style={{ display: "block", marginTop: "5px", color: "#999", fontSize: "12px" }}>
          Vui lòng nhập số nguyên dương (≥ 0)
        </small>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px", color: "#333" }}>
          Mô Tả Khóa Học
        </label>
        <textarea
          value={moTa}
          onChange={e => setMoTa(e.target.value)}
          placeholder="Nhập mô tả khóa học"
          rows={4}
          style={{
            width: "100%",
            padding: "10px 12px",
            boxSizing: "border-box",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
            fontSize: "14px",
            fontFamily: "inherit",
            resize: "vertical",
            transition: "border-color 0.2s",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "#d32f2f")}
          onBlur={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px", color: "#333" }}>
          Trạng Thái
        </label>
        <select
          value={trangThai}
          onChange={e => setTrangThai(e.target.value as TrangThai)}
          style={{
            width: "100%",
            padding: "10px 12px",
            boxSizing: "border-box",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
            fontSize: "14px",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "#d32f2f")}
          onBlur={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
        >
          <option value="dang_mo">Đang mở</option>
          <option value="tam_dung">Tạm dừng</option>
          <option value="da_ket_thuc">Đã kết thúc</option>
        </select>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={submit}
          style={{
            padding: "10px 24px",
            backgroundColor: "#D32F2F",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            transition: "background-color 0.2s",
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = "#B71C1C")}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = "#D32F2F")}
        >
          {isEditing ? "Cập Nhật" : "Thêm Mới"}
        </button>
        <button
          onClick={resetForm}
          style={{
            padding: "10px 24px",
            backgroundColor: "#f0f0f0",
            color: "#333",
            border: "1px solid #e0e0e0",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "14px",
            transition: "background-color 0.2s",
          }}
          onMouseOver={e => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
          onMouseOut={e => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
        >
          Xóa Form
        </button>
      </div>
    </div>
  )
}