import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
export class TipIconButton extends Component {
  render() {
    const {tip, onClick, className, children, ref} = this.props;
    return (
      <Tooltip title={tip}>
        <IconButton onClick={onClick} className={className} ref={ref}>
          {children}
        </IconButton>
      </Tooltip>
    );
  }
}

export default TipIconButton;
