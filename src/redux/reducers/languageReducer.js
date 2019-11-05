import { combineReducers } from 'redux';

// sets redux state for new language
const setLanguageReducer = (state=[], action)=>{
    switch(action.type){
        case 'SET_LANGUAGES':
          return action.payload
        default:
          return state
      }
} // end setLanguages

// set redux state for new link to be added
const setLink = (state=[], action)=>{
  switch(action.type){
    case 'SET_LINKS':
      return action.payload
      default:
        return state
  }
} // end setLink

export default combineReducers({
    setLanguageReducer,
    setLink,
    
});