import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Icon } from 'antd';

const TooltipIcon = props => (
  <Tooltip
    placement={props.position}
    title={props.text}
  >
    <Icon
      type="question-circle-o"
      style={{
        verticalAlign: 'middle',
        marginLeft: 5,
      }}
    />
  </Tooltip>
);

TooltipIcon.propTypes = {
  text: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'left', 'right', 'bottom']),
};

TooltipIcon.defaultProps = {
  position: 'top',
};

export default TooltipIcon;
