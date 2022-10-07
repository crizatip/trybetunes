import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserHandle();
  }

  getUserHandle = async () => {
    this.setState({ loading: true });
    const userInformation = await getUser();
    this.setState({ userData: userInformation });
    this.setState({ loading: false });
  }

  render() {
    const { userData, loading } = this.state;
    return (
      <>
        <div data-testid="page-profile" />
        <Header />
        { loading && <Loading />}
        <p>{userData.name}</p>
        <img
          data-testid="profile-image"
          src={ userData.image }
          alt="Sua Imagem de Perfil"
        />
        <p>{userData.email}</p>
        <p>{userData.description}</p>
        <Link to="/profile/edit"> Editar perfil </Link>
      </>
    );
  }
}

export default Profile;
