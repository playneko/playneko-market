import React from 'react';
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// 모델
// import MainListModel from "../models/MainListModel";
import PageListModel from "../models/PageListModel";

const Danger = () => {
  return (
    <Alert key="4" variant="danger">
      에러가 발생했습니다.
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
  mediaLeft: {
    float: 'left',
    paddingTop: '20px',
    paddingRight: '20px',
    paddingBottom: '20px',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    width: '55px',
    backgroundSize: 'cover',
  },
}));

const Home = (props) => {
  let history = useHistory();
  const [listData, setListData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // 스타일 정보
  const classes = useStyles();

  // 페이지 전환
  const onPageChange = ({page}) => {
    history.push("/page/" + page);
  }

  // 페이지 번호
  var page = 1;
  if (props.match != null) {
    page = props.match.params.page;
  }

  // 페이지 로드
  PageListModel({page, setListData, setError, setLoading});

  if (listData.list != null && listData.list.length > 0) {
    return (
      <>
        <div className="mainStyle-root mainStyle-content">
        {
          listData.list.map(item => (
            <div className={classes.mediaLeft}>
              <Card className={classes.root}>
                <CardMedia
                  className={classes.media + " cardStyle-media"}
                  image={item.goods_image}
                  title={item.goods_title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {item.goods_title}<br/>
                      <strike className="item-strike_red">{item.goods_sale}원</strike>→{item.goods_sell}원
                    </Typography>
                </CardContent>
              </Card>
            </div>
          ))
        }
        </div>
        <div className={classes.root + " mainStyle-pagination"}>
          <Pagination count={listData.paging.total} shape="rounded" onChange={(event, page) => onPageChange({page})} />
        </div>
      </>
    );
  } else {
    return (
      <div className="mainStyle-root mainStyle-content">
        {error != null ? <Danger /> : ""}
        <div className={loading != null && loading === true ? "div-form_show" : "div-form_hidden"}>
          <CircularProgress disableShrink />
        </div>
      </div>
    );
  }
}

export default Home;