import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class LanguageView extends Component{
   state = {
       Language: {},
   }
    getLanguage = () =>{
        Axios.get('/api/languages/' + [this.props.match.params.id])
            .then((response)=>{
                console.log('get: /api/languages', response)
                this.setState({
                    Language: response.data[0]
                })
            }).catch((error)=>{
                console.log('error in /api/langauges/', error)
            })
        }
    deleteLanguage = () =>{
        if(window.confirm('Are you sure you want to delete?')){
       this.props.dispatch({ type: 'DELETE_LANGUAGES', payload: this.props.match.params.id})
        this.props.history.push('/')
        }
    }
    edit = () =>{
        this.props.history.push(`/edit/${this.props.match.params.id}`);
    }
    


    componentDidMount(){
        this.getLanguage();
    }
    render(){
        return(
        <div>
        <p>{JSON.stringify(this.state.Language)}</p>
        <h1>{this.state.Language.name}</h1>
        <h2>Comfort Level</h2>
        <h3>{this.state.Language.comfort}</h3>
        <h2>Notes</h2>
        <h3> {this.state.Language.notes}</h3>
        <br></br>
        <button onClick={this.deleteLanguage}>Delete</button>
        <br></br>
        <button onClick={this.edit}>Edit</button>
        <p>{JSON.stringify(this.props.reduxState.infoPlants)}</p>

        </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withRouter(connect(mapStateToProps)(LanguageView));