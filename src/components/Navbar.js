import React, {Component, Fragment, createRef} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {imageURL} from '../util/connect';
//MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyle from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';

//redux
import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/userAction';

const styles = (theme) => ({
  root: {top: '0', margin: '0'},
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 -16px',
    zIndex: '100',
    width: '100%',
  },
  right: {
    display: 'flex',
  },
  small: {
    margin: theme.spacing(2),
    width: theme.spacing(3),
    height: theme.spacing(3),
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
    const {anchorEl} = this.state;
    return (
      <div>
        <AppBar className={classes.root} position='fixed'>
          <Toolbar className={classes.toolbar}>
            <Button color='inherit' component={Link} to='/'>
              home
            </Button>
            <div>
              {this.props.user.authenticated ? (
                <Fragment>
                  <Button
                    color='inherit'
                    className={classes.right}
                    onClick={this.handleUserNameClick}
                    ref={this.anchorRef}>
                    {user.username}
                    <Avatar
                      src={`${imageURL}${user.avatar}`}
                      className={classes.small}
                    />
                  </Button>

                  <Popover
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.closeMenu}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}>
                    <Paper>
                      <MenuItem
                        component={Link}
                        to='/settings'
                        onClick={this.closeMenu}>
                        Settings
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={this.handleLogoutOnclick}>
                        Logout
                      </MenuItem>
                    </Paper>
                  </Popover>
                </Fragment>
              ) : (
                <Button color='inherit' component={Link} to='/login'>
                  login
                </Button>
              )}
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
