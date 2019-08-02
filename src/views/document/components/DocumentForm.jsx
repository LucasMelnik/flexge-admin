import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import FormButtons from '../../../core/form/FormButtons';
import Button from '../../../core/form/Button';

class DocumentForm extends React.Component {

  static propTypes = {
    onSubmit: PropTypes.func,
    onReset: PropTypes.func,
    values: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
    submitting: PropTypes.bool,
    isDirty: PropTypes.func,
  };

  static defaultProps = {
    values: {},
    errors: {},
    submitting: false,
    isDirty: () => false,
    onSubmit: () => alert('submitted'),
    onReset: () => false,
  };

  render() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          this.props.onSubmit();
        }}
      >
        <Row>
          <Column size={6}>
            <TextInput
              required
              disabled={this.props.submitting}
              label="Title"
              value={get(this.props.values, 'title', '')}
              onChange={value => this.props.onChange('title', value)}
              errorText={get(this.props.errors, 'title', null)}
            />
          </Column>
          <Column size={3}>
            <TextInput
              required
              disabled={true}
              label="File"
              value={get(this.props.values, 'file.name', '')}
              errorText={get(this.props.errors, 'file', null)}
            />
          </Column>
          <Column size={1}>
            <div style={{ height: 42 }} />
            <Button
              label="Select the file"
              disabled={this.props.submitting}
              onClick={() => this.fileInput.click()}
              icon="file-add"
            />
            <input
              type="file"
              style={{
                visibility: 'hidden',
                width: 0,
                height: 0,
              }}
              value={''}
              onChange={event => this.props.onChange('file', event.target.files[0])}
              ref={(input) => { this.fileInput = input; }}
              accept="xlsx/*"
            />
          </Column>
        </Row>
        <FormButtons
          confirmLabel={this.props.values.id ? 'Update Document' : 'Create Document'}
          isDisabled={this.props.submitting || !this.props.isDirty()}
          isSubmitting={this.props.submitting}
          onReset={this.props.onReset}
        />
      </form>
    );
  }
}

export default DocumentForm;
