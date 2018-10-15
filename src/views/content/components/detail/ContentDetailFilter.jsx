import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../../core/form/Button';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';

const ContentDetailFilter = props => (
  <div>
    {props.availableTypes.find(type => type === 1) && (
      <Button
        label="Your Challenge/Simple Review"
        disabled={props.fetching}
        type={get(props.values, 'type', 0) === 1 ? 'primary' : 'default'}
        onClick={() => {
          props.onChange('type', 1);
          props.onFilter();
        }}
      />
    )}
    {props.availableTypes.find(type => type === 1) && (
      <ColumnSeparator size="xs" />
    )}
    {props.availableTypes.find(type => type === 2) && (
      <Button
        label="First Review"
        disabled={props.fetching}
        type={get(props.values, 'type', 0) === 2 ? 'primary' : 'default'}
        onClick={() => {
          props.onChange('type', 2);
          props.onFilter();
        }}
      />
    )}
    {props.availableTypes.find(type => type === 2) && (
      <ColumnSeparator size="xs" />
    )}
    {props.availableTypes.find(type => type === 3) && (
      <Button
        label="Second Review"
        disabled={props.fetching}
        type={get(props.values, 'type', 0) === 3 ? 'primary' : 'default'}
        onClick={() => {
          props.onChange('type', 3);
          props.onFilter();
        }}
      />
    )}
  </div>
);

ContentDetailFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  onFilter: PropTypes.func.isRequired,
  availableTypes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ContentDetailFilter;
