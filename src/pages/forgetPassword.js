import React, {Component} from 'react';

import withStyle from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//redux
import {connect} from 'react-redux';
import {sendForgetPasswordEmail} from '../redux/actions/userAction';
const styles = (theme) => ({
  root: {
    maxWidth: '400px',
    margin: '0 auto',
    paddingTop: theme.spacing(10),
  },
  button: {
    padding: '16px 0',
    display: 'flex',
    justifyContent: 'flex-end',
  },
});
export class forgetPassword extends Component {
  state = {
    email: '',
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    this.setState({errors: nextProps.UI.errors});
  }

  handleChange = (e) => {
    this.setState({email: e.target.value});
  };
  handleSend = () => {
    this.props.sendForgetPasswordEmail(this.state.email);
  };
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <h1>Forget Password</h1>

        <p>
          Type your email below and send a confirmation email to reset your
          password
        </p>
        <TextField
          label='Email'
          fullWidth
          value={this.state.email}
          onChange={this.handleChange}
          type='email'
          helperText={this.state.errors.email}
          error={this.state.errors.email ? true : false}
        />
        <div className={classes.button}>
          <Button color='primary' variant='contained' onClick={this.handleSend}>
            Sent
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});
const mapActionsToProps = {
  sendForgetPasswordEmail,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(forgetPassword));
