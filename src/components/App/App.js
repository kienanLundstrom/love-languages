import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import LanguageView from '../LangView/LangView';
import './App.css';
import LangList from '../LanguageList/LanguageList';
import NewLanguageForm from '../NewLanguageForm/NewLanguageForm';
import EditLanguage from '../EditLanguage/EditLanguage';
import purpleRain from '../fallingRain/fallingRain';
import P5Wrapper from 'react-p5-wrapper';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className='purpleRain'>
          <P5Wrapper
                  sketch={purpleRain}>
          </P5Wrapper>
          </div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
  
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={LangList}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/languages/:id"
              render={({match})=><LanguageView match={match}/>}/>
            />
            <ProtectedRoute
              exact
              path="/addNewLanguage"
              component={NewLanguageForm}
            />
               <ProtectedRoute
              exact
              path="/editLanguage"
              component={EditLanguage}
            />
            <Route path='/edit/:id' render={({match})=><EditLanguage match={match}/>}/>

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
            
         
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
