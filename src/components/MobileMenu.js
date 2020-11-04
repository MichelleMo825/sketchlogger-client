import React, {Component} from 'react';

//mui
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

//icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//styles
import withStyle from '@material-ui/core/styles/withStyles';
import {fade} from '@material-ui/core/styles/colorManipulator';
const styles = (theme) => ({
  root: {
    '& .MuiAccordion-root': {
      margin: '0 2.5%',
      padding: '0 8px',
      width: '90%',
      backgroundColor: fade(theme.palette.primary.dark, 0.9),
      color: theme.palette.primary.contrastText,
      maxHeight: 'calc(100vh - 80px - 64px)',
      overflow: 'scroll',
    },

    '& .MuiIconButton-label': {
      color: theme.palette.primary.contrastText,
    },

    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});
export class MobileMenu extends Component {
  // state = {
  //   expanded: false,
  // };

  // handleChange = () => {
  //   this.setState({expanded: !this.state.expanded});
  // };
  render() {
    const {classes, title, children, expanded, onChange} = this.props;
    return (
      <div className={classes.root}>
        <Accordion expanded={expanded} onChange={onChange}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {title}
          </AccordionSummary>
          <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

export default withStyle(styles)(MobileMenu);
