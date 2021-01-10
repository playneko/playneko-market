import { useEffect } from 'react';
import axios from 'axios'

const LogoutModel = ({props, setUsers, setError, setLoading}) => {

    const fetchUsers = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setUsers(null);
            // loading 상태를 true 로 바꿉니다.
            setLoading(true);

            // POST 전송
            const response = await axios.post('/user/logout');

            // 데이터는 response.data 안에 들어있습니다.
            setUsers(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [props]);
}

export default LogoutModel;
