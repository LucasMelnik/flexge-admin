import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ItemForm from './ItemForm';
import ItemFormService from '../services/ItemFormService';

class ItemFormContainer extends Component {
  static propTypes = {
    itemId: PropTypes.string,
    itemsTypeUrl: PropTypes.string.isRequired,
    endpointUrl: PropTypes.string.isRequired,
    order: PropTypes.number.isRequired,
    showPostPhrase: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    saveItemCallback: PropTypes.func,
  };

  static defaultProps = {
    disabled: false,
    saveItemCallback: null,
    itemId: null,
  };

  itemFormService = new ItemFormService(this.props.endpointUrl, this.props.order);

  componentWillMount() {
    this.itemFormService.handleLoad(this.props.itemId);
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
        showPostPhrase={this.props.showPostPhrase}
        disabled={this.props.disabled}
      />
    );
  }
}

export default observer(ItemFormContainer);
