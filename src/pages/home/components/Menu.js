import React, {Component} from 'react';
//mui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import withStyle from '@material-ui/core/styles/withStyles';
//icons
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import UnfoldMoreRoundedIcon from '@material-ui/icons/UnfoldMoreRounded';
const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(2),
    position: 'fixed',
    [theme.breakpoints.down('xs')]: {
      display: 'None',
    },
  },
  menuItem: {
    color: theme.palette.secondary.dark,
    fontWeight: '300',
  },
});
export class Menu extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <List>
          <ListItem className={classes.menuItem}>Following</ListItem>
          <ListItem className={classes.menuItem}>Feature</ListItem>
          <ListItem className={classes.menuItem}>
            Tags
            <ExpandMoreRoundedIcon />
          </ListItem>
          <ListItem className={classes.menuItem}>Likes</ListItem>
        </List>
      </div>
    );
  }
}

export default withStyle(styles)(Menu);
