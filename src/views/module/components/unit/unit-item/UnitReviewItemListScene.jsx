import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from '../../../../../core/form/Button';
import UnitItemListContainer from './UnitItemListContainer';
import Card from '../../../../../core/layout/Card';
import Breadcrumb from '../../../../../core/layout/Breadcrumb';
import Separator from '../../../../../core/layout/Separator';
import AllUnitItemListFilterContainer from './AllUnitItemListFilterContainer';
import AllUnitItemListContainer from './AllUnitItemListContainer';

const UnitReviewItemListScene = props => (
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
          text: `Review Unit - ${props.unit.name}`,
          link: `/modules/${props.module.id}/units/${props.unit.id}`,
        },
        {
          text: 'Review items',
        },
      ]}
    />
    <Card
      title="Items in unit"
      loading={props.fetching}
      actions={
        <div>
          <Button
            icon="arrow-left"
            label="Back"
            onClick={() => browserHistory.push(`/modules/${props.module.id}/details`)}
          />
        </div>
      }
    >
      {props.unit.id ? (
        <UnitItemListContainer
          unit={props.unit}
        />
      ) : (<div />)}
    </Card>
    <Separator size="md" />
    <Card
      title="Available items"
      loading={props.fetching}
    >
      {props.unit.id && (
        <div>
          <AllUnitItemListFilterContainer />
          <Separator />
          <AllUnitItemListContainer
            unit={props.unit}
            moduleId={props.module.id}
          />
        </div>
      )}
    </Card>
  </div>
);

UnitReviewItemListScene.propTypes = {
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

UnitReviewItemListScene.defaultProps = {
  unit: {
    module: {},
  },
  module: {
    course: {},
  },
  fetching: false,
};

export default UnitReviewItemListScene;
