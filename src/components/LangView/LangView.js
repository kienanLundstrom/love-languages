import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

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
        Axios.delete('/api/languages/' + [this.props.match.params.id])
        .then((response)=>{
            console.log('get: /api/languages', response)
            this.setState({
                Language: response.data[0]
            })
        }).catch((error)=>{
            console.log('error in /api/langauges/', error)
        })
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
        </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default connect(mapStateToProps)(LanguageView);