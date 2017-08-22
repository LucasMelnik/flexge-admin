import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from '../../../../../core/form/Button';
import UnitItemListContainer from './UnitItemListContainer';
import Card from '../../../../../core/layout/Card';
import Breadcrumb from '../../../../../core/layout/Breadcrumb';
import Async from '../../../../../core/layout/Async';

const UnitItemListScene = props => (
  <div>
    <Breadcrumb
      fetching={props.fetching}
      crumbs={[
        {
          text: `Course - ${props.module.course.name}`,
          link: '/v2/modules',
        },
        {
          text: `Module - ${props.module.name}`,
          link: `/v2/modules/${props.module.id}/details`,
        },
        {
          text: `Unit - ${props.unit.name}`,
          link: `/v2/modules/${props.module.id}/units/${props.unit.id}`,
        },
        {
          text: 'Unit items',
        }
      ]}
    />
    <Card
      title="Items"
      actions={
        <div>
          <Button
            icon="fa-arrow-left"
            label="Back"
            onClick={() => browserHistory.push(`/v2/modules/${props.moduleId}/details`)}
          />
          {' '}
          {(localStorage.role === 'ADMIN' || props.unit.createdBy === localStorage.id) && (
            <Button
              icon="fa-plus"
              type="primary"
              onClick={() => browserHistory.push(`/v2/modules/${props.moduleId}/units/${props.unitId}/items/new`)}
              label="Add new item"
            />
          )}
        </div>
      }
    >
      <Async fetching={props.fetching}>
        {props.unit.id && (
          <UnitItemListContainer
            unit={props.unit}
          />
        )}
      </Async>
    </Card>
  </div>
);

UnitItemListScene.propTypes = {
  unit: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    createdBy: PropTypes.string,
    module: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  module: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    course: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
  fetching: PropTypes.bool,
};

UnitItemListScene.defaultProps = {
  unit: {
    module: {},
  },
  module: {
    course: {},
  },
  fetching: false,
};

export default UnitItemListScene;
