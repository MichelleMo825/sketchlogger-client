import {fade} from '@material-ui/core/styles/colorManipulator';

export const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(10),
  },
  paper: {
    padding: '0',

    [theme.breakpoints.down('xs')]: {
      padding: '0',

      '& .MuiDialogContent-dividers': {
        padding: '0 !important',
      },
    },
  },

  container: {
    padding: theme.spacing(2),
    paddingBottom: 0,

    [theme.breakpoints.down('xs')]: {
      padding: '0',
    },
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

  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    '& .MuiGridList-root': {
      width: '300px',
      maxHeight: '300px',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        maxHeight: '100%',
      },
    },

    '& img': {
      objectFit: 'cover',
      height: '100%',
      width: '100%',
    },
  },

  tile: {
    height: 'calc(300px /3) !important',

    [theme.breakpoints.down('xs')]: {
      height: 'calc((100vw ) /3) !important',
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

  expandButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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

  comments: {
    maxHeight: 'calc(50vh)',
    overflowY: 'auto',
  },

  commentInput: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  submitComment: {
    display: 'flex',
    justifyContent: 'space-between',

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  noComments: {
    color: theme.palette.secondary.light,
    textAlign: 'center',
    padding: theme.spacing(2),
  },
});
