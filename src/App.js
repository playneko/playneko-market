import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTheme, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

// 컴포넌트
// 타이틀
import Title from "./component/Title";
// Header
import Header from "./component/Header";
// 로그인
import Login from "./component/Login";
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
  const theme = useTheme();
  const [myTheme, setMyTheme] = React.useState(colorTheme);

  return (
    <Router>
      <ThemeProvider theme={myTheme}>
        <Header />
        <Switch>
          <Route exact path="/login" render={() => <Login />} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </Router>
  );
}

export default App;
