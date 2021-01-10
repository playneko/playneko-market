import React from 'react';
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'bootstrap/dist/css/bootstrap.min.css';

// 컴포넌트
// 모델
import LogoutModel from "../models/LogoutModel";

const Danger = () => {
  return (
    <Alert key="4" variant="danger">
      로그아웃 처리중 에러가 발생했습니다.
    </Alert>
  );
}

const Logout = (props) => {
  let history = useHistory();
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // 로그아웃 처리
  LogoutModel({props, setUsers, setError, setLoading});

  const handleRedirect = () => {
    props.params(false);
    history.push("/");
  };

  // 로그아웃 성공의 경우
  if (users != null && users.success === true) {
    handleRedirect();
  }

  return (
    <>
      <div className="login-form">
        {error != null ? <Danger /> : ""}
        <div className={loading != null && loading === true ? "login-form_show" : "login-form_hidden"}>
          <CircularProgress disableShrink />
        </div>
      </div>
    </>
  );
}

export default Logout;