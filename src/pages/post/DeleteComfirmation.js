import React, {Component} from 'react';

//mui
import withStyle from '@material-ui/core/styles/withStyles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
const styles = (theme) => ({
  root: {},
});

class DeleteComfirmation extends Component {
  render() {
    const {classes, open, onDelete, onCancel, type} = this.props;
    return (
      <div>
        <Dialog open={open}>
          <DialogTitle>{`Do you wish to delete this ${type}?`}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {`Content won't be recovered after deleted.`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel} color='primary'>
              Cancel
            </Button>
            <Button onClick={onDelete} color='primary' autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyle(styles)(DeleteComfirmation);
