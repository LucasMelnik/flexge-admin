import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import RangeDateInput from '../../../../core/form/RangeDateInput';

const StudentRecordListFilter = props => (
  <Row>
    <Column size={4}>
      <RangeDateInput
        label="Studied Time"
        ranges={{
          'Current Week': [moment().startOf('isoWeeks'), moment().endOf('isoWeeks')],
          'Last Week': [moment().subtract(1, 'weeks').startOf('isoWeeks'), moment().subtract(1, 'weeks').endOf('isoWeeks')],
        }}
        onChange={(dates) => {
          props.onChange('studiedTime', dates);
          props.onFilter();
        }}
        placeholder={['From', 'To']}
        value={props.values.studiedTime}
      />
    </Column>
  </Row>
);

StudentRecordListFilter.propTypes = {
  values: PropTypes.shape({
    studiedTime: PropTypes.array,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default StudentRecordListFilter;
