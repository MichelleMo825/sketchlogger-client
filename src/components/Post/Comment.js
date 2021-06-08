import React, {Component} from 'react';
import {imageURL} from '../../util/connect';
import dayjs from 'dayjs';
//components

import DeleteComfirmation from './DeleteComfirmation';
//Mui
import withStyle from '@material-ui/core/styles/withStyles';

import Avatar from '@material-ui/core/Avatar';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';

//icons
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
//redux
import {connect} from 'react-redux';
import {deleteComment, replyComment} from '../../redux/actions/dataAction';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(0.5),
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },

  left: {
    marginRight: theme.spacing(1.5),
  },
  right: {
    width: '100%',
  },

  avatar: {
    marginTop: theme.spacing(1),
    height: theme.spacing(3),
    width: theme.spacing(3),
  },

  username: {
    fontWeight: '600',
    color: theme.palette.secondary.main,
  },

  content: {
    whiteSpace: 'pre-line',
    wordWrap: 'break-word ',
    wordBreak: 'break-all',
    width: '100%',
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  created: {
    fontWeight: '300',
    fontSize: '12px',
    color: theme.palette.secondary.main,
  },
  metaData: {
    display: 'flex',
    alignItems: 'center',

    '& .MuiButton-root': {
      marginLeft: theme.spacing(1),
      color: theme.palette.secondary.main,
    },
  },
  replyForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    '& .MuiButton-root': {
      marginLeft: theme.spacing(1),
      // color: theme.palette.secondary.main,
    },
  },

  replyButton: {
    height: theme.spacing(4),
    display: 'inline-block',
    alignSelf: 'flex-end',
  },
});
export class Comment extends Component {
  state = {
    expanded: false,
    openDelete: false,
    reply: '',
    openReply: false,
  };
  handleReadmore = () => {
    this.setState({expanded: !this.state.expanded});
  };

  handleDeleteComment = () => {
    this.props.deleteComment(this.props.comment.id);
    this.setState({openDelete: false});
  };

  toogleOpenDelteConfirmation = () => {
    this.setState({openDelete: !this.state.openDelete});
  };

  handleReplyComment = () => {
    this.props.replyComment(this.props.comment.id, this.state.reply);
    this.setState({reply: ''});
  };

  handleReplyInputChange = (event) => {
    this.setState({reply: event.target.value});
  };

  render() {
    const {
      classes,
      comment: {username, avatar, content, created},
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div className={classes.left}>
            <Link href={`/user/${username}`} underline='none'>
              <Avatar src={`${imageURL}${avatar}`} className={classes.avatar} />
            </Link>
          </div>
          <div className={classes.right}>
            <Typography
              className={classes.username}
              component={Link}
              href={`/user/${username}`}
              underline='none'
              color='primary'>
              {`${username}`}
            </Typography>

            <div className={classes.content}>
              {' '}
              {content.length > 100 || content.split('\n').length > 4 ? (
                <div>
                  <Collapse in={this.state.expanded} collapsedHeight={40}>
                    {content}
                  </Collapse>
                  <Button
                    size='small'
                    color='secondary'
                    onClick={this.handleReadmore}>
                    {this.state.expanded ? 'Read Less' : 'Read More'}
                  </Button>
                </div>
              ) : (
                content
              )}
            </div>
            {/* metadata */}
            <div className={classes.metaData}>
              <Typography className={classes.created}>
                {dayjs(created).format('DD MMM YYYY')}
              </Typography>
              {this.props.user.username === username ? (
                <Button
                  startIcon={<DeleteOutlineIcon />}
                  size='small'
                  onClick={this.toogleOpenDelteConfirmation}>
                  Delete
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <DeleteComfirmation
          type='comment'
          onDelete={this.handleDeleteComment}
          onCancel={this.toogleOpenDelteConfirmation}
          open={this.state.openDelete}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  deleteComment,
  replyComment,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(Comment));
