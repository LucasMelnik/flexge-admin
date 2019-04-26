import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Separator from '../../../../core/layout/Separator';
import AudioPreview from '../../../../core/layout/AudioPreview';
import ColumnSeparator from '../../../../core/layout/ColumnSeparator';
import Tag from '../../../../core/layout/Tag';
import Icon from '../../../../core/layout/Icon';
import VideoPreview from '../../../../core/layout/VideoPreview';

const ContentItem = props => (
  <div {...props}>
    <p
      style={{
        textAlign: 'center',
      }}
    >
      Type: {props.item.type.name}
    </p>
    <p
      style={{
        textAlign: 'center',
      }}
    >
      Grammar: {get(props.item.grammar, 'name', '-')}
    </p>
    <Separator size="sm" />
    {!!['PRESENTATION', 'TRUE_FALSE_KIDS', 'SINGLE_CHOICE_GAME', 'GAP_FILL_IMAGE', 'GAP_FILL_LETTER'].find(type => type === props.item.type.key) && (
      <div>
        <img
          src={`${process.env.REACT_APP_FILES_URL}/${props.item.image}`}
          alt={props.item.text}
          style={{
            margin: '0  auto',
            height: 250,
          }}
        />
        <Separator size="md" />
      </div>
    )}
    {!!['PHONEME'].find(type => type === props.item.type.key) && (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <AudioPreview src={props.item.titleAudio || props.item.generatedTitleAudio} />
        <ColumnSeparator size="md" />
        <h1
          style={{
            margin: 0,
            fontSize: 24
          }}
        >
          {props.item.title}
        </h1>
      </div>
    )}
    {!!['VOCABULARY', 'CONNECTING_DOTS', 'PHONEME', 'MEMORY_GAME', 'VOCABULARY_GAME'].find(type => type === props.item.type.key) && (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '85%',
            margin: '0 auto',
          }}
        >
          <img
            src={`${process.env.REACT_APP_FILES_URL}/${props.item.image}`}
            alt={props.item.text}
            style={{
              margin: '0  auto',
              height: 250,
            }}
          />
          <Separator size="md" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AudioPreview src={props.item.audio || props.item.generatedAudio} />
            <ColumnSeparator size="md" />
            <div>
              <p
                style={{
                  fontSize: 16,
                  marginBottom: 5,
                }}
              >
                {props.item.text}
              </p>
              <span><i>{props.item.translation || '-'}</i></span>
            </div>
          </div>
        </div>
        <ColumnSeparator size="md" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '85%',
            margin: '0 auto',
          }}
        >
          <img
            src={`${process.env.REACT_APP_FILES_URL}/${props.item.postPhraseImage}`}
            alt={props.item.text}
            style={{
              margin: '0  auto',
              height: 250,
            }}
          />
          <Separator size="md" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AudioPreview src={props.item.postPhraseAudio || props.item.generatedPostPhraseAudio} />
            <ColumnSeparator size="md" />
            <div>
              <p
                style={{
                  fontSize: 16,
                  marginBottom: 5,
                }}
              >
                {props.item.postPhrase}
              </p>
              <span><i>{'-'}</i></span>
            </div>
          </div>
        </div>
      </div>
    )}
    {['VIDEO', 'VIDEO_SHORT', 'MUSIC'].some(type => type === props.item.type.key) && (
      <VideoPreview
        id={props.item.id}
        src={props.item.videoLink}
        videoStartTime={props.item.videoStartTime}
        videoEndTime={props.item.videoEndTime}
      />
    )}
    {!['VIDEO', 'MUSIC', 'VOCABULARY', 'CONNECTING_DOTS', 'PHONEME', 'MEMORY_GAME', 'VOCABULARY_GAME'].some(type => type === props.item.type.key) ? (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '85%',
          margin: '0 auto',
        }}
      >
        {!['VIDEO_SHORT', 'TEXT', 'SINGLE_CHOICE_GAME'].some(type => type === props.item.type.key) && (
          <React.Fragment>
            <AudioPreview src={props.item.audio || props.item.generatedAudio} />
            <ColumnSeparator size="sm" />
          </React.Fragment>
        )}
        <div>
          <p
            style={{
              fontSize: 16,
              marginBottom: 5,
            }}
          >
            {props.item.text}
          </p>
          <span><i>{props.item.translation || '-'}</i></span>
        </div>
      </div>
    ) : (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: '85%',
          margin: '0 auto',
        }}
      >
        {get(props.item, 'subtitles', []).map(item => (
          <p
            key={item.start}
            style={{
              display: 'block',
              fontSize: 16,
              marginBottom: 5,
            }}
          >
            {item.text}
          </p>
        ))}
      </div>
    )}
    <Separator size="md" />
    {!![
      'GAP_FILL_MULTIPLE',
      'GAP_FILL_SELECT',
      'GAP_FILL_IMAGE',
      'GAP_FILL_LETTER',
      'GAP_FILL',
      'UNSCRAMBLE_DRAG_AND_DROP',
      'UNSCRAMBLE_SPEECH_RECOGNITION',
    ].find(type => type === props.item.type.key) && (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <span>Gaps Preview:</span>
        <div>
          {(props.item.type.key === 'GAP_FILL_LETTER' ? [...props.item.text] : props.item.text.split(' ')).map((slice, index) => (
            <span>{props.item.answers.find(answer => answer.index === index) ? ' -- ' : slice.concat(' ')}</span>
          ))}
        </div>
        <Separator size="md" />
      </div>
    )}
    {
      !![
        'SINGLE_CHOICE_TEXT',
        'SINGLE_CHOICE_IMAGE',
        'SINGLE_CHOICE_AUDIO',
        'GAP_FILL_MULTIPLE',
        'GAP_FILL_SELECT',
        'GAP_FILL_IMAGE',
        'GAP_FILL_LETTER',
        'GAP_FILL',
        'TRUE_FALSE',
        'TRUE_FALSE_KIDS',
        'DICTATION',
        'UNSCRAMBLE_DRAG_AND_DROP',
        'UNSCRAMBLE_SPEECH_RECOGNITION',
        'SINGLE_CHOICE_GAME',
      ].find(type => type === props.item.type.key) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span>Options:</span>
          <Separator size="xs" />
          <div>
            {props.item.linkedAnswers.map(answer => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                }}
              >
                {answer.image && (
                  <div>
                    <img
                      alt={answer.text}
                      src={`${process.env.REACT_APP_FILES_URL}/${answer.image}`}
                      style={{
                        width: 140,
                        display: 'inline-block',
                      }}
                    />
                    <ColumnSeparator size="xs" />
                  </div>
                )}
                <Tag color={answer.correct ? 'green' : 'red'}>
                  {answer.correct ? (
                    <Icon name="check" />
                  ) : (
                    <Icon name="close" />
                  )}
                </Tag>
                <ColumnSeparator size="xs" />
                {(answer.audio || answer.generatedAudio) && (
                  <div>
                    <AudioPreview src={answer.audio || answer.generatedAudio} />
                    <ColumnSeparator size="xs" />
                  </div>
                )}
                <span
                  style={{
                    fontSize: 16,
                  }}
                >
                  {answer.text}
                </span>
              </div>
            ))}
          </div>
          <Separator size="md" />
        </div>
      )
    }
    <Separator size="lg" />
  </div>
);

ContentItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    translation: PropTypes.string,
    grammar: PropTypes.shape({
      name: PropTypes.string,
    }),
    type: PropTypes.shape({
      name: PropTypes.string,
      key: PropTypes.string,
    }),
    image: PropTypes.string,
    audio: PropTypes.string,
    generatedAudio: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.number,
    })),
    linkedAnswers: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.number,
      text: PropTypes.string,
      audio: PropTypes.string,
      generatedAudio: PropTypes.string,
      image: PropTypes.string,
      correct: PropTypes.bool,
    })),
  }).isRequired,
};

export default ContentItem;
