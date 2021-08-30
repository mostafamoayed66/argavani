import React from 'react';
import { signout } from "../actions";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import AccountCircle from '@material-ui/icons/AccountCircle';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import MenuHeader from '../components/MenuHeader';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  Appbar: {
    backgroundColor: '#fff',
    borderBottom: '1px solid rgb(207,216,220)',
  },

  logo: {
    color: '#212121',
    fontSize: '20px',
    fontWeight: '500',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
    },
  },

  iconButton: {
    boxShadow: 'none',
    textTransform: 'none',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },

  iconButtonMobile: {
    marginRight: theme.spacing(-2),
    boxShadow: 'none',
    textTransform: 'none',
    '&:focus': {
      outline: 'none',
    },
  },

  iconTitle: {
    fontSize: '14px',
    fontWeight: '500',
    paddingRight: '10px',
    paddingLeft: '10px',
    color: '#676464'
  },

  iconName: {
    fontSize: '12px',
    fontWeight: '400',
    paddingRight: '10px',
    paddingLeft: '10px',
    color: 'black'
  },


  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inline-block',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const classes = useStyles();

  const logout = () => {
    dispatch(signout());
  };


  return (
    <div>
      <AppBar position="static" elevation={0} className={classes.Appbar}>
        <Toolbar>

          <div>
            <Link to={'/cart'}>
              <IconButton aria-label="basket" className={classes.iconButton}>
                <Badge badgeContent={Object.keys(cart.cartItems).length} color="secondary">
                  <AddShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

            {/* Desktop */}

            {
              auth.authenticate ?
                <div className={classes.sectionDesktop}>
                  <IconButton
                    className={classes.iconButton}
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                  >
                    <ExitToAppIcon />
                  </IconButton>
                  <span onClick={logout} className={classes.iconName}>{auth.user.fullName}</span>
                </div>
                :
                <div className={classes.sectionDesktop}>
                  <Link to={'/login'} style={{ textDecoration: 'none' }}>
                    <IconButton
                      className={classes.iconButton}
                      edge="end"
                      aria-label="account of current user"
                      aria-haspopup="true"
                    >
                      <AccountCircle />
                      <span className={classes.iconTitle}>حساب کاربری</span>
                    </IconButton>
                  </Link>
                </div>
            }
          </div>



          <div className={classes.grow} />

          <Link to={'/'} style={{ textDecoration: 'none' }}>
            <span className={classes.logo}>ارغوانی</span>
          </Link>

          {/* Mobile */}


          {
            auth.authenticate ?
              <div className={classes.sectionMobile}>
                <IconButton
                  className={classes.iconButtonMobile}
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={logout}
                >
                  <span className={classes.iconName}>{auth.user.fullName}</span>
                  <ExitToAppIcon />
                </IconButton>
              </div>
              :
              <div className={classes.sectionMobile}>
                <Link to={'/login'} style={{ textDecoration: 'none' }}>
                  <IconButton
                    className={classes.iconButtonMobile}
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                  >
                    <span className={classes.iconTitle}>حساب کاربری</span>
                    <AccountCircle />
                  </IconButton>
                </Link>
              </div>
          }

        </Toolbar>
      </AppBar>


      <div style={{ borderBottom: '1px solid #BDBDBD' }}>
        <MenuHeader />
      </div>
    </div>
  );
}
