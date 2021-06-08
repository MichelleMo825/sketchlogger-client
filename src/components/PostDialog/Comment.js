import React, {Component} from 'react';
import {imageURL} from '../../util/connect';
import dayjs from 'dayjs';
//components
import Reply from './Reply';
import DeleteComfirmation from './DeleteComfirmation';
//Mui
import withStyle from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//icons
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
//redux
import {connect} from 'react-redux';
import {deleteComment, replyComment} from '../../redux/actions/dataAction';
import {TransferWithinAStationOutlined} from '@material-ui/icons';

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
    marginRight: theme.spacing(2),
  },
  right: {
    width: '100%',
  },

  avatar: {
    margin: 'auto',
    height: theme.spacing(5),
    width: theme.spacing(5),
  },

  username: {
    fontWeight: '600',
    color: theme.palette.secondary.main,
  },

  paper: {
    padding: theme.spacing(1),
  },

  content: {
    whiteSpace: 'pre-line',
    wordWrap: 'break-word ',
    wordBreak: 'break-all',
    width: '100%',
    // display: 'flex',
    // flexWrap: 'wrap',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
  };

  ref = React.createRef();

  componentDidMount() {
    const focus = this.props.UI.focus;

    if (focus.type == 'comment' && focus.id == this.props.comment.id) {
      this.ref.current.scrollIntoView({block: 'center'});
    }
  }
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
      comment: {username, avatar, content, created, replies},
    } = this.props;
    return (
      <div className={classes.root} ref={this.ref}>
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

            {/* replies */}
            <div>
              {replies
                ? replies.map((reply) => <Reply reply={reply} key={reply.id} />)
                : null}
            </div>
            {/* reply form */}
            {/* <Grid container spacing={1}>
                <Grid item xs={9} sm={9}>
                  <TextField fullWidth />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <Button variant='outlined' size='small'>
                    Reply
                  </Button>
                </Grid>
              </Grid> */}

            <div className={classes.replyForm}>
              <TextField
                fullWidth
                value={this.state.reply}
                onChange={this.handleReplyInputChange}
                multiline
              />
              <div className={classes.replyButtonContainer}>
                <Button
                  className={classes.replyButton}
                  variant='outlined'
                  size='small'
                  onClick={this.handleReplyComment}>
                  Reply
                </Button>
              </div>
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
  UI: state.UI,
});
const mapActionsToProps = {
  deleteComment,
  replyComment,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(Comment));
