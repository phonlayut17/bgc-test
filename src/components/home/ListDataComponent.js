import React, { useState, useRef } from 'react';
import { Table, Button, Input, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import EditComponent from '../edit/EditComponent';
export default function ListDataComponent(props) {
    const [edited, setEdited] = useState({});
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'OrderId', dataIndex: 'OrderId', key: 'OrderId',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.OrderId - b.OrderId,
            ...getColumnSearchProps('OrderId'),
        },
        {
            title: 'OrderDate', dataIndex: 'OrderDate', key: 'OrderDate',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.OrderDate - b.OrderDate,
            render: (text) => {
                const date = new Date(text);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            },
        },
        {
            title: 'Region', dataIndex: 'Region', key: 'Region',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.Region - b.Region,
            filters: [
                {
                    text: 'East',
                    value: 'East',
                },
                {
                    text: 'West',
                    value: 'West',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.Region.startsWith(value),
        },
        {
            title: 'City', dataIndex: 'City', key: 'City',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.City - b.City,
            filters: [
                {
                    text: 'Boston',
                    value: 'Boston',
                },
                {
                    text: 'Los Angeles',
                    value: 'Los Angeles',
                },
                {
                    text: 'New York',
                    value: 'New York',
                },
                {
                    text: 'San Diego',
                    value: 'San Diego',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.City.startsWith(value),
        },
        {
            title: 'Category', dataIndex: 'Category', key: 'Category',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.Category - b.Category,
            filters: [
                {
                    text: 'Bars',
                    value: 'Bars',
                },
                {
                    text: 'Crackers',
                    value: 'Crackers',
                },
                {
                    text: 'Cookies',
                    value: 'Cookies',
                },
                {
                    text: 'Snacks',
                    value: 'Snacks',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.Category.startsWith(value),
        },
        {
            title: 'Product', dataIndex: 'Product', key: 'Product',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.Product - b.Product,
            filters: [
                {
                    text: 'Carrot',
                    value: 'Carrot',
                },
                {
                    text: 'Whole Wheat',
                    value: 'Whole Wheat',
                },
                {
                    text: 'Chocolate Chip',
                    value: 'Chocolate Chip',
                },
                {
                    text: 'Arrowroot',
                    value: 'Arrowroot',
                },
                {
                    text: 'Potato Chips',
                    value: 'Potato Chips',
                },
                {
                    text: 'Oatmeal Raisin',
                    value: 'Oatmeal Raisin',
                },
                {
                    text: 'Bran',
                    value: 'Bran',
                },
                {
                    text: 'Pretzels',
                    value: 'Pretzels',
                },
                {
                    text: 'Banana',
                    value: 'Banana',
                },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.Product.startsWith(value),
        },
        {
            title: 'Quantity', dataIndex: 'Quantity', key: 'Quantity',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.Quantity - b.Quantity,
            ...getColumnSearchProps('Quantity'),
        },
        {
            title: 'UnitPrice', dataIndex: 'UnitPrice', key: 'UnitPrice',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.UnitPrice - b.UnitPrice,
            ...getColumnSearchProps('UnitPrice'),
        },
        {
            title: 'TotalPrice', dataIndex: 'TotalPrice', key: 'TotalPrice',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.TotalPrice - b.TotalPrice,
            ...getColumnSearchProps('TotalPrice'),
        },
        {
            title: 'Manage',
            dataIndex: 'Manage',
            key: 'Manage',
            render: (_, record) => (
                <span>
                    <Button onClick={() => getDataById(record.OrderId)}>Edit</Button>
                    <Button onClick={() => deleteById(record.OrderId)}>Delete</Button>
                </span>
            ),
        },
    ];

    async function deleteById(id) {
        try {
            const response = await axios.post('http://localhost:4000/api/delete-data', { id: id });
            if (response.status === 200) {
                const result = response.data;
                if (result.success) {
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

    async function getDataById(id) {
        try {
            const response = await axios.post('http://localhost:4000/api/get-data-by-id', { id: id });
            if (response.status === 200) {
                const result = response.data;
                if (result.success) {
                    setDate(convertDate(result.date));
                    setEdited({});
                    setEdited(result.data);
                    edited.OrderDate = convertDate(result.date);
                    console.log(edited.OrderDate);
                    setOpen(true);
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
        <>
            <Table columns={columns} dataSource={props.data} />
            <EditComponent edited={edited} open={open} setOpen={setOpen} getData={props.getData} date={date} />
        </>
    );
}