import { useState, useEffect } from 'react';

export default function quanLyCongViec() {
  const [danhSachCongViec, setDanhSachCongViec] = useState<any[]>(() => {
    const duLieuLuuTru = localStorage.getItem('danhSachCongViec');
    if (duLieuLuuTru) {
      return JSON.parse(duLieuLuuTru);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('danhSachCongViec', JSON.stringify(danhSachCongViec));
  }, [danhSachCongViec]);

  const themCongViec = (congViecMoi: any) => {
    setDanhSachCongViec([...danhSachCongViec, { ...congViecMoi, id: Date.now().toString() }]);
  };

  const capNhatCongViec = (id: string, duLieuMoi: any) => {
    setDanhSachCongViec(danhSachCongViec.map((cv: any) => cv.id === id ? { ...cv, ...duLieuMoi } : cv));
  };

  const xoaCongViec = (id: string) => {
    setDanhSachCongViec(danhSachCongViec.filter((cv: any) => cv.id !== id));
  };

  return {
    danhSachCongViec,
    setDanhSachCongViec,
    themCongViec,
    capNhatCongViec,
    xoaCongViec,
  };
}
