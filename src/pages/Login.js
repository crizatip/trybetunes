import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../public/music_logo_design_transparent.png';

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
      <div
        className="flex flex-col justify-center items-center w-screen
        h-screen bg-bgColor"
        data-testid="page-login"
      >
        {userCreated && <Redirect to="/search" /> }
        {loading && <Loading /> }
        {!loading && (
          <div
            className="flex flex-col "
          >
            <img
              src={ logo }
              alt="logo app music"
            />
            <form
              id="formLogin"
              onSubmit={ this.handleSubmit }
            >
              <input
                type="text"
                className="h-10 w-4/5 rounded-l-lg border-none p-2 text-sm"
                data-testid="login-name-input"
                name="nameUser"
                id="nameUser"
                placeholder="Seu nome"
                onChange={ this.handleChange }
                value={ nameUser }
              />
              <button
                className="rounded-r-lg bg-secondary text-white hover:bg-gradient-to-r
              hover:from-secondary hover:to-[#00c9c9] p-2"
                type="submit"
                form="formLogin"
                data-testid="login-submit-button"
                disabled={ buttonDisabled }
                onClick={ this.userValidate }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
