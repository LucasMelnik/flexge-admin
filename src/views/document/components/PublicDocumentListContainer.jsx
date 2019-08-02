import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import PublicDocumentList from './PublicDocumentList';
import DocumentListService from '../services/DocumentListService';

class PublicDocumentListContainer extends Component {

  componentDidMount() {
    DocumentListService.init();
  }

  render() {
    return (
      <PublicDocumentList
        documents={toJS(DocumentListService.documents)}
        fetching={DocumentListService.fetch.fetching}
      />
    );
  }
}

export default observer(PublicDocumentListContainer);
