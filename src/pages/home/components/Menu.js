import React, {Component} from 'react';
//mui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import withStyle from '@material-ui/core/styles/withStyles';
//icons
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(2),

    width: '100%',

    '& .MuiListItem-root.Mui-selected': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      fontWeight: '700',

      [theme.breakpoints.down('xs')]: {
        color: theme.palette.primary.contrastText,
      },
    },
    '& .MuiListItem-root': {
      [theme.breakpoints.down('xs')]: {
        color: theme.palette.primary.contrastText,
      },
    },
  },
  menuItem: {
    color: theme.palette.secondary.dark,
    fontWeight: '300',
    width: '100%',

    '& :hover': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  },

  tagsButton: {
    width: '100%',
    display: 'flex',
    // justifyContent: 'space-between',
  },
});
export class Menu extends Component {
  state = {
    show: false,
  };

  handleTagClick = () => {
    this.setState({show: !this.state.show});
  };
  render() {
    const {classes, selected, tags, onClick} = this.props;
    return (
      <div className={classes.root}>
        <List>
          <ListItem
            button
            selected={selected === 0}
            className={classes.menuItem}
            onClick={() => {
              onClick(0);
            }}>
            Following
          </ListItem>
          <ListItem
            button
            selected={selected === 1}
            className={classes.menuItem}
            onClick={() => {
              onClick(1);
            }}>
            Feature
          </ListItem>
          <ListItem
            button
            selected={selected === 2}
            className={classes.menuItem}
            onClick={this.handleTagClick}>
            <div className={classes.tagsButton}>
              <div>Tags</div>
              {this.state.show ? (
                <ExpandMoreRoundedIcon />
              ) : (
                <NavigateNextIcon />
              )}
            </div>

            {this.state.show ? tags : null}
          </ListItem>
          <ListItem
            button
            selected={selected === 3}
            className={classes.menuItem}
            onClick={() => {
              onClick(3);
            }}>
            Likes
          </ListItem>
        </List>
      </div>
    );
  }
}

export default withStyle(styles)(Menu);
