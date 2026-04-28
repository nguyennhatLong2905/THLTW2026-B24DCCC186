export interface BuoiTap {
	id: string;
	ngayTap: string;
	loaiBaiTap: string;
	thoiLuong: number;
	caloDot: number;
	ghiChu: string;
	trangThai: 'Hoàn thành' | 'Bỏ lỡ';
}

export interface ChiSoSucKhoe {
	id: string;
	ngay: string;
	canNang: number;
	chieuCao: number;
	nhipTimLucNghi: number;
	gioNgu: number;
}

export interface MucTieu {
	id: string;
	tenMucTieu: string;
	loai: string;
	giaTriMucTieu: number;
	giaTriHienTai: number;
	deadline: string;
	trangThai: 'Đang thực hiện' | 'Đã đạt' | 'Đã hủy';
}

export interface BaiTap {
	id: string;
	tenBaiTap: string;
	nhomCoTacDong: string;
	mucDoKho: 'Dễ' | 'Trung bình' | 'Khó';
	moTaNgan: string;
	caloDotTrungBinh: number;
	huongDan: string;
}

const KEY_BUOI_TAP = 'FITNESS_BUOI_TAP';
const KEY_CHI_SO = 'FITNESS_CHI_SO';
const KEY_MUC_TIEU = 'FITNESS_MUC_TIEU';
const KEY_BAI_TAP = 'FITNESS_BAI_TAP';

const mockBuoiTap: BuoiTap[] = [
	{ id: '1', ngayTap: '2026-04-20', loaiBaiTap: 'Cardio', thoiLuong: 45, caloDot: 400, ghiChu: 'Chạy bộ công viên', trangThai: 'Hoàn thành' },
	{ id: '2', ngayTap: '2026-04-21', loaiBaiTap: 'Strength', thoiLuong: 60, caloDot: 500, ghiChu: 'Đẩy ngực, kéo xô', trangThai: 'Hoàn thành' },
	{ id: '3', ngayTap: '2026-04-22', loaiBaiTap: 'Yoga', thoiLuong: 30, caloDot: 150, ghiChu: 'Yoga phục hồi', trangThai: 'Hoàn thành' },
	{ id: '4', ngayTap: '2026-04-23', loaiBaiTap: 'HIIT', thoiLuong: 20, caloDot: 300, ghiChu: 'Lười', trangThai: 'Bỏ lỡ' },
	{ id: '5', ngayTap: '2026-04-25', loaiBaiTap: 'Strength', thoiLuong: 50, caloDot: 450, ghiChu: 'Tập chân', trangThai: 'Hoàn thành' },
];

const mockChiSo: ChiSoSucKhoe[] = [
	{ id: '1', ngay: '2026-04-01', canNang: 72.5, chieuCao: 175, nhipTimLucNghi: 65, gioNgu: 7 },
	{ id: '2', ngay: '2026-04-10', canNang: 71.8, chieuCao: 175, nhipTimLucNghi: 64, gioNgu: 7.5 },
	{ id: '3', ngay: '2026-04-20', canNang: 71.0, chieuCao: 175, nhipTimLucNghi: 62, gioNgu: 8 },
	{ id: '4', ngay: '2026-04-25', canNang: 70.5, chieuCao: 175, nhipTimLucNghi: 60, gioNgu: 7 },
];

const mockMucTieu: MucTieu[] = [
	{ id: '1', tenMucTieu: 'Giảm 5kg', loai: 'Giảm cân', giaTriMucTieu: 67, giaTriHienTai: 70.5, deadline: '2026-06-01', trangThai: 'Đang thực hiện' },
	{ id: '2', tenMucTieu: 'Chạy 5km dưới 25p', loai: 'Cải thiện sức bền', giaTriMucTieu: 25, giaTriHienTai: 28, deadline: '2026-05-15', trangThai: 'Đang thực hiện' },
	{ id: '3', tenMucTieu: 'Squat 100kg', loai: 'Tăng cơ', giaTriMucTieu: 100, giaTriHienTai: 100, deadline: '2026-04-01', trangThai: 'Đã đạt' },
];

const mockBaiTap: BaiTap[] = [
	{ id: '1', tenBaiTap: 'Bench Press', nhomCoTacDong: 'Chest', mucDoKho: 'Trung bình', moTaNgan: 'Đẩy ngực trên ghế phẳng', caloDotTrungBinh: 300, huongDan: '1. Nằm thẳng lưng trên ghế.\n2. Cầm thanh tạ rộng hơn vai.\n3. Hạ tạ xuống ngực rồi đẩy mạnh lên.' },
	{ id: '2', tenBaiTap: 'Squat', nhomCoTacDong: 'Legs', mucDoKho: 'Khó', moTaNgan: 'Gánh tạ đòn', caloDotTrungBinh: 400, huongDan: '1. Đứng hai chân bằng vai.\n2. Đặt thanh tạ đòn lên vai sau.\n3. Hạ người xuống như ngồi ghế, đầu gối không vượt quá mũi chân.' },
	{ id: '3', tenBaiTap: 'Plank', nhomCoTacDong: 'Core', mucDoKho: 'Dễ', moTaNgan: 'Chống đẩy tĩnh', caloDotTrungBinh: 200, huongDan: '1. Nằm sấp, chống hai khuỷu tay.\n2. Nâng người lên, giữ thẳng lưng từ đầu đến gót chân.\n3. Giữ tư thế này lâu nhất có thể.' },
	{ id: '4', tenBaiTap: 'Pull Up', nhomCoTacDong: 'Back', mucDoKho: 'Khó', moTaNgan: 'Hít xà đơn', caloDotTrungBinh: 350, huongDan: '1. Nắm xà đơn với hai tay rộng hơn vai.\n2. Kéo người lên cho đến khi cằm vượt qua xà.\n3. Từ từ hạ người xuống.' },
	{ id: '5', tenBaiTap: 'Burpees', nhomCoTacDong: 'Full Body', mucDoKho: 'Khó', moTaNgan: 'Bài tập toàn thân liên hoàn', caloDotTrungBinh: 600, huongDan: '1. Bắt đầu ở tư thế đứng.\n2. Hạ người xuống tư thế squat, chống hai tay xuống sàn.\n3. Bật hai chân về sau để vào tư thế plank.\n4. Thực hiện một nhịp chống đẩy.\n5. Bật hai chân trở lại tư thế squat.\n6. Đứng lên và nhảy cao.' },
];

export const fitnessUtils = {
	initData: () => {
		if (!localStorage.getItem(KEY_BUOI_TAP)) localStorage.setItem(KEY_BUOI_TAP, JSON.stringify(mockBuoiTap));
		if (!localStorage.getItem(KEY_CHI_SO)) localStorage.setItem(KEY_CHI_SO, JSON.stringify(mockChiSo));
		if (!localStorage.getItem(KEY_MUC_TIEU)) localStorage.setItem(KEY_MUC_TIEU, JSON.stringify(mockMucTieu));
		if (!localStorage.getItem(KEY_BAI_TAP)) localStorage.setItem(KEY_BAI_TAP, JSON.stringify(mockBaiTap));
	},

	getBuoiTap: (): BuoiTap[] => JSON.parse(localStorage.getItem(KEY_BUOI_TAP) || '[]'),
	saveBuoiTap: (data: BuoiTap[]) => localStorage.setItem(KEY_BUOI_TAP, JSON.stringify(data)),

	getChiSo: (): ChiSoSucKhoe[] => JSON.parse(localStorage.getItem(KEY_CHI_SO) || '[]'),
	saveChiSo: (data: ChiSoSucKhoe[]) => localStorage.setItem(KEY_CHI_SO, JSON.stringify(data)),

	getMucTieu: (): MucTieu[] => JSON.parse(localStorage.getItem(KEY_MUC_TIEU) || '[]'),
	saveMucTieu: (data: MucTieu[]) => localStorage.setItem(KEY_MUC_TIEU, JSON.stringify(data)),

	getBaiTap: (): BaiTap[] => JSON.parse(localStorage.getItem(KEY_BAI_TAP) || '[]'),
	saveBaiTap: (data: BaiTap[]) => localStorage.setItem(KEY_BAI_TAP, JSON.stringify(data)),
};
