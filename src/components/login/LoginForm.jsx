import React, {Component} from 'react';

import Button from '../core/form/Button';
import Input from '../core/form/Input';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      password: ''
    };
  }

  onChangeUser = event => {
    this.setState({
      user: event.target.value
    });
  };

  onChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  submitForm = () => {
    console.log('form submit');
  };

  render() {
    return (
      <div>
        <form>
          <Input value={this.state.user} onChange={this.onChangeUser}/>
          <Input value={this.state.password} onChange={this.onChangePassword}/>
        </form>
        <div>
          <Button onClick={this.submitForm}>
            <span>Submit</span>
          </Button>
        </div>
      </div>
    )
  }
}

export default LoginForm;
