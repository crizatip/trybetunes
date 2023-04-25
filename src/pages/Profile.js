import React from 'react';
import Header from './Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import UserProfile from '../Components/UserProfile';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserHandle();
  }

  getUserHandle = async () => {
    this.setState({ loading: true });
    await getUser();
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <Header />
        <div className="flex m-auto h-screen w-screen justify-center items-center">
          { loading
            ? <Loading />
            : <UserProfile />}
        </div>
      </div>
    );
  }
}

export default Profile;
