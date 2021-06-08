import React, {Component} from 'react';
import Notification from './Notification';
//mui
import withStyle from '@material-ui/core/styles/withStyles';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
//icons
import NotificationsIcon from '@material-ui/icons/Notifications';

//redux
import {connect} from 'react-redux';
import {Typography} from '@material-ui/core';

const styles = (theme) => ({
  icon: {
    margin: theme.spacing(0.5),
    '& .MuiBadge-badge': {
      transform: 'scale(1) translate(10%, -10%)',
    },
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2),
      height: theme.spacing(2),
      '& .MuiBadge-badge': {
        transform: 'scale(1) translate(40%, -40%)',
        height: theme.spacing(1),
        minWidth: theme.spacing(1),
      },
    },
  },

  panel: {
    width: theme.spacing(50),

    [theme.breakpoints.down('xs')]: {
      width: '100vw',
    },
  },
  title: {
    padding: theme.spacing(1),
  },

  empty: {
    padding: theme.spacing(2),
  },
});
export class Notifications extends Component {
  state = {
    open: false,
  };

  panelRef = React.createRef();

  handleClick = (e) => {
    this.panelRef.current.focus();
    this.setState({open: !this.state.open});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const {classes} = this.props;
    const {notifications} = this.props.user;

    const empty = (
      <div className={classes.empty}>You don't have any new notifications</div>
    );
    return (
      <div>
        <Badge
          badgeContent={notifications.length}
          showZero={false}
          max={99}
          color='secondary'
          ref={this.panelRef}
          onClick={this.handleClick}>
          <NotificationsIcon className={classes.icon} />
        </Badge>

        <Popover
          open={this.state.open}
          anchorEl={this.panelRef.current}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <Paper className={classes.panel}>
            <Typography variant='h6' className={classes.title}>
              Notifications
            </Typography>
            <Divider />

            {notifications.length > 0
              ? notifications.map((not) => {
                  return (
                    <Notification
                      key={not.id}
                      notification={not}
                      onClose={this.handleClose}
                    />
                  );
                })
              : empty}
          </Paper>
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(withStyle(styles)(Notifications));
