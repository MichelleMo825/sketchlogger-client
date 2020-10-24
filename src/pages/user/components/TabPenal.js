import withStyle from '@material-ui/core/styles/withStyles';
import React, {Component} from 'react';

const styles = (theme) => ({
  show: {
    display: 'block',
  },
  hidden: {
    display: 'none',
  },
});
export class TabPenal extends Component {
  render() {
    const {classes, children, value, index, ...other} = this.props;
    return (
      <div className={value === index ? classes.show : classes.hidden}>
        {children}
      </div>
    );
  }
}

export default withStyle(styles)(TabPenal);
