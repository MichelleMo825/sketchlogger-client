import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
//mui
import withStyle from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import MenuItem from '@material-ui/core/MenuItem';
//icons
import MenuIcon from '@material-ui/icons/Menu';
import EditIcon from '@material-ui/icons/Edit';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
//redux
import {connect} from 'react-redux';
import store from '../redux/store';
import {NEW_POST, SET_LOGIN} from '../redux/types';
import {logoutUser} from '../redux/actions/userAction';

const styles = (theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    // display: 'None',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },

    zIndex: '20',
  },
  button: {
    color: theme.palette.primary.light,
    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.palette.primary.dark,
      boxShadow: 'none',
    },
  },
});
export class IconMenu extends Component {
  state = {
    open: false,
    anchor: null,
  };

  buttonRef = React.createRef();

  handleClick = (e) => {
    this.buttonRef.current.focus();
    this.setState({open: !this.state.open});
  };
  handleClose = () => {
    this.setState({open: false});
  };

  handleNewPostClick = () => {
    if (!this.props.user.authenticated) {
      store.dispatch({type: SET_LOGIN});
    } else {
      store.dispatch({type: NEW_POST});
    }
  };

  handleLoginClick = () => {
    store.dispatch({type: SET_LOGIN});
  };

  handleLogoutOnclick = () => {
    this.props.logoutUser();
  };

  render() {
    const {classes} = this.props;

    const logedoutMenu = (
      <div>
        <MenuItem>
          <Button
            startIcon={<LockOpenIcon />}
            className={classes.button}
            onClick={this.handleLoginClick}>
            Login
          </Button>
        </MenuItem>
        <MenuItem>
          <a href='/signup'>
            <Button
              startIcon={<PersonOutlineIcon />}
              className={classes.button}>
              Sign Up
            </Button>
          </a>
        </MenuItem>
      </div>
    );
    const logedinMenu = (
      <div>
        <MenuItem>
          <Button
            className={classes.button}
            startIcon={<EditIcon />}
            onClick={this.handleNewPostClick}>
            New Post
          </Button>
        </MenuItem>
        <MenuItem>
          <a href={`/user/${this.props.user.username}`}>
            <Button
              className={classes.button}
              startIcon={<AccountCircleIcon />}>
              My Page
            </Button>
          </a>
        </MenuItem>
        <MenuItem>
          <a href='/settings'>
            {' '}
            <Button className={classes.button} startIcon={<SettingsIcon />}>
              Settings
            </Button>
          </a>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Button
            className={classes.button}
            onClick={this.handleLogoutOnclick}
            startIcon={<ExitToAppIcon />}>
            Log OUt
          </Button>
        </MenuItem>
      </div>
    );

    return (
      <div>
        <Fab
          ref={this.buttonRef}
          color='primary'
          className={classes.fab}
          onClick={this.handleClick}>
          <MenuIcon />
          <Popover
            open={this.state.open}
            anchorEl={this.buttonRef.current}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}>
            <Paper className={classes.nav}>
              <a href='/'>
                <Button fullWidth>Home</Button>
              </a>
              {this.props.user.authenticated ? logedinMenu : logedoutMenu}
            </Paper>
          </Popover>
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  logoutUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(IconMenu));
