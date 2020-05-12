import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import FetchSelect from '../../../core/form/FetchSelect';
import Button from '../../../core/form/Button';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Select from '../../../core/form/Select';

const StudentListFilter = props => (
  <div>
    <Row>
      {props.allowedFilters.some(f => f === 'status') && (
        <Column size={1}>
          <Select
            label="Status"
            disabled={props.fetching}
            value={props.values.deleted}
            onChange={value => props.onChange('deleted', value)}
            options={[
              {
                value: 'all',
                label: 'All'
              },
              {
                value: 'false',
                label: 'Enabled'
              },
              {
                value: 'true',
                label: 'Disabled'
              }
            ]}
          />
        </Column>
      )}
      {props.allowedFilters.some(f => f === 'id') && (
        <Column size={1}>
          <TextInput
            label="ID"
            placeholder="Student ID"
            disabled={props.fetching}
            value={get(props.values, 'cpf', '')}
            onChange={value => props.onChange('cpf', value)}
          />
        </Column>
      )}
      {props.allowedFilters.some(f => f === 'name') && (
        <Column size={2}>
          <TextInput
            label="Name"
            placeholder="Name student"
            value={get(props.values, 'name', '')}
            onChange={name => props.onChange('name', name)}
            disabled={props.fetching}
          />
        </Column>
      )}
      {props.allowedFilters.some(f => f === 'email') && (
        <Column size={2}>
          <TextInput
            label="Email"
            placeholder="Email student"
            value={get(props.values, 'email', '')}
            onChange={email => props.onChange('email', email)}
            disabled={props.fetching}
          />
        </Column>
      )}
      {props.allowedFilters.some(f => f === 'school') && (
        <Column size={2.5}>
          <FetchSelect
            isPaginated
            url="/schools"
            label="School"
            showSearch
            disabled={props.fetching}
            value={get(props.values, 'school', '')}
            onChange={school => props.onChange('school', school)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      )}
      {props.allowedFilters.some(f => f === 'classroom') && get(props.values, 'school', undefined) && (
        <Column size={1.5}>
          <FetchSelect
            isPaginated
            showSearch
            url={`/schools/${props.values.school}/classes`}
            label="Classrooms"
            disabled={props.fetching}
            value={get(props.values, 'schoolClass', '')}
            onChange={school => props.onChange('schoolClass', school)}
            resultTransformer={{
              text: 'name',
              value: 'id',
            }}
          />
        </Column>
      )}
      <Column size={2}>
        <div style={{ height: 42 }} />
        <Button
          icon="search"
          label="Search"
          onClick={props.onSearch}
          disabled={props.fetching}
        />
      </Column>
    </Row>
  </div>
);

StudentListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  allowedFilters: PropTypes.oneOf(['status', 'id', 'name', 'email', 'school', 'classroom']),
};

StudentListFilter.defaultProps = {
  fetching: false,
  allowedFilters: ['status', 'id', 'name', 'email', 'school', 'classroom'],
};

export default StudentListFilter;
