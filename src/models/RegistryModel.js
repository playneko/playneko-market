import { useEffect } from 'react';
import axios from 'axios'

const RegistryModel = ({account, setUsers, setError, setLoading}) => {

    const fetchUsers = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setUsers(null);
            var response = {};

            if (account != null && account.userRegistry === true) {
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);
                // POST 전송
                response = await axios.post('/user/registry', {
                    projectId: "9a27a65f138f8f6f4991323212ebb408",
                    userId: account.userId,
                    userPw: account.userPw,
                    userEmail: account.userEmail,
                    userName: account.userName,
                    userTel: account.userTel,
                    userZip: account.userZip,
                    userAddr1: account.userAddr1,
                    userAddr2: account.userAddr2
                })
                .catch(function (error) {
                    return error.response;
                });
            }
            // 데이터는 response.data 안에 들어있습니다.
            setUsers(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUsers();
    }, [account]);
}

export default RegistryModel;
