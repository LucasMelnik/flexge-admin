import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Flex from 'jsxstyle/Flex';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';
import Select from '../../../core/form/Select';
import Button from '../../../core/form/Button';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';

const ReviewListFilter = props => (
  <Flex
    alignItems="flex-end"
  >

    <Select
      floatingLabel
      options={['', 'PENDING', 'APPROVED', 'NOT_APPROVED', 'PENDING_REVIEW'].map(value => ({
        value,
        label: value.replace('_', ' '),
      }))}
      label="Status format"
      value={get(props.values, 'statusFormat', '')}
      onChange={value => props.onChange('statusFormat', value)}
      errorText={get(props.errors, 'statusFormat', '')}
    />
    <ColumnSeparator size="sm" />
    <Select
      floatingLabel
      options={['', 'NOT SENT TO REVIEW', 'PENDING', 'REVIEWED', 'DONE'].map(value => ({
        value,
        label: value,
      }))}
      label="Status content"
      value={get(props.values, 'status', '')}
      onChange={value => props.onChange('status', value)}
      errorText={get(props.errors, 'status', '')}
    />
    <ColumnSeparator size="sm" />
    <FetchAutoComplete
      url="/courses"
      disabled={props.fetching}
      label="Course"
      fullWidth={false}
      onSelect={value => props.onChange('course', value)}
      resultTransformer={{
        text: 'name',
        value: 'id',
      }}
      value={get(props.values, 'course.name')}
    />
    <ColumnSeparator size="sm" />
    <Button
      label="Search"
      icon="search"
      onClick={props.onSearch}
    />
  </Flex>
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
