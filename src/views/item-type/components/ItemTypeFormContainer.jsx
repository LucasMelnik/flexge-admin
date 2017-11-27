import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ItemTypeForm from './ItemTypeForm';
import ItemTypeFormService from '../services/ItemTypeFormService';

class ItemTypeFormContainer extends Component {

  static propTypes = {
    itemTypeId: PropTypes.string,
  };

  static defaultProps = {
    itemTypeId: null,
  };

  itemTypeFormService = new ItemTypeFormService();
  componentWillMount() {
    this.itemTypeFormService.handleLoad(this.props.itemTypeId);
  }

  render() {
    return (
      <ItemTypeForm
        onSubmit={this.itemTypeFormService.handleSubmit}
        onChange={this.itemTypeFormService.form.setValue}
        onReset={this.itemTypeFormService.form.reset}
        values={this.itemTypeFormService.form.getValues()}
        errors={this.itemTypeFormService.form.errors}
        submitting={this.itemTypeFormService.submit.fetching}
        error={this.itemTypeFormService.submit.error}
        isDirty={this.itemTypeFormService.form.isDirty}
      />
    );
  }
}

export default observer(ItemTypeFormContainer);
