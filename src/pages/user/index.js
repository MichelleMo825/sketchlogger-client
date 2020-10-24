import React, {Component, Fragment} from 'react';
import {imageURL} from '../../util/connect';
import {isMobile} from 'react-device-detect';
import styles from './styles';
//components
import TipIconButton from '../../components/TipIconButton';
import TabPenal from './components/TabPenal';
import Post from '../../components/Post';
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
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
//icons
import MailIcon from '@material-ui/icons/Mail';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//redux
import {connect} from 'react-redux';
import {
  getUserInfo,
  getUserPosts,
  getUserWorks,
  getUserLikes,
  setPosts,
} from '../../redux/actions/dataAction';

export class user extends Component {
  state = {
    tab: 0,
    onTag: false,
    posts: [],
    activeTag: null,
    stickyTags: false,
    scrolled: false,
    expanded: false,
  };
  componentRef = React.createRef();

  tagsRef = React.createRef();

  componentDidMount() {
    // if (!isMobile) {
    //   window.addEventListener('scroll', this.handleStickyTagsScoll);
    // }

    const username = this.props.match.params.username;
    this.props.getUserInfo(username);
    this.props.getUserPosts(username);
    this.props.getUserLikes(username);
    this.props.getUserWorks(username);
  }

  handleTabChange = (event, value) => {
    console.log(value);
    if (value == 2) {
      console.log(this.props.match.params.username);
      this.props.getUserLikes(this.props.match.params.username);
    }
    this.setState({tab: value});
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

  handleAccordionChange = () => {
    this.setState({expanded: !this.state.expanded});
  };

  render() {
    const {classes} = this.props;

    const {avatar, username, bio} = this.props.data.user;
    const {posts, tags, likes, works} = this.props.data;

    if (this.props.data.finishedLoading && !this.state.scrolled && isMobile) {
      window.requestAnimationFrame(() => {
        this.componentRef.current.scrollIntoView({block: 'center'});
        this.setState({scrolled: true});
      });
    }

    console.log(this.props.data);

    const Tags = (
      <List>
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
      <Fragment>
        <div className={classes.root} ref={this.windowRef}>
          {/* user Info */}
          <div ref={this.componentRef}></div>
          <div className={classes.userInfo}>
            <Grid container spacing={5} className={classes.container}>
              <Grid item xs={5} className={classes.userInfoLeft}>
                <Avatar src={`${imageURL}${avatar}`} />
                {/* TODO social medias */}
                <div className={classes.social}>
                  <TipIconButton tip='message' className={classes.socialIcon}>
                    <MailIcon />
                  </TipIconButton>
                </div>
              </Grid>
              <Grid item xs={5}>
                <div className={classes.username}>{username}</div>

                <div className={classes.bio}>{bio}</div>
                {/* TODO following & followers */}
                <div className={classes.following}>
                  {' '}
                  <div className={classes.follow} onClick={() => {}}>
                    <div>0</div>
                    <div className={classes.followtext}>Following</div>
                  </div>
                  <Divider orientation='vertical' flexItem />
                  <div className={classes.follow}>
                    <div>0</div>
                    <div className={classes.followtext}>Followers</div>
                  </div>
                </div>

                {/* follow action */}

                <div></div>

                <Button
                  className={classes.followButton}
                  variant='contained'
                  color='primary'>
                  Follow
                </Button>
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
            {/* workd */}
            <TabPenal value={this.state.tab} index={0}>
              {isMobile ? (
                <div className={classes.gallery}>
                  <div className={classes.work}>
                    {works.map((work, i) => (
                      <div>
                        {i % 2 == 0 ? (
                          <img src={`${imageURL}${work.filename}`} />
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <div className={classes.work}>
                    {works.map((work, i) => (
                      <div>
                        {i % 2 == 1 ? (
                          <img src={`${imageURL}${work.filename}`} />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={classes.gallery}>
                  <div className={classes.work}>
                    {works.map((work, i) => (
                      <div>
                        {i % 3 == 0 ? (
                          <img src={`${imageURL}${work.filename}`} />
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <div className={classes.work}>
                    {works.map((work, i) => (
                      <div>
                        {i % 3 == 1 ? (
                          <img src={`${imageURL}${work.filename}`} />
                        ) : null}
                      </div>
                    ))}
                  </div>
                  <div className={classes.work}>
                    {works.map((work, i) => (
                      <div>
                        {i % 3 == 2 ? (
                          <img src={`${imageURL}${work.filename}`} />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* {works.map((work) => (
                  <div className={classes.work}>
                    <img src={`${imageURL}${work.filename}`} />
                  </div>
                ))} */}
            </TabPenal>
            {/* Posts */}
            <TabPenal value={this.state.tab} index={1}>
              <div className={classes.posts}>
                <div className={classes.mobileTags}>
                  <Accordion
                    expanded={this.state.expanded}
                    onChange={this.handleAccordionChange}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      Tags
                    </AccordionSummary>
                    <AccordionDetails>{Tags}</AccordionDetails>
                  </Accordion>
                </div>

                <Grid container spacing={5}>
                  <Grid item sm={9} xs={12}>
                    <div className={classes.data}>
                      {this.state.onTag
                        ? this.state.posts.map((post) => (
                            <Post post={post} key={post.id} />
                          ))
                        : posts.map((post) => (
                            <Post post={post} key={post.id} />
                          ))}
                    </div>
                  </Grid>

                  <Grid item sm={3}>
                    <div className={classes.tags}>
                      Tags
                      {Tags}
                    </div>
                  </Grid>
                </Grid>
              </div>
            </TabPenal>
            {/* Likes */}
            <TabPenal value={this.state.tab} index={2}>
              {likes.map((like) => (
                <Post post={like} key={like.id} />
              ))}
            </TabPenal>
          </div>
        </div>
      </Fragment>
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
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(user));
