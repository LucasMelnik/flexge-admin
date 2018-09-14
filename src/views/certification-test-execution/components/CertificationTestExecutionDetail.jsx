import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import moment from 'moment';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import TextEditor from '../../../core/form/TextEditor';
import Tag from '../../../core/layout/Tag';

const CertificationTestExecutionDetail = props => (
  <form>
    <Row>
      <Column size={1}>
        <TextInput
          disabled
          label="Course"
          value={get(props.values, 'course.name', '')}
        />
      </Column>
      <Column size={3}>
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
      {props.values.failedAt && (
        <Column size={2}>
          <div style={{ height: 33 }} />
          <Tag color="red">Failed - {moment(props.values.failedAt).format('DD/MM/YYYY HH:mm')}</Tag>
        </Column>
      )}
      {props.values.approvedAt && (
        <Column size={2}>
          <div style={{ height: 33 }} />
          <Tag color="green">Approved - {moment(props.values.approvedAt).format('DD/MM/YYYY HH:mm')}</Tag>
        </Column>
      )}
    </Row>
    {props.values.reviewedAt && (
      <Row>
        <Column size={3}>
          <TextInput
            disabled
            label="Reading Score"
            value={get(props.values, 'readingScore', '')}
          />
        </Column>
        <Column size={3}>
          <TextInput
            disabled
            label="Listening Score"
            value={get(props.values, 'listeningScore', '')}
          />
        </Column>
        <Column size={3}>
          <TextInput
            disabled
            label="Writing Score"
            value={get(props.values, 'writingScore', '')}
          />
        </Column>
        <Column size={3}>
          <TextInput
            disabled
            label="Speaking Score"
            value={get(props.values, 'speakingScore', '')}
          />
        </Column>
      </Row>
    )}
    {props.values.reviewedAt && (
      <Row>
        <Column size={12}>
          <TextEditor
            readOnly
            value={get(props.values, 'comments', '')}
            placeholder="Comments"
            style={{
              height: 160,
              paddingBottom: 60,
            }}
          />
        </Column>
      </Row>
    )}
  </form>
);

CertificationTestExecutionDetail.propTypes = {
  values: PropTypes.object,
};

CertificationTestExecutionDetail.defaultProps = {
  values: {},
};

export default CertificationTestExecutionDetail;
