const languagesReducer = (state=[], action)=>{
    switch(action.type){
        case 'FETCH_LANGUAGES':
          return action.payload
        default:
          return state
      }
}
export default languagesReducer;