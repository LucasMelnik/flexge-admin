import React from 'react';
import PropTypes from 'prop-types';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Card from '../../../core/layout/Card';
import SchoolEvaluationFilterContainer from './SchoolEvaluationFilterContainer';
import Separator from '../../../core/layout/Separator';
import SchoolEvaluationListContainer from './SchoolEvaluationListContainer';
import SchoolEvaluationFormContainer from './SchoolEvaluationFormContainer';

const SchoolEvaluationScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        {
          text: 'School Evaluation Period',
        },
      ]}
    />
    <Card
      title="Evaluation Period Year"
    >
      <SchoolEvaluationFilterContainer />
    </Card>
    <Separator />
    {(props.selectedYear && props.schoolId) && (
      <Card title="Add an Evaluation period">
        <SchoolEvaluationFormContainer
          schoolId={props.schoolId}
          selectedYear={props.selectedYear}
        />
      </Card>
    )}
    <Separator />
    {(props.selectedYear && props.schoolId) && (
      <Card title="Evaluations Periods">
        <SchoolEvaluationListContainer />
      </Card>
    )}
  </div>
);

SchoolEvaluationScene.propTypes = {
  fetching: PropTypes.bool.isRequired,
  schoolId: PropTypes.string,
  selectedYear: PropTypes.number,
};

SchoolEvaluationScene.defaultProps = {
  selectedYear: null,
  schoolId: null,
};

export default SchoolEvaluationScene;
