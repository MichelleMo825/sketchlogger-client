import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {imageURL} from '../../util/connect';
import {isMobile} from 'react-device-detect';
import {styles} from './styles';

//components
import Comment from './Comment';
import TipIconButton from '../TipIconButton';
//Mui
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
//icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import CloseIcon from '@material-ui/icons/Close';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
//redux
import {connect} from 'react-redux';
import {editPost} from '../../redux/actions/postAction';
import {
  likePost,
  unlikePost,
  commentPost,
  deletePost,
  getPost,
} from '../../redux/actions/dataAction';
import DeleteComfirmation from './DeleteComfirmation';
import {CLOSE_POST_DIALOG} from '../../redux/types';
import store from '../../redux/store';
class PostDialog extends Component {
  state = {
    checked: false,
    sticky: false,
    url: '',
    openButton: false,
    expanded: false,
    comment: '',
    commentError: '',
    openDelete: false,
    imageIndex: 0,
  };

  postRef = React.createRef();

  moreButton = React.createRef();

  descriptionRef = React.createRef();

  handleClose = () => {
    this.setState({imageIndex: 0});
    store.dispatch({type: CLOSE_POST_DIALOG});
  };

  handleOnCheck = () => {
    if (this.state.checked) {
      this.postRef.current.scrollIntoView({block: 'center'});
    }
    this.setState({
      checked: !this.state.checked,
      expanded: !this.state.expanded,
    });
  };

  handleImageClick = (url) => {
    if (isMobile) {
      this.setState({showImage: true, url: url});
    }
  };

  handleMoreButtonClick = (event) => {
    if (isMobile) {
      this.moreButton.current.focus();
    }

    // this.moreButton.current.focus();
    this.setState({openButton: !this.state.openButton});
  };
  handleCloseMoreButton = () => {
    this.setState({openButton: false});
  };
  handleEditButtonClick = () => {
    const {post} = this.props;
    const data = {
      id: post.id,
      images: post.images,
      description: post.description,
      tags: post.tags.map((tag) => {
        return tag.name;
      }),
    };
    this.props.editPost(data);
  };

  toogleOpenDelteConfirmation = () => {
    this.setState({openDelete: !this.state.openDelete});
  };

  handleOnDeletePost = () => {
    this.props.deletePost(this.props.post.id);
    this.setState({openDelete: false});
  };
  handleImageClose = () => {
    this.setState({showImage: false, url: ''});
  };

  handleDescriptionClick = () => {
    this.setState({expanded: true});

    if (this.props.post.images.length > 0 && !isMobile) {
      this.setState({checked: true});
    }
  };

  handleDescriptionClose = () => {
    this.setState({expanded: false});

    if (this.props.post.images.length > 0 && !isMobile) {
      this.setState({checked: false});
    }
  };

  handleLikeClick = () => {
    const id = this.props.post.id;
    const likes = this.props.post.likes;
    if (likes.filter((like) => like.id === this.props.user.id).length > 0) {
      this.props.unlikePost(id);
    } else {
      this.props.likePost(id);
    }
  };

  handleCommentChange = (e) => {
    this.setState({comment: e.target.value, commentError: ''});
  };

  handleCommentSubmit = () => {
    if (this.state.comment.replace(/\s/g, '').replace('\n', '').length === 0) {
      this.setState({commentError: 'comment cannot be empty'});
    } else {
      this.props.commentPost(this.props.post.id, this.state.comment);
      this.setState({comment: ''});
    }
  };

  handleImageControlClick = (direction) => {
    if (direction === 0) {
      this.setState({imageIndex: this.state.imageIndex - 1});
    } else {
      this.setState({imageIndex: this.state.imageIndex + 1});
    }
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        description,
        username,
        created,
        images,
        avatar,
        user_id,
        like_count,
        comment_count,
        tags,
        likes,
        comments,
      },
    } = this.props;

    const content = (
      <div>
        <div className={classes.container}>
          <div className={classes.images}>
            {/* Images */}

            {images.length > 0 ? (
              <div className={classes.imagesContainer}>
                <img
                  src={`${imageURL}${images[this.state.imageIndex].filename}`}
                  key={images[0].id}
                  alt=''
                />

                <div className={classes.imagesControl}>
                  {this.state.imageIndex === 0 ? (
                    <div />
                  ) : (
                    <IconButton
                      className={classes.controlButton}
                      onClick={() => {
                        this.handleImageControlClick(0);
                      }}>
                      <ArrowLeftIcon />
                    </IconButton>
                  )}

                  {this.state.imageIndex === images.length - 1 ? (
                    <div />
                  ) : (
                    <IconButton
                      className={classes.controlButton}
                      onClick={() => {
                        this.handleImageControlClick(1);
                      }}>
                      <ArrowRightIcon />
                    </IconButton>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          <div className={classes.details}>
            {/* ##### Title ####### */}
            <div className={classes.title}>
              <div className={classes.titleLeft}>
                <Avatar
                  className={classes.avatar}
                  src={`${imageURL}${avatar}`}
                  component={Link}
                  href={`/user/${username}`}
                />

                {/* username */}
                <div className={classes.titleMeta}>
                  <Typography
                    style={{
                      fontWeight: '500',
                    }}
                    component={Link}
                    href={`/user/${username}`}
                    underline='none'
                    color='primary'>
                    {username}
                  </Typography>
                  <Typography
                    style={{
                      fontWeight: '300',
                      fontSize: '12px',
                      color: '#555',
                    }}>
                    {dayjs(created).fromNow()}
                  </Typography>
                </div>
              </div>

              {/* Menu */}

              {this.props.user.id === user_id ? (
                <div>
                  {isMobile ? (
                    <div>
                      <IconButton
                        onClick={this.handleMoreButtonClick}
                        ref={this.moreButton}>
                        {this.state.openButton ? (
                          <MoreVertIcon />
                        ) : (
                          <MoreHorizIcon />
                        )}
                      </IconButton>

                      <Popper
                        anchorEl={this.moreButton.current}
                        open={this.state.openButton}
                        placement='bottom-end'>
                        <Paper className={classes.moreMenu}>
                          <ClickAwayListener
                            onClickAway={this.handleCloseMoreButton}>
                            <MenuList>
                              <MenuItem onClick={this.handleEditButtonClick}>
                                <EditOutlinedIcon />

                                <Typography>Edit</Typography>
                              </MenuItem>
                              <MenuItem>
                                <DeleteForeverOutlinedIcon />

                                <Typography>Delete</Typography>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Popper>
                    </div>
                  ) : (
                    // not mobile
                    <div>
                      {this.state.openButton ? (
                        <ClickAwayListener
                          onClickAway={this.handleCloseMoreButton}>
                          <div>
                            <TipIconButton
                              tip='Delete'
                              onClick={this.toogleOpenDelteConfirmation}>
                              <DeleteForeverOutlinedIcon />
                            </TipIconButton>
                            <TipIconButton
                              tip='Edit'
                              onClick={this.handleEditButtonClick}>
                              <EditOutlinedIcon />
                            </TipIconButton>
                            <TipIconButton
                              tip='Close'
                              onClick={this.handleCloseMoreButton}>
                              <MoreVertIcon />
                            </TipIconButton>
                          </div>
                        </ClickAwayListener>
                      ) : (
                        <TipIconButton
                          tip='More'
                          onClick={this.handleMoreButtonClick}>
                          <MoreHorizIcon />
                        </TipIconButton>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
            {/*####### contents ######*/}
            <div className={classes.content}>
              {/* Description */}
              {description ? (
                <Collapse
                  in={this.state.expanded}
                  collapsedHeight={
                    description.length > 100 ||
                    description.split('\n').length > 4
                      ? 100
                      : 50
                  }>
                  <div
                    className={classes.description}
                    ref={this.descriptionRef}>
                    {description}
                  </div>
                </Collapse>
              ) : null}

              {description.length > 100 ||
              description.split('\n').length > 4 ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                  className={classes.expandButton}>
                  <div className={classes.expandDescription}>
                    {this.descriptionRef.current &&
                    this.descriptionRef.current.clientHeight > 100 &&
                    !this.state.expanded
                      ? '...'
                      : null}
                  </div>
                  <div>
                    {this.state.expanded ? (
                      <Button
                        onClick={this.handleDescriptionClose}
                        color='secondary'>
                        <ExpandLessIcon />
                        close
                      </Button>
                    ) : (
                      <Button
                        onClick={this.handleDescriptionClick}
                        color='secondary'>
                        <ExpandMoreIcon />
                        Expand
                      </Button>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            {/*######## Tags #########*/}
            {tags.length > 0 ? (
              <div className={classes.tags}>
                {tags.map((tag) => {
                  return (
                    <Link
                      component='button'
                      className='classes.tag'
                      key={tag.id}>{`#${tag.name}`}</Link>
                  );
                })}
              </div>
            ) : null}

            {/* actions */}
            <div className={classes.actionContainer}>
              <div></div>
              <div className={classes.actions}>
                <Button
                  className={classes.action}
                  color={
                    likes.filter((like) => like.id === this.props.user.id)
                      .length > 0
                      ? 'primary'
                      : 'secondary'
                  }
                  startIcon={<FavoriteIcon />}
                  onClick={this.handleLikeClick}>
                  {like_count}
                </Button>

                <Button
                  className={classes.action}
                  color='primary'
                  startIcon={<CommentIcon />}>
                  {comment_count}
                </Button>
              </div>
            </div>

            {/* ###### more (likes and comments) ######*/}

            <div className={classes.commentForm}>
              <TextField
                className={classes.commentInput}
                fullWidth
                // variant='outlined'
                label='Comment...'
                multiline
                onChange={this.handleCommentChange}
                value={this.state.comment}
                error={this.state.commentError ? true : false}
                helperText={this.state.commentError}
              />
              <div className={classes.submitComment}>
                <div />
                <Button
                  style={{}}
                  color='primary'
                  onClick={this.handleCommentSubmit}
                  variant='contained'>
                  Submit
                </Button>
              </div>
            </div>

            {/* <Divider style={{marginTop: '8px', marginBottom: '8px'}} /> */}

            {comments.length > 0 ? (
              <div className={classes.comments}>
                {comments.map((c) => {
                  return <Comment comment={c} key={c.id} />;
                })}
              </div>
            ) : (
              <div className={classes.noComments}>
                {' '}
                You're going to be the first one to comment this post!
              </div>
            )}
          </div>
        </div>

        <DeleteComfirmation
          type='post'
          onDelete={this.handleOnDeletePost}
          onCancel={this.toogleOpenDelteConfirmation}
          open={this.state.openDelete}
        />
      </div>
    );

    return (
      <Dialog
        open={this.props.UI.openPostDialog}
        onClose={this.handleClose}
        className={classes.root}
        fullScreen>
        <IconButton onClick={this.handleClose} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
        {content}
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  post: state.data.post,
  UI: state.UI,
});

const mapActionsToProps = {
  editPost,
  likePost,
  unlikePost,
  commentPost,
  deletePost,
  getPost,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog));
