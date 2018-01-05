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
          school={props.school}
          from={props.from}
          to={props.to}
          level="regional"
        />
      </Column>
      <Column size={6}>
        <p>National Ranking</p>
        <RankingListContainer
          school={props.school}
          from={props.from}
          to={props.to}
          level="national"
        />
      </Column>
    </Row>
  </Card>
);

RankingListPanel.propTypes = {
  school: PropTypes.string,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

RankingListPanel.defaultProps = {
  school: null,
};

export default RankingListPanel;
