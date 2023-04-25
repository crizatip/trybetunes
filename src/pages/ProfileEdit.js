import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import profile from '../public/profile.png';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: [],
      names: '',
      emails: '',
      descriptions: '',
      images: '',
      disabled: false,
    };
  }

  componentDidMount() {
    this.getUserHandle();
  }

  buttonTestsDisabled = () => {
    const { names: name, emails: email, descriptions: description } = this.state;
    if (
      name && email && description.length <= Number('50')) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  dataPick = () => {
    const { userData } = this.state;
    console.log(userData.image);
    this.setState({
      names: userData.name,
      emails: userData.email,
      descriptions: userData.description,
      images: userData.image,
    });
  }

  updateUserHandler = async () => {
    const { userData } = this.state;
    await updateUser(userData);
  }

  getUserHandle = async () => {
    this.setState({ loading: true });
    const userInformation = await getUser();
    this.setState({ userData: userInformation });
    this.dataPick();
    this.setState({ loading: false });
  }

  onInputChange = async ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value },
      () => {
        this.buttonTestsDisabled();
        this.newUserAdd();
      });
  }

  newUserAdd = () => {
    const { names, emails, descriptions, images } = this.state;
    this.setState({
      userData: {
        name: names,
        email: emails,
        image: images,
        description: descriptions,
      } });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.updateUserHandler();
    this.setState({ redirect: true });
  }

  render() {
    const { loading, names: name, emails: email, descriptions: description,
      images: image, disabled, redirect } = this.state;
    return (

      <>
        <Header />
        <div className="h-screen w-screen">
          <div className="flex m-auto h-screen w-screen justify-center items-center">
            {loading && <Loading /> }
            {!loading
          && (
            <>
              <div>
                {!image
                && <img
                  className="rounded-full h-60 mb-9 mr-9"
                  src={ profile }
                  alt="placeholder"
                />}
                {image && <img
                  className="rounded-full h-60 mb-9 mr-9"
                  src={ image }
                  alt="your profile"
                />}
              </div>
              <div
                className="bg-black"
                data-testid="page-profile-edit"
              />
              <form
                className="flex flex-col justify-center align-middle"
                id="formUser"
                onSubmit={ this.handleSubmit }
              >
                {description.length > Number('50')
                 && <p className="text-[#ff3075] mx-auto mb-5">Too Long description</p>}
                {!name
                 && <p className="text-[#ff3075] mx-auto mb-5">Must Have a Username</p>}
                {!email
                 && <p className="text-[#ff3075] mx-auto mb-5">Must Have a email</p>}
                <input
                  className="h-10 w-80 rounded-full mb-5 border-none p-2 text-sm mx-auto"
                  type="text"
                  data-testid="edit-input-name"
                  name="names"
                  value={ name }
                  placeholder="Your username"
                  onChange={ this.onInputChange }
                />
                <input
                  className="h-10 w-80 rounded-full mb-5 border-none p-2 text-sm mx-auto"
                  type="text"
                  data-testid="edit-input-email"
                  name="emails"
                  placeholder="Your e-mail"
                  value={ email }
                  onChange={ this.onInputChange }
                />
                <input
                  className="h-10 w-80 rounded-full mb-5 border-none p-2 text-sm mx-auto"
                  type="textarea"
                  data-testid="edit-input-description"
                  name="descriptions"
                  placeholder="Brief description"
                  value={ description }
                  onChange={ this.onInputChange }
                />
                <input
                  className="h-10 w-80 rounded-full mb-5 border-none p-2 text-sm mx-auto"
                  type="text"
                  data-testid="edit-input-image"
                  placeholder="Url for your profile picture"
                  name="images"
                  value={ image }
                  onChange={ this.onInputChange }
                />
                <button
                  className="h-10 w-80 rounded-full
                  mb-5 border-none text-sm bg-secondary hover:bg-gradient-to-r mx-auto
                  hover:from-secondary hover:to-[#00c9c9] p-2 font-bold text-white"
                  type="submit"
                  form="formUser"
                  data-testid="edit-button-save"
                  disabled={ disabled }
                >
                  {' '}
                  Edit Profile
                  {' '}
                </button>
                { redirect && <Redirect to="/profile" /> }
              </form>
            </>)}
          </div>
        </div>
      </>
    );
  }
}
export default ProfileEdit;
