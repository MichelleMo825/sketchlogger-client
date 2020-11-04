import React, {Component} from 'react';

import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
const styles = (theme) => ({
  root: {},

  follow: {
    textAlign: 'center',
    // padding: theme.spacing(1),
  },

  followtext: {
    fontWeight: '500',
    fontSize: theme.spacing(1.5),
    letterSpacing: '2px',
  },
});
class FollowStatus extends Component {
  render() {
    const {classes, name, count, onClick} = this.props;
    return (
      <div>
        <Button onClick={onClick}>
          <div className={classes.follow}>
            <div>{count}</div>
            <div className={classes.followtext}>{name}</div>
          </div>
        </Button>
      </div>
    );
  }
}

export default withStyle(styles)(FollowStatus);
