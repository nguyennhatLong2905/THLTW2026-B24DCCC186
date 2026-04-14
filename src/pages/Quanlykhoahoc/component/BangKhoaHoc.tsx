import { KhoaHoc, TrangThai } from "../types"

interface Props {
  ds: KhoaHoc[]
  xoa: (id: number) => void
  chon: (kh: KhoaHoc) => void
}

const getTrangThaiLabel = (status: TrangThai): string => {
  const labels: Record<TrangThai, string> = {
    dang_mo: "Đang mở",
    tam_dung: "Tạm dừng",
    da_ket_thuc: "Đã kết thúc",
  }
  return labels[status]
}

const getTrangThaiColor = (status: TrangThai): string => {
  const colors: Record<TrangThai, string> = {
    dang_mo: "#4CAF50",
    tam_dung: "#FFA500",
    da_ket_thuc: "#999",
  }
  return colors[status]
}

export default function BangKhoaHoc(p: Props) {
  const handleDelete = (course: KhoaHoc) => {
    if (course.soLuong > 0) {
      alert("Không thể xóa khóa học đã có học viên!")
      return
    }
    if (window.confirm(`Bạn có chắc chắn muốn xóa khóa học "${course.ten}" không?`)) {
      p.xoa(course.id)
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h3 style={{ marginBottom: "15px", color: "#333" }}>Danh Sách Khóa Học</h3>
      <div style={{ overflowX: "auto", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5", borderBottom: "2px solid #e0e0e0" }}>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#333", fontSize: "14px" }}>ID</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#333", fontSize: "14px" }}>Tên Khóa Học</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#333", fontSize: "14px" }}>Giảng Viên</th>
              <th style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: "#333", fontSize: "14px" }}>Số Học Viên</th>
              <th style={{ padding: "12px", textAlign: "left", fontWeight: "600", color: "#333", fontSize: "14px" }}>Trạng Thái</th>
              <th style={{ padding: "12px", textAlign: "center", fontWeight: "600", color: "#333", fontSize: "14px" }}>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {p.ds.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "30px", color: "#999", borderBottom: "1px solid #e0e0e0" }}>
                  Không có khóa học nào
                </td>
              </tr>
            ) : (
              p.ds.map((course, idx) => (
                <tr key={course.id} style={{ borderBottom: "1px solid #e0e0e0", backgroundColor: idx % 2 === 0 ? "#ffffff" : "#fafafa" }}>
                  <td style={{ padding: "12px", color: "#333", fontSize: "14px" }}>{course.id}</td>
                  <td style={{ padding: "12px", color: "#333", fontSize: "14px", fontWeight: "500" }}>{course.ten}</td>
                  <td style={{ padding: "12px", color: "#666", fontSize: "14px" }}>{course.giangVien}</td>
                  <td style={{ padding: "12px", textAlign: "center", color: "#333", fontSize: "14px" }}>{course.soLuong}</td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: "4px",
                        backgroundColor: getTrangThaiColor(course.trangThai) + "20",
                        color: getTrangThaiColor(course.trangThai),
                        fontSize: "13px",
                        fontWeight: "500",
                      }}
                    >
                      {getTrangThaiLabel(course.trangThai)}
                    </span>
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      onClick={() => p.chon(course)}
                      style={{
                        marginRight: "8px",
                        padding: "6px 12px",
                        cursor: "pointer",
                        backgroundColor: "#1976D2",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "13px",
                        fontWeight: "500",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={e => (e.currentTarget.style.backgroundColor = "#0D47A1")}
                      onMouseOut={e => (e.currentTarget.style.backgroundColor = "#1976D2")}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(course)}
                      style={{
                        padding: "6px 12px",
                        cursor: "pointer",
                        backgroundColor: "#D32F2F",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "13px",
                        fontWeight: "500",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={e => (e.currentTarget.style.backgroundColor = "#B71C1C")}
                      onMouseOut={e => (e.currentTarget.style.backgroundColor = "#D32F2F")}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}