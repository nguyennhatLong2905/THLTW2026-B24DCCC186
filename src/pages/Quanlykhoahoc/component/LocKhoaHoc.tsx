import { TrangThai } from "../types"

const TEACHERS = ["A", "B", "C", "D", "E"]

interface Props {
  tuKhoa: string
  setTuKhoa: (v: string) => void
  giangVien: string
  setGiangVien: (v: string) => void
  trangThai: TrangThai | ""
  setTrangThai: (v: TrangThai | "") => void
}

export default function LocKhoaHoc(p: Props) {
  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "20px",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        alignItems: "flex-end",
      }}
    >
      <div style={{ flex: "1", minWidth: "200px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px", color: "#333" }}>
          Tìm Kiếm Theo Tên
        </label>
        <input
          placeholder="Nhập tên khóa học"
          value={p.tuKhoa}
          onChange={e => p.setTuKhoa(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            boxSizing: "border-box",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
            fontSize: "14px",
            transition: "border-color 0.2s",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "#d32f2f")}
          onBlur={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
        />
      </div>

      <div style={{ flex: "1", minWidth: "200px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px", color: "#333" }}>
          Lọc Theo Giảng Viên
        </label>
        <select
          value={p.giangVien}
          onChange={e => p.setGiangVien(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            boxSizing: "border-box",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
            fontSize: "14px",
            backgroundColor: "#ffffff",
            cursor: "pointer",
          }}
        >
          <option value="">-- Tất Cả Giảng Viên --</option>
          {TEACHERS.map(t => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div style={{ flex: "1", minWidth: "200px" }}>
        <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", fontSize: "14px", color: "#333" }}>
          Lọc Theo Trạng Thái
        </label>
        <select
          value={p.trangThai}
          onChange={e => p.setTrangThai((e.target.value as TrangThai) || "")}
          style={{
            width: "100%",
            padding: "10px 12px",
            boxSizing: "border-box",
            borderRadius: "6px",
            border: "1px solid #e0e0e0",
            fontSize: "14px",
            backgroundColor: "#ffffff",
            cursor: "pointer",
          }}
        >
          <option value="">-- Tất Cả Trạng Thái --</option>
          <option value="dang_mo">Đang mở</option>
          <option value="tam_dung">Tạm dừng</option>
          <option value="da_ket_thuc">Đã kết thúc</option>
        </select>
      </div>
    </div>
  )
}