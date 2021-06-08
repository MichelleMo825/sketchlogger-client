import {fade} from '@material-ui/core/styles/colorManipulator';

export const styles = (theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      '& .MuiDialog-paperFullScreen': {
        backgroundColor: 'transparent !important',
      },
    },
  },

  closeButton: {
    top: theme.spacing(1),
    right: theme.spacing(4),
    position: 'fixed',
    zIndex: 3,

    color: 'white',
    backgroundColor: theme.palette.primary.main,

    [theme.breakpoints.down('xs')]: {
      top: theme.spacing(2),
      right: theme.spacing(2),
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
  },

  container: {
    padding: '0',

    display: 'flex',
    flexDirection: 'row',

    maxWidth: '1200px',
    width: '100%',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  images: {
    position: 'sticky',
    top: '0',
    width: '100%',
    maxWidth: '500px',
    height: '100vh',
    zIndex: 1,

    gridColumn: 1,
    gridRow: 1,

    [theme.breakpoints.down('xs')]: {
      backgroundColor: 'white',
      maxWidth: '100%',
      height: '100%',
      top: '0',
      minHeight: '30px',
    },
  },

  imagesContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: fade(theme.palette.primary.dark, 0.8),

    [theme.breakpoints.down('xs')]: {
      height: '250px',
    },

    '& img': {
      position: 'absolute',
      objectFit: 'contain',
      height: '100%',
      width: '100%',
      marginBottom: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        objectFit: 'contain',
      },
    },
  },

  imagesControl: {
    position: 'absolute',
    bottom: '50%',
    zIndex: 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  controlButton: {
    backgroundColor: fade(theme.palette.primary.main, 0.4),
    color: 'white',
    hoverColor: 'white',
    border: '1.5px solid',
    borderColor: 'white',
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
  },

  details: {
    gridColumn: 2,
    gridRow: 1,
    width: '100%',
    padding: '80px 40px',
    backgroundColor: 'white',
    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
  },

  avatar: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 0',
    width: '100%',
    '& .MuiSvgIcon-root': {
      height: theme.spacing(2.5),
      width: theme.spacing(2.5),
      color: theme.palette.secondary.main,
    },

    [theme.breakpoints.down('xs')]: {
      margin: '20px 8px',
      width: '95%',
    },
  },
  titleLeft: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '50%',
    },
  },
  titleMeta: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: theme.spacing(35),
    wordWrap: 'break-word',
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '80%',
    },
  },
  moreMenu: {
    backgroundColor: fade(theme.palette.primary.main, 0.8),
    color: theme.palette.primary.contrastText,

    '& .MuiList-root': {padding: '0'},
    '& .MuiListItem-root': {
      justifyContent: 'space-between',
    },
    '& .MuiTypography-root': {
      width: '100%',
    },
    '& .MuiSvgIcon-root': {
      padding: theme.spacing(1),
      height: theme.spacing(2.5),
      width: theme.spacing(2.5),
      color: theme.palette.primary.contrastText,
    },
  },

  description: {
    whiteSpace: 'pre-line',
    position: 'relative',

    paddingTop: theme.spacing(2),
    paddingDown: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  expandDescription: {
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
    },
  },

  // overlay: {
  //   position: 'absolute',
  //   height: '100px',
  //   backgroundColor: '#000',
  // },

  actionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    paddingTop: theme.spacing(2),
    paddingDown: theme.spacing(2),

    '& .MuiLink-root': {
      color: theme.palette.secondary.dark,
      paddingRight: theme.spacing(1),
      paddingTop: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
    },

    // [theme.breakpoints.down('xs')]: {
    //   paddingLeft: theme.spacing(1),
    //   paddingRight: theme.spacing(1),
    // },
  },

  actions: {
    display: 'flex',
    margin: '8px 0',
  },

  action: {
    display: 'flex',
    // justifyContent: 'space-between',
    // minWidth: theme.spacing(8),
    '& .MuiButton-root': {},
    '&:hover': {
      backgroundColor: '#fff',
      color: theme.palette.primary.dark,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#fff',
    },
  },

  medium: {
    margin: '5px 15px 5px 10px',
    width: theme.spacing(5),
    height: theme.spacing(5),

    [theme.breakpoints.up('sm')]: {
      display: 'None',
    },
  },

  large: {
    // position: 'relative',
    // position: 'fixed',
    margin: '10px 0 auto auto',
    width: theme.spacing(7),
    height: theme.spacing(7),

    [theme.breakpoints.down('xs')]: {
      display: 'None',
    },
  },

  largeSticky: {
    position: 'sticky',
    // position: '-webkit-sticky',
    top: '92px',
    margin: '10px 0 auto auto',
    width: theme.spacing(7),
    height: theme.spacing(7),

    [theme.breakpoints.down('xs')]: {
      display: 'None',
    },
  },

  commentForm: {
    [theme.breakpoints.down('xs')]: {
      position: 'sticky',
      top: '250px',
      backgroundColor: 'white',
      zIndex: 1,
      padding: '2px 0',
    },
  },

  commentInput: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    '& .MuiInputBase-input': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },

  submitComment: {
    display: 'flex',
    justifyContent: 'space-between',

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  noComments: {
    color: theme.palette.secondary.light,
    textAlign: 'center',
    padding: theme.spacing(2),
  },
});
