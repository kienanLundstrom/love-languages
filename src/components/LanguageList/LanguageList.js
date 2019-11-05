import React, { Component } from 'react';
import LangItem from '../LangItem/LangItem';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card } from 'semantic-ui-react';
import "./LanguageList.css";

class LangList extends Component{
// grabs all languages from database using saga
    getLang = () =>{
        this.props.dispatch({ type: 'FETCH_LANGUAGES'})
    } // end getlang

componentDidMount(){
    this.getLang();
}
    render(){
        return(
// map through languages and display wit cards using semantic-ui       
        <div>
            <div className="cardG">
            <Card.Group textAlign="left">
                {this.props.reduxState.language.setLanguageReducer.map((lang)=>
                    <LangItem
                    lang={lang}
                    getLang={this.getLang}
                    />
                )}
                <br></br>
                </Card.Group>
                </div>
                <div className='buttons'>
                <button class='ui massive purple button' onClick={()=>this.props.history.push(`/addNewLanguage`)}>+ New Language</button>
                </div>
        </div>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default withRouter(connect(mapStateToProps)(LangList));