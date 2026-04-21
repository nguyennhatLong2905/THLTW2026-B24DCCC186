import React from 'react';
import { Space, Tag } from 'antd';

interface ThuocTinhBoLocThe {
  danhSachThe: any[];
  theDuocChon: string | null;
  xuLyChonThe: (tenThe: string) => void;
}

const BoLocThe: React.FC<ThuocTinhBoLocThe> = ({ danhSachThe, theDuocChon, xuLyChonThe }) => {
  return (
    <Space wrap>
      <Tag
        color={!theDuocChon ? 'red' : 'default'}
        onClick={() => xuLyChonThe('')}
        style={{ cursor: 'pointer' }}
      >
        Tất cả
      </Tag>
      {danhSachThe.map((the) => (
        <Tag
          key={the.id}
          color={theDuocChon === the.tenThe ? 'red' : 'default'}
          onClick={() => xuLyChonThe(the.tenThe)}
          style={{ cursor: 'pointer' }}
        >
          {the.tenThe}
        </Tag>
      ))}
    </Space>
  );
};

export default BoLocThe;