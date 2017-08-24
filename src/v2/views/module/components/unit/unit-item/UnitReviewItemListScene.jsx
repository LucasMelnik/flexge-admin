import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import Button from '../../../../../core/form/Button';
import UnitItemListContainer from './UnitItemListContainer';
import Card from '../../../../../core/layout/Card';
import Breadcrumb from '../../../../../core/layout/Breadcrumb';
import Async from '../../../../../core/layout/Async';
import Separator from '../../../../../core/layout/Separator';
import AllUnitItemListFilterContainer from './AllUnitItemListFilterContainer';
import AllUnitItemListContainer from './AllUnitItemListContainer';

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
          text: `Review Unit - ${props.unit.name}`,
          link: `/v2/modules/${props.module.id}/units/${props.unit.id}`,
        },
        {
          text: 'Review items',
        }
      ]}
    />
    <Card
      title="Items in unit"
      actions={
        <div>
          <Button
            icon="fa-arrow-left"
            label="Back"
            onClick={() => hashHistory.push(`/v2/modules/${props.moduleId}/details`)}
          />
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
    <Separator size="md" />
    <Card
      title="Available items"
    >
      <Async fetching={props.fetching}>
        {props.unit.id && (
          <div>
            <AllUnitItemListFilterContainer />
            <Separator />
            <AllUnitItemListContainer
              unit={props.unit}
              moduleId={props.moduleId}
            />
          </div>
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
