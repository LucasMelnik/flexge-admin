import React from 'react';
import PropTypes from 'prop-types';
import Flex from 'jsxstyle/Flex';
import Row from '../../../../core/layout/Row';
import Column from '../../../../core/layout/Column';
import ErrorText from '../../../../core/content/ErrorText';
import Tag from '../../../../core/form/Tag';

const SlicesInput = props => (
  <Row>
    <Column lgSize={12}>
      {props.slices.length > 0 && (
        <div>
          {!props.disableRemove && (
            <small>Here you must click on the X button to select the word(s) to hide.</small>
          )}
          <Flex
            flexWrap="wrap"
          >
            {props.slices.map((sliceText, index) => {
              if (props.removedSlices.find(removedIndex => removedIndex === index) === undefined) {
                let removeSliceFunc = null;
                if ((!props.disableRemove && !props.sequenceRemove) ||
                  (!props.disableRemove && props.sequenceRemove &&
                    (!props.removedSlices.length ||
                      props.removedSlices.find(removedIndex => index === (removedIndex - 1)) !== undefined ||
                      props.removedSlices.find(removedIndex => index === (removedIndex + 1)) !== undefined
                    )
                  )
                ) {
                  removeSliceFunc = () => props.onRemoveSlice(index);
                }

                return (
                  <Tag
                    key={`slice-${sliceText}-${index}`}
                    onDelete={removeSliceFunc}
                    text={sliceText}
                  />
                )
              } else {
                return (
                  <Flex key={`slice-${sliceText}-${index}`}>
                    {!props.linkedSlices.find(link => link === index) && (
                      <Tag
                        icon="undo"
                        onClick={() => props.onShowSlice(index)}
                      />
                    )}
                    {(props.allowLink && !props.linkedSlices.find(link => link === index) &&
                      props.removedSlices.find(removedIndex => index === removedIndex) !== undefined &&
                      props.removedSlices.find(removedIndex => index === (removedIndex - 1)) !== undefined) && (
                      <Tag
                        key={`link-${index}`}
                        icon="link"
                        onClick={() => props.onLinkSlice(index)}
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
    </Column>
  </Row>
);

SlicesInput.propTypes = {
  slices: PropTypes.arrayOf(PropTypes.string).isRequired,
  removedSlices: PropTypes.arrayOf(PropTypes.number).isRequired,
  linkedSlices: PropTypes.arrayOf(PropTypes.number).isRequired,
  onRemoveSlice: PropTypes.func.isRequired,
  onShowSlice: PropTypes.func.isRequired,
  onLinkSlice: PropTypes.func,
  errorText: PropTypes.string,
  disableRemove: PropTypes.bool.isRequired,
  sequenceRemove: PropTypes.bool.isRequired,
  allowLink: PropTypes.bool.isRequired,
};

SlicesInput.defaultProps = {
  errorText: null,
  onLinkSlice: null,
};

export default SlicesInput;
