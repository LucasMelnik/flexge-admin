import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import RangeDateInput from '../../../../core/form/RangeDateInput';
import Button from '../../../../core/form/Button';
import Separator from '../../../../core/layout/Separator';

const StudentRecordListFilter = props => (
  <Row>
    <Column size={1}>
      <Separator size="md" />
      <Button
        label="Current Week"
        type={!props.values.isCustomPeriod ? 'primary' : 'default'}
        onClick={() => {
          props.onChange('isCustomPeriod', false);
          props.onChange('studiedTime', []);
          props.onFilter();
        }}
      />
    </Column>
    <Column size={3}>
      <RangeDateInput
        label="Custom Period"
        onChange={(dates) => {
          props.onChange('studiedTime', dates);
          props.onChange('isCustomPeriod', true);
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
    isCustomPeriod: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default StudentRecordListFilter;
