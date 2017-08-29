import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import UnitFormContainer from './UnitFormContainer';
import Button from '../../../../core/form/Button';
import Card from '../../../../core/layout/Card';
import Breadcrumb from '../../../../core/layout/Breadcrumb';

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
          text: props.masteryTestId ? 'Edit Mastery Test': 'New Mastery Test',
        }
      ]}
    />
    <Card
      title={props.unitId ? 'Edit Unit' : 'New unit'}
      actions={
        <Button
          icon="fa-arrow-left"
          label="back"
          onClick={() => browserHistory.push(`/modules/${props.moduleId}/details`)}
        />
      }
    >
      <UnitFormContainer
        unitId={props.unitId}
        moduleId={props.moduleId}
      />
    </Card>
  </div>
);

UnitFormScene.propTypes = {
  fetching: PropTypes.bool,
  unitId: PropTypes.string,
  moduleId: PropTypes.string.isRequired,
  module: PropTypes.object,
};
UnitFormScene.defaultProps = {
  fetching: false,
  unitId: null,
  module: {},
};

export default UnitFormScene;
