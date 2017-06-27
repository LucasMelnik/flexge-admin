import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ItemForm from './ItemForm';
import ItemFormService from '../services/ItemFormService';

const ItemFormContainer = props => (
  <ItemForm
    onSubmit={ItemFormService.handleSubmit}
    setValidationsByItemType={ItemFormService.setValidationsByItemType}
    onChange={ItemFormService.form.setValue}
    onReset={ItemFormService.form.reset}
    values={ItemFormService.form.getValues()}
    errors={ItemFormService.form.errors}
    isDirty={ItemFormService.form.isDirty}
    submitting={ItemFormService.submit.fetching}
    error={ItemFormService.submit.error}
    fetching={ItemFormService.fetch.fetching}
    disabled={props.disabled}
  />
);

ItemFormContainer.propTypes = {
  disabled: PropTypes.bool,
}

ItemFormContainer.defaultProps = {
  disabled: false,
}

export default observer(ItemFormContainer);
