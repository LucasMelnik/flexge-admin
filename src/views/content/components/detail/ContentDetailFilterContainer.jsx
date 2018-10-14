import React, { Component } from 'react';
import { observer } from 'mobx-react';
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
      />
    );
  }
}

export default observer(ContentDetailFilterContainer);
