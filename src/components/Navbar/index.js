import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {imageURL} from '../../util/connect';
import {isMobile} from 'react-device-detect';

//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyle from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';

import IconButton from '@material-ui/core/IconButton';
//icons
import SearchIcon from '@material-ui/icons/Search';
//redux
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/actions/userAction';
import Notifications from './Notifications';

const styles = (theme) => ({
  root: {top: '0', margin: '0', width: '100%'},
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0',
    zIndex: '100',
    width: '100%',
    padding: '0',
  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    marginLeft: theme.spacing(4),
    width: theme.spacing(4),
    height: theme.spacing(4),

    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(3),
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
    },
  },
  icon: {
    margin: theme.spacing(0.5),
    '& .MuiBadge-badge': {
      transform: 'scale(1) translate(30%, -30%)',
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      '& .MuiBadge-badge': {
        transform: 'scale(1) translate(40%, -40%)',
      },
    },
  },
});
export class Navbar extends Component {
  state = {
    open: false,
    anchorEl: null,
  };

  handleUserNameClick = (event) => {
    this.setState({
      open: !this.state.open,
    });
    this.setState({anchorEl: event.currentTarget});
  };

  handleLogoutOnclick = () => {
    this.props.logoutUser(this.props.history);
    // window.location.href = '/login';
  };

  closeMenu = () => {
    this.setState({anchorEl: null});
  };

  render() {
    const {classes} = this.props;
    const {user} = this.props;

    console.log(this.props.user.notifications.length);
    return (
      <div>
        <AppBar className={classes.root} position='fixed'>
          <Toolbar className={classes.toolbar}>
            <Button color='inherit' component={Link} to='/'>
              home
            </Button>

            <div className={classes.right}>
              {isMobile ? (
                <IconButton color='inherit' className={classes.icon}>
                  <SearchIcon className={classes.icon} />
                </IconButton>
              ) : null}
              <Notifications />

              <Avatar
                src={`${imageURL}${user.avatar}`}
                className={classes.avatar}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  logoutUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(Navbar));
