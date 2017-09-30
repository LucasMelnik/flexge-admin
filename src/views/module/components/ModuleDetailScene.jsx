import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Separator from '../../../core/layout/Separator';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import MasteryTestListContainer from '../../mastery-test/components/MasteryTestListContainer';
import Async from '../../../core/layout/Async';
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
        }
      ]}
    />
    <Card
      title="Mastery test"
      actions={
        <Button
          icon="fa-plus"
          onClick={() => browserHistory.push(`/modules/${props.module.id}/mastery-tests/new`)}
          label="New Mastery Test"
        />
      }
    >
      <Async fetching={props.fetching}>
        {props.module.id && (
          <MasteryTestListContainer
            moduleId={props.module.id}
          />
        )}
      </Async>
    </Card>
    <Separator size="md" />
    <Card
      title="Units"
      actions={
        <Button
          icon="fa-plus"
          onClick={() => browserHistory.push(`/modules/${props.module.id}/units/new`)}
          label="New Unit"
        />
      }
    >
      <Async fetching={props.fetching}>
        <UnitListFilterContainer />
        {props.module.id && (
          <UnitListContainer moduleId={props.module.id} />
        )}
      </Async>
    </Card>
  </div>
);

ModuleDetailScene.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  fetching: PropTypes.bool.isRequired,
};

ModuleDetailScene.defaultProps = {
  module: {},
};

export default ModuleDetailScene;
