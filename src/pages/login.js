import React, {Component} from 'react';

import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// MUI
import Grid from '@material-ui/core/Grid';
import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userAction';

const styles = (theme) => ({
  container: {
    width: '100%',
    margin: 'auto',
  },
  form: {
    minWidth: '350px',
    maxWidth: '400px',
    margin: 'auto',
    textAlign: 'center',

    padding: theme.spacing(2),
  },
  textField: {
    margin: '10px 0',
  },
  button: {
    width: '100%',
    height: '50px',
    position: 'relative',
  },
  progress: {
    position: 'absolute',
  },
  others: {
    display: 'flex',
    margin: '20px 0 20px 0',
    justifyContent: 'space-between',
  },
});

class login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    this.setState({errors: nextProps.UI.errors});
  }
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
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {classes} = this.props;
    return (
      <div className='container'>
        <form className={classes.form} onSubmit={this.onSubmit}>
          <h1>Login</h1>

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
          <div className={classes.others}>
            <small>
              <Link color='secondary' to='signup'>
                Signup
              </Link>
            </small>
            <small>
              <Link color='secondary' to='/forgetPassword'>
                Forget Password
              </Link>
            </small>
          </div>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}>
            Login
            {this.state.loading && (
              <CircularProgress className={classes.progress} size={30} />
            )}
          </Button>

          <small>
            <Link color='secondary' to={'/resendConfirmation'}>
              Verify Email
            </Link>
          </small>
        </form>
      </div>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
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
)(withStyle(styles)(login));
