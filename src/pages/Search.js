import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import MainTitle from '../Components/MainTitle';
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
        <div className="fixed w-screen">
          <Header />
        </div>
        <div
          className=" flex flex-col w-screen
          h-screen"
          data-testid="page-search"
        >

          <div
            className="flex flex-row items-center
            justify-center my-auto mx-auto pt-40 pb-20 px-20 flex-wrap w-[600px]"
          >
            {loading ? <div className="p-20"><Loading /></div> : <MainTitle />}
            <form id="formSearch" onSubmit={ this.handleSubmit }>
              <input
                className="h-10 w-80 rounded-l-lg border-none p-2 text-sm"
                type="text"
                data-testid="search-artist-input"
                name="search"
                id="search"
                onChange={ this.handleChange }
                value={ currentSearch }
              />
            </form>
            <button
              className="rounded-r-lg bg-secondary text-white hover:bg-gradient-to-r
               hover:from-secondary hover:to-[#00c9c9] p-2"
              type="submit"
              form="formSearch"
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
            >
              Pesquisar
            </button>
            <div className="text-white mt-5">
              <p>
                {`Resultado de álbuns de: ${currentArtist}` }
              </p>
              {result.length === 0 && <p> Nenhum álbum foi encontrado </p>}
            </div>
          </div>
          <div className="flex flex-wrap items-center w-[1500px] mx-auto">
            {result.map((results, index) => (
              <div
                className=" flex h-60 w-60  rounded-lg
                m-5 bg-white
                text-black justify-around items-center
                hover:scale-95 hover:opacity-90"
                key={ index }
              >
                <Link
                  to={ `/album/${results.collectionId}` }
                  data-testid={ `link-to-album-${results.collectionId}` }
                >
                  <br />
                  <img
                    className="w-30 h-30 mx-auto"
                    src={ results.artworkUrl100 }
                    alt="album"
                  />
                  <br />
                  <div className="text-center overflow-hidden mx-auto truncate w-40">
                    { results.collectionName }
                  </div>
                </Link>
              </div>)) }
          </div>
        </div>
      </>
    );
  }
}

export default Search;
