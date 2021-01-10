import { useState, useEffect } from 'react';
import axios from 'axios'

const LoginModel = ({account, setUsers, setError, setLoading}) => {

    const fetchUsers = async () => {
        try {
            // 요청이 시작 할 때에는 error 와 users 를 초기화하고
            setError(null);
            setUsers(null);
            var response = {};

            if (account != null && account.userLogin === true) {
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);
                // POST 전송
                response = await axios.post('/user/login', {
                    projectId: "9a27a65f138f8f6f4991323212ebb408",
                    userId: account.userId,
                    userPw: account.userPw
                });
            }
            // 데이터는 response.data 안에 들어있습니다.
            setUsers(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [account]);
}

export default LoginModel;
