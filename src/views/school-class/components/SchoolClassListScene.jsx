import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import SchoolClassListFilterContainer from './SchoolClassListFilterContainer';
import SchoolClassListContainer from './SchoolClassListContainer';
import SchoolClassFileImportContainer from './SchoolClassFileImportContainer';

const SchoolClassListScene = props => (
  <div>
    <Breadcrumb
      crumbs={[
        {
          text: 'Classes',
        },
      ]}
    />
    <Card
      loading={!props.school._id}
      title="Classes"
      actions={localStorage.role !== 'TEACHER' &&
        <div>
          <Button
            type="primary"
            label="New class"
            icon="plus"
            onClick={() => browserHistory.push('classes/new')}
          />
          {' '}
          {props.school._id && (<SchoolClassFileImportContainer schoolId={props.school._id} />)}
        </div>
      }
    >
      <SchoolClassListFilterContainer />
      <SchoolClassListContainer
        baseUrl=""
        schoolId={props.school._id}
      />
    </Card>
  </div>
);

SchoolClassListScene.propTypes = {
  school: PropTypes.shape({
    _id: PropTypes.string,
  }).isRequired,
};

export default SchoolClassListScene;
