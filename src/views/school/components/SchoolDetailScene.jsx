import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import SchoolClassListFilterContainer from '../../school-class/components/SchoolClassListFilterContainer';
import SchoolClassFileImportContainer from '../../school-class/components/SchoolClassFileImportContainer';
import SchoolClassListContainer from '../../school-class/components/SchoolClassListContainer';

const SchoolDetailScene = props => (
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
        },
      ]}
    />
    <Card
      title="Classes"
      loading={props.fetching}
      actions={
        <div>
          <Button
            type="primary"
            label="New class"
            icon="plus"
            onClick={() => browserHistory.push(`${props.baseUrl}/classes/new`)}
          />
          {' '}
          {props.school.id && (<SchoolClassFileImportContainer schoolId={props.school.id} />)}
        </div>
      }
    >
      <SchoolClassListFilterContainer />
      {props.school.id && (
        <SchoolClassListContainer
          baseUrl={props.baseUrl}
          schoolId={props.school.id}
        />
      )}
    </Card>
  </div>
);

SchoolDetailScene.propTypes = {
  fetching: PropTypes.bool.isRequired,
  baseUrl: PropTypes.string.isRequired,
  distributor: PropTypes.object,
  company: PropTypes.object,
  school: PropTypes.object,
};

SchoolDetailScene.defaultProps = {
  distributor: {},
  company: {},
  school: {},
};

export default SchoolDetailScene;
