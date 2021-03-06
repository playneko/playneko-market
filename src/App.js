import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// 컴포넌트
// 타이틀
import Title from "./component/Title";
// Header
import Header from "./component/Header";
// Home
import Home from "./component/Home";
// 상세페이지
import Detail from './component/Detail';
// 로그인
import Login from "./component/Login";
// 로그아웃
import Logout from "./component/Logout";
// 회원가입
import Registry from "./component/Registry";
// Footer
import Footer from "./component/Footer";
// CSS
import './styles/App.css';

// 타이틀 세팅
const useTitle = Title();

const colorTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#a2cf6e',
    },
    secondary: {
      main: '#ff3d00',
    },
  },
});

function App() {
  // 타이틀 변경
  useTitle("Playneko - 심플 쇼핑몰");

  const [isLogin, setIsLogin] = React.useState(0);
  const [myTheme, setMyTheme] = React.useState(colorTheme);

  // 로그인 유무를 체크후 헤더에 넘겨주기
  const handleLoginout = (e) => {
    if (e === true) {
      setIsLogin(isLogin + 1);
    } else {
      setIsLogin(0);
    }
  };

  return (
    <Router>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <Header params={isLogin} />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route path="/page/:page" component={Home} />
          <Route path="/search/:keyword/:page" component={Home} />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/detail/:detail" component={Detail} />
          <Route path="/user/login" render={() => <Login params={handleLoginout} />} />
          <Route path="/user/logout" render={() => <Logout params={handleLoginout} />} />
          <Route path="/user/registry" render={() => <Registry />} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
