import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ItemForm from './ItemForm';
import ItemFormService from '../services/ItemFormService';

class ItemFormContainer extends Component {
  static propTypes = {
    itemsTypeUrl: PropTypes.string.isRequired,
    endpointUrl: PropTypes.string.isRequired,
    timeProperty: PropTypes.string,
    order: PropTypes.number,
    itemId: PropTypes.string,
    defaultGrammar: PropTypes.string,
    disabled: PropTypes.bool,
    isTestItem: PropTypes.bool,
    showPostPhrase: PropTypes.bool,
    onSaveSuccess: PropTypes.func,
  };

  static defaultProps = {
    itemId: null,
    timeProperty: 'defaultTime',
    defaultGrammar: null,
    disabled: false,
    isTestItem: false,
    showPostPhrase: false,
    order: null,
    onSaveSuccess: () => {},
  };

  itemFormService = new ItemFormService(this.props.endpointUrl, this.props.order, this.props.onSaveSuccess, this.props.isTestItem);

  componentWillMount() {
    this.itemFormService.handleLoad(this.props.itemId, this.props.defaultGrammar);
  }

  render() {
    return (
      <ItemForm
        onSubmit={this.itemFormService.handleSubmit}
        setValidationsByItemType={this.itemFormService.setValidationsByItemType}
        onChange={this.itemFormService.form.setValue}
        onReset={this.itemFormService.form.reset}
        values={this.itemFormService.form.getValues()}
        errors={this.itemFormService.form.errors}
        isDirty={this.itemFormService.form.isDirty}
        submitting={this.itemFormService.submit.fetching}
        error={this.itemFormService.submit.error}
        fetching={this.itemFormService.fetch.fetching}
        itemsTypeUrl={this.props.itemsTypeUrl}
        disabled={this.props.disabled}
        isTestItem={this.props.isTestItem}
        showPostPhrase={this.props.showPostPhrase}
        defaultGrammar={this.props.defaultGrammar}
        timeProperty={this.props.timeProperty}
      />
    );
  }
}

export default observer(ItemFormContainer);
