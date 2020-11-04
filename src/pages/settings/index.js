import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import {imageURL} from '../../util/connect';
import ChangePassword from './components/ChangePassword';
//MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
//redux
import {connect} from 'react-redux';
import {updateProfile, uploadAvatar} from '../../redux/actions/userAction';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
    maxWidth: '1200px',
    margin: 'auto',
  },
  loginInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
    textAlign: 'center',
    color: '#888',
    margin: theme.spacing(2),

    '& .MuiSvgIcon-root': {
      height: theme.spacing(10),
      width: theme.spacing(10),
      margin: theme.spacing(2),
    },
  },
  grid: {
    minHeight: '500px',
    padding: '20px',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',

    '& .MuiList-root': {
      marginTop: '25px',
    },

    '& .MuiAvatar-root': {
      // marginTop: '30px',
      // marginLeft: 'auto',
      // marginRight: 'auto',
      height: theme.spacing(10),
      width: theme.spacing(10),
    },

    '& .MuiTypography-subtitle1': {
      marginTop: theme.spacing(1),
      fontWeight: '500',
      color: '#666',
    },
  },

  avartarButton: {
    marginTop: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: theme.spacing(10),
    width: theme.spacing(10),
  },

  right: {
    marginLeft: '25px',
    [theme.breakpoints.down('xs')]: {
      margin: '0',
    },

    '& .MuiButton-root': {
      height: '100%',
    },
  },
  generalTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },

  generalDisplay: {
    paddingLeft: '20%',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      margin: '0',
      padding: '0',
    },
  },
  editProfile: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
    '& .MuiInputBase-input': {
      margin: theme.spacing(1),
    },
  },

  generalLabel: {wordWrap: 'break-word', fontWeight: '400', color: '#888'},
  generalValue: {
    wordWrap: 'break-word',
    fontWeight: '300',
  },
});

export class Settings extends Component {
  state = {
    selectedIndex: 0,
    isEditing: false,
    profile: {
      ...this.props.user,
    },
    errors: {},
    showfeedback: false,
  };
  componentWillReceiveProps(nextProps) {
    this.setState({errors: nextProps.UI.errors});
  }
  handleListItemClick = (event, index) => {
    this.setState({selectedIndex: index});
  };

  handleEditClick = () => {
    this.setState({isEditing: true});
  };

  handleCancleEdit = () => {
    this.setState({isEditing: false});
  };

  handleUpdateOnclick = () => {
    this.props.updateProfile(this.state.profile);
    this.setState({isEditing: false, showfeedback: true});
  };

  handleCloseFeedback = () => {
    this.setState({showfeedback: false});
  };
  handleImageOnClick = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  handleImageUpload = (event) => {
    const formData = new FormData();
    const image = event.target.files[0];
    formData.append('file', image, image.name);

    this.props.uploadAvatar(formData);
  };

  handleProfileInputChange = (event) => {
    let profile = {...this.props.user};

    // profile[`${event.target.name}`]
    profile[`${event.target.name}`] = event.target.value;
    this.setState({
      profile: profile,
    });
  };

  editProfile = () => {
    const {classes, user} = this.props;
    const {profile} = this.state;
    return (
      <Dialog
        open={this.state.isEditing}
        onClose={this.handleCancleEdit}
        className={classes.editProfile}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label='username'
            name='username'
            defaultValue={user.username}
            onChange={this.handleProfileInputChange}
            value={profile.username}
          />
          <TextField
            label='web'
            name='web'
            defaultValue={user.web}
            onChange={this.handleProfileInputChange}
            value={profile.web}
          />
          <TextField
            label='bio'
            name='bio'
            defaultValue={user.bio}
            fullWidth
            multiline
            onChange={this.handleProfileInputChange}
            value={profile.bio}
          />
          <DialogActions>
            <Button onClick={this.handleCancleEdit} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleUpdateOnclick} color='primary'>
              Update
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    );
  };

  general = () => {
    const {classes, user} = this.props;

    let gridItem = (label, value) => {
      return (
        <Grid container spacing={3} className={classes.generalDisplay}>
          <Grid item sm={3} xs={4} className={classes.generalLabel}>
            {label}
          </Grid>
          <Grid item sm={9} xs={8} className={classes.generalValue}>
            {value}
          </Grid>
        </Grid>
      );
    };
    return (
      <div>
        <div className={classes.generalTitle}>
          <h2>General</h2>
          <Button
            variant='contained'
            color='primary'
            className={classes.editButton}
            onClick={this.handleEditClick}>
            Edit
          </Button>
        </div>

        {gridItem('Username', user.username)}
        {gridItem('Web', user.web)}
        {gridItem('Bio', user.bio)}
      </div>
    );
  };

  settings = () => {
    const {classes, user} = this.props;
    const {selectedIndex} = this.state;

    let right = () => {
      switch (selectedIndex) {
        case 0:
          return this.general();

        case 1:
          return <ChangePassword />;

        default:
          return this.general();
      }
    };
    return (
      <Grid container spacing={2} className={classes.grid}>
        <Grid item sm={3} xs={12} className={classes.left}>
          <Tooltip title='upload'>
            <IconButton
              className={classes.avartarButton}
              onClick={this.handleImageOnClick}>
              <Avatar
                className={classes.profilePic}
                src={`${imageURL}${user.avatar}`}></Avatar>
            </IconButton>
          </Tooltip>
          <input
            type='file'
            id='imageInput'
            hidden='hidden'
            onChange={(event) => this.handleImageUpload(event)}
          />
          <Typography variant='subtitle1' gutterBottom>
            {user.username}
          </Typography>

          <List>
            <ListItem
              button
              selected={selectedIndex === 0}
              onClick={(event) => this.handleListItemClick(event, 0)}>
              <ListItemText primary='General' />
            </ListItem>
            <ListItem
              button
              selected={selectedIndex === 1}
              onClick={(event) => this.handleListItemClick(event, 1)}>
              <ListItemText primary='Security' />
            </ListItem>
          </List>
        </Grid>
        <Divider orientation='vertical' flexItem sm={1} />
        <Grid item sm={8} xs={12} className={classes.right}>
          {right()}
        </Grid>
      </Grid>
    );
  };
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <h1>Settings</h1>
        <Paper variant='outlined'>
          {this.props.user.authenticated ? (
            this.settings()
          ) : (
            <div className={classes.loginInfo}>
              <InfoIcon />
              <p>
                You don't have the right the access this page, please log in to
                continue.
              </p>
            </div>
          )}
        </Paper>
        {this.editProfile()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  updateProfile,
  uploadAvatar,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(Settings));
