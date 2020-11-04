import React, {Component, Fragment} from 'react';
import {imageURL} from '../../util/connect';
import {isMobile} from 'react-device-detect';
import styles from './styles';
//components
import TipIconButton from '../../components/TipIconButton';
import TabPenal from './components/TabPenal';
import Post from '../../components/Post';
import MobileMenu from '../../components/MobileMenu';
import FollowStatus from './components/FollowStatus';
import WorkGallery from './components/WorkGallery';
//mui
import withStyle from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import TextField from '@material-ui/core/TextField';
//icons
import MailIcon from '@material-ui/icons/Mail';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

//redux
import {connect} from 'react-redux';
import {
  getUserInfo,
  getUserPosts,
  getUserWorks,
  getUserLikes,
  setPosts,
} from '../../redux/actions/dataAction';

import {
  getFollowings,
  getFollowers,
  follow,
  unfollow,
} from '../../redux/actions/userAction';
import FollowUsers from './components/FollowUsers';

export class user extends Component {
  state = {
    tab: 0,
    onTag: false,
    posts: [],
    activeTag: null,
    stickyTags: false,
    scrolled: false,
    expanded: false,
    searchText: '',
    showFollows: false,
    followType: '',
  };
  componentRef = React.createRef();

  tagsRef = React.createRef();

  componentDidMount() {
    const username = this.props.match.params.username;
    this.props.getUserInfo(username);
    this.props.getUserPosts(username);
    this.props.getUserLikes(username);
    this.props.getUserWorks(username);
    window.scrollTo(0, 0);
  }

  handleTabChange = (event, value) => {
    if (value === 2) {
      console.log(this.props.match.params.username);
      this.props.getUserLikes(this.props.match.params.username);
    }
    this.setState({tab: value});
  };

  handleSearchChange = (e) => {
    this.setState({searchText: e.target.value});
  };

  handleTagClick = (id) => {
    if (id) {
      this.setState({
        activeTag: id,
        onTag: true,
        posts: this.props.data.posts.filter(
          (post) => post.tags.filter((tag) => tag.id === id).length > 0
        ),
      });
    } else {
      this.setState({
        activeTag: null,
        onTag: false,
        posts: [],
      });
    }

    this.setState({scrolled: false, expanded: false});
    window.scrollTo(0, 0);
  };

  handleMobileMenu = () => {
    this.setState({expanded: !this.state.expanded});
  };
  handleMobileClose = () => {
    this.setState({expanded: false});
  };

  tags = () => {
    if (this.state.searchText) {
      return this.props.data.tags.filter((tag) =>
        tag.name.toLowerCase().includes(this.state.searchText.toLowerCase())
      );
    } else {
      return this.props.data.tags;
    }
  };

  handlefollowClick = (type) => {
    const username = this.props.match.params.username;

    if (type === 'following') {
      this.props.getFollowings(username);
    } else {
      this.props.getFollowers(username);
    }
    this.setState({showFollows: true});
    this.setState({followType: type});
  };

  handleFololowClose = () => {
    this.setState({showFollows: false});
  };

  handleFollow = () => {
    this.props.follow(this.props.data.user.id);
    this.props.getUserInfo(this.props.match.params.username);
  };

  handleUnfollow = () => {
    this.props.unfollow(this.props.data.user.id);
    this.props.getUserInfo(this.props.match.params.username);
  };

  render() {
    const {classes} = this.props;

    const {
      id,
      avatar,
      username,
      bio,
      followings_count,
      followers_count,
    } = this.props.data.user;
    const {posts, likes, works} = this.props.data;

    const tags = this.tags();

    const Tags = (
      <List>
        <TextField
          placeholder='Search tag..'
          onChange={this.handleSearchChange}
          className={classes.tagSearch}
          fullWidth
        />
        <ListItem className={classes.tag}>
          <Link
            component='button'
            onClick={() => this.handleTagClick(null)}
            className={!this.state.activeTag ? classes.tagLinkActive : null}>
            {`All(${posts.length})`}
          </Link>
        </ListItem>
        {tags.map((tag) => (
          <ListItem key={tag.id} className={classes.tag}>
            <Link
              component='button'
              onClick={() => this.handleTagClick(tag.id)}
              className={
                this.state.activeTag === tag.id ? classes.tagLinkActive : null
              }>{`#${tag.name}(${
              posts.filter(
                (post) => post.tags.filter((t) => t.id === tag.id).length > 0
              ).length
            })`}</Link>
          </ListItem>
        ))}
      </List>
    );

    return (
      <div className={classes.root} ref={this.windowRef}>
        {/* user Info */}
        <div ref={this.componentRef}></div>
        <div className={classes.userInfo}>
          <Grid container spacing={2} className={classes.container}>
            {/* ------------------user info ----------------------- */}
            <Grid item sm={5} xs={4} className={classes.userInfoLeft}>
              <Avatar src={`${imageURL}${avatar}`} />
              {/* TODO social medias */}
              <div className={classes.social}>
                <TipIconButton tip='message' className={classes.socialIcon}>
                  <MailIcon />
                </TipIconButton>
              </div>
            </Grid>
            <Grid item sm={7} xs={8}>
              <div className={classes.username}>{username}</div>

              <div className={classes.bio}>{bio}</div>

              {/* ----------- follow section ----------- */}
              <div className={classes.following}>
                {/* followings */}
                <FollowStatus
                  name='following'
                  count={followings_count}
                  onClick={() => {
                    this.handlefollowClick('following');
                  }}
                />
                <Divider orientation='vertical' flexItem />
                {/* followers */}
                <FollowStatus
                  name='followers'
                  count={followers_count}
                  onClick={() => {
                    this.handlefollowClick('follower');
                  }}
                />
              </div>

              {/*------------- follow action -----------------*/}
              {this.props.user.followings.filter(
                (following) => following === id
              ).length > 0 ? (
                <Button
                  className={classes.followButton}
                  variant='outlined'
                  color='primary'
                  startIcon={<CheckCircleOutlineIcon />}
                  onClick={this.handleUnfollow}>
                  following
                </Button>
              ) : (
                <Button
                  className={classes.followButton}
                  variant='contained'
                  color='primary'
                  disabled={this.props.user.id === id}
                  onClick={this.handleFollow}>
                  Follow
                </Button>
              )}
            </Grid>
          </Grid>
        </div>

        {/* Posts and Images */}
        <div className={classes.tabs}>
          <Tabs
            textColor='primary'
            value={this.state.tab}
            onChange={(e, value) => {
              this.handleTabChange(e, value);
            }}
            className={classes.tabs}>
            <Tab label='Works' />
            <Tab label='Posts' />
            <Tab label='Likes' />
          </Tabs>
        </div>

        <div className={classes.contents}>
          {/* works */}
          <TabPenal value={this.state.tab} index={0}>
            {isMobile ? (
              <WorkGallery works={works} cols={2} />
            ) : (
              <WorkGallery works={works} cols={3} />
            )}
          </TabPenal>

          {/* Posts */}
          <TabPenal value={this.state.tab} index={1}>
            <Grid container spacing={5}>
              <Grid item sm={9} xs={12}>
                {/* mobile menu */}
                <div className={classes.posts}>
                  <div className={classes.mobileTags}>
                    <ClickAwayListener onClickAway={this.handleMobileClose}>
                      <MobileMenu
                        title='Tags'
                        expanded={this.state.expanded}
                        onChange={this.handleMobileMenu}>
                        {Tags}
                      </MobileMenu>
                    </ClickAwayListener>
                  </div>

                  <div className={classes.data}>
                    {this.state.onTag
                      ? this.state.posts.map((post) => (
                          <Post post={post} key={post.id} />
                        ))
                      : posts.map((post) => <Post post={post} key={post.id} />)}
                  </div>
                </div>
              </Grid>

              <Grid item sm={3}>
                <div className={classes.tags}>
                  Tags
                  <TextField
                    placeholder='Search tag..'
                    onChange={this.handleSearchChange}
                  />
                  <div
                    style={{
                      overflow: 'hidden auto',
                      maxHeight: 'calc(100vh - 500px)',
                      marginTop: '8px',
                    }}>
                    {Tags}
                  </div>
                </div>
              </Grid>
            </Grid>
          </TabPenal>

          {/* Likes */}
          <TabPenal value={this.state.tab} index={2}>
            {likes.map((like) => (
              <Post post={like} key={like.id} />
            ))}
          </TabPenal>
        </div>

        <FollowUsers
          open={this.state.showFollows}
          onClose={this.handleFololowClose}
          type={this.state.followType}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

const mapActionsToProps = {
  getUserInfo,
  getUserPosts,
  getUserWorks,
  getUserLikes,
  setPosts,
  getFollowings,
  getFollowers,
  follow,
  unfollow,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(user));
