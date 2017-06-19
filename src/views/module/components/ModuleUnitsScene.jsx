import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import InlineBlock from 'jsxstyle/InlineBlock';
import Title from '../../../core/content/Title';
import Spinner from '../../../core/content/Spinner';
import Separator from '../../../core/layout/Separator';
import FloatActionButton from '../../../core/form/FloatActionButton';
import Button from '../../../core/form/Button';
import UnitListContainer from './unit/UnitListContainer';

const ModuleUnitsScene = props => (
  <div>
    <InlineBlock>
      <Title>
        List of units from:
        {' '}
        {props.fetching ? (
          <InlineBlock>
            <Spinner size={20} />
          </InlineBlock>
        ) : (
          <InlineBlock>
            {props.module.name}
            <Button
              style={{ marginleft: 20 }}
              primary
              onClick={ () => browserHistory.push(`/modules/${props.module.id}/units/new`)}
              label="Add new unit"
            />
          </InlineBlock>
        )}
      </Title>
    </InlineBlock>
    <FloatActionButton
      secondary
      icon="arrow_back"
      style={{
        position: 'relative',
        float: 'right',
        top: 20,
        right: 20,
      }}
      onClick={() => browserHistory.push('/modules/')}
    />
    <Separator />
    {props.module.id && (
      <UnitListContainer moduleId={props.module.id} />
    )}
  </div>
);

ModuleUnitsScene.propTypes = {
  module: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  fetching: PropTypes.bool,
};

ModuleUnitsScene.defaultProps = {
  module: {},
  fetching: false,
};

export default ModuleUnitsScene;
