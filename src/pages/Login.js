import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameUser: '',
      buttonDisabled: true,
      loading: false,
      userCreated: false,
    };
  }

  userValidate = async () => {
    this.setState({ loading: true });
    const { nameUser } = this.state;
    await createUser({ name: nameUser });
    this.setState({ userCreated: true, loading: false });
  }

  buttonDisabledHandle = () => {
    const { nameUser } = this.state;
    if (nameUser.length >= '3') {
      this.setState({ buttonDisabled: false });
    }
  }

  handleChange = (event) => {
    this.setState(
      { nameUser: event.target.value },
      () => {
        this.buttonDisabledHandle();
      },
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const { nameUser, buttonDisabled, loading, userCreated } = this.state;
    return (
      <div data-testid="page-login">
        {userCreated && <Redirect to="/search" /> }
        {loading && <Loading /> }
        {!loading && (
          <form id="formLogin" onSubmit={ this.handleSubmit }>
            <input
              type="text"
              data-testid="login-name-input"
              name="nameUser"
              id="nameUser"
              onChange={ this.handleChange }
              value={ nameUser }
            />
            <button
              type="submit"
              form="formLogin"
              data-testid="login-submit-button"
              disabled={ buttonDisabled }
              onClick={ this.userValidate }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
