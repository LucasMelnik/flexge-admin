import PropTypes from 'prop-types';

const PermissionValidator = props => (
  !props.allowedFor || props.allowedFor.find(role => role === localStorage.role) ?
    props.children : null
);

PermissionValidator.propTypes = {
  allowedFor: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node.isRequired,
};

PermissionValidator.defaultProps = {
  allowedFor: null,
}

export default PermissionValidator;
