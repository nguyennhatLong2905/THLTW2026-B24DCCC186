# Quản Lý Khóa Học - Course Management System

## ✅ Tính Năng Đã Cài Đặt

### 1. Hiển Thị Danh Sách Khóa Học ✓
- **ID khóa học**: Mã định danh duy nhất
- **Tên khóa học**: Tên có ý nghĩa 
- **Giảng viên**: Người giảng dạy
- **Số lượng học viên**: Số học viên hiện tại
- **Trạng thái**: Đang mở / Tạm dừng / Đã kết thúc
- **Hành động**: Nút Sửa và Xóa

### 2. Tìm Kiếm Khóa Học ✓
- Tìm kiếm theo **tên khóa học** (không phân biệt hoa/thường)
- Hiển thị kết quả tức thời

### 3. Bộ Lọc Nâng Cao ✓
- Lọc theo **giảng viên** (Dropdown danh sách)
- Lọc theo **trạng thái** (Đang mở / Tạm dừng / Đã kết thúc)
- Có thể kết hợp nhiều bộ lọc cùng lúc

### 4. Sắp Xếp Khóa Học ✓
- Sắp xếp theo **số lượng học viên** (từ cao xuống thấp)
- Tự động áp dụng khi lọc

### 5. Thêm Khóa Học Mới ✓
- **Tên khóa học**: Tối đa 100 ký tự (có bộ đếm)
- **Giảng viên**: Dropdown danh sách (A, B, C, D, E)
- **Số lượng học viên**: Input number (tối thiểu 0)
- **Mô tả khóa học**: Textarea cho mô tả chi tiết
- **Trạng thái**: Dropdown chọn (Đang mở / Tạm dừng / Đã kết thúc)
- **Nút Xóa Form**: Để reset dữ liệu nhập

### 6. Kiểm Tra Dữ Liệu Nhập ✓
- ✓ Không để tên khóa học trống
- ✓ Tên khóa học không vượt quá 100 ký tự
- ✓ Tên khóa học không được trùng (case-insensitive)
- ✓ Giảng viên bắt buộc chọn
- ✓ Số lượng học viên không được âm
- ✓ Thông báo lỗi chi tiết cho người dùng

### 7. Chỉnh Sửa Khóa Học ✓
- Click vào nút "Sửa" để tải dữ liệu vào form
- Form sẽ hiển thị "Chỉnh Sửa Khóa Học"
- Tất cả dữ liệu được tải sẵn
- Nhấn "Cập Nhật" để lưu thay đổi
- Screen tự động scroll lên form

### 8. Xóa Khóa Học Có Kiểm Tra ✓
- **Chỉ cho phép xóa khóa học chưa có học viên** 
  - Nếu `soLuong > 0`: Hiển thị cảnh báo "Không thể xóa khóa học đã có học viên!"
  - Nếu `soLuong === 0`: Cho phép xóa
- **Xác nhận trước khi xóa**
  - Hiển thị dialog confirm với tên khóa học
  - Chỉ xóa khi người dùng xác nhận

### 9. Hiển Thị Thông Báo Kết Quả ✓
- "Thêm khóa học thành công"
- "Cập nhật khóa học thành công"
- "Không thể xóa khóa học đã có học viên!"

## 📁 Cấu Trúc File

```
src/pages/Quanlykhoahoc/
├── index.tsx                 # Component chính, quản lý state
├── types.ts                  # Định nghĩa TypeScript interfaces & types
├── service.ts                # API service, quản lý data
├── component/
│   ├── BangKhoaHoc.tsx      # Bảng hiển thị khóa học
│   ├── FormKhoaHoc.tsx      # Form thêm/sửa khóa học
│   └── LocKhoaHoc.tsx       # Component bộ lọc & tìm kiếm
└── README.md                 # Tài liệu này
```

## 🔧 Công Nghệ Sử Dụng

- **React 18+**: Framework UI
- **TypeScript**: Type-safe JavaScript
- **React Hooks**: useState, useEffect
- **CSS-in-JS**: Style inline (có thể tách ra file CSS)

## 📊 Data Structure

### KhoaHoc Interface
```typescript
interface KhoaHoc {
  id: number                  // ID duy nhất
  ten: string                 // Tên khóa học
  giangVien: string           // Giảng viên giảng dạy
  soLuong: number             // Số lượng học viên
  moTa: string                // Mô tả chi tiết
  trangThai: TrangThai        // Đang mở / Tạm dừng / Đã kết thúc
}

type TrangThai = "dang_mo" | "tam_dung" | "da_ket_thuc"
```

## 💾 Dữ Liệu Mẫu

Hệ thống được khởi tạo với 2 khóa học mẫu:
1. **TypeScript Cơ Bản** - Giảng viên A - 5 học viên - Đang mở
2. **React Advanced** - Giảng viên B - 0 học viên - Tạm dừng

## 🚀 Cải Tiến Thực Hiện

1. ✅ **Giao diện cải thiện**: Thêm styling, layout rõ ràng
2. ✅ **Thông báo lỗi chi tiết**: Giúp người dùng hiểu vấn đề
3. ✅ **Bộ đếm ký tự**: Cho phép theo dõi độ dài tên khóa học
4. ✅ **Reset form**: Nút để xóa dữ liệu nhập
5. ✅ **Auto scroll**: Tự động scroll lên form khi sửa
6. ✅ **Kiểm tra duplicates**: Case-insensitive
7. ✅ **Vietnamese UI**: Tất cả nhãn là tiếng Việt
8. ✅ **Danh sách giáo viên linh hoạt**: Dính định nghĩa TEACHERS
9. ✅ **Sample data**: Dữ liệu mẫu để test

## 🎯 Hướng Dẫn Sử Dụng

### Thêm Khóa Học
1. Điền tên khóa học (tối đa 100 ký tự)
2. Chọn giảng viên
3. Nhập số học viên
4. Nhập mô tả (tùy chọn)
5. Chọn trạng thái
6. Click "Thêm Mới"

### Tìm Kiếm
- Gõ tên trong ô "Tìm Kiếm Theo Tên" - kết quả cập nhật tức thời

### Lọc
- Chọn giảng viên và/hoặc trạng thái
- Kết quả được lọc tự động, vẫn giữ tính năng tìm kiếm

### Sửa Khóa Học
1. Click nút "Sửa" trên dòng khóa học
2. Dữ liệu sẽ tải vào form (scroll lên tự động)
3. Chỉnh sửa dữ liệu cần thiết
4. Click "Cập Nhật"
5. Form sẽ reset

### Xóa Khóa Học
1. Click nút "Xóa" (chỉ có thể xóa nếu soLuong = 0)
2. Xác nhận trong dialog
3. Khóa học sẽ bị xóa

---

**Lần cập nhật cuối**: 14/04/2026
**Trạng thái**: ✅ Hoàn thành tất cả yêu cầu
