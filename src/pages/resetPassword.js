import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import withStyle from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//redux
import {connect} from 'react-redux';
import {resetUserPassword} from '../redux/actions/userAction';
const styles = (theme) => ({
  root: {
    maxWidth: '400px',
    margin: 'auto',
    paddingTop: theme.spacing(10),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .MuiInputBase-input': {
      margin: theme.spacing(1),
    },
  },
  button: {
    padding: '16px 0',
    display: 'flex',
    justifyContent: 'flex-end',
  },
});
export class resetPassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    errors: {},
    reset: false,
  };
  componentWillReceiveProps(nextProps) {
    this.setState({errors: nextProps.UI.errors});
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleReset = () => {
    const confirmed = this.state.confirmPassword === this.state.password;

    if (confirmed) {
      this.props.resetUserPassword(
        this.props.match.params.token,
        this.state.password
      );
      this.setState({reset: true});
    }
  };
  render() {
    const {classes} = this.props;

    const form = (
      <div>
        <TextField
          fullWidth
          label='New Password'
          name='password'
          onChange={this.handleInputChange}
          value={this.state.password}
          type='password'
        />
        <TextField
          fullWidth
          label='Confirm Password'
          name='confirmPassword'
          onChange={this.handleInputChange}
          value={this.state.confirmPassword}
          type='password'
          helperText={
            this.state.confirmPassword === this.state.password
              ? ''
              : 'Confirm Password is not the same as password'
          }
          error={
            this.state.confirmPassword === this.state.password ? false : true
          }
        />

        <div className={classes.button}>
          <Button
            variant='contained'
            color='primary'
            onClick={this.handleReset}>
            Reset
          </Button>
        </div>
      </div>
    );

    // const success = (
    //   <div>
    //     {' '}
    //     Your password is reset, please login and enjoy.
    //     <a href='/login'>
    //       <div className={classes.button}>
    //         <Button variant='contained' color='primary'>
    //           Login
    //         </Button>
    //       </div>
    //     </a>
    //   </div>
    // );
    return (
      <div className={classes.root}>
        <h2>Reset Password</h2>
        {this.props.UI.success ? <Redirect to='/login' /> : form}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});
const mapActionsToProps = {
  resetUserPassword,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(resetPassword));
