import { put, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';

function* fetchLanguages(){
    try{
        const response = yield Axios.get('/api/languages')
        yield put({ type: 'SET_LANGUAGES', payload: response.data})
    }catch (error){
        console.log( 'error in fetchLanguages saga', error)
    }
}
function* fetchLinks(action){
    try{
        const response = yield Axios.get('/api/links/' + action.payload);
        yield put({ type: 'SET_LINKS', payload: response.data})
    }catch (error){
        console.log( 'error in fetchLinks saga', error)
    }
}

function* postLanguages(action){
    try{
        yield Axios.post('/api/languages', action.payload)
        yield put({ type: 'FETCH_LANGUAGES'})
    }catch (error){
        console.log(error)
    }
}
function* updateLanguage(action){
    try {
      yield Axios.put('/api/languages', action.payload);
      yield put({type: 'FETCH_LANGUAGES'})
      console.log('PUT REQ:',action.payload)
    } catch (err){
      console.log('PUT ERROR:',err);
    }
  }
function* deleteLanguages(action){
    try{
        yield Axios.delete('/api/languages/' + action.payload)
        yield put({ type: 'FETCH_LANGUAGES'})
    }catch (error){
        console.log(error)
    }
}




function* languageSaga(){
    try{ 
        yield takeLatest('FETCH_LANGUAGES', fetchLanguages)
        yield takeLatest('FETCH_LINKS', fetchLinks)
        yield takeLatest('POST_LANGUAGES', postLanguages)
        yield takeLatest('DELETE_LANGUAGES', deleteLanguages)
        yield takeLatest('UPDATE_LANGUAGE', updateLanguage);
    }catch (error){
        console.log(error)
    }
}








export default languageSaga;