import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Button from '../../../core/form/Button';
import MasteryTestFormContainer from './MasteryTestFormContainer';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';
import MasteryTestItems from './MasteryTestItems';
import Separator from '../../../core/layout/Separator';
import ReviewFormControlBar from './ReviewFormControlBar';

const MasteryTestFormScene = props => (
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
          text: props.masteryTestId ? 'Edit Mastery Test' : 'New Mastery Test',
        },
      ]}
    />
    <Card
      title={props.masteryTestId ? 'Mastery Test informations' : 'New Mastery Test'}
      loading={props.fetching}
      actions={
        <Button
          label="Back"
          icon="arrow-left"
          onClick={() => browserHistory.push(`/modules/${props.module.id}/details`)}
        />
      }
    >
      {props.module.id ? (
        <MasteryTestFormContainer
          moduleId={props.module.id}
          masteryTestId={props.masteryTestId}
        />
      ) : (<div />)}
    </Card>
    <Separator size="md" />
    {(props.module.id && props.masteryTestId) && (
      <MasteryTestItems masteryTestId={props.masteryTestId} />
    )}
    {(props.module.id && props.masteryTestId) && (
      <ReviewFormControlBar
        masteryTestId={props.masteryTestId}
        moduleId={props.module.id}
      />
    )}
  </div>
);

MasteryTestFormScene.propTypes = {
  fetching: PropTypes.bool,
  masteryTestId: PropTypes.string,
  module: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    course: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

MasteryTestFormScene.defaultProps = {
  fetching: false,
  masteryTestId: null,
  module: {
    course: {},
  },
};
export default MasteryTestFormScene;
