import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search copy';
import Albums from './pages/Albums';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
// import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route
          exact
          path="/album/:id"
          render={ (props) => <Albums { ...props } id="id" /> }
        />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
      </BrowserRouter>);
  }
}

export default App;
