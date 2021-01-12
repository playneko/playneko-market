import { useEffect } from 'react';
import axios from 'axios'

const PageListModel = ({page, keyword, setListData, setError, setLoading}) => {

    const fetchDatas = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            // POST 전송
            let response = await axios.post('/category/count', {
                projectId: "9a27a65f138f8f6f4991323212ebb408",
                keyword: keyword
            })
            .catch(function (error) {
                return error.response;
            });
            if (response.data != null) {
                // POST 전송
                response = await axios.post('/category/list', {
                    projectId: "9a27a65f138f8f6f4991323212ebb408",
                    page: page,
                    count: response.data.cnt,
                    keyword: keyword
                })
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
    }, [page, keyword]);
}

export default PageListModel;