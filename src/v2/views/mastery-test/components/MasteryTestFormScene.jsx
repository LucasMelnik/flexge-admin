import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import Button from '../../../core/form/Button';
import MasteryTestFormContainer from './MasteryTestFormContainer';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import Async from '../../../core/layout/Async';
import MasteryTestItems from './MasteryTestItems';
import Separator from '../../../core/layout/Separator';

const MasteryTestFormScene = props => (
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
          text: props.masteryTestId ? 'Edit Mastery Test': 'New Mastery Test',
        }
      ]}
    />
    <Card
      title={props.masteryTestId ? 'Mastery Test informations' : 'New Mastery Test'}
      actions={
        <Button
          label="Back"
          icon="fa-arrow-left"
          onClick={() => hashHistory.push(`/v2/modules/${props.module.id}/details`)}
        />
      }
    >
      <Async fetching={props.fetching}>
        {props.module.id && (
          <MasteryTestFormContainer
            moduleId={props.module.id}
            masteryTestId={props.masteryTestId}
          />
        )}
      </Async>
    </Card>
    <Separator size="md" />
    {(props.module.id && props.masteryTestId) && (
      <MasteryTestItems masteryTestId={props.masteryTestId} />
    )}
  </div>
);

MasteryTestFormScene.propTypes = {
  fetching: PropTypes.bool,
  masteryTestId: PropTypes.string,
  module: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })
};

MasteryTestFormScene.defaultProps = {
  fetching: false,
  masteryTestId: null,
  module: {},
};
export default MasteryTestFormScene;
