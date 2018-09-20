import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import RangeDateInput from '../../../../core/form/RangeDateInput';

const StudentDetailDateRecordListFilter = props => (
  <Row>
    <Column size={3}>
      <RangeDateInput
        allowClear={false}
        label="Custom Period"
        placeholder={['From', 'To']}
        value={get(props.values, 'period', [])}
        onChange={(dates) => {
          props.onChange('period', dates);
          props.onFilter();
        }}
      />
    </Column>
  </Row>
);

StudentDetailDateRecordListFilter.propTypes = {
  values: PropTypes.shape({
    period: PropTypes.array,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default StudentDetailDateRecordListFilter;
