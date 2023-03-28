import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

function Search() {
  const [currentSearch, setCurrentSearch] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentArtist, setCurrentArtist] = useState('');

  const searchHandler = async (searchArtist) => {
    setLoading(true);
    const artistApi = await searchAlbumsAPI(searchArtist);
    setResult(artistApi);
    setLoading(false);
  };

  const buttonDisabledHandle = () => {
    if (currentSearch.length >= '2') {
      setButtonDisabled(false);
    }
  };

  const handleChange = (event) => {
    setCurrentSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchHandler(currentSearch);
    setCurrentArtist(currentSearch);
    setCurrentSearch('');
  };

  useEffect(() => {
    buttonDisabledHandle();
  });

  return (
    <>
      {loading && <Loading /> }
      <Header />
      <div data-testid="page-search">
        <form id="formSearch" onSubmit={ handleSubmit }>
          <input
            type="text"
            data-testid="search-artist-input"
            name="search"
            id="search"
            onChange={ handleChange }
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

export default Search;
