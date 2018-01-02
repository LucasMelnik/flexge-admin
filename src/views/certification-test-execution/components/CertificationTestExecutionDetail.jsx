import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import moment from 'moment';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';

const CertificationTestExecutionDetail = props => (
  <form>
    <Row>
      <Column size={2}>
        <TextInput
          disabled
          label="Course"
          value={get(props.values, 'course.name', '')}
        />
      </Column>
      <Column size={6}>
        <TextInput
          label="Student name"
          value={get(props.values, 'student.name', '')}
          disabled
        />
      </Column>
      <Column size={2}>
        <TextInput
          disabled
          label="Started At"
          value={moment(props.values.startedAt).format('DD/MM/YYYY HH:mm')}
        />
      </Column>
      <Column size={2}>
        <TextInput
          disabled
          label="Completed At"
          value={moment(props.values.completedAt).format('DD/MM/YYYY HH:mm')}
        />
      </Column>
    </Row>
  </form>
);

CertificationTestExecutionDetail.propTypes = {
  values: PropTypes.object,
};

CertificationTestExecutionDetail.defaultProps = {
  values: {},
};

export default CertificationTestExecutionDetail;
