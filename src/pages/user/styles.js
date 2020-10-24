import {fade} from '@material-ui/core/styles/colorManipulator';
const styles = (theme) => ({
  root: {
    maxWidth: '800px',
    margin: '0 auto',
    width: '100%',
  },

  userInfo: {
    // paddingTop: theme.spacing(6),

    '& .MuiGrid-root': {},

    '& .MuiAvatar-root': {
      margin: '8px auto',
      height: theme.spacing(10),
      width: theme.spacing(10),

      [theme.breakpoints.down('xs')]: {
        height: theme.spacing(8),
        width: theme.spacing(8),
      },
    },
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(2),
    },
  },

  userInfoLeft: {
    textAlign: 'center',
  },

  bio: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontWeight: '300',
    fontSize: theme.spacing(1.8),
    color: theme.palette.primary.light,

    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  },

  socialIcon: {
    marginTop: theme.spacing(1),
    padding: '0',
    '& .MuiSvgIcon-root': {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
      color: theme.palette.secondary.light,
    },
    '&:hover': {
      backgroundColor: '#fff',
    },

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },

  following: {
    display: 'flex',
    alignItems: 'center',

    '& .MuiDivider-root': {
      height: theme.spacing(3),
      margin: theme.spacing(2),
      // [theme.breakpoints.down('xs')]: {
      //   margin: theme.spacing(1.5),
      // },
    },
  },

  follow: {
    textAlign: 'center',
    // padding: theme.spacing(1),
  },

  followtext: {
    fontWeight: '500',
    fontSize: theme.spacing(1.5),
    letterSpacing: '2px',
  },

  followButton: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(-1),
  },

  tabs: {
    marginTop: theme.spacing(2),
    '& .MuiTab-root': {
      width: 'calc(100% / 3)',
      borderBottom: '1px solid ',
      borderBottomColor: theme.palette.secondary.light,
    },
  },

  contents: {
    width: '100%',

    paddingTop: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      '& .MuiGrid-root': {
        paddingTop: theme.spacing(2),
      },
      '& .MuiGrid-spacing-xs-2 > .MuiGrid-item': {
        padding: '0 8px',
      },

      paddingTop: theme.spacing(1),
    },
  },

  gallery: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  work: {
    width: '32%',

    [theme.breakpoints.down('xs')]: {
      width: '49.5%',
    },

    '& img': {
      marginTop: theme.spacing(0.5),
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },

  data: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(5),
    },
  },

  tags: {
    position: 'sticky',
    top: '100px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },

  posts: {
    display: 'grid',
    '& .MuiGrid-root': {
      [theme.breakpoints.down('xs')]: {
        paddingTop: theme.spacing(2),
        gridColumn: '1',
        gridRow: '1',
        // zIndex: '1',
      },
    },
  },

  mobileTags: {
    gridColumn: '1',
    gridRow: '1',
    '& .MuiAccordion-root': {
      margin: '6px 2.5%',
      padding: '0 8px',
      width: '90%',
      backgroundColor: fade(theme.palette.primary.dark, 0.9),
      color: theme.palette.primary.contrastText,
      zIndex: '10',
      // position: 'absolute',
      position: 'sticky',
      top: '90px',
    },

    '& .MuiIconButton-label': {
      color: theme.palette.primary.contrastText,
    },

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  mobileStickyTags: {
    gridColumn: '1',
    gridRow: '1',
    position: 'sticky',
  },

  tag: {
    '& .MuiLink-button': {
      width: '100%',
      wordWrap: 'break-word',
      textAlign: 'left',
      letterSpacing: '1px',

      [theme.breakpoints.down('xs')]: {
        letterSpacing: '2px',
        color: theme.palette.primary.contrastText,
      },
    },
  },

  tagLinkActive: {
    fontWeight: '700',
    color: theme.palette.primary.dark,
  },
});

export default styles;
