import React, {Component} from 'react';
import {imageURL} from '../../util/connect';
import dayjs from 'dayjs';

//Mui
import withStyle from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

//icon

//redux
import {connect} from 'react-redux';
import {getFollowers, readNotification} from '../../redux/actions/userAction';
import {getPost} from '../../redux/actions/dataAction';

import store from '../../redux/store';
import {SET_FOCUS} from '../../redux/types';

const styles = (theme) => ({
  container: {
    paddingTop: theme.spacing(1),

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  message: {
    whiteSpace: 'pre-line',
    wordWrap: 'break-word ',
    wordBreak: 'break-word',
    width: '100%',
  },

  username: {
    marginRight: theme.spacing(0.6),
    color: theme.palette.primary.main,
    fontWeight: '500',
  },
  comment: {
    color: theme.palette.secondary.dark,
  },

  replyComment: {
    backgroundColor: '#eeeeee',
    // color: theme.palette.secondary.dark,
    padding: '5px 10px',
  },

  snapShot: {
    height: theme.spacing(5),
    width: theme.spacing(8),

    whiteSpace: 'pre-line',
    wordWrap: 'break-word ',
    wordBreak: 'break-all',
    fontSize: '8px',

    '& img': {
      objectFit: 'cover',
      height: '100%',
      width: '100%',
    },
  },
});
export class Notification extends Component {
  handleNotificationClick = () => {
    const {notification} = this.props;
    const {target_type, id} = notification;

    if (target_type === 'comment') {
      store.dispatch({
        type: SET_FOCUS,
        payload: {type: 'comment', id: notification.target_id},
      });
    } else if (target_type === 'reply') {
      store.dispatch({
        type: SET_FOCUS,
        payload: {type: 'reply', id: notification.target_id},
      });
    }

    if (target_type === 'follow') {
      this.props.getFollowers(this.props.user.username);
    } else {
      this.props.getPost(notification.post_id);
    }

    this.props.onClose();
    this.props.readNotification(id);
  };
  render() {
    const {classes, notification} = this.props;
    const {username, avatar, target_type, created} = notification;

    const content = () => {
      const message = () => {
        switch (target_type) {
          case 'follow':
            return 'followed you';
          case 'like':
            return 'liked your post';

          case 'comment':
            return notification.comment;

          case 'reply':
            return notification.reply;
        }
      };
      return (
        <div className={classes.message}>
          <a
            href={`/user/${username}`}
            underline='none'
            className={classes.username}>
            {username}
          </a>
          <Typography>{message()}</Typography>
          {target_type === 'reply' ? (
            <div className={classes.replyComment}>
              <span style={{color: '#9e9e9e'}}>replied on your comment: </span>
              {notification.comment}
            </div>
          ) : null}
        </div>
      );
    };
    return (
      <div>
        <MenuItem onClick={this.handleNotificationClick}>
          <div className={classes.container}>
            <div className={classes.avatar}>
              <Avatar
                src={`${imageURL}${avatar}`}
                className={classes.avatar}
                component={Link}
                href={`/user/${username}`}
              />
            </div>
            <div className={classes.content}>
              {content()}
              <Typography
                style={{
                  fontWeight: '300',
                  fontSize: '12px',
                  color: '#555',
                }}>
                {dayjs(created).fromNow()}
              </Typography>
            </div>
            {target_type !== 'follow' ? (
              <div className={classes.snapShot}>
                {notification.images.length > 0 ? (
                  <img src={`${imageURL}${notification.images[0]}`} />
                ) : (
                  notification.description
                )}
              </div>
            ) : null}
          </div>
        </MenuItem>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  getFollowers,
  readNotification,
  getPost,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(Notification));
