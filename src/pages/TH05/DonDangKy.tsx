import { useEffect, useState } from 'react'
import { Card, Table, Button, Input, Modal, Form, Select, Space, message, Tag, Row, Col, Descriptions, List, Typography } from 'antd'
import { ArrowLeftOutlined, PlusOutlined, HistoryOutlined, CheckCircleOutlined, CloseCircleOutlined, EyeOutlined } from '@ant-design/icons'
import { dsCauLacBoMacDinh, dsDonMacDinh } from './duLieu'

const { Option } = Select
const { TextArea } = Input
const { Title } = Typography

export default function DonDangKy() {
    const [dsCauLacBo, setDsCauLacBo] = useState<any[]>([])
    const [dsDonDangKy, setDsDonDangKy] = useState<any[]>([])
    const [view, setView] = useState<'list' | 'form' | 'detail' | 'history' | 'reject'>('list')
    const [dangSua, setDangSua] = useState<any>(null)
    const [dangXem, setDangXem] = useState<any>(null)
    const [chonNhieu, setChonNhieu] = useState<any[]>([])
    const [lyDoTuChoi, setLyDoTuChoi] = useState('')
    const [form] = Form.useForm()

    useEffect(() => {
        const clb = localStorage.getItem('dsCauLacBo')
        const don = localStorage.getItem('dsDonDangKy')
        if (clb) setDsCauLacBo(JSON.parse(clb))
        else {
            localStorage.setItem('dsCauLacBo', JSON.stringify(dsCauLacBoMacDinh))
            setDsCauLacBo(dsCauLacBoMacDinh)
        }
        if (don) setDsDonDangKy(JSON.parse(don))
        else {
            localStorage.setItem('dsDonDangKy', JSON.stringify(dsDonMacDinh))
            setDsDonDangKy(dsDonMacDinh)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('dsDonDangKy', JSON.stringify(dsDonDangKy))
    }, [dsDonDangKy])

    const layTenClb = (id: number) => dsCauLacBo.find(i => i.id === id)?.ten || '---'

    const moThem = () => {
        setDangSua(null)
        form.resetFields()
        form.setFieldsValue({ trangThai: 'Pending' })
        setView('form')
    }

    const moSua = (record: any) => {
        setDangSua(record)
        form.setFieldsValue(record)
        setView('form')
    }

    const luuDon = async () => {
        try {
            const values = await form.validateFields()
            const donMoi = {
                id: dangSua ? dangSua.id : Date.now(),
                ...values,
                trangThai: dangSua ? values.trangThai : 'Pending',
                ghiChu: dangSua ? values.ghiChu || '' : '',
                lichSu: dangSua ? dangSua.lichSu || [] : [],
            }
            if (dangSua) {
                setDsDonDangKy(dsDonDangKy.map(i => i.id === dangSua.id ? donMoi : i))
                message.success('Cập nhật đơn thành công')
            } else {
                setDsDonDangKy([...dsDonDangKy, donMoi])
                message.success('Thêm đơn đăng ký thành công')
            }
            setView('list')
        } catch (e) { }
    }

    const xoaDon = (record: any) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc muốn xóa đơn của ${record.hoTen}?`,
            onOk: () => {
                setDsDonDangKy(dsDonDangKy.filter(i => i.id !== record.id))
                message.success('Đã xóa đơn đăng ký')
            }
        })
    }

    const themLichSu = (record: any, trangThaiMoi: string, ghiChu: string) => {
        const gio = new Date()
        const thoiGian = `${gio.getHours().toString().padStart(2, '0')}:${gio.getMinutes().toString().padStart(2, '0')} ${gio.getDate().toString().padStart(2, '0')}/${(gio.getMonth() + 1).toString().padStart(2, '0')}/${gio.getFullYear()}`
        return { noiDung: `Admin đã ${trangThaiMoi} vào lúc ${thoiGian}${ghiChu ? ` với lý do: ${ghiChu}` : ''}` }
    }

    const duyetDon = (record: any) => {
        Modal.confirm({
            title: 'Xác nhận duyệt',
            content: `Duyệt đơn của ${record.hoTen}?`,
            onOk: () => {
                const lichSuMoi = themLichSu(record, 'Approved', '')
                setDsDonDangKy(dsDonDangKy.map(i =>
                    i.id === record.id
                        ? { ...i, trangThai: 'Approved', ghiChu: '', lichSu: [...(i.lichSu || []), lichSuMoi] }
                        : i
                ))
                message.success('Đã duyệt đơn')
            }
        })
    }

    const xacNhanTuChoi = () => {
        if (!lyDoTuChoi.trim()) {
            message.error('Vui lòng nhập lý do từ chối')
            return
        }
        const lichSuMoi = themLichSu(dangXem, 'Rejected', lyDoTuChoi)
        setDsDonDangKy(dsDonDangKy.map(i =>
            i.id === dangXem.id
                ? { ...i, trangThai: 'Rejected', ghiChu: lyDoTuChoi, lichSu: [...(i.lichSu || []), lichSuMoi] }
                : i
        ))
        setView('list')
        message.success('Đã từ chối đơn')
    }

    if (view === 'form') {
        return (
            <div style={{ padding: 20 }}>
                <Card title={dangSua ? 'Cập nhật đơn đăng ký' : 'Tạo mới đơn đăng ký'} extra={<Button icon={<ArrowLeftOutlined />} onClick={() => setView('list')}>Quay lại</Button>}>
                    <Form form={form} layout="vertical" onFinish={luuDon} style={{ maxWidth: 900, margin: '0 auto' }}>
                        <Row gutter={24}>
                            <Col span={12}><Form.Item label="Họ tên" name="hoTen" rules={[{ required: true }]}><Input size="large" /></Form.Item></Col>
                            <Col span={12}><Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}><Input size="large" /></Form.Item></Col>
                            <Col span={12}><Form.Item label="SĐT" name="sdt" rules={[{ required: true }]}><Input size="large" /></Form.Item></Col>
                            <Col span={12}><Form.Item label="Giới tính" name="gioiTinh" rules={[{ required: true }]}><Select size="large"><Option value="Nam">Nam</Option><Option value="Nữ">Nữ</Option></Select></Form.Item></Col>
                            <Col span={12}><Form.Item label="Địa chỉ" name="diaChi" rules={[{ required: true }]}><Input size="large" /></Form.Item></Col>
                            <Col span={12}><Form.Item label="Sở trường" name="soTruong" rules={[{ required: true }]}><Input size="large" /></Form.Item></Col>
                            <Col span={24}><Form.Item label="Câu lạc bộ đăng ký" name="cauLacBoId" rules={[{ required: true }]}><Select size="large">{dsCauLacBo.map(i => <Option key={i.id} value={i.id}>{i.ten}</Option>)}</Select></Form.Item></Col>
                            <Col span={24}><Form.Item label="Lý do đăng ký" name="lyDo" rules={[{ required: true }]}><TextArea rows={4} /></Form.Item></Col>
                        </Row>
                        <Button type="primary" size="large" block onClick={luuDon}>Lưu đơn đăng ký</Button>
                    </Form>
                </Card>
            </div>
        )
    }

    if (view === 'detail') {
        return (
            <div style={{ padding: 20 }}>
                <Card title="Chi tiết hồ sơ đăng ký" extra={<Button icon={<ArrowLeftOutlined />} onClick={() => setView('list')}>Quay lại</Button>}>
                    <Descriptions bordered column={2}>
                        <Descriptions.Item label="Họ và tên">{dangXem.hoTen}</Descriptions.Item>
                        <Descriptions.Item label="Email">{dangXem.email}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{dangXem.sdt}</Descriptions.Item>
                        <Descriptions.Item label="Giới tính">{dangXem.gioiTinh}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ" span={2}>{dangXem.diaChi}</Descriptions.Item>
                        <Descriptions.Item label="Câu lạc bộ" span={2}><Tag color="blue">{layTenClb(dangXem.cauLacBoId)}</Tag></Descriptions.Item>
                        <Descriptions.Item label="Sở trường" span={2}>{dangXem.soTruong}</Descriptions.Item>
                        <Descriptions.Item label="Lý do đăng ký" span={2}>{dangXem.lyDo}</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <Tag color={dangXem.trangThai === 'Approved' ? 'green' : dangXem.trangThai === 'Rejected' ? 'red' : 'orange'}>{dangXem.trangThai}</Tag>
                        </Descriptions.Item>
                        <Descriptions.Item label="Ghi chú phản hồi">{dangXem.ghiChu || 'Chưa có ghi chú'}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </div>
        )
    }

    if (view === 'history') {
        return (
            <div style={{ padding: 20 }}>
                <Card title={`Lịch sử xử lý đơn: ${dangXem.hoTen}`} extra={<Button icon={<ArrowLeftOutlined />} onClick={() => setView('list')}>Quay lại</Button>}>
                    <List
                        bordered
                        dataSource={dangXem.lichSu || []}
                        renderItem={(item: any) => <List.Item><Typography.Text mark>[Hệ thống]</Typography.Text> {item.noiDung}</List.Item>}
                        locale={{ emptyText: 'Chưa có lịch sử thao tác cho đơn này' }}
                    />
                </Card>
            </div>
        )
    }

    if (view === 'reject') {
        return (
            <div style={{ padding: 20 }}>
                <Card title={`Từ chối đơn đăng ký: ${dangXem.hoTen}`} extra={<Button icon={<ArrowLeftOutlined />} onClick={() => setView('list')}>Quay lại</Button>}>
                    <div style={{ maxWidth: 600, margin: '0 auto' }}>
                        <Title level={5}>Lý do từ chối (Gửi cho thành viên):</Title>
                        <TextArea rows={6} value={lyDoTuChoi} onChange={e => setLyDoTuChoi(e.target.value)} placeholder="Nhập lý do chi tiết vì sao không duyệt đơn này..." />
                        <Space style={{ marginTop: 20, width: '100%', justifyContent: 'flex-end' }}>
                            <Button onClick={() => setView('list')}>Hủy bỏ</Button>
                            <Button type="primary" danger onClick={xacNhanTuChoi}>Xác nhận từ chối</Button>
                        </Space>
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div style={{ padding: 20 }}>
            <Card title="Quản lý đơn đăng ký thành viên" extra={<Button type="primary" icon={<PlusOutlined />} onClick={moThem}>Thêm đơn đăng ký</Button>}>
                <Table
                    rowKey="id"
                    dataSource={dsDonDangKy}
                    pagination={{ pageSize: 10 }}
                    columns={[
                        { title: 'Họ tên', dataIndex: 'hoTen', sorter: (a, b) => a.hoTen.localeCompare(b.hoTen) },
                        { title: 'Liên hệ', render: (r) => <div>{r.email}<br/><small>{r.sdt}</small></div> },
                        { title: 'Câu lạc bộ', dataIndex: 'cauLacBoId', render: (v) => layTenClb(v), filters: dsCauLacBo.map(i => ({ text: i.ten, value: i.id })), onFilter: (value, record) => record.cauLacBoId === value },
                        {
                            title: 'Trạng thái',
                            dataIndex: 'trangThai',
                            render: (v) => <Tag color={v === 'Approved' ? 'green' : v === 'Rejected' ? 'red' : 'orange'}>{v}</Tag>,
                            filters: [{ text: 'Pending', value: 'Pending' }, { text: 'Approved', value: 'Approved' }, { text: 'Rejected', value: 'Rejected' }],
                            onFilter: (value, record) => record.trangThai === value
                        },
                        {
                            title: 'Thao tác',
                            render: (r) => (
                                <Space wrap>
                                    <Button size="small" icon={<EyeOutlined />} onClick={() => { setDangXem(r); setView('detail') }}>Chi tiết</Button>
                                    <Button size="small" onClick={() => moSua(r)}>Sửa</Button>
                                    <Button size="small" type="primary" icon={<CheckCircleOutlined />} onClick={() => duyetDon(r)}>Duyệt</Button>
                                    <Button size="small" danger icon={<CloseCircleOutlined />} onClick={() => { setDangXem(r); setLyDoTuChoi(''); setView('reject') }}>Từ chối</Button>
                                    <Button size="small" icon={<HistoryOutlined />} onClick={() => { setDangXem(r); setView('history') }}>Lịch sử</Button>
                                    <Button size="small" danger onClick={() => xoaDon(r)}>Xóa</Button>
                                </Space>
                            )
                        }
                    ]}
                />
            </Card>
        </div>
    )
}