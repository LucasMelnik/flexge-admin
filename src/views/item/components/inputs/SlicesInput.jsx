import React from 'react';
import PropTypes from 'prop-types';
import Flex from 'jsxstyle/Flex';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import ErrorText from '../../../../core/content/ErrorText';
import Tag from '../../../../core/form/Tag';
import Separator from '../../../../core/layout/Separator';

const SlicesInput = props => (
  <Row>
    <Column lgSize={12}>
      {props.texts.length > 0 && (
        <div>
          {!props.disableRemove && (
            <small>Here you must click on the X button to select the word(s) to hide.</small>
          )}
          <Flex
            flexWrap="wrap"
          >
            {props.texts.map((sliceText, index) => {
              if (!props.value.find(removedSlice => removedSlice.index === index)) {
                let removeSliceFunc = null;
                if ((!props.disableRemove && !props.sequenceRemove) ||
                  (!props.disableRemove && props.sequenceRemove &&
                    (!props.value.length ||
                      props.value.find(answer => index === (answer.index - 1)) ||
                      props.value.find(answer => index === (answer.index + 1))
                    )
                  )
                ) {
                  removeSliceFunc = () => props.onRemoveSlice(index);
                }
                return (
                  <Tag
                    key={`slice-${sliceText}-${index}`}
                    onDelete={!props.disabled && removeSliceFunc}
                    text={sliceText}
                  />
                )
              } else {
                return (
                  <Flex key={`slice-${sliceText}-${index}`}>
                    {(!props.allowLink || (props.allowLink && !props.value.find(answer => answer.linkTo === index))) && (
                      <Tag
                        icon="undo"
                        onClick={() => props.onShowSlice(index)}
                      />
                    )}
                    {(props.allowLink && !props.value.find(answer => answer.linkTo === index + 1) &&
                      props.value.find(answer => index === answer.index) &&
                      props.value.find(answer => index === (answer.index - 1))) && (
                      <Tag
                        key={`link-${index}`}
                        icon="link"
                        onClick={() => props.onLinkSlice(index)}
                        disabled={props.disabled}
                      />
                    )}
                  </Flex>
                )
              }
            })}
          </Flex>
          {props.errorText && (
           <ErrorText>{props.errorText}</ErrorText>
          )}
        </div>
      )}
      <Separator size="xs" />
      {(props.value.length > 0 && (
        <div>
          <small>Gap Preview</small>
          <Separator size="xs" />
          {props.texts.map((sliceText, index) => {
            if (props.value.find(removedSlice => removedSlice.index === index)) {
              return `__ `;
            } else {
              return `${sliceText} `;
            }
          })}
        </div>
      ))}
    </Column>
  </Row>
);

SlicesInput.propTypes = {
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  value:PropTypes.arrayOf(PropTypes.shape({
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
