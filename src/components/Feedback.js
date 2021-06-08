import React, {Component} from 'react';
//mui
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
//redux
import {connect} from 'react-redux';
import store from '../redux/store';
import {CLEAR_ERRORS} from '../redux/types';
export class Feedback extends Component {
  state = {
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      errors: nextProps.UI.errors,
      open: nextProps.UI.success,
    });
  }

  transitionleft = (props) => {
    return <Slide {...props} direction='right' />;
  };

  handleCloseFeedback = () => {
    store.dispatch({type: CLEAR_ERRORS});
  };
  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleCloseFeedback}
          message={this.props.UI.successMessage}
          TransitionComponent={this.transitionleft}
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(Feedback);
