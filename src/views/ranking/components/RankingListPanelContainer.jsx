import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import { observer } from 'mobx-react';
import RankingListFilterService from '../services/RankingListFilterService';
import RankingListPanel from './RankingListPanel';

const format = 'YYYY-MM-DD HH:mm:ss';

const getFrom = (type) => {
  if (type === 'month') {
    return moment().startOf('month').format(format);
  } else if (type === 'semester') {
    if (moment().month() <= 6) {
      return moment().startOf('year').format(format);
    }
    return moment().month(6).startOf('month').format(format);
  } else if (type === 'year') {
    return moment().startOf('year').format(format);
  } else if (type === 'all') {
    return moment().year(2017).startOf('year').format(format);
  }
  return null;
};

const getTo = (type) => {
  if (type === 'month') {
    return moment().endOf('month').format(format);
  } else if (type === 'semester') {
    if (moment().month() <= 6) {
      return moment().month(5).endOf('month').format(format);
    }
    return moment().endOf('year').format(format);
  } else if (type === 'year') {
    return moment().endOf('year').format(format);
  } else if (type === 'all') {
    return moment().endOf('year').format(format);
  }
  return null;
};

const RankingListPanelContainer = props => (
  <RankingListPanel
    school={RankingListFilterService.schoolId}
    from={getFrom(props.type)}
    to={getTo(props.type)}
  />
);

RankingListPanelContainer.propTypes = {
  type: PropTypes.oneOf(['month', 'semester', 'year', 'all']).isRequired,
};

export default observer(RankingListPanelContainer);
