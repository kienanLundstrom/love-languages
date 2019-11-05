import { put, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';

// get request for languages
function* fetchLanguages(){
    try{
        const response = yield Axios.get('/api/languages')
        yield put({ type: 'SET_LANGUAGES', payload: response.data})
    }catch (error){
        console.log( 'error in fetchLanguages saga', error)
    }
} // end fetchLanguages

// get request for links 
function* fetchLinks(action){
    try{
        const response = yield Axios.get('/api/links/' + action.payload);
        yield put({ type: 'SET_LINKS', payload: response.data})
    }catch (error){
        console.log( 'error in fetchLinks saga', error)
    }
} // end fetchLinks

// post request for links to database
function* postLinks(action){
    try{
        yield Axios.post('/api/links', action.payload)
        console.log('postLinks console', action.payload)
    }catch (error){
        console.log(error)
    }
} // end postLinks

// post request for new language
function* postLanguages(action){
    try{
        yield Axios.post('/api/languages', action.payload)
        yield put({ type: 'FETCH_LANGUAGES'})
    }catch (error){
        console.log(error)
    }
} // end postLanguages

// put request for upodating a language
function* updateLanguage(action){
    try {
      yield Axios.put('/api/languages', action.payload);
      yield put({type: 'FETCH_LANGUAGES'})
      console.log('PUT REQ:',action.payload)
    } catch (err){
      console.log('PUT ERROR:',err);
    }
  } // end updateLanguage

// delete request for language
function* deleteLanguages(action){
    try{
        yield Axios.delete('/api/languages/' + action.payload)
        yield put({ type: 'FETCH_LANGUAGES'})
    }catch (error){
        console.log(error)
    }
} // end deleteLanguages

// delete request for link
function* deleteLink(action){
    try{
        yield Axios.delete('/api/links/' + action.payload)
    }catch (error){
        console.log(error)
    }
} // end deleteLink




function* languageSaga(){
    try{ 
        yield takeLatest('FETCH_LANGUAGES', fetchLanguages)
        yield takeLatest('FETCH_LINKS', fetchLinks)
        yield takeLatest('POST_LINKS', postLinks)
        yield takeLatest('DELETE_LINK', deleteLink)
        yield takeLatest('POST_LANGUAGES', postLanguages)
        yield takeLatest('DELETE_LANGUAGES', deleteLanguages)
        yield takeLatest('UPDATE_LANGUAGE', updateLanguage)
    }catch (error){
        console.log(error)
    }
}

export default languageSaga;