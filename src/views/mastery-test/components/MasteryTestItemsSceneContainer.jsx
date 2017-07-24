import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MasteryTestItemsScene from './MasteryTestItemsScene';

const MasteryTestItemsSceneContainer = props => (
  <MasteryTestItemsScene masteryTestId={props.masteryTestId} order={props.order} />
);

MasteryTestItemsSceneContainer.propTypes = {
  masteryTestId: PropTypes.string,
  order: PropTypes.number.isRequired,
};

export default observer(MasteryTestItemsSceneContainer);
