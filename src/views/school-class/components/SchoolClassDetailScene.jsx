import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import StudentListContainer from '../../student/components/StudentListContainer';
import Button from '../../../core/form/Button';
import StudentListFilterContainer from '../../student/components/StudentListFilterContainer';

const SchoolClassDetailScene = props => (
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
      ]}
    />
    <Card
      title="Students"
      loading={props.fetching || !props.school.id || !props.class.id}
      actions={
        <div>
          <Button
            type="primary"
            label="New Student"
            icon="plus"
            onClick={() => browserHistory.push(`${props.baseUrl}/students/new`)}
          />
        </div>
      }
    >
      <StudentListFilterContainer allowedFilters={['status', 'id', 'name', 'email']} />
      <StudentListContainer
        editable
        baseUrl={props.baseUrl}
        schoolId={props.school.id}
        classId={props.class.id}
      />
    </Card>
  </div>
);

SchoolClassDetailScene.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
  distributor: PropTypes.object,
  company: PropTypes.object,
  school: PropTypes.object,
  class: PropTypes.object,
};

SchoolClassDetailScene.defaultProps = {
  distributor: {},
  company: {},
  school: {},
  class: {},
};

export default SchoolClassDetailScene;
