import { KhoaHoc } from "./types"

const initialData: KhoaHoc[] = [
  {
    id: 1,
    ten: "TypeScript Cơ Bản",
    giangVien: "A",
    soLuong: 5,
    moTa: "Khóa học giới thiệu về TypeScript",
    trangThai: "dang_mo",
  },
  {
    id: 2,
    ten: "React Advanced",
    giangVien: "B",
    soLuong: 0,
    moTa: "Khóa học nâng cao React",
    trangThai: "tam_dung",
  },
]

let ds: KhoaHoc[] = [...initialData]

export const layDanhSach = () => ds

export const them = (kh: KhoaHoc) => {
  if (ds.some(i => i.id === kh.id)) {
    const index = ds.findIndex(i => i.id === kh.id)
    ds[index] = kh
  } else {
    ds.push(kh)
  }
}

export const sua = (kh: KhoaHoc) => {
  ds = ds.map(i => (i.id === kh.id ? kh : i))
}

export const xoa = (id: number) => {
  ds = ds.filter(i => i.id !== id)
}

export const resetData = () => {
  ds = [...initialData]
}