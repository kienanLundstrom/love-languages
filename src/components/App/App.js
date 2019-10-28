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
          
          <div className='purpleRain'>
          <P5Wrapper
                  sketch={purpleRain}>
          </P5Wrapper>
          </div>
          <Nav/>
          <Switch>
            <Redirect exact from="/" to="/home" />
  
            <ProtectedRoute
              exact
              path="/home"
              component={LangList}
            />

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
