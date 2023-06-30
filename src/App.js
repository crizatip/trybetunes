import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Albums from './pages/Albums';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
// import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (

      <BrowserRouter>

        <Route exact path="/">
          <Redirect to="/trybetunes" />
        </Route>
        <Route path="/trybetunes/search" component={ Search } />
        <Route
          exact
          path="/trybetunes/album/:id"
          render={ (props) => <Albums { ...props } id="id" /> }
        />
        <Route exact path="/trybetunes" component={ Login } />
        <Route path="/trybetunes/favorites" component={ Favorites } />
        <Route exact path="/trybetunes/profile" component={ Profile } />
        <Route exact path="/trybetunes/profile/edit" component={ ProfileEdit } />

      </BrowserRouter>
    );
  }
}

export default App;
