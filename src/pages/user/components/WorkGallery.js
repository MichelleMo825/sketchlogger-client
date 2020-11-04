import React, {Component} from 'react';
import {imageURL} from '../../../util/connect';
import withStyle from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {},
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
});
class WorkGallery extends Component {
  render() {
    const {classes, works, cols} = this.props;

    let col = [];
    for (let i = 0; i < cols; i++) {
      col.push(i);
    }

    return (
      <div>
        <div className={classes.gallery}>
          {col.map((c) => {
            return (
              <div className={classes.work}>
                {works.map((work, i) => (
                  <div key={work.id}>
                    {i % cols === c ? (
                      <img src={`${imageURL}${work.filename}`} alt='' />
                    ) : null}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyle(styles)(WorkGallery);
