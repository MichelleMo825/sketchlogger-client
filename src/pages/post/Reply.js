import React, {Component} from 'react';
import {imageURL} from '../../util/connect';
import dayjs from 'dayjs';
//components
import DeleteComfirmation from './DeleteComfirmation';
//mui
import withStyle from '@material-ui/core/styles/withStyles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
//icons
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
//redux
import {connect} from 'react-redux';
import {deleteReply} from '../../redux/actions/dataAction';
import {FiberPin} from '@material-ui/icons';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
  },

  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  avatar: {
    height: theme.spacing(3),
    width: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  username: {
    fontWeight: '600',
    color: theme.palette.secondary.main,
    marginRight: theme.spacing(1),
  },

  replyContent: {
    wordWrap: 'break-word ',
    wordBreak: 'break-all',
    width: '100%',

    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  // body: {
  //   width: '100%',
  //   wordWrap: 'break-word',
  // },
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
});
export class Reply extends Component {
  state = {openDelete: false};
  handleDeleteReply = () => {
    this.props.deleteReply(this.props.reply.id);
    this.setState({openDelete: false});
  };

  toogleOpenDelteConfirmation = () => {
    this.setState({openDelete: !this.state.openDelete});
  };
  render() {
    const {
      classes,
      reply: {avatar, username, body, created},
    } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <div item ms={1} xs={2}>
            <Link href={`/user/${username}`} underline='none'>
              <Avatar src={`${imageURL}${avatar}`} className={classes.avatar} />
            </Link>
          </div>
          <div item ms={11} xs={10}>
            <div className={classes.replyContent}>
              <span>
                <a
                  href={`/user/${username}`}
                  underline='none'
                  className={classes.username}>
                  {username}
                </a>
              </span>
              {body}
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
          type='reply'
          onDelete={this.handleDeleteReply}
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
  deleteReply,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(Reply));
