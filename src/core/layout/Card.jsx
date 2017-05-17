import React from 'react';
import PropTypes from 'prop-types';
import {
  Card as MUICard,
  CardMedia,
  CardTitle,
  CardText,
  CardActions,
  CardHeader,
} from 'material-ui';

const Card = props => (
  <MUICard
    style={props.style}
  >
    {props.media && (
      <CardMedia
        overlay={
          <CardTitle
            title={props.overlayTitle}
            subtitle={props.overlaySubTitle}
          />
        }
      >
        <img alt="card" src={props.media} />
      </CardMedia>
    )}
    {props.header && (
      <CardHeader
        title={props.header.title}
        subtitle={props.header.subtitle}
        actAsExpander={props.header.actAsExpander}
        showExpandableButton={props.header.showExpandableButton}
      />
    )}
    {props.title && (
      <CardTitle
        title={props.title}
        subtitle={props.subtitle}
      />
    )}
    {props.text && (
      <CardText>
        {props.text}
      </CardText>
    )}
    {props.children}
    {props.actions && (
      <CardActions>
        {props.actions}
      </CardActions>
    )}
  </MUICard>
);

Card.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  media: PropTypes.node,
  text: PropTypes.node,
  actions: PropTypes.node,
  overlayTitle: PropTypes.string,
  overlaySubTitle: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  header: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    actAsExpander: PropTypes.bool.isRequired,
    showExpandableButton: PropTypes.bool.isRequired,
  }),
};

Card.defaultProps = {
  title: null,
  subtitle: null,
  media: null,
  text: null,
  actions: null,
  overlayTitle: null,
  overlaySubTitle: null,
  children: null,
  style: null,
  header: null,
};

export default Card;
