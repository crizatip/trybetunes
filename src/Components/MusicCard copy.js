import React from 'react';
import PropTypes from 'prop-types';

function MusicCard() {
  const imputUpdate = () => {
    const { musicArray: musics, favorited } = props;
    const favoriteFinder = favorited.some((music) => music.trackId === musics.trackId);
    return favoriteFinder;
  };

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
          checked={ imputUpdate() }
          onChange={ (event) => handleInputChange(event, musics.trackId) }
        />
      </label>
    </>
  );
}

MusicCard.propTypes = {
  musics: PropTypes.object,
  favorited: PropTypes.array,
}.isRequired;

export default MusicCard;
