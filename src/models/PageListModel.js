import { useEffect } from 'react';
import axios from 'axios'

const PageListModel = ({page, setListData, setError, setLoading}) => {

    const fetchDatas = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            // GET 전송
            let response = await axios.get('/category/count?projectid=9a27a65f138f8f6f4991323212ebb408')
            .catch(function (error) {
                return error.response;
            });
            if (response.data != null) {
                // GET 전송
                response = await axios.get('/category/list?page=' + page
                    + '&count=' + response.data.cnt
                    + '&projectid=9a27a65f138f8f6f4991323212ebb408'
                )
                .catch(function (error) {
                    return error.response;
                });

                // 데이터는 response.data 안에 들어있습니다.
                setListData(response.data);
            }
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDatas();
    }, [page]);
}

export default PageListModel;