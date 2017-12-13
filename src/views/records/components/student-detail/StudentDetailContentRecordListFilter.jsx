import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import FetchSelect from '../../../../core/form/FetchSelect';

const StudentDetailContentRecordListFilter = props => (
  <Row>
    <Column size={6}>
      <FetchSelect
        defaultSelect
        label="Select the Course"
        value={props.course}
        url={`students/${props.studentId}/courses`}
        onChange={value => props.onFilter(value)}
        resultTransformer={{
          text: 'course.name',
          value: 'course.id',
        }}
      />
    </Column>
  </Row>
);

StudentDetailContentRecordListFilter.propTypes = {
  studentId: PropTypes.string.isRequired,
  onFilter: PropTypes.func.isRequired,
  course: PropTypes.string,
};

StudentDetailContentRecordListFilter.defaultProps = {
  course: null,
};

export default StudentDetailContentRecordListFilter;
