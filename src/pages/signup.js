import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import {Link} from 'react-router-dom';
const styles = (theme) => ({
  form: {
    textAlign: 'center',
    minWidth: '350px',
    padding: '50px',
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
    loading: false,
  };
  onSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const data = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      confirmPassword: this.state.confirmPassword,
    };
    axios
      .post('signup', data)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
        });
        // this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        this.setState({
          errors: err.response.data,
        });
      });
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
        <Grid container spacing={2}>
          <Grid item sm></Grid>
          <Grid item sm xs={12}>
            <form className={classes.form} onSubmit={this.onSubmit}>
              <h1>Signup</h1>
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
              <TextField
                label='Confirm Password'
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                fullWidth
                className={classes.textField}
                helperText={this.state.errors.confirmPassword}
                error={this.state.errors.confirmPassword ? true : false}
              />

              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.button}>
                Signup
                {this.state.loading && (
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
          </Grid>
          <Grid item sm></Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyle(styles)(signup);
