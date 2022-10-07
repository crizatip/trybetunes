import React from 'react';
import PropTypes from 'prop-types';
// import Loading from '../pages/Loading';
// import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      // favorite: false,
      // loading: false,
      // FavoritesArray: [],
    };
  }

  // handleInputChange = (event) => {
  //   const { musicArray: musics } = this.props;
  //   const { target } = event;
  //   const { checked } = target;

  //   if (checked) {
  //     this.setState({ favorite: true });
  //     this.favHandle(musics);
  //   } else {
  //     this.setState({ favorite: false });
  //   }
  //   this.getfavoriteHandle();
  // }

  // favHandle = async (song) => {
  //   this.setState({ loading: true });
  //   await addSong(song);
  //   this.setState({ loading: false });
  // }

  // getfavoriteHandle = async () => {
  //   const getFav = await getFavoriteSongs();
  //   this.setState({ FavoritesArray: getFav });
  //   this.imputUpdate();
  // }

imputUpdate = () => {
  const { musicArray: musics, favorited } = this.props;
  const favoriteFinder = favorited.some((music) => music.trackId === musics.trackId);
  return favoriteFinder;
}

render() {
  // const { musicArray: favorite, loading } = this.state;
  const { musicArray: musics, handleInputChange } = this.props;
  return (
    <>
      <li>{ musics.trackName }</li>
      <audio data-testid="audio-component" src={ musics.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
      </audio>
      <label
        htmlFor="favorites"
      >
        Favorita
        <input
          data-testid={ `checkbox-music-${musics.trackId}` }
          type="checkbox"
          value={ musics.trackId }
          checked={ this.imputUpdate() }
          onChange={ (event) => handleInputChange(event, musics.trackId) }
        />
      </label>
    </>
  );
}
}

MusicCard.propTypes = {
  musics: PropTypes.object,
  favorited: PropTypes.array,
}.isRequired;

export default MusicCard;
