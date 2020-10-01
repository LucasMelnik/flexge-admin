import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import Separator from '../../../core/layout/Separator';
import ContentChart from './ContentChart';

const ModuleContentStats = props => {

  return (
    <Row>
      <Column size={6}>
        <ContentChart
          title="All units"
          legendPosition="left"
          labels={props.stats.byGrammar.map(g => g.name)}
          colors={props.stats.byGrammar.map(g => get(props.grammarColors.find(x => g.id === x.id), 'color', ''))}
          data={props.stats.byGrammar.map(g => g.count)}
          others={props.stats.byGrammar.find(x => x.id === 'others')}
        />
        <Separator size="sm"/>
        <Row>
          {props.stats.byGrammarGroups.map(item => (
            <Column
              key={item.group}
              size={12 / props.stats.byGrammarGroups.length}
            >
              <ContentChart
                title={`Group ${item.group}`}
                legendPosition="left"
                labels={item.data.map(g => g.name)}
                colors={item.data.map(g => get(props.grammarColors.find(x => g.id === x.id), 'color', ''))}
                data={item.data.map(g => g.count)}
              />
            </Column>
          ))}
        </Row>
      </Column>
      <Column size={6}>
        <ContentChart
          title="All units"
          legendPosition="right"
          labels={props.stats.byType.map(g => g.name)}
          colors={props.stats.byType.map(g => get(props.itemTypeColors.find(x => g.id === x.id), 'color', ''))}
          data={props.stats.byType.map(g => g.count)}
        />
      </Column>
    </Row>
  );
};

ModuleContentStats.propTypes = {
  stats: PropTypes.shape({
    byType: PropTypes.array,
    byGrammar: PropTypes.array,
  })
};

export default ModuleContentStats;
