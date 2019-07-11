import React from 'react';
import PropTypes from 'prop-types';
import { Tag, Form } from 'antd';
import Button from './Button';
import ColumnSeparator from '../layout/ColumnSeparator';

const Tags = props => (
  <Form.Item
    label={props.label}
    help={props.errorText}
    validateStatus={props.errorText && 'error'}
  >
    {props.tags.map(tag => (
      <Tag
        key={`tag-${tag.index}`}
        closable={false}
      >
        {!(tag.canClick || tag.canLink) && (tag.text)}
        {!(tag.canClick || tag.canLink) && (<ColumnSeparator size="sm" />)}
        {(!props.disabled && tag.canDelete) && (
          <Button
            size="sm"
            rounded
            icon="close"
            onClick={() => props.onDelete(tag.index, tag)}
          />
        )}
        {(!props.disabled && (tag.canClick || tag.canLink)) && (
          <Button
            size="sm"
            rounded
            icon={tag.icon}
            onClick={() => {
              if (tag.canLink) {
                props.onLink(tag.index, tag);
              } else {
                props.onClick(tag.index, tag);
              }
            }}
          />
        )}
        {props.disabled && (tag.canClick || tag.canLink) && '-'}
      </Tag>
    ))}
  </Form.Item>
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
