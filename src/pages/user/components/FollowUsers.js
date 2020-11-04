import React, {Component} from 'react';
import {isMobile} from 'react-device-detect';
import {imageURL} from '../../../util/connect';
//mui
import withStyle from '@material-ui/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
//icons
import CloseIcon from '@material-ui/icons/Close';

//redux
import {connect} from 'react-redux';
import {follow, unfollow} from '../../../redux/actions/userAction';
import {getUserInfo} from '../../../redux/actions/dataAction';
const styles = (theme) => ({
  root: {},
  avatar: {
    margin: 'auto',
  },
  username: {
    fontWeight: '600',
    color: theme.palette.primary.main,
  },
  noUsers: {
    color: theme.palette.secondary.main,
    textAlign: 'center',
    padding: theme.spacing(8),
    fontWeight: '300',
  },
  title: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  followButton: {
    display: 'flex',
    justifyContent: 'center',
  },

  usersWrapper: {
    minHeight: '350px',
  },
});

class FollowUsers extends Component {
  handleFollow = (id) => {
    this.props.follow(id);
    this.props.getUserInfo(this.props.user.username);
  };

  handleUnfollow = (id) => {
    this.props.unfollow(id);
    this.props.getUserInfo(this.props.user.username);
  };
  render() {
    const {classes, onClose, type, users, open} = this.props;

    const Users = (
      <div className={classes.usersWrapper}>
        {users.map((user) => {
          return (
            <Grid container spacing={0}>
              <Grid item sm={2} xs={2}>
                <Avatar
                  className={classes.avatar}
                  src={`${imageURL}${user.avatar}`}
                />
              </Grid>

              <Grid item sm={10} xs={10}>
                <Grid container spacing={0}>
                  <Grid item sm={9} xs={8}>
                    <Typography
                      className={classes.username}
                      component={Link}
                      href={`/user/${user.username}`}
                      underline='none'>
                      {user.username}
                    </Typography>
                  </Grid>
                  <Grid item sm={3} xs={4} className={classes.followButton}>
                    {this.props.currentUser.followings.filter((following) =>
                      following === user.id ? true : false
                    ).length > 0 ? (
                      <Button
                        variant='outlined'
                        size='small'
                        onClick={() => {
                          this.handleUnfollow(user.id);
                        }}>
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        variant='outlined'
                        size='small'
                        disabled={this.props.user.id === user.id ? true : false}
                        onClick={() => {
                          this.handleFollow(user.id);
                        }}>
                        Follow
                      </Button>
                    )}
                  </Grid>

                  {user.bio}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </div>
    );
    return (
      <div className={classes.root}>
        <Dialog
          open={open}
          onClose={onClose}
          fullWidth
          fullScreen={isMobile}
          className={classes.root}>
          {isMobile ? (
            <AppBar className={classes.appBar}>
              <Toolbar>
                <div className={classes.title}>
                  <Typography variant='h6'>{type}</Typography>
                  <IconButton
                    edge='start'
                    color='inherit'
                    onClick={onClose}
                    aria-label='close'>
                    <CloseIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
          ) : null}
          <DialogTitle>
            <div className={classes.title}>
              {type}{' '}
              <IconButton
                edge='start'
                color='inherit'
                onClick={onClose}
                aria-label='close'>
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent>
            {users.length !== 0 ? (
              Users
            ) : (
              <div className={classes.noUsers}>
                {type === 'following'
                  ? "this user hasn't followed anyone"
                  : "this user doesn't have any followers"}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user,
  users: state.data.followUsers,
  user: state.data.user,
});

const mapActionsToProps = {
  follow,
  unfollow,
  getUserInfo,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(FollowUsers));
