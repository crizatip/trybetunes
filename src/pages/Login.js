import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default function Login() {
  const history = useHistory();
  const [user, setUser] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const buttonValidationHandle = () => {
    if (user.length >= Number('3')) {
      return setButtonDisabled(false);
    }
    setButtonDisabled(true);
  };

  const userSubmit = async () => {
    setLoading(true);
    await createUser({ name: user });
    setLoading(false);
    history.push('/search');
  };

  const handleSubmit = (event) => {
    event.preventDefaut();
  };

  useEffect(() => {
    buttonValidationHandle();
  });

  return (
    <div>
      {loading && <Loading />}
      <form name="login" onSubmit={ handleSubmit }>
        Name:
        {' '}
        <input
          type="text"
          name="nameUser"
          value={ user }
          onChange={ ({ target }) => setUser(target.value) }
        />
        <button
          type="submit"
          form="login"
          disabled={ buttonDisabled }
          onClick={ userSubmit }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
