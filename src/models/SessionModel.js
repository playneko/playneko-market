import { useState, useEffect } from 'react';
import axios from 'axios'

const SessionModel = (props) => {
    const [jsonData, setJsonData] = useState([]);

    // 메인 리스트 취득
    const fetchDatas = async () => {
        try {
            // POST 전송
            let response = await axios.get('/user/isLogin')
            .catch(function (error) {
                console.log(error);
            });
            setJsonData(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchDatas();
    }, [props]);

    return jsonData;
}

export default SessionModel;
