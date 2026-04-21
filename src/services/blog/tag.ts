const layTatCaThe = () => {
  const duLieu = localStorage.getItem('blog_tags_v4');
  if (duLieu) return JSON.parse(duLieu);

  const mockBanDau = [
    { id: '1', tenThe: 'Công nghệ' },
    { id: '2', tenThe: 'AI' },
    { id: '3', tenThe: 'Tương lai' },
    { id: '4', tenThe: 'Khoa học' },
    { id: '5', tenThe: 'Khám phá' },
    { id: '6', tenThe: 'Không gian' },
    { id: '7', tenThe: 'Vật liệu' },
    { id: '8', tenThe: 'Giáo dục' },
    { id: '9', tenThe: 'Lập trình' }
  ];
  localStorage.setItem('blog_tags_v4', JSON.stringify(mockBanDau));
  return mockBanDau;
};

export const layDanhSachThe = async () => {
  const danhSachThe = layTatCaThe();
  // Đếm số bài viết sử dụng thẻ (mock calculation)
  const duLieuBaiViet = localStorage.getItem('blog_posts_v4');
  let danhSachBaiViet: any[] = [];
  if (duLieuBaiViet) {
    danhSachBaiViet = JSON.parse(duLieuBaiViet);
  }

  return danhSachThe.map((t: any) => {
    const soBaiViet = danhSachBaiViet.filter((b: any) => b.danhSachThe?.includes(t.tenThe)).length;
    return { ...t, soBaiViet };
  });
};

export const themThe = async (duLieuThe: any) => {
  const danhSach = layTatCaThe();
  const theMoi = {
    ...duLieuThe,
    id: Date.now().toString()
  };
  danhSach.push(theMoi);
  localStorage.setItem('blog_tags_v4', JSON.stringify(danhSach));
  return true;
};

export const suaThe = async (id: string, duLieuThe: any) => {
  const danhSach = layTatCaThe();
  const index = danhSach.findIndex((t: any) => t.id === id);
  if (index !== -1) {
    danhSach[index] = { ...danhSach[index], ...duLieuThe };
    localStorage.setItem('blog_tags_v4', JSON.stringify(danhSach));
  }
  return true;
};

export const xoaThe = async (id: string) => {
  const danhSach = layTatCaThe();
  const danhSachMoi = danhSach.filter((t: any) => t.id !== id);
  localStorage.setItem('blog_tags_v4', JSON.stringify(danhSachMoi));
  return true;
};