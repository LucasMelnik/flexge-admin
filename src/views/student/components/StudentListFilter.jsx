import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import FetchSelect from '../../../core/form/FetchSelect';
import Button from '../../../core/form/Button';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';

const StudentListFilter = props => (
  <Row>
    <Column size={3}>
      <TextInput
        label="Name"
        placeholder="Name student"
        value={get(props.values, 'name', '')}
        onChange={name => props.onChange('name', name)}
        disabled={props.fetching}
      />
    </Column>
    <Column size={3}>
      <TextInput
        label="Email"
        placeholder="Email student"
        value={get(props.values, 'email', '')}
        onChange={email => props.onChange('email', email)}
        disabled={props.fetching}
      />
    </Column>
    <Column size={4}>
      <FetchSelect
        url="/schools"
        label="School"
        disabled={props.fetching}
        value={get(props.values, 'school', '')}
        onChange={school => props.onChange('school', school)}
        errorText={get(props.errors, 'school', '')}
        resultTransformer={{
          text: 'name',
          value: 'id',
        }}
      />
    </Column>
    <Column size={2}>
      <div style={{ height: 33 }} />
      <Button
        icon="search"
        label="Search"
        onClick={props.onSearch}
      />
    </Column>
  </Row>
);

StudentListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
};

StudentListFilter.defaultProps = {
  errors: {},
  fetching: false,
};

export default StudentListFilter;
