import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import StudentFormContainer from './StudentFormContainer';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';

const StudentFormScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        ...(props.distributor && props.distributor.name) ? [
          {
            text: 'Distributors',
            link: '/distributors',
          },
          {
            text: `Distributor - ${props.distributor.name}`,
            link: `/distributors/${props.distributor.id}/details`,
          },
        ] : [],
        ...(props.company && props.company.name) ? [
          {
            text: 'Companies',
            link: '/companies',
          },
          {
            text: `Company - ${props.company.name}`,
            link: `/companies/${props.company.id}/details`,
          },
        ] : [],
        {
          text: 'Schools',
          link: '/schools',
        },
        {
          text: `School - ${props.school.name}`,
          link: `/schools/${props.school.id}/details`,
        },
        {
          text: `Class - ${props.class.name}`,
        },
        {
          text: props.studentId ? 'Update Student' : 'Create Student',
        },
      ]}
    />
    <Card
      title={props.studentId ? 'Update Student' : 'Create Student'}
      loading={props.fetching || !props.class.id || !props.school.id}
      actions={
        (
          <Button
            icon="arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.goBack()}
          />
        )
      }
    >
      <StudentFormContainer
        studentId={props.studentId}
        classId={props.class.id}
        schoolId={props.school.id}
      />
    </Card>
  </div>
);

StudentFormScene.propTypes = {
  fetching: PropTypes.bool.isRequired,
  distributor: PropTypes.object,
  company: PropTypes.object,
  school: PropTypes.object,
  class: PropTypes.object,
  studentId: PropTypes.string,
};

StudentFormScene.defaultProps = {
  studentId: null,
  distributor: {},
  company: {},
  school: {},
  class: {},
};

export default StudentFormScene;
