import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../../core/layout/Card';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import RankingListContainer from './RankingListContainer';

const RankingListPanel = props => (
  <Card>
    <Row>
      <Column size={6}>
        <p>Regional Ranking</p>
        <RankingListContainer
          from={props.from}
          to={props.to}
          level="regional"
          type={props.type}
        />
      </Column>
      <Column size={6}>
        <p>National Ranking</p>
        <RankingListContainer
          from={props.from}
          to={props.to}
          level="national"
          type={props.type}
        />
      </Column>
    </Row>
  </Card>
);

RankingListPanel.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['month', 'semester', 'year', 'all']).isRequired,
};

export default RankingListPanel;
