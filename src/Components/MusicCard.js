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
  const { musicArray: musics } = this.props;
  return (
    <div className=" flex flex-col mb-8 bg-white text-bgColor p-5 rounded-lg mx-8">
      <p className="overflow-hidden truncate mb-3">
        { musics.trackName }
      </p>
      <div
        className="flex"
      >
        <img
          src={ musics.artworkUrl60 }
          alt=""
        />
        <audio
          className="ml-3"
          data-testid="audio-component"
          src={ musics.previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
        </audio>
      </div>
      {/* <label
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
      </label> */}
    </div>
  );
}
}

MusicCard.propTypes = {
  musics: PropTypes.object,
  favorited: PropTypes.array,
}.isRequired;

export default MusicCard;
