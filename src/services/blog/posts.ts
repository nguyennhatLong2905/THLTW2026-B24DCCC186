const layTatCaBaiViet = () => {
  const duLieu = localStorage.getItem('blog_posts_v4');
  if (duLieu) return JSON.parse(duLieu);

  const mockBanDau = [
    {
      id: '1',
      tieuDe: 'Sự trỗi dậy của Trí Tuệ Nhân Tạo (AI) trong năm 2026',
      tomTat: 'Trí tuệ nhân tạo đang định hình lại cách chúng ta làm việc, từ tự động hóa quy trình đến sáng tạo nghệ thuật. Những rủi ro và cơ hội nào đang chờ đợi?',
      noiDung: '# Trí Tuệ Nhân Tạo Năm 2026\n\nAI không còn là một khái niệm xa lạ. Nó đang được áp dụng rộng rãi trong các lĩnh vực tài chính, y tế, giáo dục...',
      anhDaiDien: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
      ngayDang: '2026-04-20',
      tacGia: 'Nguyễn Long',
      danhSachThe: ['Công nghệ', 'AI', 'Tương lai'],
      luotXem: 1250,
      trangThai: 'Đã đăng'
    },
    {
      id: '2',
      tieuDe: 'Du lịch vũ trụ thương mại: Khi giấc mơ thành hiện thực',
      tomTat: 'Với các chuyến bay quỹ đạo giá rẻ hơn, cơ hội cho người dân bình thường đặt chân lên vũ trụ chưa bao giờ gần đến thế.',
      noiDung: '# Du lịch Vũ trụ thương mại\n\nSpaceX và Blue Origin đang mở đường cho kỷ nguyên mà du lịch ngoài không gian sẽ trở thành một kỳ nghỉ thông thường.',
      anhDaiDien: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop',
      ngayDang: '2026-04-18',
      tacGia: 'Nguyễn Long',
      danhSachThe: ['Khoa học', 'Khám phá'],
      luotXem: 890,
      trangThai: 'Đã đăng'
    },
    {
      id: '3',
      tieuDe: 'NASA công bố phát hiện mới về dòng nước ngầm trên Sao Hỏa',
      tomTat: 'Tàu thám hiểm Perseverance của NASA vừa gửi về những dữ liệu đột phá, chứng minh sự tồn tại của hệ thống nước ngầm cổ đại trên hành tinh đỏ.',
      noiDung: '# Phát hiện đột phá từ NASA\n\nTrong báo cáo mới nhất, các nhà khoa học tại Phòng thí nghiệm Động cơ Phản lực (JPL) của NASA cho biết họ đã phát hiện các trầm tích muối cho thấy từng có dòng nước chảy dưới bề mặt Sao Hỏa. Điều này mở ra hy vọng mới về việc tìm kiếm dấu vết sự sống.',
      anhDaiDien: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=800&auto=format&fit=crop',
      ngayDang: '2026-04-15',
      tacGia: 'Nguyễn Long',
      danhSachThe: ['Khoa học', 'Khám phá', 'Không gian'],
      luotXem: 2150,
      trangThai: 'Đã đăng'
    },
    {
      id: '4',
      tieuDe: 'Đại học MIT phát triển vật liệu polymer siêu nhẹ, cứng hơn thép',
      tomTat: 'Nhóm nghiên cứu tại Viện Công nghệ Massachusetts (MIT) vừa tạo ra một loại vật liệu 2D mới, hứa hẹn sẽ thay đổi ngành công nghiệp ô tô và hàng không vũ trụ.',
      noiDung: '# Đột phá vật liệu từ MIT\n\nVật liệu mới này có cấu trúc phân tử 2D đặc biệt. Khác với các polymer thông thường tạo thành chuỗi 1D, vật liệu này tự lắp ráp thành các tấm phẳng, giúp nó nhẹ như nhựa nhưng có giới hạn đàn hồi và độ cứng chịu lực cao hơn thép gấp nhiều lần.',
      anhDaiDien: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop',
      ngayDang: '2026-04-10',
      tacGia: 'Nguyễn Long',
      danhSachThe: ['Công nghệ', 'Vật liệu', 'Giáo dục'],
      luotXem: 1020,
      trangThai: 'Đã đăng'
    },
    {
      id: '5',
      tieuDe: 'Đại học Stanford ra mắt khóa học Lập trình Lượng tử cho sinh viên',
      tomTat: 'Stanford vừa công bố chương trình giảng dạy mới, đưa bộ môn Lập trình Lượng tử (Quantum Computing) vào chương trình đại học chính quy từ năm sau.',
      noiDung: '# Bước tiến mới trong giáo dục CS tại Stanford\n\nTrong bối cảnh máy tính lượng tử đang phát triển vũ bão, Đại học Stanford đã quyết định đưa Lập trình Lượng tử thành học phần bắt buộc cho sinh viên khoa Khoa học Máy tính. Đây được xem là bước đi tiên phong giúp sinh viên làm quen với Q#, Qiskit và các thuật toán lượng tử cơ bản.',
      anhDaiDien: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
      ngayDang: '2026-04-12',
      tacGia: 'Nguyễn Long',
      danhSachThe: ['Giáo dục', 'Lập trình', 'Công nghệ'],
      luotXem: 1450,
      trangThai: 'Đã đăng'
    },
    {
      id: '6',
      tieuDe: 'Đại học Bách Khoa ứng dụng AI làm trợ giảng môn Nhập môn Lập trình',
      tomTat: 'Sinh viên IT năm nhất giờ đây sẽ có một trợ giảng ảo 24/7 để giải đáp thắc mắc về C++, Python nhờ hệ thống AI do chính trường phát triển.',
      noiDung: '# Trợ giảng AI tại Bách Khoa\n\nNhằm cải thiện chất lượng giảng dạy và hỗ trợ sinh viên kịp thời, trường Đại học Bách Khoa đã thử nghiệm thành công mô hình trợ giảng ảo AI. Trợ giảng này có thể đọc hiểu code của sinh viên, chỉ ra lỗi logic và gợi ý cách tối ưu thuật toán mà không làm lộ đáp án trực tiếp.',
      anhDaiDien: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
      ngayDang: '2026-04-05',
      tacGia: 'Nguyễn Long',
      danhSachThe: ['Giáo dục', 'Lập trình', 'AI'],
      luotXem: 2800,
      trangThai: 'Đã đăng'
    }
  ];
  localStorage.setItem('blog_posts_v4', JSON.stringify(mockBanDau));
  return mockBanDau;
};

export const layDanhSachBaiViet = async (tuKhoa?: string, the?: string) => {
  let danhSach = layTatCaBaiViet();

  // Chỉ hiển thị bài đã đăng trên trang public nếu không phải từ admin (tạm thời không phân biệt, coi như public chỉ xem bài đã đăng)
  // Thực tế cần 1 cờ từ admin, nhưng mock tạm ta cứ trả về hết, trong admin cũng cần xem tất cả.

  if (tuKhoa) {
    danhSach = danhSach.filter((b: any) => b.tieuDe.toLowerCase().includes(tuKhoa.toLowerCase()));
  }
  if (the) {
    danhSach = danhSach.filter((b: any) => b.danhSachThe?.includes(the));
  }
  
  // Đảo ngược để bài mới lên trên
  return danhSach.reverse();
};

export const layChiTietBaiViet = async (id: string) => {
  const danhSach = layTatCaBaiViet();
  return danhSach.find((b: any) => b.id === id) || null;
};

export const tangLuotXem = async (id: string) => {
  const danhSach = layTatCaBaiViet();
  const baiViet = danhSach.find((b: any) => b.id === id);
  if (baiViet) {
    baiViet.luotXem = (baiViet.luotXem || 0) + 1;
    localStorage.setItem('blog_posts_v4', JSON.stringify(danhSach));
  }
  return true;
};

export const themBaiViet = async (duLieuBaiViet: any) => {
  const danhSach = layTatCaBaiViet();
  const baiMoi = {
    ...duLieuBaiViet,
    id: Date.now().toString(),
    luotXem: 0,
    ngayDang: new Date().toISOString().split('T')[0],
    tacGia: 'Nguyễn Long'
  };
  danhSach.push(baiMoi);
  localStorage.setItem('blog_posts_v4', JSON.stringify(danhSach));
  return true;
};

export const suaBaiViet = async (id: string, duLieuBaiViet: any) => {
  const danhSach = layTatCaBaiViet();
  const index = danhSach.findIndex((b: any) => b.id === id);
  if (index !== -1) {
    danhSach[index] = { ...danhSach[index], ...duLieuBaiViet };
    localStorage.setItem('blog_posts_v4', JSON.stringify(danhSach));
  }
  return true;
};

export const xoaBaiViet = async (id: string) => {
  const danhSach = layTatCaBaiViet();
  const danhSachMoi = danhSach.filter((b: any) => b.id !== id);
  localStorage.setItem('blog_posts_v4', JSON.stringify(danhSachMoi));
  return true;
};