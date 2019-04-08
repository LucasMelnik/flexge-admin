import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '../../../core/layout/Dialog';
import get from 'lodash/get';
import Column from '../../../core/layout/Column';
import Row from '../../../core/layout/Row';
import LocalFileInput from '../../../core/form/LocalFileInput';
import TextInput from '../../../core/form/TextInput';
import Separator from '../../../core/layout/Separator';
import Button from '../../../core/form/Button';

const WhitelabelConfigMobileDistributionForm = props => (
  <Dialog
    title="Distribution Config"
    isOpen={props.isOpen}
    actions={null}
  >
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit();
      }}
    >
      <Row>
        <Column size={4}>
          <LocalFileInput
            disabled={props.submitting}
            label="Logo"
            value={get(props.values, 'logoUrl', '')}
            onChange={value => props.onChange('logoFile', value)}
            errorText={get(props.errors, 'logoFile', null)}
            accept="image"
          />
        </Column>
      </Row>
      <Row>
        <Column size={4}>
          <LocalFileInput
            disabled={props.submitting}
            label="iOS Icon"
            value={get(props.values, 'iosIconUrl', '')}
            onChange={value => props.onChange('iosIconFile', value)}
            errorText={get(props.errors, 'iosIconFile', null)}
            accept="image"
          />
        </Column>
      </Row>
      <Row>
        <Column size={4}>
          <LocalFileInput
            disabled={props.submitting}
            label="Android Icon"
            value={get(props.values, 'androidIconUrl', '')}
            onChange={value => props.onChange('androidIconFile', value)}
            errorText={get(props.errors, 'androidIconFile', null)}
            accept="image"
          />
        </Column>
        <Column size={4}>
          <LocalFileInput
            disabled={props.submitting}
            label="Background"
            value={get(props.values, 'androidIconBackgroundUrl', '')}
            onChange={value => props.onChange('androidIconBackgroundFile', value)}
            errorText={get(props.errors, 'androidIconBackgroundFile', null)}
            accept="image"
          />
        </Column>
        <Column size={4}>
          <LocalFileInput
            disabled={props.submitting}
            label="Logo"
            value={get(props.values, 'androidIconLogoUrl', '')}
            onChange={value => props.onChange('androidIconLogoFile', value)}
            errorText={get(props.errors, 'androidIconLogoFile', null)}
            accept="image"
          />
        </Column>
      </Row>
      <Row>
        <Column size={12}>
          <TextInput
            disabled={props.submitting}
            label="iOS Store URL"
            value={get(props.values, 'iosStoreUrl', '')}
            onChange={value => props.onChange('iosStoreUrl', value)}
            errorText={get(props.errors, 'iosStoreUrl', null)}
          />
        </Column>
        <Column size={12}>
          <TextInput
            disabled={props.submitting}
            label="Android Store URL"
            value={get(props.values, 'androidStoreUrl', '')}
            onChange={value => props.onChange('androidStoreUrl', value)}
            errorText={get(props.errors, 'androidStoreUrl', null)}
          />
        </Column>
      </Row>
      <Separator />
      <div
        style={{
          textAlign: 'right',
          marginBottom: 20,
        }}
      >
        <Button
          icon="close"
          onClick={props.onDiscard}
          label="Cancel"
        />
        &emsp;
        <Button
          icon="check"
          type="primary"
          disabled={props.submitting || !props.isDirty()}
          loading={props.submitting}
          buttonType="submit"
          label="Save"
        />
      </div>
    </form>
  </Dialog>
);

WhitelabelConfigMobileDistributionForm.propTypes = {
  onSubmit: PropTypes.func,
  onDiscard: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
};

WhitelabelConfigMobileDistributionForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onDiscard: () => false,
};

export default WhitelabelConfigMobileDistributionForm;
