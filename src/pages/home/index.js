import React, {Component, Fragment} from 'react';
import axios from 'axios';

//Mui
import withStyle from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';
//incons
import CreateIcon from '@material-ui/icons/Create';

//components
import Post from '../../components/Post';
import Menu from './components/Menu';

//redux
import store from '../../redux/store';
import {NEW_POST} from '../../redux/types';
import {connect} from 'react-redux';
import {getPosts} from '../../redux/actions/dataAction';

const styles = (theme) => ({
  root: {},
  container: {
    width: '100%',
  },

  grid: {
    width: '80%',
    margin: 'auto',
    maxWidth: '1000px',
    // '& .MuiGrid-item': {padding: '20px 0'},
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  loading: {
    textAlign: 'center',
    '& .MuiCircularProgress-root': {
      margin: '16px auto',
    },
  },

  right: {
    [theme.breakpoints.down('sm')]: {
      display: 'None',
    },
    '& .MuiButton-root': {
      height: '60px',
      width: '100%',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  },
  buttonContent: {
    width: '100%',
    textAlign: 'center',
  },
});

export class Home extends Component {
  state = {
    posts: [],
    createPost: false,
  };
  componentDidMount() {
    this.props.getPosts();
  }

  handleNewPostClick = () => {
    store.dispatch({type: NEW_POST});
  };

  render() {
    const {classes} = this.props;

    return (
      <Fragment>
        <div className={classes.root}>
          <Grid container className={classes.container}>
            <Grid item sm={2}>
              <Menu />
            </Grid>
            <Grid item sm={10} xs={12}>
              <Grid container spacing={5} className={classes.grid}>
                <Grid item md={9} sm={12}>
                  {this.props.data.loading ? (
                    <div className={classes.loading}>
                      <CircularProgress color='secondary' />
                    </div>
                  ) : (
                    this.props.data.posts.map((post) => (
                      <Post post={post} key={post.id} />
                    ))
                  )}
                </Grid>
                <Grid item md={3} className={classes.right}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={this.handleNewPostClick}
                    startIcon={<CreateIcon />}>
                    <div className={classes.buttonContent}>
                      <p>New Post</p>
                    </div>
                  </Button>
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
  data: state.data,
});

const mapActionsToProps = {
  getPosts,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(Home));
