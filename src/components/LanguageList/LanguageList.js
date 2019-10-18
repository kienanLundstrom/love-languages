import React, { Component } from 'react';
import LangItem from '../LangItem/LangItem';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


class LangList extends Component{
    
    getLang = () =>{
        this.props.dispatch({ type: 'FETCH_LANGUAGES'})
    }
componentDidMount(){
    this.getLang();
}
    render(){
        return(
        <div>
                {this.props.reduxState.language.setLanguageReducer.map((lang)=>
                    <LangItem
                    lang={lang}
                    getLang={this.getLang}
                    />
                )}
                <br></br>
                <button onClick={()=>this.props.history.push(`/addNewLanguage`)}>+ New Language</button>
        </div>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default withRouter(connect(mapStateToProps)(LangList));