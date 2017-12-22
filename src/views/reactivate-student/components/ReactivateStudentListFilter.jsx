import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import TextInput from '../../../core/form/TextInput';
import FetchSelect from '../../../core/form/FetchSelect';
import Button from '../../../core/form/Button';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';

const ReactivateStudentListFilter = props => (
  <div>
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
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
      <Column size={2}>
        <div style={{ height: 31 }} />
        <Button
          icon="search"
          label="Search"
          onClick={props.onSearch}
        />
      </Column>
    </Row>
  </div>
);

ReactivateStudentListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
};

ReactivateStudentListFilter.defaultProps = {
  fetching: false,
};

export default ReactivateStudentListFilter;
