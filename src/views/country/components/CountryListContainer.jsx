import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import CountryList from './CountryList';
import CountryListService from '../services/CountryListService';

class CountryListContainer extends Component {

  componentDidMount() {
    CountryListService.init();
  }

  render() {
    return (
      <CountryList
        countries={toJS(CountryListService.countries)}
        fetching={CountryListService.fetch.fetching}
      />
    );
  }
}

export default observer(CountryListContainer);
