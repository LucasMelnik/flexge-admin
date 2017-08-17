import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import SchoolClassDetailFormContainer from './SchoolClassDetailFormContainer';
import StudentListContainer from '../../student/components/StudentListContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';
import Separator from '../../../core/layout/Separator';

const SchoolClassDetailFormScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        // {
        //   text: 'School Classes',
        //   link: `/v2/schools-detail/${props.params.schoolId}`,
        // },
        {
          text: 'Detail Company',
          link: `/v2/companies-detail/${props.params.companyId}`,
        },
        {
          text: 'Detail school',
          link: `/v2/companies/${props.params.companyId}/schools-detail/${props.params.schoolId}`,
        },
        {
          text: 'Detail Class',
        },
      ]}
    />
    <Card
      title="Detail Class"
      actions={
        (
          <Button
            icon="fa-arrow-left"
            label="Back"
            type="default"
            onClick={() => browserHistory.push(`/v2/companies/${props.params.companyId}/schools-detail/${props.params.schoolId}`)}
          />
        )
      }
    >
      <SchoolClassDetailFormContainer
        schoolId={props.params.schoolId}
        classId={props.params.classId}
      />
    </Card>
    <Separator size="md" />
    <Card
      title="Students"
      actions={
        (
          <Button
            icon="fa-plus"
            label="New Student"
            type="default"
            onClick={() => browserHistory.push(`/v2/students/new`)}
          />
        )
      }
    >
      <StudentListContainer />
    </Card>


  </div>
);

SchoolClassDetailFormScene.propTypes = {
  params: PropTypes.shape({
    schoolId: PropTypes.string,
    classId: PropTypes.string,
  }),
};

SchoolClassDetailFormScene.defaultProps = {
  params: null,
};

export default SchoolClassDetailFormScene;
