import React, { useState } from 'react';
import { Card, Button, Space, Typography, List } from 'antd';

export default function Bai1() {

  const luaChon = ['Kéo', 'Búa', 'Bao'];

  const [ketQuaTran, datKetQuaTran] = useState('');
  const [lichSu, datLichSu] = useState<any[]>([]);

  const choi = (luaChonNguoi: string) => {

    const luaChonMay = luaChon[Math.floor(Math.random() * 3)];

    let ketQua = '';

    if (luaChonNguoi === luaChonMay) {
      ketQua = 'Hòa';
    } else if (
      (luaChonNguoi === 'Kéo' && luaChonMay === 'Bao') ||
      (luaChonNguoi === 'Búa' && luaChonMay === 'Kéo') ||
      (luaChonNguoi === 'Bao' && luaChonMay === 'Búa')
    ) {
      ketQua = 'Bạn thắng';
    } else {
      ketQua = 'Bạn thua';
    }

    datKetQuaTran(`máy chọn ${luaChonMay} → ${ketQua}`);

    datLichSu([
      {
        nguoi: luaChonNguoi,
        may: luaChonMay,
        kq: ketQua
      },
      ...lichSu
    ]);
  };

  return (
    <div style={{ padding: 24 }}>

      <Card title="Bài 1: Trò chơi Oẳn Tù Tì">

        <Typography.Paragraph>
          Chọn Kéo, Búa hoặc Bao để đấu với máy. 
        </Typography.Paragraph>

        <Space>
          <Button type="primary" onClick={() => choi('Kéo')}>Kéo</Button>
          <Button type="primary" onClick={() => choi('Búa')}>Búa</Button>
          <Button type="primary" onClick={() => choi('Bao')}>Bao</Button>
        </Space>

        <div style={{ marginTop: 20, fontWeight: 500 }}>
          {ketQuaTran}
        </div>

      </Card>

      <Card title="Lịch sử ván đấu" style={{ marginTop: 20 }}>

        <List
          dataSource={lichSu}
          renderItem={(item, index) => (
            <List.Item>
              Ván {lichSu.length - index}: Bạn {item.nguoi} - Máy {item.may} → {item.kq}
            </List.Item>
          )}
        />

      </Card>

    </div>
  );
}