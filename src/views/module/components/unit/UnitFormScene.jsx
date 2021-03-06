import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import get from 'lodash/get';
import UnitFormContainer from './UnitFormContainer';
import Button from '../../../../core/form/Button';
import Card from '../../../../core/layout/Card';
import Breadcrumb from '../../../../core/layout/Breadcrumb';
import MoveUnitFormContainer from './MoveUnitFormContainer';
import Separator from '../../../../core/layout/Separator';
import { Roles } from '../../../../core/util';

const UnitFormScene = props => (
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
          link: `/modules/${props.module.id}/details`,
        },
        {
          text: props.unitId ? 'Edit Unit' : 'New Unit',
        },
      ]}
    />
    <Card
      loading={props.fetching || !props.module.id}
      title={props.unitId ? 'Edit Unit' : 'New unit'}
      actions={
        <Button
          icon="arrow-left"
          label="back"
          onClick={() => browserHistory.push(`/modules/${props.module.id}/details`)}
        />
      }
    >
      <UnitFormContainer
        unitId={props.unitId}
        moduleId={props.module.id}
        courseId={props.module.course.id}
        academicPlanId={get(props.module, 'academicPlan.id', '')}
      />
    </Card>
    {(localStorage.role === Roles.ADMIN && props.unitId) && (
      <div>
        <Separator />
        <Card title="Move Unit to other Course/Module">
          <MoveUnitFormContainer
            unitId={props.unitId}
            moduleId={props.module.id}
          />
        </Card>
      </div>
    )}
  </div>
);

UnitFormScene.propTypes = {
  fetching: PropTypes.bool,
  unitId: PropTypes.string,
  module: PropTypes.object,
};
UnitFormScene.defaultProps = {
  fetching: false,
  unitId: null,
  module: {},
};

export default UnitFormScene;
