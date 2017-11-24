import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Separator from '../../../core/layout/Separator';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import MasteryTestListContainer from '../../mastery-test/components/MasteryTestListContainer';
import UnitListContainer from './unit/UnitListContainer';
import UnitListFilterContainer from './unit/UnitListFilterContainer';

const ModuleDetailScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        {
          text: `Course - ${props.module.course.name}`,
          link: '/modules',
        },
        {
          text: `Module - ${props.module.name}`,
          link: `/modules/${props.module.id}`,
        },
      ]}
    />
    {props.module.educationGoal && (
      <Card title="Educational Goal">
        <p>{props.module.educationGoal}</p>
      </Card>
    )}
    <Card
      title="Mastery test"
      loading={props.fetching}
      actions={
        <Button
          type="primary"
          icon="plus"
          onClick={() => browserHistory.push(`/modules/${props.module.id}/mastery-tests/new`)}
          label="New Mastery Test"
        />
      }
    >
      {props.module.id ? (
        <MasteryTestListContainer
          moduleId={props.module.id}
        />
      ) : (<div />)}
    </Card>
    <Separator size="md" />
    <Card
      title="Units"
      loading={props.fetching}
      actions={
        <Button
          type="primary"
          icon="plus"
          onClick={() => browserHistory.push(`/modules/${props.module.id}/units/new`)}
          label="New Unit"
        />
      }
    >
      <UnitListFilterContainer />
      {props.module.id && (
        <UnitListContainer moduleId={props.module.id} />
      )}
    </Card>
  </div>
);

ModuleDetailScene.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    educationGoal: PropTypes.string,
    course: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  fetching: PropTypes.bool.isRequired,
};

ModuleDetailScene.defaultProps = {
  module: {
    course: {},
  },
};

export default ModuleDetailScene;
