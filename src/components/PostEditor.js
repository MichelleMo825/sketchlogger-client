import React, {Component} from 'react';
//Mui
import withStyle from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import MuiAlert from '@material-ui/lab/Alert';
//icons
import CloseIcon from '@material-ui/icons/Close';
//redux
import {connect} from 'react-redux';
import {close, newPost, updatePost} from '../redux/actions/postAction';
import {imageURL} from '../util/connect';

const styles = (theme) => ({
  root: {
    '& .MuiTypography-root': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  tileBar: {
    background: 'None',
  },
  imageIcon: {
    height: theme.spacing(1),
    width: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    hoverColor: 'white',

    '& .MuiSvgIcon-root': {
      height: '12px',
      width: '12px',
      color: 'white',
    },
  },
  addImage: {
    textAlign: 'center',
    padding: theme.spacing(3),
    paddingTop: theme.spacing(5),
    marginTop: theme.spacing(1),
    border: '2px dashed',
    borderColor: theme.palette.secondary.light,
  },
  uploadText: {
    margin: '16px auto',
    color: theme.palette.secondary.main,
    fontWeight: '300',
  },
  description: {
    marginTop: theme.spacing(2),
  },

  tags: {
    marginTop: theme.spacing(2),

    '& .MuiChip-root': {
      margin: '2px',
    },

    '& .MuiTextField-root': {
      marginTop: theme.spacing(2),
    },
  },
});
export class PostEditor extends Component {
  state = {
    files: [],
    tags: [],
    errors: {},
    description: '',
    images: [],
    tag: '',
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      files: nextProps.post.files,
      tags: nextProps.post.tags,
      errors: nextProps.post.errors,
      description: nextProps.post.description,
      images: nextProps.post.images,
    });
  }
  handleClose = () => {
    this.props.close();
  };

  handleImageOnClick = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  handleImageUpload = (event) => {
    const image = this.state.images;

    let files = this.state.files;
    let errors = this.state.errors;

    const images = event.target.files;
    for (let i = 0; i < images.length; i++) {
      const repeated = files.filter((file) => {
        return file.name === images[i].name;
      });

      if (repeated.length !== 0) {
        errors.files = `file "${images[i].name}" is already uploaded`;
      } else if (files.length + image.length === 9) {
        errors.files = 'Only 9 images can be uploaded in each post';
      } else {
        files.push(images[i]);
        errors.files = '';
      }
    }

    this.setState({files: files, errors: errors});
  };

  handleDescriptionChange = (event) => {
    this.setState({description: event.target.value});
  };

  handleDeleteImageOnClick = (id) => {
    const images = this.state.images.filter((img) => {
      return img.id !== id;
    });

    this.setState({images: images});
  };
  handleDeleteFileOnClick = (index) => {
    let files = this.state.files;
    files.splice(index, 1);
    this.setState({files: files});
  };

  onKeyPress = (e) => {
    const tags = this.state.tags;
    const errors = this.state.errors;
    let newTag = '';
    if (e.keyCode === 13 && e.target.value) {
      newTag = e.target.value;
      const repeated = tags.filter((tag) => {
        return tag === newTag;
      });

      if (repeated.length === 0) {
        if (newTag.length <= 50) {
          tags.push(newTag.replace(' ', ''));
          this.setState({tags: tags});
          e.target.value = '';
          errors.tags = '';
        } else {
          errors.tags = `Only 50 characters are allowed in one tag`;
        }
      } else {
        errors.tags = `Tag "${e.target.value}" already exist`;
      }
    }
    this.setState({errors: errors});
  };

  handleTagDeleteClick = (index) => {
    let tags = this.state.tags;
    tags.splice(index, 1);
    this.setState({tags: tags});
  };

  handlePost = () => {
    const formData = new FormData();
    this.state.files.map((file) => {
      formData.append('file', file, file.name);
      return null;
    });

    const data = {
      id: this.props.post.id ? this.props.post.id : undefined,
      files: formData,
      images: this.state.images.map((img) => {
        return img.id;
      }),
      description: this.state.description,
      tags: this.state.tags,
    };

    if (
      this.state.files.length === 0 &&
      this.state.description === '' &&
      this.state.images.length === 0
    ) {
      let errors = this.state.errors;
      errors.general =
        "You can't post without any content, please upload images or share your thoughts";
      this.setState({errors: errors});
    } else {
      if (this.props.post.new) {
        this.props.newPost(data);
      } else {
        data['id'] = this.props.post.id;
        this.props.updatePost(data);
      }
    }
  };
  render() {
    const {classes} = this.props;

    return (
      <Dialog
        open={this.props.post.open}
        fullWidth={true}
        maxWidth='xs'
        className={classes.root}>
        <DialogTitle onClose={this.handleClose}>
          <div>New Post</div>
          <div>
            <IconButton onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          {this.state.errors.general ? (
            <MuiAlert severity='error'>{this.state.errors.general}</MuiAlert>
          ) : null}
          {this.state.images.length > 0 ? (
            <GridList cols={1}>
              {this.state.images.map((img, index) => {
                return (
                  <GridListTile key={img.id}>
                    <img
                      src={`${imageURL}${img.filename}`}
                      width='100%'
                      key={img.id}
                      alt=''
                    />
                    <GridListTileBar
                      titlePosition='top'
                      actionIcon={
                        <IconButton
                          variant='contained'
                          className={classes.imageIcon}
                          onClick={() => {
                            this.handleDeleteImageOnClick(img.id);
                          }}>
                          <CloseIcon />
                        </IconButton>
                      }
                      actionPosition='right'
                      className={classes.tileBar}
                    />
                  </GridListTile>
                );
              })}
            </GridList>
          ) : null}

          {this.state.files.length > 0 ? (
            <GridList cols={1}>
              {this.state.files.map((file, index) => {
                const src = URL.createObjectURL(file);

                return (
                  <GridListTile key={file.id}>
                    <img src={src} width='100%' alt='' />
                    <GridListTileBar
                      titlePosition='top'
                      actionIcon={
                        <IconButton
                          variant='contained'
                          className={classes.imageIcon}
                          onClick={() => {
                            this.handleDeleteFileOnClick(index);
                          }}>
                          <CloseIcon />
                        </IconButton>
                      }
                      actionPosition='right'
                      className={classes.tileBar}
                    />
                  </GridListTile>
                );
              })}
            </GridList>
          ) : null}
          <div className={classes.addImage}>
            <Button
              variant='contained'
              color='primary'
              onClick={this.handleImageOnClick}>
              Upload
            </Button>
            <input
              type='file'
              id='imageInput'
              hidden='hidden'
              onChange={(event) => this.handleImageUpload(event)}
              multiple={true}
            />
            <p className={classes.uploadText}>
              {this.state.errors.files
                ? this.state.errors.files
                : 'Click "Upload" and add images'}
            </p>
          </div>

          <TextField
            placeholder='type your description here..'
            label='Thought'
            fullWidth
            multiline
            variant='outlined'
            className={classes.description}
            value={this.state.description}
            onChange={(e) => {
              this.handleDescriptionChange(e);
            }}
          />
          <div className={classes.tags}>
            <div>
              {this.state.tags.map((tag, i) => {
                return (
                  <Chip
                    label={tag}
                    onDelete={() => {
                      this.handleTagDeleteClick(i);
                    }}
                    key={i}
                    // variant='outlined'
                  />
                );
              })}
            </div>

            <TextField
              label='Tag'
              placeholder='type your tag and click Enter'
              onKeyDown={(e) => {
                this.onKeyPress(e);
              }}
              fullWidth
              helperText={this.state.errors.tags}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>Cancel</Button>
          <Button variant='contained' color='primary' onClick={this.handlePost}>
            Post
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.post,
});

const mapActionsToProps = {
  close,
  newPost,
  updatePost,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyle(styles)(PostEditor));
