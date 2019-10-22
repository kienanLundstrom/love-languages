import { combineReducers } from 'redux';




const setLanguageReducer = (state=[], action)=>{
    switch(action.type){
        case 'SET_LANGUAGES':
          return action.payload
        default:
          return state
      }
}
const setLink = (state=[], action)=>{
  switch(action.type){
    case 'SET_LINKS':
      return action.payload
      default:
        return state
  }
}
export default combineReducers({
    setLanguageReducer,
    setLink,
    
});