import { Form, DatePicker, Row, Col, Button, Card } from 'antd';
import axios from 'axios';
export default function SearchByDateComponent(props) {
    const layout = {
        labelCol: { span: 8 },
    };
    const [form] = Form.useForm();
    async function searchByDate(values) {
        console.log(values);
        const body = {
            StartDate: convertDate(values.startDate),
            EndDate: convertDate(values.endDate),
        };
        try {
            const response = await axios.post('http://localhost:4000/api/get-data-by-date', body);
            if (response.status === 200) {
                const result = response.data;
                if (result.success) {
                    props.setData(result.data);
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
    const convertDate = (inputDate) => {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    return (
        <Card title="Search By Date">
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={searchByDate}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
                            <DatePicker format="DD/MM/YYYY" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row className='button-form'>
                    <Button type="primary" htmlType="submit">
                        Search Data
                    </Button>
                </Row>
            </Form>
        </Card>
    );

}