import { useEffect, useState } from 'react'
import { Card, Table, Button, Input, Modal, Form, DatePicker, Switch, Space, Upload, message, Image, Descriptions } from 'antd'
import { UploadOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { dsCauLacBoMacDinh, dsDonMacDinh } from './duLieu'

export default function CauLacBo() {
    const [dsCauLacBo, setDsCauLacBo] = useState<any[]>([])
    const [view, setView] = useState<'list' | 'form' | 'members'>('list')
    const [dangSua, setDangSua] = useState<any>(null)
    const [clbDangXem, setClbDangXem] = useState<any>(null)
    const [form] = Form.useForm()

    useEffect(() => {
        const data = localStorage.getItem('dsCauLacBo')
        if (data) setDsCauLacBo(JSON.parse(data))
        else {
            localStorage.setItem('dsCauLacBo', JSON.stringify(dsCauLacBoMacDinh))
            setDsCauLacBo(dsCauLacBoMacDinh)
        }
    }, [])

    useEffect(() => {
        if (dsCauLacBo.length > 0) {
            localStorage.setItem('dsCauLacBo', JSON.stringify(dsCauLacBo))
        }
    }, [dsCauLacBo])

    useEffect(() => {
        const data = localStorage.getItem('dsDonDangKy')
        if (!data) {
            localStorage.setItem('dsDonDangKy', JSON.stringify(dsDonMacDinh))
        }
    }, [])

    const xuLyTaiAnh = (info: any) => {
        const file = info.file.originFileObj || info.file
        if (file instanceof File || file instanceof Blob) {
            const reader = new FileReader()
            reader.onload = (e: any) => {
                form.setFieldsValue({ anh: e.target.result })
            }
            reader.readAsDataURL(file)
        }
        return false
    }

    const moThem = () => {
        setDangSua(null)
        form.resetFields()
        form.setFieldsValue({ hoatDong: true })
        setView('form')
    }

    const moSua = (record: any) => {
        setDangSua(record)
        form.setFieldsValue({
            ...record,
            ngayThanhLap: record.ngayThanhLap ? dayjs(record.ngayThanhLap) : null
        })
        setView('form')
    }

    const luuClb = async () => {
        try {
            const values = await form.validateFields()
            const clbMoi = {
                id: dangSua ? dangSua.id : Date.now(),
                anh: values.anh || '',
                ten: values.ten,
                ngayThanhLap: values.ngayThanhLap ? values.ngayThanhLap.format('YYYY-MM-DD') : '',
                moTa: values.moTa || '',
                chuNhiem: values.chuNhiem || '',
                hoatDong: values.hoatDong || false,
            }

            if (dangSua) {
                setDsCauLacBo(dsCauLacBo.map(i => i.id === dangSua.id ? clbMoi : i))
                message.success('Cập nhật câu lạc bộ thành công')
            } else {
                setDsCauLacBo([...dsCauLacBo, clbMoi])
                message.success('Thêm câu lạc bộ thành công')
            }
            setView('list')
        } catch (e) { }
    }

    const xoaClb = (record: any) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc muốn xóa ${record.ten}?`,
            onOk: () => {
                const dsDon = JSON.parse(localStorage.getItem('dsDonDangKy') || '[]')
                const coDuLieu = dsDon.some((i: any) => i.cauLacBoId === record.id)
                if (coDuLieu) {
                    message.error('CLB này đang có đơn đăng ký hoặc thành viên, không thể xóa')
                    return
                }
                setDsCauLacBo(dsCauLacBo.filter(i => i.id !== record.id))
                message.success('Đã xóa câu lạc bộ')
            }
        })
    }

    const moDanhSachThanhVien = (record: any) => {
        setClbDangXem(record)
        setView('members')
    }

    const dsThanhVien = JSON.parse(localStorage.getItem('dsDonDangKy') || '[]')
        .filter((i: any) => i.trangThai === 'Approved' && i.cauLacBoId === clbDangXem?.id)

    if (view === 'form') {
        return (
            <div style={{ padding: 20 }}>
                <Card 
                    title={dangSua ? 'Chỉnh sửa thông tin Câu lạc bộ' : 'Thêm mới Câu lạc bộ'}
                    extra={<Button icon={<ArrowLeftOutlined />} onClick={() => setView('list')}>Quay lại</Button>}
                >
                    <Form form={form} layout="vertical" onFinish={luuClb} style={{ maxWidth: 800, margin: '0 auto' }}>
                        <Form.Item name="anh" hidden><Input /></Form.Item>
                        <Form.Item label="Ảnh đại diện">
                            <Space align="start">
                                {form.getFieldValue('anh') && <Image src={form.getFieldValue('anh')} width={100} height={100} style={{ objectFit: 'cover', borderRadius: 8 }} />}
                                <Upload beforeUpload={() => false} maxCount={1} showUploadList={false} onChange={xuLyTaiAnh}>
                                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                                </Upload>
                            </Space>
                        </Form.Item>
                        <Form.Item label="Tên câu lạc bộ" name="ten" rules={[{ required: true, message: 'Nhập tên câu lạc bộ' }]}>
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item label="Ngày thành lập" name="ngayThanhLap" rules={[{ required: true, message: 'Chọn ngày thành lập' }]}>
                            <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" size="large" />
                        </Form.Item>
                        <Form.Item label="Mô tả (HTML)" name="moTa">
                            <Input.TextArea rows={6} placeholder="Nhập mô tả giới thiệu về CLB..." />
                        </Form.Item>
                        <Form.Item label="Chủ nhiệm CLB" name="chuNhiem" rules={[{ required: true, message: 'Nhập chủ nhiệm CLB' }]}>
                            <Input size="large" />
                        </Form.Item>
                        <Form.Item label="Trạng thái hoạt động" name="hoatDong" valuePropName="checked">
                            <Switch checkedChildren="Đang hoạt động" unCheckedChildren="Ngừng hoạt động" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" size="large" block onClick={luuClb}>Lưu thông tin</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }

    if (view === 'members') {
        return (
            <div style={{ padding: 20 }}>
                <Card 
                    title={`Danh sách thành viên chính thức: ${clbDangXem?.ten}`}
                    extra={<Button icon={<ArrowLeftOutlined />} onClick={() => setView('list')}>Quay lại</Button>}
                >
                    <Descriptions bordered column={2} style={{ marginBottom: 20 }}>
                        <Descriptions.Item label="Chủ nhiệm">{clbDangXem?.chuNhiem}</Descriptions.Item>
                        <Descriptions.Item label="Ngày thành lập">{dayjs(clbDangXem?.ngayThanhLap).format('DD/MM/YYYY')}</Descriptions.Item>
                        <Descriptions.Item label="Số lượng thành viên">{dsThanhVien.length} người</Descriptions.Item>
                    </Descriptions>
                    <Table
                        rowKey="id"
                        dataSource={dsThanhVien}
                        columns={[
                            { title: 'Họ tên', dataIndex: 'hoTen', key: 'hoTen' },
                            { title: 'Email', dataIndex: 'email', key: 'email' },
                            { title: 'SĐT', dataIndex: 'sdt', key: 'sdt' },
                            { title: 'Giới tính', dataIndex: 'gioiTinh', key: 'gioiTinh' },
                            { title: 'Địa chỉ', dataIndex: 'diaChi', key: 'diaChi' },
                            { title: 'Sở trường', dataIndex: 'soTruong', key: 'soTruong' },
                        ]}
                    />
                </Card>
            </div>
        )
    }

    return (
        <div style={{ padding: 20 }}>
            <Card
                title="Quản lý danh sách câu lạc bộ"
                extra={<Button type="primary" icon={<PlusOutlined />} onClick={moThem}>Thêm câu lạc bộ</Button>}
            >
                <Table
                    rowKey="id"
                    dataSource={dsCauLacBo}
                    pagination={{ pageSize: 10 }}
                    columns={[
                        {
                            title: 'Ảnh',
                            dataIndex: 'anh',
                            render: (v) => v ? <Image src={v} width={50} height={50} style={{ objectFit: 'cover', borderRadius: 4 }} /> : '---'
                        },
                        {
                            title: 'Tên câu lạc bộ',
                            dataIndex: 'ten',
                            sorter: (a, b) => a.ten.localeCompare(b.ten),
                            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any) => (
                                <div style={{ padding: 8 }}>
                                    <Input
                                        placeholder="Tìm tên CLB"
                                        value={selectedKeys[0]}
                                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                                        onPressEnter={() => confirm()}
                                        style={{ marginBottom: 8, display: 'block' }}
                                    />
                                    <Button type="primary" block onClick={() => confirm()}>Tìm kiếm</Button>
                                </div>
                            ),
                            onFilter: (value, record) => record.ten.toLowerCase().includes((value as string).toLowerCase()),
                        },
                        {
                            title: 'Ngày thành lập',
                            dataIndex: 'ngayThanhLap',
                            render: (v) => v ? dayjs(v).format('DD/MM/YYYY') : '---',
                        },
                        {
                            title: 'Chủ nhiệm',
                            dataIndex: 'chuNhiem',
                        },
                        {
                            title: 'Hoạt động',
                            dataIndex: 'hoatDong',
                            render: (v) => v ? 'Có' : 'Không',
                            filters: [
                                { text: 'Có', value: true },
                                { text: 'Không', value: false }
                            ],
                            onFilter: (value, record) => record.hoatDong === value,
                        },
                        {
                            title: 'Thao tác',
                            render: (r) => (
                                <Space>
                                    <Button size="small" onClick={() => moSua(r)}>Sửa</Button>
                                    <Button size="small" danger onClick={() => xoaClb(r)}>Xóa</Button>
                                    <Button size="small" type="primary" onClick={() => moDanhSachThanhVien(r)}>Thành viên</Button>
                                </Space>
                            )
                        }
                    ]}
                />
            </Card>
        </div>
    )
}