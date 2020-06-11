import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import DateInput from '../../../core/form/DateInput';
import TextInput from '../../../core/form/TextInput';
import StudentAutoCompleteContainer from '../../../core/form/StudentAutoCompleteContainer';
import Select from '../../../core/form/Select';

const MessageListFilter = props => (
  <Row>
    <Column size={1.5}>
      <DateInput
        label="From"
        disabled={props.fetching}
        value={get(props.values, 'from', undefined) ? props.values.from.toDate() : undefined}
        onChange={value => props.onChange('from', value)}
        errorText={get(props.errors, 'from', '')}
      />
    </Column>
    <Column size={1.5}>
      <DateInput
        label="To"
        disabled={props.fetching}
        value={get(props.values, 'to', undefined) ? props.values.to.toDate() : undefined}
        onChange={value => props.onChange('to', value)}
        errorText={get(props.errors, 'to', '')}
      />
    </Column>
    {props.showStatusFilter && (
      <Column size={1}>
        <Select
          label="Status"
          disabled={props.fetching}
          value={get(props.values, 'status', '')}
          onChange={value => props.onChange('status', value)}
          errorText={get(props.errors, 'status', '')}
          options={[
            {
              label: 'All',
              value: 'null',
            },
            {
              label: 'Not Read',
              value: 'UNREAD',
            },
            {
              label: 'Read',
              value: 'READ',
            }
          ]}
        />
      </Column>
    )}
    <Column size={2}>
      <TextInput
        label="Subject"
        disabled={props.fetching}
        value={get(props.values, 'subject', '')}
        onChange={value => props.onChange('subject', value)}
        errorText={get(props.errors, 'subject', '')}
      />
    </Column>
    <Column size={3}>
      <StudentAutoCompleteContainer
        disabled={props.fetching}
        value={get(props.values, 'memberId', get(props.values, 'member', ''))}
        onSelect={value => props.onChange('memberId', value)}
        onChange={value => {
          props.onChange('memberId', undefined);
          props.onChange('member', value);
        }}
      />
    </Column>
    <Column size={2}>
      <div style={{ height: 42 }} />
      <Button label="Search" icon="search" onClick={props.onSearch} />
    </Column>
  </Row>
);

MessageListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  filterByStudent: PropTypes.bool,
  fetching: PropTypes.bool,
  onSearch: PropTypes.func,
  errors: PropTypes.object,
  showStatusFilter: PropTypes.bool,
};

MessageListFilter.defaultProps = {
  filterByStudent: false,
  fetching: false,
  showStatusFilter: false,
  onSearch: null,
  errors: {},
};

export default MessageListFilter;
