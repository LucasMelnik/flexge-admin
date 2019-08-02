import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import DocumentList from './DocumentList';
import DocumentListService from '../services/DocumentListService';

class DocumentListContainer extends Component {

  componentDidMount() {
    DocumentListService.init();
  }

  render() {
    return (
      <DocumentList
        documents={toJS(DocumentListService.documents)}
        fetching={DocumentListService.fetch.fetching}
        onDelete={DocumentListService.handleRemove}
      />
    );
  }
}

export default observer(DocumentListContainer);
