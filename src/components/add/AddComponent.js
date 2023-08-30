import { Form, DatePicker, Row, Input, Select, Col, Button } from 'antd';
import axios from 'axios';
export default function AddComponent(props) {
    const layout = {
        labelCol: { span: 8 },
    };
    const [form] = Form.useForm();
    const { Option } = Select;
    async function addData(values) {
        const result = values.quantity * values.unitPrice;
        const formattedResult = result.toFixed(2);
        try {
            const body = {
                OrderDate: convertDate(values.date),
                Region: values.region,
                City: values.city,
                Category: values.category,
                Product: values.product,
                Quantity: values.quantity,
                UnitPrice: values.unitPrice,
                TotalPrice: formattedResult,
            };
            const response = await axios.post('http://localhost:4000/api/add-data', body);
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
    }
    function resetData() {
        form.resetFields();
    };
    const convertDate = (inputDate) => {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    return (
        <>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={addData}
            >
                <br />
                <Row>
                    <Col span={8}>
                        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
                            <DatePicker format="MM/DD/YYYY" />
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
                    <Col span={8}></Col>
                </Row>
                <Row className='button-form' gutter={8}>
                    <Button htmlType="button" onClick={resetData}>
                        Reset
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Add Data
                    </Button>
                </Row>
            </Form>
        </>
    );
}