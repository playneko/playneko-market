import { useState, useEffect } from 'react';
import axios from 'axios'

const SessionModel = (props, setHeaderData) => {
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
        if (setHeaderData != null) {
            try {
                // POST 전송
                let response = await axios.post('/header/count', {
                    projectId: "9a27a65f138f8f6f4991323212ebb408"
                })
                .catch(function (error) {
                    console.log(error);
                });
                setHeaderData(response.data);
            } catch (e) {
                console.log(e);
            }
        }
    };

    useEffect(() => {
        fetchDatas();
    }, [props]);

    return jsonData;
}

export default SessionModel;
