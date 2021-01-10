import React from 'react';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'bootstrap/dist/css/bootstrap.min.css';

// 컴포넌트
// 모델
import RegistryModel from "../models/RegistryModel";

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
      등록중 에러가 발생했습니다.
    </Alert>
  );
}

const Registry = () => {
  let history = useHistory();
  const [account, setAccount] = React.useState({});
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // 로그인 처리
  RegistryModel({account, setUsers, setError, setLoading});

  const handleSubmit = (e) => {
    e.preventDefault();

    setAccount({
      userRegistry: true,
      userId: e.target.userId.value,
      userPw: e.target.userPw.value,
      userEmail: e.target.userEmail.value,
      userName: e.target.userName.value,
      userTel: e.target.userTel.value,
      userZip: e.target.userZip.value,
      userAddr1: e.target.userAddr1.value,
      userAddr2: e.target.userAddr2.value
    });
  };

  const handleRedirect = () => {
    history.push("/login");
  };

  // 회원가입 성공의 경우
  if (users != null && users.success === true) {
    handleRedirect();
  }

  return (
    <>
      <div className="login-form">
        <Alert key="3" variant="success">
          회원가입
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
          <Form.Group controlId="formBasicText">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="text" name="userEmail" placeholder="sample@sample.com" />
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" name="userName" placeholder="이름을 입력해 주세요.(홍길동)" />
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label>전화번호</Form.Label>
            <Form.Control type="text" name="userTel" placeholder="전화번호를 입력해 주세요.(010-1234-1234)" />
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label>우편번호</Form.Label>
            <Form.Control type="text" name="userZip" placeholder="우편번호를 입력해 주세요.(123-1234)" />
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label>주소</Form.Label>
            <Form.Control type="text" name="userAddr1" placeholder="주소를 입력해 주세요." />
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Form.Label>상세주소</Form.Label>
            <Form.Control type="text" name="userAddr2" placeholder="상세주소를 입력해 주세요." />
          </Form.Group>
          <div className={loading === null || loading === false ? "login-form_show" : "login-form_hidden"}>
            <Button variant="primary" type="submit">
              등록하기
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

export default Registry;