import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Separator from '../../../core/layout/Separator';
import Button from '../../../core/form/Button';
import Card from '../../../core/layout/Card';
import Breadcrumb from '../../../core/layout/Breadcrumb';

const ModuleDetailScene = props => (
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
          link: `/v2/modules/${props.module.id}`,
        }
      ]}
    />
    <Card
      title="Mastery test"
      actions={
        <Button
          icon="fa-plus"
          onClick={() => browserHistory.push('/v2/matery-test/new')}
          label="New Mastery Test"
        />
      }
    >
    </Card>
    <Separator size="md" />
    <Card
      title="Units"
      actions={
        <Button
          icon="fa-plus"
          onClick={() => browserHistory.push('/v2/units/new')}
          label="New Unit"
        />
      }
    >
    </Card>
  </div>
);

ModuleDetailScene.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  fetching: PropTypes.bool.isRequired,
};

ModuleDetailScene.defaultProps = {
  module: {},
};

export default ModuleDetailScene;
