import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {imageURL} from '../../util/connect';
import {isMobile} from 'react-device-detect';
import {styles} from './styles';

//Mui
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Link from '@material-ui/core/Link';
//icons
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
//redux
import {connect} from 'react-redux';
import {editPost} from '../../redux/actions/postAction';
import {likePost, unlikePost} from '../../redux/actions/dataAction';
import TipIconButton from '../TipIconButton';

class Post extends Component {
  state = {
    checked: false,
    sticky: false,
    showImage: false,
    url: '',
    openButton: false,
    expanded: false,
  };

  postRef = React.createRef();
  avatarRef = React.createRef();
  moreButton = React.createRef();
  mobileMoreButton = React.createRef();
  descriptionRef = React.createRef();
  componentDidMount = () => {
    window.addEventListener('scroll', this.handleStickyAvatarScoll);
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleStickyAvatarScoll);
  };
  handleOnCheck = () => {
    const element = this.postRef.current;
    if (!isMobile) {
      if (this.state.checked) {
        window.scrollTo(0, element.offsetTop - 90);
      }
      this.setState({
        checked: !this.state.checked,
        expanded: !this.state.expanded,
      });
    }
  };

  handleStickyAvatarScoll = () => {
    const element = this.avatarRef.current;
    if (
      element.getBoundingClientRect().top <= 100 &&
      element.getBoundingClientRect().bottom >= 100
    ) {
      this.setState({sticky: true});
    } else {
      this.setState({sticky: false});
    }
  };

  handleImageClick = (url) => {
    if (isMobile) {
      this.setState({showImage: true, url: url});
    }
  };

  handleMoreButtonClick = (event) => {
    this.mobileMoreButton.current.focus();
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
        id,
        user_id,
        like_count,
        comment_count,
        tags,
        likes,
      },
    } = this.props;

    return (
      <div classes={classes.root} ref={this.avatarRef}>
        <Grid container spacing={2}>
          <Grid item sm={2}>
            <Avatar
              className={classes[`large${this.state.sticky ? 'Sticky' : ''}`]}
              src={`${imageURL}${avatar}`}
              component={Link}
              href={`/user/${username}`}></Avatar>
          </Grid>
          <Grid item sm={10} xs={12}>
            <Paper
              className={classes.paper}
              variant='outlined'
              ref={this.postRef}>
              {/* ##### Title ####### */}
              <div className={classes.title}>
                <div className={classes.titleLeft}>
                  <Avatar
                    className={classes.medium}
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
                          ref={this.mobileMoreButton}>
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
                              <TipIconButton tip='Delete'>
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
              {/* Images */}
              <div className={classes.content}>
                {this.state.checked ? (
                  <div onClick={this.handleOnCheck}>
                    {images.map((img) => {
                      return (
                        <img
                          src={`${imageURL}${img.filename}`}
                          width='100%'
                          key={img.id}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <GridList
                    cols={images.length >= 3 ? 3 : images.length}
                    onClick={this.handleOnCheck}>
                    {images.map((img) => {
                      return (
                        <GridListTile
                          key={img.id}
                          className={classes.tile}
                          onClick={() => {
                            this.handleImageClick(`${imageURL}${img.filename}`);
                          }}>
                          <img
                            src={`${imageURL}${img.filename}`}
                            key={img.id}
                          />
                        </GridListTile>
                      );
                    })}
                  </GridList>
                )}
                {/* Description */}
                {description ? (
                  <Collapse
                    in={this.state.expanded}
                    collapsedHeight={description.length > 100 ? 100 : 50}>
                    <div
                      className={classes.description}
                      ref={this.descriptionRef}>
                      {description}
                    </div>
                  </Collapse>
                ) : null}

                {description.length > 100 ? (
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
                    color='secondary'
                    startIcon={<CommentIcon />}>
                    {comment_count}
                  </Button>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid>

        <Dialog open={this.state.showImage} onClose={this.handleImageClose}>
          <img src={this.state.url} width='100%' />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  editPost,
  likePost,
  unlikePost,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Post));
