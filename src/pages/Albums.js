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
      albumImg: '',
      relese: '',
      loading: false,
      getFavoritesArray: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musicArray: musics,
      artistName: musics[1].artistName,
      albumName: musics[0].collectionName,
      albumImg: musics[0].artworkUrl100,
      relese: musics[0].releaseDate.split('', Number('10')),
    });
    this.dateHandle();
    this.getfavoriteHandle();
  }

  dateHandle = () => {
    const { relese } = this.state;
    const date = String(relese).split(',').join('');
    const formatDate = date.split('-').reverse().join('/');
    this.setState({
      relese: formatDate,
    });
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
    const { musicArray, artistName, albumName, loading, getFavoritesArray,
      albumImg, relese } = this.state;
    const load = 'loading...';
    const h1Style = 'font-bold text-[3em] mb-5';
    return (
      <>
        <Header />
        { loading ? <Loading /> : (
          <div
            className="mt-12 text-white flex flex-col"
            data-testid="page-album"
          >
            <div
              className="flex flex-row ml-28
             text-white mb-11"
            >

              <img
                className="mr-5  object-fill h-32 w-32"
                src={ albumImg }
                alt={ `album ${albumName}` }
              />

              <div className="my-auto">
                <div
                  className=" flex first-letter:m-auto
                text-xl  font-bold "
                  data-testid="artist-name"
                >
                  {!artistName && <p>{load}</p> }
                  <h1 className={ h1Style }>{artistName}</h1>
                </div>
                <div
                  className="flex"
                  data-testid="album-name"
                >
                  Album:
                  {!albumName && <p>{load}</p>}
                  <h1 className="ml-2">{albumName}</h1>
                </div>
                <div
                  className="flex"
                  data-testid="album-name"
                >
                  Relese date:
                  {!relese ? <p>{load}</p> : <p className="ml-2">{relese}</p>}
                </div>
              </div>
            </div>
            <h2 className="font-bold text-[2em] ml-28 mb-5">Music Preview</h2>
            <div className="m-auto mb-11 flex flex-wrap justify-center">
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
            </div>
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
