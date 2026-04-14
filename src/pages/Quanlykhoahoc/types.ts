export type TrangThai = "dang_mo" | "tam_dung" | "da_ket_thuc"

export interface KhoaHoc {
  id: number
  ten: string
  giangVien: string
  soLuong: number
  moTa: string
  trangThai: TrangThai
}