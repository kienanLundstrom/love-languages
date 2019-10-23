import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';

class LanguageView extends Component{
   state = {
       Language: {},
       Links: {},
       newLink: {
           link: '',
           lang_id: this.props.match.params.id,
           user_id: this.props.reduxState.user.id,
       }
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
    getLinks = () =>{
        this.props.dispatch({ type: 'FETCH_LINKS', payload: this.props.match.params.id})
        this.setState({
            Links: this.props.reduxState.language.setLink
        })
    }
    deleteLanguage = () =>{
        if(window.confirm('Are you sure you that like you totally want to delete this?')){
       this.props.dispatch({ type: 'DELETE_LANGUAGES', payload: this.props.match.params.id})
        this.props.history.push('/')
        }
    }
    edit = () =>{
        this.props.history.push(`/edit/${this.props.match.params.id}`);
    }
    handleNameChange = (event, propertyName) => {
        this.setState({
            newLink: {
                ...this.state.newLink,
                [propertyName]: event.target.value, 
            }
        });
    }
    addNewLink = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'POST_LINKS', payload: this.state.newLink})
        this.props.history.push('/');
    }


    componentDidMount(){
        this.getLanguage();
        this.getLinks();
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
        <h3>Useful Links</h3>
        <input type='text' placeholder="Add A Link" value={this.state.newLink.link} onChange={(event)=>this.handleNameChange(event, 'link')}/>
        <button onClick={this.addNewLink}>Add Link +</button>
        <ul>
            {this.props.reduxState.language.setLink.map((link)=>{
                return <li><a href={link.links}>{link.links}</a></li>
            })}
        </ul>
        <button onClick={this.deleteLanguage}>Delete</button>
        <br></br>
        <button onClick={this.edit} >Edit</button>
        <br></br>
        <button onClick={()=>{this.props.history.push('/')}}>Back</button>
        </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withRouter(connect(mapStateToProps)(LanguageView));