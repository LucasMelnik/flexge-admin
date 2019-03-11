import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Card from '../../../core/layout/Card';
import Button from '../../../core/form/Button';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import SchoolClassListFilterContainer from './SchoolClassListFilterContainer';
import SchoolClassListContainer from './SchoolClassListContainer';

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
      loading={!props.school}
      title="Classes"
      actions={localStorage.role !== 'TEACHER' &&
        <div>
          <Button
            type="primary"
            label="New class"
            icon="plus"
            onClick={() => browserHistory.push('classes/new')}
          />
        </div>
      }
    >
      <SchoolClassListFilterContainer />
      <SchoolClassListContainer
        baseUrl=""
        schoolId={props.school}
      />
    </Card>
  </div>
);

SchoolClassListScene.propTypes = {
  school: PropTypes.string.isRequired,
};

export default SchoolClassListScene;
