import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from '../../../../../core/form/Button';
import UnitItemListContainer from './UnitItemListContainer';
import Card from '../../../../../core/layout/Card';
import Breadcrumb from '../../../../../core/layout/Breadcrumb';
import Separator from '../../../../../core/layout/Separator';
import UnitItemCharacterFormContainer from './UnitItemCharacterFormContainer';

const UnitItemListScene = props => (
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
          text: `Unit - ${props.unit.name}`,
          link: `/modules/${props.module.id}/units/${props.unit.id}`,
        },
        {
          text: 'Unit items',
        },
      ]}
    />
    <Card
      title="Items"
      loading={props.fetching}
      actions={
        <div>
          <Button
            icon="arrow-left"
            label="Back"
            onClick={() => browserHistory.push(`/modules/${props.module.id}/details`)}
          />
          {' '}
          {(localStorage.role === 'ADMIN' || props.unit.createdBy === localStorage.id) && (
            <Button
              icon="plus"
              type="primary"
              onClick={() => browserHistory.push(`/modules/${props.module.id}/units/${props.unit.id}/items/new`)}
              label="Add new item"
            />
          )}
        </div>
      }
    >
      {props.unit.id ? (
        <UnitItemListContainer
          unit={props.unit}
        />
      ) : (<div />)}
    </Card>
    <Separator />
    {localStorage.role === 'ADMIN' && (
      <Card title="Set items Character">
        <UnitItemCharacterFormContainer />
      </Card>
    )}
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
