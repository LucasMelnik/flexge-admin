import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import uniq from 'lodash/uniq';
import ContentItemListService from '../../services/ContentItemListService';
import ContentDetailFilter from './ContentDetailFilter';

class ContentDetailFilterContainer extends Component {
  render() {
    return (
      <ContentDetailFilter
        fetching={ContentItemListService.fetch.fetching}
        onChange={ContentItemListService.form.setValue}
        values={ContentItemListService.form.getValues()}
        onFilter={ContentItemListService.handleFilterChange}
        availableTypes={uniq(toJS(ContentItemListService.unitItems).map(unitItem => unitItem.group))}
      />
    );
  }
}

export default observer(ContentDetailFilterContainer);
