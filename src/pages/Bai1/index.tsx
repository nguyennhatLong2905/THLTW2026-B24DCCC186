import React, { useState } from 'react';

const Bai1: React.FC = () => {
  const [soBiMat, setSoBiMat] = useState<number>(
    Math.floor(Math.random() * 100) + 1
  );

  const [soLuotConLai, setSoLuotConLai] = useState<number>(10);

  const [giaTriNguoiChoiNhap, setGiaTriNguoiChoiNhap] =
    useState<string>('');

  const [thongBaoHienThi, setThongBaoHienThi] =
    useState<string>('');

  const xuLyDoanSo = () => {
    const soNguoiChoiDoan = Number(giaTriNguoiChoiNhap);

    if (!giaTriNguoiChoiNhap) {
      setThongBaoHienThi('Vui lòng nhập một số trước khi đoán!');
      return;
    }

    if (soNguoiChoiDoan < 1 || soNguoiChoiDoan > 100) {
      setThongBaoHienThi('Số phải nằm trong khoảng từ 1 đến 100!');
      return;
    }

    if (soNguoiChoiDoan === soBiMat) {
      setThongBaoHienThi('Chúc mừng! Bạn đã đoán đúng!');
      return;
    }

    if (soLuotConLai <= 1) {
      setThongBaoHienThi(
        `Bạn đã hết lượt! Số đúng là ${soBiMat}`
      );
      setSoLuotConLai(0);
      return;
    }

    if (soNguoiChoiDoan > soBiMat) {
      setThongBaoHienThi('Số bạn đoán lớn hơn số cần tìm.');
    } else {
      setThongBaoHienThi('Số bạn đoán nhỏ hơn số cần tìm.');
    }

    setSoLuotConLai(soLuotConLai - 1);
    setGiaTriNguoiChoiNhap('');
  };

  const xuLyChoiLai = () => {
    setSoBiMat(Math.floor(Math.random() * 100) + 1);
    setSoLuotConLai(10);
    setGiaTriNguoiChoiNhap('');
    setThongBaoHienThi('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Trò chơi đoán số (1 - 100)</h1>

      {/* Hiển thị luật chơi */}
      <div style={{ marginBottom: 20 }}>
        <h3>Luật chơi:</h3>
        <ul>
          <li>Hệ thống sẽ tạo ngẫu nhiên một số từ 1 đến 100.</li>
          <li>Bạn sẽ có 10 lượt để đoán số đó.</li>
          <li>
            Sau mỗi lần đoán, hệ thống sẽ cho biết số bạn nhập
            lớn hơn hay nhỏ hơn.
          </li>
          <li>Nếu hết lượt mà chưa đoán đúng, bạn sẽ thua.</li>
        </ul>
      </div>

      <p><strong>Số lượt còn lại: {soLuotConLai}</strong></p>

      <input
        type="number"
        value={giaTriNguoiChoiNhap}
        onChange={(e) =>
          setGiaTriNguoiChoiNhap(e.target.value)
        }
        disabled={soLuotConLai === 0}
      />

      <div style={{ marginTop: 10 }}>
        <button
          onClick={xuLyDoanSo}
          disabled={soLuotConLai === 0}
        >
          Đoán
        </button>

        <button
          onClick={xuLyChoiLai}
          style={{ marginLeft: 10 }}
        >
          Chơi lại
        </button>
      </div>

      <p style={{ marginTop: 20, fontWeight: 'bold' }}>
        {thongBaoHienThi}
      </p>
    </div>
  );
};

export default Bai1;