import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import FontIcon from 'material-ui/FontIcon';

const Tag = props => (
  <Chip
    onRequestDelete={props.onDelete}
    onTouchTap={() => props.onClick && props.onClick()}
    style={{
      margin: '10px 5px',
    }}
    labelStyle={{
      lineHeight: props.icon ? '12px' : '32px',
    }}
  >
    {props.icon && (
      <FontIcon
        className="material-icons"
        style={{
          padding: 3,
        }}
      >
        {props.icon}
      </FontIcon>
    )}
    {props.text && (
      props.text
    )}
  </Chip>
);

Tag.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
};

Tag.defaultProps = {
  text: null,
  icon: null,
  onDelete: null,
  onClick: null,
};

export default Tag;