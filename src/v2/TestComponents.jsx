import React, { Component } from 'react';
import Dropdown from './core/form/Dropdown';
import Button from './core/form/Button';
import IconButton from './core/form/IconButton';
import Select from './core/form/Select';
import Card from './core/layout/Card';
import TextInput from './core/form/TextInput';
import Table from './core/form/Table';
import DateInput from './core/form/DateInput';
import Tabs from './core/layout/Tabs';
import Dialog from './core/layout/Dialog';
import Notification from './core/layout/Notification';

export default class TestComponents extends Component {

  state = { modalOpen: false };

  componentDidMount() {
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    })
  };

  render() {
    return (
      <div className="col-lg-12">
        <Card title="Select">
          <div className="row">
            <div className="col-lg-6">
              <Select
                url="courses"
                resultTransformer={{
                  text: 'name',
                  value: 'id',
                }}
              />
              <div>For more details: <a href="https://select2.github.io/">https://select2.github.io/</a></div>
            </div>
            <div className="col-lg-6">
              <pre>{`
                <Select
                  url="courses"
                  resultTransformer={{
                    text: 'name',
                    value: 'id',
                  }}
                />
              `}</pre>
            </div>
          </div>
        </Card>
        <Card title="IconButton">
          <div className="row">
            <div className="col-lg-6">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                }}
              >

                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <IconButton
                    icon="fa fa-home"
                  />
                </div>

                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <IconButton
                    type="default"
                    icon="fa fa-home"
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <IconButton
                    type="success"
                    icon="fa fa-check"
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <IconButton
                    type="danger"
                    icon="fa fa-home"
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <IconButton
                    icon="fa fa-home"
                    cornered
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <IconButton
                    icon="fa fa-home"
                    rounded
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <IconButton
                    icon="fa fa-home"
                    bordered
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <pre>{`
                <IconButton
                  icon="(example: fa fa-home)"
                  type: ('default', 'primary', 'success', 'info', 'warning', 'danger', 'purple', 'accent', 'secondary'. default: primary)
                  size: ('xs','sm','lg','block'. default: null)
                  cornered (default: false)
                  rounded: (default: false)
                  bordered: (default: false)
                />
              `}</pre>
            </div>
          </div>
        </Card>
        <Card title="Cards">
          <div className="row">
            <div className="col-lg-6">
              <Card title="Label">
                Elements
              </Card>
            </div>
            <div className="col-lg-6">
              <pre>{`
                <Card title="Label">
                  {childrens}
                </Card>
              `}</pre>
            </div>
          </div>
        </Card>
        <Card title="Dropdown">
          <div className="row">
            <div className="col-lg-6">
              <Dropdown
                id="id_dropdown"
                label="Dropdown"
                items={[
                  {
                    label: 'Item 01',
                  },
                  {
                    label: 'Item 02',
                  },
                ]}
              />
            </div>
            <div className="col-lg-6">
              <pre>{`
                <Dropdown
                  id="id_dropdown"
                  label="Dropdown"
                  type: ('default', 'primary', 'success', 'info', 'warning', 'danger', 'purple', 'accent', 'secondary'. default: primary)
                  items={[
                    {
                      label: 'Item 01',
                    },
                    {
                      label: 'Item 02',
                    },
                  ]}
                />

              `}</pre>
            </div>
          </div>
        </Card>
        <Card title="Buttons">
          <div className="row">
            <div className="col-lg-6">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                }}
              >

                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <Button
                    label="Primary"
                  />
                </div>

                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <Button
                    type="default"
                    label="Default"
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <Button
                    type="success"
                    label="Success"
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <Button
                    type="danger"
                    label="Danger"
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <Button
                    label="Primary Cornored"
                    cornered
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <Button
                    label="Primary rounded"
                    rounded
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <Button
                    label="Primary bordered"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <pre>{`
                <Button
                  label="Button"
                  type: ('default', 'primary', 'success', 'info', 'warning', 'danger', 'purple', 'accent', 'secondary'. default: primary)
                  size: ('xs','sm','lg','block'. default: null)
                  icon: (default:  null)
                  cornered (default: false)
                  rounded: (default: false)
                  bordered: (default: false)
                />
              `}</pre>
            </div>
          </div>
        </Card>
        <Card title="Textinputs">
          <div className="row">
            <div className="col-lg-6">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <TextInput
                    id="if_textinput"
                    label="Default"
                    description="Description"
                    type="text"
                    placeholder="Enter the value"
                    helpText="This is a help text"
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <TextInput
                    id="if_textinput"
                    label="Error"
                    fieldValidation="error"
                    description="Description"
                    type="text"
                    placeholder="Enter the value"
                    helpText="This is a help text"
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <TextInput
                    id="if_textinput"
                    label="Warning"
                    fieldValidation="warning"
                    description="Description"
                    type="text"
                    placeholder="Enter the value"
                    helpText="This is a help text"
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <TextInput
                    id="if_textinput"
                    label="Success"
                    fieldValidation="success"
                    description="Description"
                    type="text"
                    placeholder="Enter the value"
                    helpText="This is a help text"
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <TextInput
                    id="if_textinput"
                    label="Disabled"
                    disabled
                    description="Description"
                    type="text"
                    placeholder="Enter the value"
                    helpText="This is a help text"
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <TextInput
                    id="if_textinput"
                    label="Textarea"
                    fieldType="textarea"
                    description="Description"
                    type="text"
                    placeholder="Enter the value"
                    helpText="This is a help text"
                  />
                </div>
                <div
                  style={{
                    margin: 10,
                  }}
                >
                  <TextInput
                    id="if_textinput"
                    label="Static"
                    fieldType="static"
                    type="text"
                    placeholder="This is a static value"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <pre>{`
                <TextInput
                  id="id_textinput"
                  label="Label"
                  description="Description"
                  type="text"
                  placeholder="Enter the value"
                  disabled (default: false)
                  fieldType: ('textarea' or 'static'. default: null)
                  fieldValidation: ('error', 'warning', 'success'. default: null),
                  helpText="This is a help text"
                />
            `}</pre>
            </div>
          </div>
        </Card>
        <Card title="Datatables">
          <div className="row">
            <div className="col-lg-6">
              <Table
                id="table"
                columns={[
                  {
                    label: 'Label',
                    path: 'label',
                  },
                  {
                    label: 'Order',
                    path: 'order',
                  },
                  {
                    label: 'Name',
                    path: 'name',
                  },
                ]}
                rows={[
                  {
                    id: 1,
                    name: 'Name 01',
                    order: 'Order 01',
                    label: 'Label 01',
                  },
                  {
                    id: 2,
                    name: 'Name 02',
                    order: 'Order 02',
                    label: 'Label 02',
                  },
                ]}
              />
              <div>For more details: <a href="https://datatables.net/reference/api/">https://datatables.net/reference/api/</a></div>
            </div>
            <div className="col-lg-6">
              <pre>{`
                <Table
                  id="id_table"
                  hasSortColumn (default: true)
                  hasInfo (default: true)
                  noRecordsText (default: 'No records found.')
                  infoText (default: '_MAX_ records found.')
                  infoEmptyText (default: 'No records found.')
                  columns={[
                    {
                      label: 'Label',
                      path: 'label',
                    },
                    {
                      label: 'Order',
                      path: 'order',
                    },
                    {
                      label: 'Name',
                      path: 'name',
                    },
                  ]}
                  rows={[
                    {
                      id: 1,
                      label: 'Label 01',
                      name: 'Name 01',
                      order: 'Order 01',
                    },
                  ]}
                />
            `}</pre>
            </div>
          </div>
        </Card>
        <Card title="DateInput">
          <div className="row">
            <div className="col-lg-6">
              <DateInput
                format="mm/dd/yy"
                label="Date label"
                placeholder="Placeholder"
              />
              <div>For more details: <a href="https://bootstrap-datepicker.readthedocs.io/en/latest/">https://bootstrap-datepicker.readthedocs.io/en/latest/</a></div>
            </div>
            <div className="col-lg-6">
              <pre>{`
                <DateInput
                  format="mm/dd/yy"
                  label="Date label"
                  placeholder="Placeholder"
                />
              `}</pre>
            </div>
          </div>
        </Card>
        <Card title="Tabs">
          <div className="row">
            <div className="col-lg-6">
              <Tabs
                tabs={[
                  {
                    title: 'Tab title 1',
                    icon: 'fa-home',
                    content: (<p>loremipsum loremipsumloremipsumloremipsum loremipsum loremipsumloremipsum loremipsum</p>)
                  },
                  {
                    title: 'Tab title 2',
                    content: (<p>test tab</p>)
                  },
                ]}
              />
            </div>
            <div className="col-lg-6">
              <pre>{`
                <Tabs
                tabs={[
                  {
                    title: 'Tab title 1',
                    icon: 'fa-home',
                    content: (<p>loremipsum loremipsumloremipsumloremipsum loremipsum loremipsumloremipsum loremipsum</p>)
                  },
                ]}
              />
              `}</pre>
            </div>
          </div>
        </Card>
        <Card title="Dialog">
          <div className="row">
            <div className="col-lg-6">
              <button
                onClick={this.toggleModal}
              >
                Open Modal
              </button>
              <Dialog
                title="Dialog title"
                isOpen={this.state.modalOpen}
                actions={[
                  <button onClick={this.toggleModal}>Close</button>
                ]}
              >
                <p>content</p>
              </Dialog>
            </div>
            <div className="col-lg-6">
              <pre>{`
                <Dialog
                  title="Dialog title"
                  isOpen={this.state.modalOpen}
                  actions={[
                    <button onClick={this.toggleModal}>Close</button>
                  ]}
                >
                  <p>content</p>
                </Dialog>
              `}</pre>
            </div>
          </div>
        </Card>
        <Card title="Dialog">
          <div className="row">
            <div className="col-lg-6">
              <Notification
                notifications={[
                  {
                    type: 'error',
                    message: 'Ops, bugo'
                  }
                ]}
              />
            </div>
            <div className="col-lg-6">
              <pre>{`
                <Notification
                  notifications={[
                    {
                      type: 'error',
                      message: 'Ops, bugo'
                    }
                  ]}
                />
              `}</pre>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}
