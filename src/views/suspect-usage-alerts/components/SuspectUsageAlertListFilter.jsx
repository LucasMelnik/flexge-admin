import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import FetchSelect from '../../../core/form/FetchSelect';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Button from '../../../core/form/Button';
import Select from '../../../core/form/Select';
import RangeDateInput from '../../../core/form/RangeDateInput';
import StudentRecordSelectContainer from '../../message/components/StudentRecordSelectContainer';

const SuspectUsageAlertListFilter = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column size={1.5}>
        <Select
          label="Filter Type"
          required
          disabled={props.fetching}
          value={get(props.values, 'filterType', '')}
          onChange={value => props.onChange('filterType', value)}
          options={[
            {
              label: 'All',
              value: 'all'
            },
            {
              label: 'Only pending',
              value: 'pending'
            },
            {
              label: 'Only resolved',
              value: 'reviewed'
            },
          ]}
          errorText={get(props.errors, 'filterType', '')}
        />
      </Column>
      <Column size={2.5}>
        <RangeDateInput
          label="Studied Period"
          disabled={props.fetching}
          onChange={(dates) => {
            props.onChange('from', dates[0]);
            props.onChange('to', dates[1]);
          }}
          placeholder={['From', 'To']}
          value={[get(props.values, 'from', undefined), get(props.values, 'to', undefined)]}
        />
      </Column>
      <Column size={2.5}>
        <StudentRecordSelectContainer
          disabled={props.fetching}
          value={get(props.values, 'student', get(props.values, 'studentSearch', ''))}
          onSelect={value => {
            props.onChange('student', value);
            props.onChange('studentSearch', undefined);
          }}
          onChange={value => {
            props.onChange('student', undefined);
            props.onChange('studentSearch', value);
          }}
        />
      </Column>
      {(localStorage.role === 'ADMIN' || localStorage.role === 'DISTRIBUTOR_MANAGER' || localStorage.role === 'COMPANY_MANAGER') && (
        <Column size={2}>
          <FetchSelect
            isPaginated
            showSearch
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
      )}
      {!!get(props.values, 'school', undefined) && (
        <Column size={2}>
          <FetchSelect
            showSearch
            isPaginated
            url={`/schools/${props.values.school}/classes`}
            label="Class rooms"
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
      <Column size={1.5}>
        <div style={{ height: 42 }} />
        <Button
          disabled={props.fetching}
          icon="search"
          buttonType="submit"
          label="Search"
        />
      </Column>
    </Row>
  </form>
);

SuspectUsageAlertListFilter.propTypes = {
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fetching: PropTypes.bool,
};

SuspectUsageAlertListFilter.defaultProps = {
  fetching: false,
};

export default SuspectUsageAlertListFilter;
