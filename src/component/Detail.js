import React from 'react';
import { useHistory } from "react-router-dom";
import gfm from 'remark-gfm';
import Alert from 'react-bootstrap/Alert';
import ReactMarkdown from 'react-markdown';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import htmlParser from 'react-markdown/plugins/html-parser';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// 컴포넌트
// 모델
import SessionModel from "../models/SessionModel";
import DetailModel from "../models/DetailModel";
import NowBuyModel from "../models/NowBuyModel";
import AddCartModel from "../models/AddCartModel";

const Danger = () => {
  return (
    <Alert key="4" variant="danger">
      에러가 발생했습니다.
    </Alert>
  );
}

const Warning = () => {
  return (
    <Alert key="5" variant="warning">
      데이터가 취득중 문제가 발생 했습니다.<br />
      잠시후 다시 시도해 주시기 바랍니다.
    </Alert>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

const colorTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#81d4fa',
    },
    secondary: {
      main: '#ffe082',
    },
  },
});

function InlineCodeBlock(props) {
  return (
    <span style={{background: '#ff0'}}>
      {props.value}
    </span>
  );
}

function BlockQuoteBlock(props) {
  return (
    <td style={{borderLeft: '3px solid rgb(170, 170, 170)', margin: 5, paddingLeft: 10}}>
      {props.children}
    </td>
  );
}

function TableCellBlock(props) {
  let style = {
    textAlign: props.align ? props.align : 'center',
    padding: 5
  };

  if (props.isHeader) {
    style.background = '#ff0';
    style.border = '1px solid #ccc';
    style.boderLeft = 0;
    style.borderRight = 0;
  } else {
    style.borderBottom = '1px solid #eee';
  }

  return (
    <td style={style}>
      {props.children}
    </td>
  );
}

const parseHtml = htmlParser({
  processingInstructions: [{
      shouldProcessNode: (node) => node && node.name === 'span',
      processNode: () => <span style={{color: '#f00'}}/>
  }]
});

const Detail = (props) => {
  let history = useHistory();
  const [detailData, setDetailData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [myTheme, setMyTheme] = React.useState(colorTheme);

  // 스타일 정보
  const classes = useStyles();

  // 로그인 유무 취득
  const isLoginData = SessionModel(props.params);

  // 상세페이지 번호
  let detailNo = 0;
  if (props.match != null) {
    detailNo = props.match.params.detail != null ? props.match.params.detail : 0;
  }

  const renderers = {
      tableCell: TableCellBlock,
      inlineCode: InlineCodeBlock,
      blockquote: BlockQuoteBlock,
      code: ({language, value}) => {
          return <SyntaxHighlighter style={okaidia} language={language} children={value} />
      },
  }

  // 장바구니 넣기
  const onHandleAddCart = () => {
    AddCartModel({detailNo, setError, setLoading});
    history.push("/shop/cart");
  }

  // 바로구매
  const onHandleNowBuy = () => {
    NowBuyModel({detailNo, setError, setLoading});
    history.push("/shop/order");
  }

  // 페이지 로드
  DetailModel({detailNo, setDetailData, setError, setLoading});

  if (detailData != null) {
    if (detailData.errors) {
      return (
        <div className="mainStyle-root detailStyle-content">
          <Warning />
        </div>
      );
    } else {
      return (
        <ThemeProvider theme={myTheme}>
          <div className="detailStyle-content">
            <div className="detailStyle-div_left">
              <CardMedia
                className={classes.media + " detailCardStyle-media"}
                image={detailData.goods_image}
                title={detailData.goods_title}
              />
            </div>
            <div className="detailStyle-div_left">
              <p className="detailStyle-div_title">{detailData.goods_title}</p>
              <span className="detailStyle-div_sale"><strike>{detailData.goods_sell}원</strike></span><br />
              <span className="detailStyle-div_sale">{detailData.goods_sale}원</span>
              <div className={isLoginData != null && !isLoginData.isLogin ? "detailStyle-div_show" : "detailStyle-div_hidden"}>
                <div className="detailStyle-div_button_login">로그인을 해주시기 바랍니다.</div>
              </div>
              <div className={isLoginData != null && isLoginData.isLogin && detailData.goods_stock < 1 ? "detailStyle-div_show" : "detailStyle-div_hidden"}>
                <div className="detailStyle-div_button_soldout">SOLD OUT</div>
              </div>
              <div className={isLoginData != null && isLoginData.isLogin && detailData.goods_stock > 0 ? "detailStyle-div_show" : "detailStyle-div_hidden"}>
                <div className="detailStyle-div_button">
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={onHandleAddCart}
                  >
                    장바구니 담기
                  </Button>
                </div>
                <div className="detailStyle-div_button">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={onHandleNowBuy}
                  >
                    바로구매
                  </Button>
                </div>
              </div>
            </div>
            <div className="detailStyle-div_both">
              <ReactMarkdown plugins={[gfm]} skipHtml={false} escapeHtml={false} astPlugins={[parseHtml]} renderers={renderers} children={detailData.goods_text} />
            </div>
          </div>
        </ThemeProvider>
      );
    }
  } else {
      return (
        <div className="mainStyle-root detailStyle-content">
          {error != null ? <Danger /> : ""}
          <div className={loading != null && loading === true ? "div-form_show" : "div-form_hidden"}>
            <CircularProgress disableShrink />
          </div>
        </div>
      );
  }
}

export default Detail;