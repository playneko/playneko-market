import { useEffect } from 'react';
import axios from 'axios'

const DetailModel = ({detailNo, setDetailData, setError, setLoading}) => {

    const fetchDatas = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setDetailData(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            // POST 전송
            const response = await axios.post('/detail', {
                projectId: "9a27a65f138f8f6f4991323212ebb408",
                detailNo: detailNo
            })
            .catch(function (error) {
                return error.response;
            });

            // 데이터는 response.data 안에 들어있습니다.
            setDetailData(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDatas();
    }, [detailNo]);
}

export default DetailModel;
