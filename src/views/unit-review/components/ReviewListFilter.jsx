import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Select from '../../../core/form/Select';
import Button from '../../../core/form/Button';
import FetchSelect from '../../../core/form/FetchSelect';
import PermissionValidator from '../../../core/layout/PermissionValidator';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';

const ReviewListFilter = props => (
  <div>
    <Row>
      <Column size={2}>
        <Select
          disabled={props.fetching}
          options={['NOT_SENT_TO_REVIEW', 'APPROVED', 'NOT_APPROVED', 'PENDING_REVIEW'].map(value => ({
            value,
            label: value.replace('_', ' '),
          }))}
          label="Status images"
          value={get(props.values, 'statusImage', '')}
          onChange={value => props.onChange('statusImage', value)}
        />
      </Column>
      <Column size={2}>
        <Select
          disabled={props.fetching}
          options={['PENDING', 'APPROVED', 'NOT_APPROVED', 'PENDING_REVIEW'].map(value => ({
            value,
            label: value.replace('_', ' '),
          }))}
          label="Status format"
          value={get(props.values, 'statusFormat', '')}
          onChange={value => props.onChange('statusFormat', value)}
        />
      </Column>
      <Column size={2}>
        <Select
          disabled={props.fetching}
          options={['NOT SENT TO REVIEW', 'PENDING', 'REVIEWED', 'DONE'].map(value => ({
            value,
            label: value,
          }))}
          label="Status content"
          value={get(props.values, 'status', '')}
          onChange={value => props.onChange('status', value)}
        />
      </Column>
      <Column size={2}>
        <FetchSelect
          url="/courses"
          label="Course"
          disabled={props.fetching}
          value={get(props.values, 'course', '')}
          onChange={value => props.onChange('course', value)}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      {get(props.values, 'course', undefined) && (
        <Column size={2}>
          <FetchSelect
            showSearch
            url={`/modules?query[course]=${get(props.values, 'course', '')}`}
            label="Modules"
            disabled={props.fetching}
            value={get(props.values, 'module', '')}
            onChange={value => props.onChange('module', value)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      )}
    </Row>
    <PermissionValidator allowedFor={['ADMIN']}>
      <Row>
        <Column size={3}>
          <FetchSelect
            showSearch
            url="/users?query[role]=CONTENT_ADMIN"
            label="Unit Creator"
            disabled={props.fetching}
            value={get(props.values, 'createdBy', '')}
            onChange={value => props.onChange('createdBy', value)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
        <Column size={3}>
          <FetchSelect
            showSearch
            url="/users?query[role]=CONTENT_ADMIN"
            label="Unit Reviewer"
            disabled={props.fetching}
            value={get(props.values, 'reviewedBy', '')}
            onChange={value => props.onChange('reviewedBy', value)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      </Row>
    </PermissionValidator>
    <Row>
      <Column size={12}>
        <Button
          label="Search"
          icon="search"
          onClick={props.onSearch}
        />
      </Column>
    </Row>
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
};

export default ReviewListFilter;
