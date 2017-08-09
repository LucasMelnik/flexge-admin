import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../layout/Icon';

const Tags = props => (
  <div className="bootstrap-tagsinput">
    {props.tags.map(tag => (
      <span className="tag label label-info">
        {tag.text}
        {(!props.disabled && tag.icon) && (
          <Icon name={tag.icon} />
        )}
        {(!props.disabled && props.onDelete) && (
          <span
            data-role="remove"
            onClick={props.onDelete}
          />
        )}
      </span>
    ))}
  </div>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    icon: PropTypes.string,
  })),
  disabled: PropTypes.bool,
  onDelete: PropTypes.func,
};


Tags.defaultProps = {
  tags: [],
  disabled: false,
  onDelete: null,
};

export default Tags;
