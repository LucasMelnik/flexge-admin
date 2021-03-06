import React from 'react';
import PropTypes from 'prop-types';
import { Avatar as AntAvatar } from 'antd';

const Avatar = props => (
  <AntAvatar
    shape="circle"
    size={{
      sm: 'small',
      md: 'default',
      lg: 'large',
    }[props.size]}
    src={props.src ? `${process.env.REACT_APP_API_URL}/files/${props.src}` : null}
    icon="user"
  />
);

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

Avatar.defaultProps = {
  size: 'md',
  src: null,
};

export default Avatar;
