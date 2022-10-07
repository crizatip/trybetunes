import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
    };
  }

  getUserHandler = async () => {
    const { nameUser } = this.state;
    if (nameUser === '') {
      getUser().then((user) => {
        this.setState({ nameUser: user.name });
      });
    }
  };

  render() {
    this.getUserHandler();
    const { nameUser } = this.state;
    return (

      <header data-testid="header-component">
        <Link exact to="/search" data-testid="link-to-search"> search </Link>
        <Link exact to="/favorites" data-testid="link-to-favorites"> favorites </Link>
        <Link exact to="/profile" data-testid="link-to-profile"> profile </Link>
        <div data-testid="header-user-name">
          {nameUser.length === 0 && <Loading />}
          {nameUser}
        </div>
      </header>
    );
  }
}

export default Header;
