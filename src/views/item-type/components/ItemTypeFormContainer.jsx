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

  componentWillMount() {
    ItemTypeFormService.handleLoad(this.props.itemTypeId);
  }

  render() {
    return (
      <ItemTypeForm
        onSubmit={ItemTypeFormService.handleSubmit}
        onChange={ItemTypeFormService.form.setValue}
        onReset={ItemTypeFormService.form.reset}
        values={ItemTypeFormService.form.getValues()}
        errors={ItemTypeFormService.form.errors}
        submitting={ItemTypeFormService.fetch.fetching}
        error={ItemTypeFormService.submit.error}
        isDirty={ItemTypeFormService.form.isDirty}
      />
    );
  }
}

export default observer(ItemTypeFormContainer);
