import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import language from './languageReducer';

// rootReducer is the primary reducer for this entire project
// It bundles up all of the other reducers so this project can use them.
// This is imported in index.js as rootSaga

//  make a bigger object for our store, with the objects from the reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
language,
});

export default rootReducer;
