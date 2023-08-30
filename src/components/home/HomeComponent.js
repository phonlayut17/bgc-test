import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddComponent from '../add/AddComponent';
import ListDataComponent from './ListDataComponent';
import SearchByDateComponent from './SearchByDateComponent';
export default function HomeComponent() {
    const [data, setData] = useState([]);
    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            const response = await axios.post('http://localhost:4000/api/get-data');
            if (response.status === 200) {
                const result = response.data;
                if (result.success) {
                    setData(result.data);
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
    return (
        <>
            <body>
                <AddComponent getData={getData} />
                <br />
                <SearchByDateComponent setData={setData} getData={getData} />
                <br />
                <ListDataComponent data={data} setData={setData} getData={getData} />
            </body>
        </>
    );
}
