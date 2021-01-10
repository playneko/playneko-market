import { useState, useEffect } from 'react';
import axios from 'axios'

const RegistryModel = () => {
    const [jsonData, setJsonData] = useState([]);

    // 메인 리스트 취득
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/user/registry');
                // console.log(response);
                setJsonData(response.data);
            } catch(e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);

    return jsonData;
}

export default RegistryModel;
