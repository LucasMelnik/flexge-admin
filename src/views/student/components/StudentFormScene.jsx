import React from 'react';
import PropTypes from 'prop-types';
import {browserHistory} from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import StudentFormContainer from './StudentFormContainer';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import StudentResetButtonContainer from './StudentResetButtonContainer';
import ColumnSeparator from '../../../core/layout/ColumnSeparator';
import StudentSendWelcomeEmailButtonContainer from './StudentSendWelcomeEmailButtonContainer';
import Separator from '../../../core/layout/Separator';
import ParentScene from './parent/ParentScene';
import PaymentListContainer from '../../payment/components/PaymentListContainer';
import { Roles } from '../../../core/util';

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
          <div>
            {[Roles.ADMIN, Roles.SUPPORT, Roles.DISTRIBUTOR_MANAGER].some(r => r === localStorage.role) && props.studentId && ([
              <StudentResetButtonContainer studentId={props.studentId} key="reset-student" />,
              <ColumnSeparator key="separator-pt" size="xs" />,
            ])}
            {props.studentId && ([
              <StudentSendWelcomeEmailButtonContainer studentId={props.studentId} key="send-welcome" />,
              <ColumnSeparator key="separator-email" size="xs" />,
            ])}
            <Button
              icon="arrow-left"
              label="Back"
              type="default"
              onClick={() => browserHistory.goBack()}
            />
          </div>
        )
      }
    >
      <StudentFormContainer
        studentId={props.studentId}
        classId={props.class.id}
        schoolId={props.school.id}
        academicPlanId={props.class.academicPlan}
        locale={props.locale}
      />
    </Card>
    <Separator size="sm" />
    {props.studentId && (
      <React.Fragment>
        <ParentScene
          studentId={props.studentId}
        />
        <Separator />
        {[Roles.ADMIN, Roles.SUPPORT].some(r => r === localStorage.role) && (
          <Card title="Payments">
            <PaymentListContainer studentId={props.studentId} />
          </Card>
        )}
      </React.Fragment>
    )}
  </div>
);

StudentFormScene.propTypes = {
  fetching: PropTypes.bool.isRequired,
  distributor: PropTypes.object,
  company: PropTypes.object,
  school: PropTypes.object,
  class: PropTypes.object,
  locale: PropTypes.string,
  studentId: PropTypes.string,
};

StudentFormScene.defaultProps = {
  studentId: null,
  distributor: {},
  company: {},
  school: {},
  class: {},
  locale: null,
};

export default StudentFormScene;
