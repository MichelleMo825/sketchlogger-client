import React, {Component} from 'react';

import withStyle from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
//redux
import {connect} from 'react-redux';
import store from '../redux/store';
import {UNSET_LOGIN} from '../redux/types';
import {loginUser} from '../redux/actions/userAction';

const styles = (theme) => ({
  root: {},
  title: {
    textAlign: 'center',
  },
  formBody: {
    margin: 'auto',
    maxWidth: '350px',
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  textField: {
    margin: '8px 0',
  },
  more: {
    marginTop: theme.spacing(1),
    color: theme.palette.secondary.main,
    fontWeight: '300',
    fontSize: '14px',
  },
});
export class MiniLogin extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    this.setState({errors: nextProps.UI.errors});
  }

  handleOnClose = () => {
    store.dispatch({type: UNSET_LOGIN});
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(data, this.props.history);
    store.dispatch({type: UNSET_LOGIN});
  };
  render() {
    const {classes, user, UI} = this.props;
    return (
      <div>
        <Dialog
          open={!user.authenticated && UI.login ? true : false}
          onClose={this.handleOnClose}
          fullWidth>
          <DialogContent>
            <div className={classes.title}>
              <Typography variant='h4'>Login</Typography>
            </div>

            <div className={classes.formBody}>
              <TextField
                label='Email'
                id='email'
                name='email'
                type='email'
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
                className={classes.textField}
                helperText={this.state.errors.email}
                error={this.state.errors.email ? true : false}
              />
              <TextField
                label='Password'
                id='password'
                name='password'
                type='password'
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
                className={classes.textField}
                helperText={this.state.errors.password}
                error={this.state.errors.password ? true : false}
              />
              <Typography className={classes.more}>
                Don't have an account? <Link href='/signUp'>Sign Up</Link>
              </Typography>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleOnClose}>Cancel</Button>
            <Button variant='contained' color='primary' onClick={this.onSubmit}>
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(MiniLogin));
