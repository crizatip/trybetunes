import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSearch: '',
      buttonDisabled: true,
      result: [],
      loading: false,
      currentArtist: '',
    };
  }

  searchHandler = async (searchArtist) => {
    this.setState({ loading: true });
    const artistApi = await searchAlbumsAPI(searchArtist);
    this.setState({ result: artistApi, loading: false });
  };

  buttonDisabledHandle = () => {
    const { currentSearch } = this.state;
    if (currentSearch.length >= '2') {
      this.setState({ buttonDisabled: false });
    }
  }

  handleChange = (event) => {
    this.setState(
      { currentSearch: event.target.value },
      () => {
        this.buttonDisabledHandle();
        // this.U2handle();
      },
    );
  }

  handleSubmit = (event) => {
    const { currentSearch } = this.state;
    event.preventDefault();
    console.log(currentSearch);
    this.searchHandler(currentSearch);
    this.setState({ currentArtist: currentSearch, currentSearch: '' });
  }

  render() {
    const { currentSearch, buttonDisabled, result, loading, currentArtist } = this.state;
    return (
      <>
        {loading && <Loading /> }
        <Header />
        <div data-testid="page-search">
          <form id="formSearch" onSubmit={ this.handleSubmit }>
            <input
              type="text"
              data-testid="search-artist-input"
              name="search"
              id="search"
              onChange={ this.handleChange }
              value={ currentSearch }
            />
            <button
              type="submit"
              form="formSearch"
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
            >
              Pesquisar
            </button>
          </form>
          <div>
            <p>
              {`Resultado de álbuns de: ${currentArtist}` }
            </p>
            {result.length === 0 && <p> Nenhum álbum foi encontrado </p>}
            {result.map((results, index) => (
              <Link
                key={ index }
                to={ `/album/${results.collectionId}` }
                data-testid={ `link-to-album-${results.collectionId}` }
              >
                <br />
                { results.collectionName }
                <br />
                <img src={ results.artworkUrl100 } alt="album" />

              </Link>)) }
          </div>
        </div>
      </>
    );
  }
}

export default Search;
