import React from 'react';
import PropTypes from 'prop-types';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import Separator from '../../../../core/layout/Separator';
import Tags from '../../../../core/form/Tags';

const SlicesInput = props => (
  <Row>
    <Column size={12}>
      {props.texts.length > 0 && (
        <div>
          <Tags
            label="Here you must click on the X button to select the word(s) to hide"
            errorText={props.errorText}
            disabled={props.disabled}
            onDelete={props.onRemoveSlice}
            onClick={props.onShowSlice}
            onLink={props.onLinkSlice}
            tags={props.texts.map((sliceText, index) => {
              const tag = {
                index,
                text: sliceText,
                icon: null,
                canDelete: false,
                canClick: false,
                canLink: false,
              };

              if (!props.value.find(removedSlice => removedSlice.index === index)) {
                if ((!props.disableRemove && !props.sequenceRemove) ||
                  (!props.disableRemove && props.sequenceRemove &&
                    (!props.value.length ||
                      props.value.find(answer => index === (answer.index - 1)) ||
                      props.value.find(answer => index === (answer.index + 1))
                    )
                  )
                ) {
                  tag.canDelete = true;
                }
              } else {
                if (!props.allowLink || (props.allowLink && !props.value.find(answer => answer.linkTo === index))) {
                  tag.icon = 'rollback';
                  tag.canClick = true;
                }
                if (props.allowLink && !props.value.find(answer => answer.linkTo === index + 1) &&
                  props.value.find(answer => index === answer.index) &&
                  props.value.find(answer => index === (answer.index - 1))) {
                  tag.icon = 'link';
                  tag.canLink = true;
                }
              }

              return tag;
            })}
          />
        </div>
      )}
      {(props.value.length > 0 && (
        <div
          style={{
            marginTop: '-10px',
            whiteSpace: 'normal',
          }}
        >
          <small>Gap Preview</small>
          <Separator size="xs" />
          {props.texts.map((sliceText, index) => {
            if (props.value.find(removedSlice => removedSlice.index === index)) {
              return '__ ';
            }
            return `${sliceText} `;
          })}
        </div>
      ))}
    </Column>
  </Row>
);

SlicesInput.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number,
    text: PropTypes.string,
    correct: PropTypes.bool,
  })).isRequired,
  onRemoveSlice: PropTypes.func.isRequired,
  onShowSlice: PropTypes.func.isRequired,
  onLinkSlice: PropTypes.func,
  errorText: PropTypes.string,
  disableRemove: PropTypes.bool.isRequired,
  sequenceRemove: PropTypes.bool.isRequired,
  allowLink: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

SlicesInput.defaultProps = {
  errorText: null,
  onLinkSlice: null,
  disabled: false,
};

export default SlicesInput;
