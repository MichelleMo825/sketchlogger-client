const styles = (theme) => ({
  root: {
    maxWidth: '800px',
    margin: '0 auto',
    width: '100%',
    paddingBottom: '80px',
  },

  userInfo: {
    paddingTop: theme.spacing(6),

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

      [theme.breakpoints.down('xs')]: {
        margin: 0,
      },
    },
  },

  followButton: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(-1),
  },

  tabs: {
    marginTop: theme.spacing(3),
    '& .MuiTab-root': {
      width: 'calc(100% / 3)',
      borderBottom: '1px solid ',
      borderBottomColor: theme.palette.secondary.light,
    },

    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
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

  tags: {
    position: 'sticky',
    top: '100px',

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  tagSearch: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      '& .MuiInput-root': {
        backgroundColor: '#333',
        padding: theme.spacing(1),
        color: '#fff',
      },
      display: 'block',
      margin: '0 0 8px 0',
    },
  },

  posts: {
    display: 'grid',
  },

  data: {
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1),
    },
  },

  mobileTags: {
    position: 'sticky',
    top: '90px',
    zIndex: '1',
    margin: '-8px 0',

    '& .MuiList-root': {
      width: '100%',
    },
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
