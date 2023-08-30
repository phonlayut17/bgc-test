import { useEffect } from 'react';
import { Modal, Button, Form, DatePicker, Row, Input, Select, Col } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/locale/zh_CN';
import ConfigProvider from 'antd/lib/config-provider';
import axios from 'axios';

export default function EditComponent(props) {
    const layout = {
        labelCol: { span: 8 },
    };
    const [form] = Form.useForm();
    const { Option } = Select;
    async function updateData(values) {
        const result = values.quantity * values.unitPrice;
        const formattedResult = result.toFixed(2);
        console.log('edited ' + convertDate(values.date));
        try {
            const body = {
                OrderId: values.orderId,
                OrderDate: convertDate(values.orderDate),
                Region: values.region,
                City: values.city,
                Category: values.category,
                Product: values.product,
                Quantity: values.quantity,
                UnitPrice: values.unitPrice,
                TotalPrice: formattedResult,
            };
            const response = await axios.post('http://localhost:4000/api/edit-data', body);
            if (response.status === 200) {
                const result = response.data;
                if (result.success) {
                    console.log('Success: ' + result.message);
                    form.resetFields();
                    props.getData();
                } else {
                    console.log('Error: ' + result.message);
                }
            } else {
                console.log('Request was not successful. Status code: ' + response.status);
            }
        } catch (error) {
            console.log('Error: ' + error);
        }
        props.setOpen(false);
    }
    const convertDate = (inputDate) => {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const convertToShowDate = (inputDate) => {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    };
    function close() {
        props.setOpen(false);
    }
    useEffect(() => {
        form.setFieldsValue({
            orderDate: props.edited.OrderDate,
            orderId: props.edited.OrderId,
            region: props.edited.Region,
            city: props.edited.City,
            category: props.edited.Category,
            product: props.edited.Product,
            quantity: props.edited.Quantity,
            unitPrice: props.edited.UnitPrice
        });
    }, [props.edited]);
    const dateFormat = 'YYYY/MM/DD';
    return (
        <>
            <Modal
                open={props.open}
                title="Edit data"
                onOk={updateData}
                onCancel={close}
                footer={[
                    null
                ]}
                width={800}
            >
                <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={updateData}
                >
                    <br />
                    <Row>
                        <Col span={8}>
                            <Form.Item name="orderDate" label="OrderDate" rules={[{ required: true }]}>
                                <ConfigProvider locale={locale}>
                                    <DatePicker defaultValue={dayjs(convertToShowDate(props.edited.OrderDate), dateFormat)} format={dateFormat} />
                                </ConfigProvider>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="region" label="Region" rules={[{ required: true }]}>
                                <Select
                                    placeholder='Please Select'
                                    allowClear
                                >
                                    <Option value="East">East</Option>
                                    <Option value="West">West</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="city" label="City" rules={[{ required: true }]}>
                                <Select
                                    placeholder='Please Select'
                                    allowClear
                                >
                                    <Option value="Boston">Boston</Option>
                                    <Option value="Los Angeles">Los Angeles</Option>
                                    <Option value="New York">New York</Option>
                                    <Option value="San Diego">San Diego</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                                <Select
                                    placeholder='Please Select'
                                    allowClear
                                >
                                    <Option value="Bars">Bars</Option>
                                    <Option value="Crackers">Crackers</Option>
                                    <Option value="Cookies">Cookies</Option>
                                    <Option value="Snacks">Snacks</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="product" label="Product" rules={[{ required: true }]}>
                                <Select
                                    placeholder='Please Select'
                                    allowClear
                                >
                                    <Option value="Carrot">Carrot</Option>
                                    <Option value="Whole Wheat">Whole Wheat</Option>
                                    <Option value="Chocolate Chip">Chocolate Chip</Option>
                                    <Option value="Arrowroot">Arrowroot</Option>
                                    <Option value="Potato Chips">Potato Chips</Option>
                                    <Option value="Oatmeal Raisin">Oatmeal Raisin</Option>
                                    <Option value="Bran">Bran</Option>
                                    <Option value="Pretzels">Pretzels</Option>
                                    <Option value="Banana">Banana</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8}>
                            <Form.Item name="unitPrice" label="unitPrice" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item name="orderId" label="orderId" rules={[{ required: true }]} className='hidden'>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='button-form' gutter={8}>
                        <Button type="primary" htmlType="submit">
                            Edit Data
                        </Button>
                    </Row>
                </Form>
            </Modal>
        </>
    );
}