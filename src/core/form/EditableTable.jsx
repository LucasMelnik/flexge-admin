import React from 'react';
import PropTypes from 'prop-types';
import { Table, Input, InputNumber, Form } from 'antd';
import isString from 'lodash/isString';
import get from 'lodash/get';
import Button from './Button';

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: false,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component {
  static propTypes = {
    rows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    pagination: PropTypes.shape({
      current: PropTypes.number,
      total: PropTypes.number,
      pageSize: PropTypes.number,
    }),
    onSave: PropTypes.func,
    onDelete: PropTypes.func,
    fetching: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = { editingKey: '' };
    this.columns = [
      ...this.props.columns.map(column => ({
        ...column,
        title: column.label,
        width: column.width,
        dataIndex: column.path,
        sorter: column.sort ? (a, b) => this.sort(a, b, column.path) : null,
        defaultSortOrder: column.defaultSortOrder,
      })),
      {
        title: 'Actions',
        dataIndex: 'operation',
        width: '100px',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <Button
                    icon="check"
                    type="primary"
                    buttonType="button"
                    onClick={() => this.save(form, record)}
                  />
                )}
              </EditableContext.Consumer>
              {' '}
              <Button
                icon="close"
                onClick={() => this.cancel(record.id)}
              />
            </span>
          ) : (
            <div>
              <Button
                icon="edit"
                disabled={editingKey !== ''}
                onClick={() => this.edit(record.id)}
              />
              {" "}
              <Button
                icon="delete"
                disabled={editingKey !== ''}
                onClick={() => props.onDelete(record)}
              />
            </div>
          );
        },
      },
    ];
  }

  sort = (a, b, path) => {
    if (isString(get(a, path, ''))) {
      return get(a, path, '').localeCompare(get(b, path, ''));
    }
    return a[path] - b[path];
  };

  isEditing = record => record.id === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, record) {
    form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.props.onSave(record, values);
      this.cancel();
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text', //col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          rowKey="id"
          loading={this.props.fetching}
          components={components}
          bordered
          dataSource={this.props.rows}
          columns={columns}
          size="small"
          rowClassName="editable-row"
          pagination={this.props.pagination}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;