import React from 'react';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'bootstrap/dist/css/bootstrap.min.css';

// 컴포넌트
// 모델
import LoginModel from "../models/LoginModel";

const Warning = (errors) => {
  const lists = errors.errors;
  return (
    <Alert key="5" variant="warning">
    {
      lists.errors.map(item => (
        <div>{item.msg}</div>
      ))
    }
    </Alert>
  );
}

const Danger = () => {
  return (
    <Alert key="4" variant="danger">
      로그인중 에러가 발생했습니다.
    </Alert>
  );
}

const Login = (props) => {
  let history = useHistory();
  const [account, setAccount] = React.useState({});
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // 로그인 처리
  LoginModel({account, setUsers, setError, setLoading});

  const handleSubmit = (e) => {
    e.preventDefault();

    setAccount({
      userLogin: true,
      userId: e.target.userId.value,
      userPw: e.target.userPw.value
    });
  };

  const handleRegistry = () => {
    history.push("/user/registry");
  };

  const handleRedirect = () => {
    props.params(true);
    history.push("/");
  };

  // 로그인 성공의 경우
  if (users != null && users.success === true) {
    handleRedirect();
  }

  return (
    <>
      <div className="login-form">
        <Alert key="3" variant="success">
          심플 쇼핑몰 로그인
        </Alert>
        {error != null ? <Danger /> : ""}
        {users != null && users.errors ? <Warning errors={users} /> : ""}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicId">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" name="userId" placeholder="아이디를 입력해 주세요." />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" name="userPw" placeholder="비밀번호를 입력해 주세요." />
          </Form.Group>
          <div className={loading === null || loading === false ? "login-form_show" : "login-form_hidden"}>
            <Button variant="primary" type="submit">
              로그인
            </Button>{' '}
            <Button variant="warning" type="button" onClick={handleRegistry}>
              회원가입
            </Button>
          </div>
          <div className={loading != null && loading === true ? "login-form_show" : "login-form_hidden"}>
            <CircularProgress disableShrink />
          </div>
        </Form>
      </div>
    </>
  );
}

export default Login;