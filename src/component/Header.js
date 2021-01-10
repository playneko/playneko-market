import React from 'react';
import { useHistory } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Receipt from '@material-ui/icons/Receipt';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';

// 컴포넌트
// 모델
import SessionModel from "../models/SessionModel";
// 스타일
import Styles from "../styles/Styles";

const Header = (props) => {
    const classes = Styles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    let history = useHistory();

    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleUserLogin = () => {
      history.push("/login");
    };

    const handleUserLogout = () => {
      history.push("/logout");
      handleMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    const loginAfterMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleUserLogout}>로그아웃</MenuItem>
      </Menu>
    );

    // 로그인 유무 취득
    const isLoginData = SessionModel(props.params);

    return (
        <div className={classes.grow}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Playneko 심플 쇼핑몰
            </Typography>
            <div className={classes.search + " header-search"}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.grow} />
            <div>
              <IconButton aria-label="Shopping Cart" color="inherit" onClick={() => { history.push("/cart"); }}>
                <Badge badgeContent={isLoginData != null && isLoginData.isLogin ? 1 : 0} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              <IconButton aria-label="Order Info" color="inherit" onClick={() => { history.push("/order"); }}>
                <Badge badgeContent={isLoginData != null && isLoginData.isLogin ? 1 : 0} color="secondary">
                  <Receipt />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={isLoginData != null && isLoginData.isLogin ? handleProfileMenuOpen : handleUserLogin}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {isLoginData != null && isLoginData.isLogin ? loginAfterMenu : ""}
      </div>
    );
}

export default Header;