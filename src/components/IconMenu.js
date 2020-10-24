import React, {Component} from 'react';
import withStyle from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';

const styles = (theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    // display: 'None',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },

    zIndex: '20',
  },
});
export class IconMenu extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div>
        <Fab color='primary' className={classes.fab}>
          <MenuIcon />
        </Fab>
      </div>
    );
  }
}

export default withStyle(styles)(IconMenu);
