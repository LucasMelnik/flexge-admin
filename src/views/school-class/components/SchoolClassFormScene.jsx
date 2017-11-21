import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import SchoolClassFormContainer from './SchoolClassFormContainer';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';

const SchoolClassFormScene = props => (
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
          text: `${props.classId ? 'Update Class' : 'Create Class'}`,
        },
      ]}
    />
    <Card
      title={props.classId ? 'Update Class' : 'Create Class'}
      loading={props.fetching}
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
      {props.school.id ? (
        <SchoolClassFormContainer
          schoolId={props.school.id}
          classId={props.classId}
        />
      ) : (<div />)}
    </Card>
  </div>
);

SchoolClassFormScene.propTypes = {
  fetching: PropTypes.bool.isRequired,
  classId: PropTypes.string,
  company: PropTypes.object,
  distributor: PropTypes.object,
  school: PropTypes.object,
};

SchoolClassFormScene.defaultProps = {
  classId: null,
  company: {},
  distributor: {},
  school: {},
};

export default SchoolClassFormScene;
