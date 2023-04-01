import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

function Header() {
  const [user, setUser] = useState('');

  const getUserHandler = async () => {
    await getUser().then((userByApi) => setUser(userByApi));
  };

  useEffect(() => {
    getUserHandler();
  });

  return (
    <header data-testid="header-component">
      <Link exact to="/search" data-testid="link-to-search"> search </Link>
      <Link exact to="/favorites" data-testid="link-to-favorites"> favorites </Link>
      <Link exact to="/profile" data-testid="link-to-profile"> profile </Link>
      <div data-testid="header-user-name">
        {user.length === 0 && <Loading /> }
        {user.name}
      </div>
    </header>
  );
}

export default Header;
