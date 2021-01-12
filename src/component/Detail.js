import React from 'react';
import { useHistory } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// 모델
import DetailModel from "../models/DetailModel";

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

const Detail = (props) => {
  let history = useHistory();
  const [detailData, setDetailData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // 스타일 정보
  const classes = useStyles();

  // 상세페이지 번호
  let detailNo = 0;
  if (props.match != null) {
    detailNo = props.match.params.detail != null ? props.match.params.detail : 0;
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
            <span className="detailStyle-div_sale"><strike>{detailData.goods_sale}원</strike></span><br />
            <span className="detailStyle-div_sale">{detailData.goods_sell}원</span>
          </div>
          <div className="detailStyle-div_both">
          </div>
        </div>
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