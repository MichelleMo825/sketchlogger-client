import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {verifyUser} from '../redux/actions/userAction';

const styles = (theme) => ({
  root: {
    maxWidth: '500px',
    textAlign: 'center',
    margin: '60px auto',
    display: 'flex',
    verticalAlign: 'center',
    flexDirection: 'column',
  },
});
export class validateUser extends Component {
  componentDidMount() {
    const token = this.props.match.params.token;
    console.log(token);
    this.props.verifyUser(token);
  }
  render() {
    const {classes, UI} = this.props;
    return (
      <div className={classes.root}>
        {UI.success ? (
          <Redirect to='/login' />
        ) : (
          <div>
            {UI.errors.message}
            <a href='/login'>
              <Button>Login</Button>
            </a>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});
const mapActionsToProps = {
  verifyUser,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(validateUser));
