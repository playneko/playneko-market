import axios from 'axios'

const AddCartModel = ({detailNo, setError, setLoading}) => {

    const fetchDatas = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);

            if (detailNo != null && detailNo > 0) {
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);
                // POST 전송
                await axios.post('/cart/add', {
                    projectId: "9a27a65f138f8f6f4991323212ebb408",
                    detailNo: detailNo
                })
                .catch(function (error) {
                    return error.response;
                });
            }
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    fetchDatas();
}

export default AddCartModel;
