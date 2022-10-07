import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../Components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Albums extends React.Component {
  constructor() {
    super();

    this.state = {
      musicArray: [],
      artistName: '',
      albumName: '',
      loading: false,
      getFavoritesArray: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ musicArray: musics });
    this.getfavoriteHandle();
  }

  getfavoriteHandle = async () => {
    const getFav = await getFavoriteSongs();
    this.setState({ getFavoritesArray: getFav, loading: false });
  }

  removeHande = async (music) => {
    this.setState({ loading: true });
    await removeSong(music);
    this.getfavoriteHandle();
    // this.setState({ loading: false });
  }

  handleInputChange = (event, trackId) => {
    const { target } = event;
    const { checked } = target;
    const { musicArray, getFavoritesArray } = this.state;
    if (checked) {
      const [a] = musicArray.filter((song) => song.trackId === trackId);
      console.log(trackId);
      this.favHandle(a);
    } else {
      const b = getFavoritesArray.filter((song) => song.trackId === trackId);
      console.log(b[0]);
      console.log(getFavoritesArray);
      this.removeHande(b[0]);
    }
  }

  favHandle = async (trackId) => {
    this.setState({ loading: true });
    console.log(trackId);
    await addSong(trackId);
    this.getfavoriteHandle();
    // this.setState({ loading: false });
  }

  render() {
    const { musicArray, artistName, albumName, loading, getFavoritesArray } = this.state;
    return (
      <>
        <Header />
        { loading ? <Loading /> : (
          <div data-testid="page-album">
            <div data-testid="artist-name">
              {!artistName && <p>Artist Name</p> }
            </div>
            <div data-testid="album-name">
              {!albumName && <p>Collection Name</p>}
            </div>
            {musicArray.map((musics, index) => (
              index > 0 && (
                <div
                  key={ index }
                >
                  <MusicCard
                    musicArray={ musics }
                    favorited={ getFavoritesArray }
                    handleInputChange={ this.handleInputChange }
                  />
                </div> /* */)
            ))}

          </div>)}
      </>
    );
  }
}

Albums.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;

export default Albums;
