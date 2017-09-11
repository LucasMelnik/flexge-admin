import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../../core/form/Button';
import TextEditor from '../../../core/form/TextEditor';

const ImageReviewForm = (props) => (
  <div>
    <div
      style={{
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      Revisão de Imagens
      <div>
        {localStorage.role === 'ADMIN' && (
          <div>
            <Button
              label="Image Approved"
              icon="fa-smile-o"
              type="primary"
              onClick={() => {
                props.onChange('statusImage', 'APPROVED');
                props.onSaveStatusImage();
              }}
            />
            {' '}
            <Button
              label="Image Not Approved"
              icon="fa-frown-o"
              onClick={() => {
                props.onChange('statusImage', 'NOT_APPROVED');
                props.onSaveStatusImage();
              }}
            />
          </div>
        )}
        {(localStorage.role === 'CONTENT_ADMIN' && props.values.statusImage === 'NOT_APPROVED') && (
          <div>
            <Button
              label="Send to image review"
              icon="fa-send"
              primary
              onClick={() => {
                props.onChange('statusImage', 'PENDING_REVIEW');
                props.onSaveStatusImage();
              }}
            />
          </div>
        )}
      </div>
    </div>
    <TextEditor
      placeholder="Comment status image review..."
      isRequired
      readOnly={localStorage.role !== 'ADMIN' && props.values.statusImage !== 'NOT_APPROVED'}
      value={get(props.values, 'commentsImage', '')}
      onChange={value => props.onChange('commentsImage', value)}
    />
  </div>
);

ImageReviewForm.propTypes = {
  onSaveStatusImage: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func,
};

ImageReviewForm.defaultProps = {
  comments: null,
  errors: null,
  onChange: null,
};

export default ImageReviewForm;
