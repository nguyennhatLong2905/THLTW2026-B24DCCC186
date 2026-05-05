import { useModel } from 'umi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, Typography, Tag, Space, Avatar } from 'antd';
import { ClockCircleOutlined, FireOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const cacCot = ['Cần làm', 'Đang làm', 'Hoàn thành'];

export default function Kanban() {
  const { danhSachCongViec, setDanhSachCongViec } = useModel('quanLyCongViec');

  const xuLyKeoTha = (ketQua: any) => {
    if (!ketQua.destination) return;

    const danhSachMoi = Array.from(danhSachCongViec);
    const idTask = ketQua.draggableId;
    const cotMoi = ketQua.destination.droppableId;

    const taskIndex = danhSachMoi.findIndex((cv: any) => cv.id === idTask);
    if (taskIndex !== -1) {
      danhSachMoi[taskIndex] = { ...danhSachMoi[taskIndex], trangThai: cotMoi };
      setDanhSachCongViec(danhSachMoi);
    }
  };

  const layMauUuTien = (mucDo: string) => {
    if (mucDo === 'Cao') return '#ff4d4f';
    if (mucDo === 'Trung bình') return '#faad14';
    return '#1890ff';
  };

  return (
    <div style={{ padding: '32px 24px', minHeight: '80vh', background: '#f5f7fa', display: 'flex', gap: 24, overflowX: 'auto' }}>
      <DragDropContext onDragEnd={xuLyKeoTha}>
        {cacCot.map(cot => {
          const taskTrongCot = danhSachCongViec.filter((cv: any) => cv.trangThai === cot);
          
          return (
            <div key={cot} style={{ flex: 1, minWidth: 320, backgroundColor: '#e2e8f0', padding: 20, borderRadius: 16, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <Title level={5} style={{ margin: 0, fontWeight: 700, color: '#334155' }}>{cot}</Title>
                <Avatar style={{ backgroundColor: '#fff', color: '#64748b', fontWeight: 'bold' }} size={28}>{taskTrongCot.length}</Avatar>
              </div>
              <Droppable droppableId={cot}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ flexGrow: 1, minHeight: 500, paddingBottom: 16, transition: 'background-color 0.2s ease', backgroundColor: snapshot.isDraggingOver ? 'rgba(255,255,255,0.5)' : 'transparent', borderRadius: 8 }}
                  >
                    {taskTrongCot.map((cv: any, index: number) => (
                      <Draggable key={cv.id} draggableId={cv.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              marginBottom: 16,
                            }}
                          >
                            <Card 
                              hoverable
                              size="small" 
                              style={{ 
                                borderRadius: 12, 
                                border: 'none', 
                                boxShadow: snapshot.isDragging ? '0 10px 25px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.06)',
                                transform: snapshot.isDragging ? 'scale(1.02)' : 'scale(1)',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                              }}
                              bodyStyle={{ padding: 16 }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                <Text strong style={{ fontSize: 15, color: '#1e293b' }}>{cv.tenCongViec}</Text>
                                <Tag color={layMauUuTien(cv.mucDoUuTien)} style={{ border: 'none', borderRadius: 10, margin: 0 }}>
                                  <FireOutlined /> {cv.mucDoUuTien}
                                </Tag>
                              </div>
                              <p style={{ margin: '0 0 16px 0', fontSize: 14, color: '#64748b', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {cv.moTa || 'Chưa có mô tả'}
                              </p>
                              
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Space>
                                  {cv.tag && <Tag style={{ borderRadius: 10, background: '#f1f5f9', border: 'none', color: '#475569' }}>#{cv.tag}</Tag>}
                                </Space>
                                <div style={{ 
                                  fontSize: 13, 
                                  fontWeight: 500,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 4,
                                  color: moment(cv.hanChot).isBefore(moment(), 'day') && cv.trangThai !== 'Hoàn thành' ? '#ef4444' : '#94a3b8' 
                                }}>
                                  <ClockCircleOutlined />
                                  {cv.hanChot ? moment(cv.hanChot).format('DD/MM/YYYY') : 'Không có'}
                                </div>
                              </div>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
