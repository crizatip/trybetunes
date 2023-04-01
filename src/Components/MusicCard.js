import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }

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
