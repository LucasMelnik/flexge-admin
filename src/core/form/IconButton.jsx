import React from 'react';
import PropTypes from 'prop-types';
import MaterialIconButton from 'material-ui/IconButton';

const IconButton = props => (
  <MaterialIconButton
    style={{
      width: 45
    }}
    onClick={props.onClick}
    iconClassName="material-icons"
  >
    {props.icon}
  </MaterialIconButton>
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IconButton;
