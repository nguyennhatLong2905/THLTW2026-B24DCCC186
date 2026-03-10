import { useState } from 'react'
import { Card, Table, Button, Input, Select, Modal, Row, Col, message } from 'antd'

const { Option } = Select
const { confirm } = Modal

export default function Bai2TH02() {

    const [dsKhoi, setDsKhoi] = useState<any[]>([
        { tenKhoi: "Cơ bản 1" },
        { tenKhoi: "Cơ bản 2" },
        { tenKhoi: "Chuyên sâu" }
    ])

    const [dsMon, setDsMon] = useState<any[]>([])
    const [dsCauHoi, setDsCauHoi] = useState<any[]>([])
    const [dsDeThi, setDsDeThi] = useState<any[]>([])
    const [dsCauTruc, setDsCauTruc] = useState<any[]>([])

    const [tenKhoi, setTenKhoi] = useState("")
    const [maMon, setMaMon] = useState("")
    const [tenMon, setTenMon] = useState("")
    const [tinChi, setTinChi] = useState("")

    const [maCH, setMaCH] = useState("")
    const [monCH, setMonCH] = useState("")
    const [noiDung, setNoiDung] = useState("")
    const [doKho, setDoKho] = useState("")
    const [khoiCH, setKhoiCH] = useState("")

    const [timMon, setTimMon] = useState("")
    const [timKho, setTimKho] = useState("")
    const [timKhoi, setTimKhoi] = useState("")

    const [monDe, setMonDe] = useState("")
    const [khoiDe, setKhoiDe] = useState("")

    const [soDe, setSoDe] = useState<any>("")
    const [soTB, setSoTB] = useState<any>("")
    const [soKho, setSoKho] = useState<any>("")
    const [soRK, setSoRK] = useState<any>("")

    const [viewMode, setViewMode] = useState<'main' | 'detail'>('main')
    const [selectedExam, setSelectedExam] = useState<any>(null)

    const themKhoi = () => {
        if (!tenKhoi) return
        setDsKhoi([...dsKhoi, { tenKhoi }])
        setTenKhoi("")
    }

    const themMon = () => {
        if (!maMon || !tenMon) return
        setDsMon([...dsMon, { maMon, tenMon, tinChi }])
        setMaMon("")
        setTenMon("")
        setTinChi("")
    }

    const themCauHoi = () => {
        if (!maCH || !monCH) return
        setDsCauHoi([...dsCauHoi, { maCH, monCH, noiDung, doKho, khoiCH }])
        setMaCH("")
        setNoiDung("")
    }

    const xoaKhoi = (tenKhoi: any) => {
        confirm({
            title: "Bạn chắc chắn muốn xóa?",
            onOk() {
                setDsKhoi(dsKhoi.filter(i => i.tenKhoi !== tenKhoi))
            }
        })
    }

    const xoaMon = (maMon: any) => {
        confirm({
            title: "Bạn chắc chắn muốn xóa?",
            onOk() {
                setDsMon(dsMon.filter(i => i.maMon !== maMon))
            }
        })
    }

    const xoaCauHoi = (maCH: any) => {
        confirm({
            title: "Bạn chắc chắn muốn xóa?",
            onOk() {
                setDsCauHoi(dsCauHoi.filter(i => i.maCH !== maCH))
            }
        })
    }

    const xoaDe = (index: any) => {
        confirm({
            title: "Bạn chắc chắn muốn xóa?",
            onOk() {
                setDsDeThi(dsDeThi.filter((_, i) => i !== index))
            }
        })
    }

    const dsLoc = dsCauHoi.filter(i => {
        return (!timMon || i.monCH === timMon)
            && (!timKho || i.doKho === timKho)
            && (!timKhoi || i.khoiCH === timKhoi)
    })

    const shuffle = (arr: any[]) => {
        return [...arr].sort(() => 0.5 - Math.random())
    }

    const taoDe = () => {
        let nguon = dsCauHoi.filter(i => i.monCH === monDe && i.khoiCH === khoiDe)
        let de = nguon.filter(i => i.doKho === "Dễ")
        let tb = nguon.filter(i => i.doKho === "Trung bình")
        let kho = nguon.filter(i => i.doKho === "Khó")
        let rk = nguon.filter(i => i.doKho === "Rất khó")

        const nDe = Number(soDe) || 0
        const nTB = Number(soTB) || 0
        const nKho = Number(soKho) || 0
        const nRK = Number(soRK) || 0

        if (de.length < nDe || tb.length < nTB || kho.length < nKho || rk.length < nRK) {
            message.error("Không đủ câu hỏi phù hợp trong ngân hàng")
            return
        }

        let ds = [
            ...shuffle(de).slice(0, nDe),
            ...shuffle(tb).slice(0, nTB),
            ...shuffle(kho).slice(0, nKho),
            ...shuffle(rk).slice(0, nRK)
        ]

        setDsDeThi([...dsDeThi, { mon: monDe, khoi: khoiDe, ds }])
        message.success("Đã tạo đề thi")
    }

    const luuCauTruc = () => {
        setDsCauTruc([...dsCauTruc, { monDe, khoiDe, soDe, soTB, soKho, soRK }])
        message.success("Đã lưu cấu trúc")
    }

    const dungCauTruc = (ct: any) => {
        setMonDe(ct.monDe)
        setKhoiDe(ct.khoiDe)
        setSoDe(ct.soDe)
        setSoTB(ct.soTB)
        setSoKho(ct.soKho)
        setSoRK(ct.soRK)
    }

    const handleViewDetail = (record: any) => {
        setSelectedExam(record)
        setViewMode('detail')
    }

    const getTenMon = (ma: string) => {
        const mon = dsMon.find(m => m.maMon === ma)
        return mon ? mon.tenMon : ma
    }

    if (viewMode === 'detail') {
        return (
            <div style={{ padding: 20 }}>
                <Card 
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Chi tiết đề thi môn: {getTenMon(selectedExam?.mon)} - Khối: {selectedExam?.khoi}</span>
                            <Button onClick={() => setViewMode('main')}>Quay lại danh sách</Button>
                        </div>
                    }
                >
                    <Table
                        dataSource={selectedExam?.ds || []}
                        rowKey="maCH"
                        pagination={false}
                        columns={[
                            { title: "STT", render: (_: any, __: any, index: number) => index + 1, width: 70 },
                            { title: "Mã câu hỏi", dataIndex: "maCH", width: 120 },
                            { title: "Môn", render: (r: any) => getTenMon(r.monCH), width: 150 },
                            { title: "Câu hỏi", dataIndex: "noiDung" },
                            { title: "Độ khó", dataIndex: "doKho", width: 120 },
                            { title: "Khối", dataIndex: "khoiCH", width: 150 }
                        ]}
                    />
                </Card>
            </div>
        )
    }

    return (
        <div style={{ padding: 20 }}>
            <Row gutter={20}>
                <Col span={12}>
                    <Card title="Khối kiến thức">
                        <Input
                            placeholder="Tên khối"
                            value={tenKhoi}
                            onChange={e => setTenKhoi(e.target.value)}
                        />
                        <Button type="primary" onClick={themKhoi} style={{ marginTop: 10 }}>Thêm</Button>
                        <Table
                            style={{ marginTop: 20 }}
                            dataSource={dsKhoi}
                            rowKey="tenKhoi"
                            columns={[
                                { title: "Khối", dataIndex: "tenKhoi" },
                                { title: "", render: (r: any) => <Button danger onClick={() => xoaKhoi(r.tenKhoi)}>Xóa</Button> }
                            ]}
                        />
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title="Môn học">
                        <Input placeholder="Mã môn" value={maMon} onChange={e => setMaMon(e.target.value)} />
                        <Input placeholder="Tên môn" value={tenMon} onChange={e => setTenMon(e.target.value)} style={{ marginTop: 10 }} />
                        <Input placeholder="Tín chỉ" value={tinChi} onChange={e => setTinChi(e.target.value)} style={{ marginTop: 10 }} />
                        <Button type="primary" onClick={themMon} style={{ marginTop: 10 }}>Thêm môn</Button>
                        <Table
                            style={{ marginTop: 20 }}
                            dataSource={dsMon}
                            rowKey="maMon"
                            columns={[
                                { title: "Mã", dataIndex: "maMon" },
                                { title: "Tên", dataIndex: "tenMon" },
                                { title: "TC", dataIndex: "tinChi" },
                                { title: "", render: (r: any) => <Button danger onClick={() => xoaMon(r.maMon)}>Xóa</Button> }
                            ]}
                        />
                    </Card>
                </Col>
            </Row>

            <Card title="Ngân hàng câu hỏi" style={{ marginTop: 20 }}>
                <Row gutter={10}>
                    <Col span={4}>
                        <Input placeholder="Mã câu hỏi" value={maCH} onChange={e => setMaCH(e.target.value)} />
                    </Col>
                    <Col span={4}>
                        <Select style={{ width: "100%" }} placeholder="Môn" value={monCH || undefined} onChange={setMonCH}>
                            {dsMon.map(i => <Option key={i.maMon} value={i.maMon}>{i.tenMon}</Option>)}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Input.TextArea
                            placeholder="Nhập nội dung câu hỏi"
                            value={noiDung}
                            onChange={e => setNoiDung(e.target.value)}
                            autoSize={{ minRows: 3, maxRows: 8 }}
                        />
                    </Col>
                    <Col span={4}>
                        <Select style={{ width: "100%" }} placeholder="Độ khó" value={doKho || undefined} onChange={setDoKho}>
                            <Option value="Dễ">Dễ</Option>
                            <Option value="Trung bình">Trung bình</Option>
                            <Option value="Khó">Khó</Option>
                            <Option value="Rất khó">Rất khó</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select style={{ width: "100%" }} placeholder="Khối" value={khoiCH || undefined} onChange={setKhoiCH}>
                            {dsKhoi.map(i => <Option key={i.tenKhoi} value={i.tenKhoi}>{i.tenKhoi}</Option>)}
                        </Select>
                    </Col>
                    <Col span={2}>
                        <Button type="primary" onClick={themCauHoi}>Thêm</Button>
                    </Col>
                </Row>

                <Row gutter={10} style={{ marginTop: 20 }}>
                    <Col span={6}>
                        <Select style={{ width: "100%" }} placeholder="Tìm môn" onChange={setTimMon} allowClear>
                            {dsMon.map(i => <Option key={i.maMon} value={i.maMon}>{i.tenMon}</Option>)}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select style={{ width: "100%" }} placeholder="Độ khó" onChange={setTimKho} allowClear>
                            <Option value="Dễ">Dễ</Option>
                            <Option value="Trung bình">Trung bình</Option>
                            <Option value="Khó">Khó</Option>
                            <Option value="Rất khó">Rất khó</Option>
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select style={{ width: "100%" }} placeholder="Khối" onChange={setTimKhoi} allowClear>
                            {dsKhoi.map(i => <Option key={i.tenKhoi} value={i.tenKhoi}>{i.tenKhoi}</Option>)}
                        </Select>
                    </Col>
                </Row>

                <Table
                    style={{ marginTop: 20 }}
                    dataSource={dsLoc}
                    rowKey="maCH"
                    columns={[
                        { title: "Mã câu hỏi", dataIndex: "maCH" },
                        { 
                            title: "Môn", 
                            render: (r: any) => getTenMon(r.monCH) 
                        },
                        { title: "Câu hỏi", dataIndex: "noiDung" },
                        { title: "Độ khó", dataIndex: "doKho" },
                        { title: "Khối", dataIndex: "khoiCH" },
                        { title: "", render: (r: any) => <Button danger onClick={() => xoaCauHoi(r.maCH)}>Xóa</Button> }
                    ]}
                />
            </Card>

            <Row gutter={20} style={{ marginTop: 20 }}>
                <Col span={16}>
                    <Card title="Tạo đề thi">
                        <Row gutter={10}>
                            <Col span={6}>
                                <Select style={{ width: "100%" }} placeholder="Môn" value={monDe || undefined} onChange={setMonDe}>
                                    {dsMon.map(i => <Option key={i.maMon} value={i.maMon}>{i.tenMon}</Option>)}
                                </Select>
                            </Col>
                            <Col span={6}>
                                <Select style={{ width: "100%" }} placeholder="Khối" value={khoiDe || undefined} onChange={setKhoiDe}>
                                    {dsKhoi.map(i => <Option key={i.tenKhoi} value={i.tenKhoi}>{i.tenKhoi}</Option>)}
                                </Select>
                            </Col>
                            <Col span={3}><Input placeholder="Dễ" value={soDe} onChange={e => setSoDe(e.target.value)} /></Col>
                            <Col span={3}><Input placeholder="TB" value={soTB} onChange={e => setSoTB(e.target.value)} /></Col>
                            <Col span={3}><Input placeholder="Khó" value={soKho} onChange={e => setSoKho(e.target.value)} /></Col>
                            <Col span={3}><Input placeholder="Rất khó" value={soRK} onChange={e => setSoRK(e.target.value)} /></Col>
                        </Row>

                        <div style={{ marginTop: 15 }}>
                            <Button type="primary" onClick={taoDe}>Tạo đề</Button>
                            <Button style={{ marginLeft: 10 }} onClick={luuCauTruc}>Lưu cấu trúc</Button>
                        </div>

                        <Table
                            style={{ marginTop: 20 }}
                            dataSource={dsDeThi}
                            rowKey={(_, i) => i + ""}
                            columns={[
                                { 
                                    title: "Môn", 
                                    render: (r: any) => getTenMon(r.mon) 
                                },
                                { title: "Khối", dataIndex: "khoi" },
                                { title: "Số câu", render: (r: any) => r.ds.length },
                                {
                                    title: "Thao tác",
                                    render: (_: any, record: any, index: number) =>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <Button type="primary" ghost onClick={() => handleViewDetail(record)}>Xem chi tiết</Button>
                                            <Button danger onClick={() => xoaDe(index)}>Xóa</Button>
                                        </div>
                                }
                            ]}
                        />
                    </Card>
                </Col>

                <Col span={8}>
                    <Card title="Danh sách cấu trúc">
                        <Table
                            dataSource={dsCauTruc}
                            rowKey={(_, i) => i + ""}
                            columns={[
                                { 
                                    title: "Môn", 
                                    render: (r: any) => getTenMon(r.monDe) 
                                },
                                { title: "Cấu trúc", render: (r: any) => `${r.soDe || 0}-${r.soTB || 0}-${r.soKho || 0}-${r.soRK || 0}` },
                                { title: "", render: (r: any) => <Button type="link" onClick={() => dungCauTruc(r)}>Dùng</Button> }
                            ]}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}