import React from 'react';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  let history = useHistory();
  const [account, setAccount] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    setAccount({
      userId: e.target.userId.value,
      userPw: e.target.userPw.value
    });
  };

  const handleRegistry = () => {
    history.push("/registry");
  };

  return (
    <>
      <div className="login-form">
        <Alert key="3" variant="success">
          심플 쇼핑몰 로그인
        </Alert>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicId">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" name="userId" placeholder="아이디를 입력해 주세요." />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" name="userPw" placeholder="비밀번호를 입력해 주세요." />
          </Form.Group>
          <Button variant="primary" type="submit">
            로그인
          </Button>{' '}
          <Button variant="warning" type="button" onClick={handleRegistry}>
            회원가입
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;