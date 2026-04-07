import React, { createContext, useContext, useEffect, useState } from 'react'

const DuLichContext = createContext<any>(null)

const duLieuMacDinh = [
    {
        ma: 'DD01',
        ten: 'Vịnh Hạ Long',
        diaDiem: 'Quảng Ninh',
        loai: 'Biển',
        hinhAnh: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
        moTa: 'Vịnh Hạ Long là điểm đến nổi tiếng với hàng nghìn hòn đảo đá vôi kỳ vĩ, thích hợp nghỉ dưỡng và tham quan bằng du thuyền.',
        rating: 5,
        thoiGianThamQuan: 8,
        chiPhiAnUong: 600000,
        chiPhiLuuTru: 1500000,
        chiPhiDiChuyen: 800000,
    },
    {
        ma: 'DD02',
        ten: 'Sa Pa',
        diaDiem: 'Lào Cai',
        loai: 'Núi',
        hinhAnh: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
        moTa: 'Sa Pa nổi bật với khí hậu mát mẻ, ruộng bậc thang, bản làng dân tộc và cảnh sắc núi rừng đặc trưng vùng Tây Bắc.',
        rating: 4.5,
        thoiGianThamQuan: 10,
        chiPhiAnUong: 500000,
        chiPhiLuuTru: 1200000,
        chiPhiDiChuyen: 900000,
    },
    {
        ma: 'DD03',
        ten: 'Đà Nẵng',
        diaDiem: 'Đà Nẵng',
        loai: 'Thành phố',
        hinhAnh: 'https://images.unsplash.com/photo-1526481280695-3c4691f7d124?auto=format&fit=crop&w=1200&q=80',
        moTa: 'Đà Nẵng là thành phố du lịch hiện đại với biển đẹp, cầu nổi tiếng, ẩm thực phong phú và nhiều khu vui chơi.',
        rating: 5,
        thoiGianThamQuan: 12,
        chiPhiAnUong: 700000,
        chiPhiLuuTru: 1800000,
        chiPhiDiChuyen: 1000000,
    },
    {
        ma: 'DD04',
        ten: 'Đà Lạt',
        diaDiem: 'Lâm Đồng',
        loai: 'Núi',
        hinhAnh: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
        moTa: 'Đà Lạt có khí hậu se lạnh, nhiều điểm check-in đẹp, rừng thông, hồ nước và các quán cà phê đặc trưng.',
        rating: 4.5,
        thoiGianThamQuan: 9,
        chiPhiAnUong: 450000,
        chiPhiLuuTru: 1300000,
        chiPhiDiChuyen: 850000,
    },
    {
        ma: 'DD05',
        ten: 'Nha Trang',
        diaDiem: 'Khánh Hòa',
        loai: 'Biển',
        hinhAnh: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        moTa: 'Nha Trang nổi tiếng với bãi biển đẹp, hải sản phong phú, khu vui chơi giải trí và các đảo du lịch hấp dẫn.',
        rating: 4,
        thoiGianThamQuan: 7,
        chiPhiAnUong: 550000,
        chiPhiLuuTru: 1400000,
        chiPhiDiChuyen: 950000,
    },
    {
        ma: 'DD06',
        ten: 'Hà Nội',
        diaDiem: 'Hà Nội',
        loai: 'Thành phố',
        hinhAnh: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80',
        moTa: 'Hà Nội là thủ đô nghìn năm văn hiến với nhiều di tích lịch sử, phố cổ, ẩm thực đường phố và không gian văn hóa đặc sắc.',
        rating: 4.5,
        thoiGianThamQuan: 6,
        chiPhiAnUong: 400000,
        chiPhiLuuTru: 1000000,
        chiPhiDiChuyen: 500000,
    },
]

export function DuLichProvider({ children }: any) {
    const [dsDiemDen, setDsDiemDen] = useState<any[]>([])
    const [dsLichTrinh, setDsLichTrinh] = useState<any[]>([])

    useEffect(() => {
        const diemDen = localStorage.getItem('th06_dsDiemDen')
        const lichTrinh = localStorage.getItem('th06_dsLichTrinh')

        if (diemDen) {
            setDsDiemDen(JSON.parse(diemDen))
        } else {
            setDsDiemDen(duLieuMacDinh)
        }

        if (lichTrinh) {
            setDsLichTrinh(JSON.parse(lichTrinh))
        }
    }, [])

    useEffect(() => {
        if (dsDiemDen.length > 0) {
            localStorage.setItem('th06_dsDiemDen', JSON.stringify(dsDiemDen))
        }
    }, [dsDiemDen])

    useEffect(() => {
        localStorage.setItem('th06_dsLichTrinh', JSON.stringify(dsLichTrinh))
    }, [dsLichTrinh])

    return (
        <DuLichContext.Provider
            value={{
                dsDiemDen,
                setDsDiemDen,
                dsLichTrinh,
                setDsLichTrinh,
            }}
        >
            {children}
        </DuLichContext.Provider>
    )
}

export function useDuLich() {
    return useContext(DuLichContext)
}