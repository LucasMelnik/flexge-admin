import { extendObservable, action, toJS } from 'mobx';
import FetchService from '../../../core/services/FetchService';
import { orderBy, uniq, reverse, } from 'lodash';
import colors from '../../../core/chart/colors';

class LoadModuleContentStatsService {
  fetch = new FetchService();

  constructor() {
    extendObservable(this, {
      stats: {
        byGrammar: [],
        byGrammarGroups: [],
        byType: [],
        byTypeGroups: [],
      },
      grammarColors: [],
      itemTypeColors: []
    });
  }

  groupDataByField = (data, field) => orderBy(
    data.reduce((acc, item) => {
      if (acc.some(x => x.id === item[field]['id'])) {
        return acc.map(x => {
          if (x.id === item[field]['id']) {
            return {
              ...x,
              count: x.count + item.count
            };
          }
          return x;
        });
      }
      return [
        ...acc,
        {
          ...item[field],
          count: item.count
        }
      ];
    }, []),
    ['count'],
    ['desc']
  );

  getTopData = (data) => data.length > 6 ? [
    ...data.slice(0, 5),
    data.slice(5).reduce((acc, x) => ({...acc, count: acc.count + x.count, data: [...acc.data, x]}), {
      id: 'others',
      name: 'Others',
      count: 0,
      data: []
    })
  ] : data;


  handleLoad = action((moduleId) => {
    this.fetch.fetch({
      url: `/modules/${moduleId}/content-stats`,
    }).then(action(() => {
      if (this.fetch.data) {
        const data = toJS(this.fetch.data);
        const groups = uniq(data.grammars.map(x => x.id.group)).sort();

        this.grammarColors = data.grammars.map((x, index) => ({
          id: x.grammar.id,
          name: x.grammar.name,
          color: colors[index]
        }));
        this.itemTypeColors = data.itemTypes.map((x, index) => ({id: x.type.id, color: reverse(colors)[index]}));
        this.stats = {
          byGrammar: this.getTopData(this.groupDataByField(data.grammars, 'grammar')),
          byGrammarGroups: groups.map(group => ({
            group,
            data: this.getTopData(this.groupDataByField(data.grammars.filter(x => x.id.group === group), 'grammar'))
          })),
          byType: this.groupDataByField(data.itemTypes, 'type'),
          byTypeGroups: groups.map(group => ({
            group,
            data: this.groupDataByField(data.itemTypes.filter(x => x.id.group === group), 'type')
          })),
        };
      }
    }));
  });
}

export default LoadModuleContentStatsService;
