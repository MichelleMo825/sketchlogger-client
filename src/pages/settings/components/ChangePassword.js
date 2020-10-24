import React, {Component} from 'react';

//mui
import withStyle from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
//redux
import {connect} from 'react-redux';
import {changePassword} from '../../../redux/actions/userAction';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .MuiInputBase-input': {
      margin: theme.spacing(1),
    },

    '& .MuiButton-root': {
      marginTop: theme.spacing(2),
    },
  },
});
export class ChangePassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const confirmed = this.state.confirmPassword === this.state.password;

    if (confirmed) {
      this.props.changePassword({password: this.state.password});
    }

    this.setState({password: '', confirmPassword: ''});
  };
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <h2>Change Password</h2>
        <TextField
          label='New Password'
          name='password'
          onChange={this.handleInputChange}
          value={this.state.password}
          type='password'
        />
        <TextField
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
        <Button variant='contained' color='primary' onClick={this.handleSubmit}>
          Update Password
        </Button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  changePassword,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(ChangePassword));
