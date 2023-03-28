import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

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
    const { images: image } = this.state;
    if (
      name && email && description && image) {
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
        {loading && <Loading /> }
        <Header />
        {!loading
        && (
          <>
            <div data-testid="page-profile-edit" />
            <form id="formUser" onSubmit={ this.handleSubmit }>
              <input
                type="text"
                data-testid="edit-input-name"
                name="names"
                value={ name }
                onChange={ this.onInputChange }
              />
              <input
                type="text"
                data-testid="edit-input-email"
                name="emails"
                value={ email }
                onChange={ this.onInputChange }
              />
              <input
                type="textarea"
                data-testid="edit-input-description"
                name="descriptions"
                value={ description }
                onChange={ this.onInputChange }
              />
              <input
                type="text"
                data-testid="edit-input-image"
                name="images"
                value={ image }
                onChange={ this.onInputChange }
              />
            </form>
            <button
              type="submit"
              form="formUser"
              data-testid="edit-button-save"
              disabled={ disabled }
            >
              {' '}
              Editar perfil
              {' '}

            </button>
            { redirect && <Redirect to="/profile" /> }
          </>)}
      </>
    );
  }
}
export default ProfileEdit;
