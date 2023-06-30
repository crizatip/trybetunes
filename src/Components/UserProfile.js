import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import profile from '../public/profile.png';

class MainTitle extends React.Component {
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
    const styleProfileContent = `flex flex-col text-bgColor bg-white 
     p-10 rounded-lg m-auto; justify-center items-center`;
    return (
      <div className={ styleProfileContent } data-testid="page-profile">
        <div>
          <p className="font-bold text-[2em]">{userData.name}</p>
        </div>
        { userData.image ? <img
          className="rounded-full h-60 m-5"
          src={ userData.image }
          alt="Sua Imagem"
        />
          : <img className="rounded-full h-60 m-5" src={ profile } alt="empty" /> }
        { loading && <p className="mt-4">Carregando...</p> }
        {!loading && <span className="font-bold">Email: </span>}
        <p>{userData.email}</p>
        <p
          className="mt-2 overflow-hidden
        mx-auto truncate w-[400px] text-center"
        >
          {!loading && <span className="font-bold">description: </span>}
          <br />
          {userData.description}
        </p>
        <button
          className=" mt-5 rounded-lg bg-secondary text-white hover:bg-gradient-to-r
                hover:from-secondary hover:to-[#00c9c9] p-2"
          type="button"
        >
          <Link to="/trybetunes/profile/edit"> Editar perfil </Link>
        </button>
      </div>
    );
  }
}

export default MainTitle;
