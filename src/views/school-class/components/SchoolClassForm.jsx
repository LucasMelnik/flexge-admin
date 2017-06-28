import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import AccountIcon from 'material-ui/svg-icons/action/perm-identity';
import Row from '../../../core/layout/Row';
import Column from '../../../core/layout/Column';
import TextInput from '../../../core/form/TextInput';
import Separator from '../../../core/layout/Separator';
import Button from '../../../core/form/Button';
import FetchAutoComplete from '../../../core/form/FetchAutoComplete';

const SchoolClassForm = props => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      props.onSubmit();
    }}
  >
    <Row>
      <Column lgSize={6}>
        <TextInput
          floatingLabel
          fullWidth
          disabled={props.submitting}
          label="Class Name"
          value={get(props.values, 'name', '')}
          onChange={value => props.onChange('name', value)}
          errorText={get(props.errors, 'name', '')}
        />
      </Column>
      <Column lgSize={6}>
        <FetchAutoComplete
          url="teachers?page=1&size=100"
          fullWidth
          disabled={props.submitting}
          label="Teacher"
          value={get(props.values, 'teacher.name', '')}
          onSelect={teacher => props.onChange('teacher', teacher)}
          errorText={get(props.errors, 'teacher', '')}
          resultTransformer={{
            text: 'name',
            value: 'id',
          }}
        />
      </Column>
    </Row>
    <Separator size="xs" />
    <Button
      icon="done"
      secondary
      fullWidth
      disabled={props.submitting || !props.isDirty()}
      type="submit"
      label={props.values.id ? 'Update Class' : 'Create Class'}
    />
    <Separator size="xs" />
    <Button
      icon="clear"
      fullWidth
      disabled={props.submitting || !props.isDirty()}
      onClick={props.onReset}
      label="Discard Changes"
    />
    <Separator size="xs" />
    <Row>
      <Column lgSize={5}>
        <Subheader>Available students</Subheader>
        <List>
          {props.students.filter(student => !get(props.values, 'students', []).find(linkedStudent => linkedStudent.id === student.id))
            .map(student => (
              <ListItem
                primaryText={student.name}
                leftAvatar={
                  <Avatar
                    size={40}
                    icon={<AccountIcon />}
                  />
                }
                rightIconButton={
                  <IconButton
                    onClick={() => props.onAddStudent(student.id)}
                    iconClassName="material-icons"
                    iconStyle={{
                      fontSize: 32,
                    }}
                    style={{
                      padding: 8,
                    }}
                  >
                    add_circle
                  </IconButton>
                }
              />
            ))}
        </List>
      </Column>
      <Column lgSize={2} />
      <Column lgSize={5}>
        <Subheader>Students in Class</Subheader>
        <List>
          {get(props.values, 'students', []).map(student => (
            <ListItem
              primaryText={student.name}
              leftAvatar={
                <Avatar
                  size={40}
                  icon={<AccountIcon />}
                />
              }
              rightIconButton={
                <IconButton
                  onClick={() => props.onRemoveStudent(student.id)}
                  iconClassName="material-icons"
                  iconStyle={{
                    fontSize: 32,
                  }}
                  style={{
                    padding: 8,
                  }}
                >
                  cancel
                </IconButton>
              }
            />
          ))}
        </List>
      </Column>
    </Row>
  </form>
);

SchoolClassForm.propTypes = {
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
  values: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  submitting: PropTypes.bool,
  isDirty: PropTypes.func,
  onAddStudent: PropTypes.func,
  onRemoveStudent: PropTypes.func,
  students: PropTypes.arrayOf(PropTypes.object),
};

SchoolClassForm.defaultProps = {
  values: {},
  errors: {},
  submitting: false,
  isDirty: () => false,
  onSubmit: () => alert('submitted'),
  onChange: () => false,
  onReset: () => false,
  onAddStudent: () => false,
  onRemoveStudent: () => false,
  students: [],
};

export default SchoolClassForm;
