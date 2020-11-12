import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Link} from 'react-router-dom';

//redux
import {connect} from 'react-redux';
import {signupUser} from '../../redux/actions/userAction';
const styles = (theme) => ({
  root: {
    maxWidth: '400px',
    margin: 'auto',
    paddingTop: theme.spacing(10),
  },
  header: {textAlign: 'center'},
  form: {
    minWidth: '350px',
    textAlign: 'center',
  },
  textField: {
    margin: '10px 0',
  },
  button: {
    width: '100%',
    height: '50px',
    position: 'relative',
    margin: '20px 0',
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

class signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    this.setState({errors: nextProps.UI.errors});
  }
  onSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
    };

    this.props.signupUser(data);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    const {classes} = this.props;

    const form = (
      <form className={classes.form} onSubmit={this.onSubmit}>
        <TextField
          label='Username'
          id='username'
          name='username'
          type='username'
          value={this.state.username}
          onChange={this.handleChange}
          fullWidth
          className={classes.textField}
          helperText={this.state.errors.username}
          error={this.state.errors.username ? true : false}
        />
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

        <Button
          type='submit'
          variant='contained'
          color='primary'
          className={classes.button}>
          Signup
          {this.props.UI.loading && (
            <CircularProgress className={classes.progress} size={30} />
          )}
        </Button>
        <small>
          Already have an account?{' '}
          <Link color='secondary' to={'login'}>
            Login
          </Link>
        </small>
      </form>
    );

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <h1>Signup</h1>
        </div>

        {this.props.UI.success ? <Redirect to='/checkEmail' /> : form}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  signupUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(signup));
