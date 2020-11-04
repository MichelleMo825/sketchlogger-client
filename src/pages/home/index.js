import React, {Component, Fragment} from 'react';
import styles from './styles';

//Mui
import withStyle from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
//incons
import CreateIcon from '@material-ui/icons/Create';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
//components
import Post from '../../components/Post';
import Menu from './components/Menu';
import MobileMenu from '../../components/MobileMenu';

//redux
import store from '../../redux/store';
import {NEW_POST, SET_LOGIN} from '../../redux/types';
import {connect} from 'react-redux';
import {getPosts, loadLikes, getUserInfo} from '../../redux/actions/dataAction';

export class Home extends Component {
  state = {
    posts: [],
    createPost: false,
    selected: 0,
    expanded: false,
  };
  componentDidMount() {
    this.props.getPosts();
    this.props.getUserInfo(this.props.user.username);
  }

  handleNewPostClick = () => {
    if (!this.props.user.authenticated) {
      store.dispatch({type: SET_LOGIN});
    } else {
      store.dispatch({type: NEW_POST});
    }
  };

  handleMenuItemClick = (index) => {
    console.log(this.props.user.username);
    this.setState({selected: index, expanded: false});
    switch (index) {
      case 0:
        this.props.getPosts();
        this.props.getUserInfo(this.props.user.username);
        break;
      case 3:
        this.props.loadLikes(this.props.user.username);
        break;
      default:
        return null;
    }
  };
  handleMobileMenu = () => {
    this.setState({expanded: !this.state.expanded});
  };

  getMenuTitle = () => {
    switch (this.state.selected) {
      case 0:
        return 'Following';
      case 1:
        return 'Feature';
      case 2:
        return 'Tags';
      case 3:
        return 'Likes';
      default:
        return 'Following';
    }
  };

  render() {
    const {classes} = this.props;

    return (
      <Fragment>
        <div className={classes.root}>
          <Grid container spacing={0} className={classes.container}>
            <Grid item sm={2}>
              <div className={classes.menu}>
                <Menu
                  selected={this.state.selected}
                  onClick={(index) => this.handleMenuItemClick(index)}
                />
              </div>
            </Grid>
            <Grid item sm={10} xs={12}>
              <Grid container spacing={5} className={classes.grid}>
                <Grid item md={9} sm={12}>
                  <div className={classes.postsWrap}>
                    <div className={classes.mobileMenu}>
                      <MobileMenu
                        title={this.getMenuTitle()}
                        expanded={this.state.expanded}
                        onChange={this.handleMobileMenu}>
                        <Menu
                          selected={this.state.selected}
                          onClick={(index) => this.handleMenuItemClick(index)}
                        />
                      </MobileMenu>
                    </div>

                    <div>
                      {this.props.data.loading ? (
                        <div className={classes.loading}>
                          <CircularProgress color='secondary' />
                        </div>
                      ) : (
                        <div>
                          {this.props.data.posts ? (
                            this.props.data.posts.map((post) => (
                              <Post post={post} key={post.id} />
                            ))
                          ) : (
                            <p>no data</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Grid>
                <Grid item md={3}>
                  <div className={classes.right}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={this.handleNewPostClick}
                      startIcon={<CreateIcon />}>
                      <div className={classes.buttonContent}>
                        <p>New Post</p>
                      </div>
                    </Button>

                    {this.props.user.authenticated ? (
                      <a href={`/user/${this.props.user.username}`}>
                        <Button className={classes.myPageButton}>
                          <div className={classes.buttonContent}>
                            <p>My Page</p>
                          </div>
                        </Button>
                      </a>
                    ) : null}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
  getPosts,
  loadLikes,
  getUserInfo,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(Home));
