import React, {Component} from 'react';

import withStyle from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//redux
import {connect} from 'react-redux';
import {resendConfirmationEmail} from '../redux/actions/userAction';
const styles = (theme) => ({
  root: {
    maxWidth: '400px',
    margin: 'auto',
    paddingTop: theme.spacing(10),
  },
  button: {
    padding: '16px 0',
    display: 'flex',
    justifyContent: 'flex-end',
  },
});
export class resendConfirmation extends Component {
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
    this.props.resendConfirmationEmail(this.state.email);
  };
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <h1>Resend Email</h1>

        <p>Type your email below and resend the confirmation email</p>
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
  resendConfirmationEmail,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(resendConfirmation));
