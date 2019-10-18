import React, { Component } from 'react';
import Axios from 'axios';
import LangItem from '../LangItem/LangItem';
import { withRouter } from 'react-router-dom';


class LangList extends Component{
    state = {
        langList : [],
    }
    getLang = () =>{
    Axios.get('/api/languages')
        .then((response)=>{
            console.log('get: /api/languages', response)
            this.setState({
                langList: response.data
            })
        }).catch((error)=>{
            console.log('error in /api/langauges/', error)
        })
    }
componentDidMount(){
    this.getLang();
}
    render(){
        return(
        <div>
                {this.state.langList.map((lang)=>
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
export default withRouter(LangList);