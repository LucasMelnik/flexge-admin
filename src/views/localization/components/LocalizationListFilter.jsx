import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../../../core/form/TextInput';
import Button from '../../../core/form/Button';
import Column from '../../../core/layout/Column';
import Row from '../../../core/layout/Row';
import get from 'lodash/get';
import Select from '../../../core/form/Select';

const LocalizationListFilter = props => (
  <Row>
    <Column size={1.5}>
      <Select
        options={[
          {
            label: 'Student',
            value: 'STUDENT',
          },
          {
            label: 'Kids',
            value: 'KIDS',
          },
          {
            label: 'Push Notifications',
            value: 'PUSH_NOTIFICATIONS',
          }
        ]}
        disabled={props.fetching}
        label="Type"
        value={get(props.values, 'type', '')}
        onChange={value => props.onChange('type', value)}
      />
    </Column>
    <Column size={4}>
      <TextInput
        label="Search by key"
        value={props.values.key}
        onChange={value => props.onChange('key', value)}
        disabled={props.fetching}
      />
    </Column>
    <Column size={2}>
      <div style={{ height: 42 }} />
      <Button
        label="Search"
        icon="search"
        onClick={props.onSearch}
      />
    </Column>
  </Row>
);

LocalizationListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default LocalizationListFilter;
