const styles = (theme) => ({
  root: {
    paddingBottom: '100px',
  },
  container: {
    // width: '100%',

    [theme.breakpoints.down('xs')]: {
      '& .MuiGrid-spacing-xs-5 > .MuiGrid-item': {
        padding: '0',
        margin: '0',
      },
    },
  },

  grid: {
    width: '80%',
    margin: 'auto',
    maxWidth: '1000px',
    // '& .MuiGrid-item': {padding: '20px 0'},
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  loading: {
    textAlign: 'center',
    '& .MuiCircularProgress-root': {
      margin: '16px auto',
    },
  },

  menu: {
    position: 'sticky',
    top: '100px',
    left: '0',

    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },

  mobileMenu: {
    position: 'sticky',
    top: '80px',
    zIndex: '1',
    gridColumn: '1',
    gridRow: '1',
  },

  right: {
    position: 'sticky',
    top: '100px',
    [theme.breakpoints.down('sm')]: {
      display: 'None',
    },
    '& .MuiButton-root': {
      height: '60px',
      width: '100%',
      justifyContent: 'space-between',
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      marginBottom: theme.spacing(1),
    },
  },
  buttonContent: {
    width: '100%',
    textAlign: 'center',
  },

  myPageButton: {
    color: theme.palette.secondary.dark,
    backgroundColor: '#f4f4f4',
    // boxShadow: '1px 0px 5px #aaa',
  },
});

export default styles;
