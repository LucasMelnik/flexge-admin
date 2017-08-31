import React from 'react';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import ColumnSeparator from '../layout/ColumnSeparator';

const Tags = props => (
  <div className="form-group">
    <label
      className="form-label"
      htmlFor="label"
    >
      {props.label}
    </label>
    <span
      className="desc"
      style={{
        color: 'red',
      }}
    >
      {props.errorText}
    </span>
    <div className="controls">
      <div
        className="bootstrap-tagsinput"
        style={{
          borderColor: props.errorText ? '#f44336' : null,
          padding: '8px'
        }}
      >
        {props.tags.map(tag => (
          <span
            key={`tag-${tag.index}`}
            className={`tag label ${props.disabled ? 'label-default' : 'label-primary'}`}
            style={{
              padding: '8px 5px',
              display: 'inline-block',
            }}
          >
            {!(tag.canClick || tag.canLink) && (tag.text)}
            {!(tag.canClick || tag.canLink) && (<ColumnSeparator size="sm" />)}
            {(!props.disabled && (tag.canClick || tag.canLink)) && (
              <IconButton
                size="xs"
                icon={tag.icon}
                onClick={() => tag.canLink ? props.onLink(tag.index, tag) : props.onClick(tag.index, tag)}
              />
            )}
            {(!props.disabled && tag.canDelete) && (
              <IconButton
                size="xs"
                icon="fa-times"
                onClick={() => props.onDelete(tag.index, tag)}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  </div>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number.isRequired,
    text: PropTypes.string,
    icon: PropTypes.string,
    canDelete: PropTypes.bool,
    canClick: PropTypes.bool,
    canLink: PropTypes.bool,
  })),
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onLink: PropTypes.func.isRequired,
};


Tags.defaultProps = {
  tags: [],
  disabled: false,
  errorText: null,
};

export default Tags;
