import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import profileIcon from '../public/user.png';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      nameUser: '',
      imageUser: '',
    };
  }

  getUserHandler = async () => {
    const { nameUser } = this.state;
    if (nameUser === '') {
      getUser().then((user) => {
        this.setState({ nameUser: user.name, imageUser: user.image });
      });
    }
  };

  render() {
    this.getUserHandler();
    const { nameUser, imageUser } = this.state;
    return (

      <header
        className="p-3 bg-secondary flex flex-row text-white
        text-l items-center justify-between"
        data-testid="header-component"
      >
        <div className="ml-5">
          <Link
            className="hover:text-quaternary  mx-4"
            exact
            to="/search"
            data-testid="link-to-search"
          >
            search
          </Link>
          {/* Em construção */}
          {/* <Link
              className="hover:text-quaternary  mx-4"
            exact
            to="/favorites"
            data-testid="link-to-favorites"
          >
            favorites
          </Link> */}
          <Link
            className="hover:text-quaternary  mx-4"
            exact
            to="/profile"
            data-testid="link-to-profile"
          >
            profile
          </Link>
        </div>
        <div
          className="mr-5 p-2 px-5 rounded-full flex-end bg-white
           text-tertiary flex flex-row justify-between"
          data-testid="header-user-name"
        >
          {imageUser.length === 0 ? <img
            className="h-5 mr-3"
            src={ profileIcon }
            alt="Icone de perfil"
          /> : <img
            className="h-7 mr-3 rounded-full"
            src={ imageUser }
            alt="Sua Imagem de Perfil"
          /> }
          {nameUser.length === 0 && <div>carregando</div> }
          <span
            className="flex flex-col justify-items-center"
          >
            {nameUser}

          </span>
        </div>
      </header>
    );
  }
}

export default Header;
