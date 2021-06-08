import React, {Component} from 'react';

import withStyle from '@material-ui/core/styles/withStyles';

import {connect} from 'react-redux';

const styles = (theme) => ({
  root: {
    maxWidth: '500px',
    textAlign: 'center',
    margin: 'auto',
    paddingTop: theme.spacing(10),
  },
});
export class checkEmail extends Component {
  componentDidMount() {}
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <div>
          A confirmation email has been sent, please check your email to finish
          registration.
          <br />
          <br />
          Email not coming trough?{' '}
          <a href='/resendConfirmation'>Resend Email</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});
const mapActionsToProps = {};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(checkEmail));
