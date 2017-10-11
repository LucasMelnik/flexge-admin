import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';
import Select from '../../../core/form/Select';
import Button from '../../../core/form/Button';
import FetchSelect from '../../../core/form/FetchSelect';
import PermissionValidator from '../../../core/layout/PermissionValidator';

const ReviewListFilter = props => (
  <div
    style={{
      display: 'flex',
      alignItems: 'flex-end',
    }}
  >
    <Select
      options={['', 'NOT_SENT_TO_REVIEW', 'APPROVED', 'NOT_APPROVED', 'PENDING_REVIEW'].map(value => ({
        value,
        label: value.replace('_', ' '),
      }))}
      label="Status images"
      value={get(props.values, 'statusImage', '')}
      onChange={value => props.onChange('statusImage', value)}
    />
    <ColumnSeparator size="sm" />
    <Select
      options={['', 'PENDING', 'APPROVED', 'NOT_APPROVED', 'PENDING_REVIEW'].map(value => ({
        value,
        label: value.replace('_', ' '),
      }))}
      label="Status format"
      value={get(props.values, 'statusFormat', '')}
      onChange={value => props.onChange('statusFormat', value)}
    />
    <ColumnSeparator size="sm" />
    <Select
      options={['', 'NOT SENT TO REVIEW', 'PENDING', 'REVIEWED', 'DONE'].map(value => ({
        value,
        label: value,
      }))}
      label="Status content"
      value={get(props.values, 'status', '')}
      onChange={value => props.onChange('status', value)}
    />
    <ColumnSeparator size="sm" />
    <FetchSelect
      url="/courses"
      label="Course"
      disabled={props.fetching}
      value={get(props.values, 'course')}
      onChange={value => props.onChange('course', value)}
      resultTransformer={{
        text: 'name',
        value: 'id',
      }}
    />
    <ColumnSeparator size="sm" />
    <PermissionValidator allowedFor={['ADMIN']}>
      <FetchSelect
        url="/users?query[role]=CONTENT_ADMIN"
        label="Unit Creator"
        disabled={props.fetching}
        value={get(props.values, 'createdBy')}
        onChange={value => props.onChange('createdBy', value)}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    </PermissionValidator>
    <PermissionValidator allowedFor={['ADMIN']}>
      <ColumnSeparator size="sm" />
    </PermissionValidator>
    <Button
      label="Search"
      icon="fa-search"
      onClick={props.onSearch}
    />
  </div>
);

ReviewListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
};

ReviewListFilter.defaultProps = {
  fetching: false,
  onSearch: null,
}

export default ReviewListFilter;
