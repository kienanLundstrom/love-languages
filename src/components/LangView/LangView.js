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
        this.props.dispatch({ type: 'DELETE_LINK', payload: this.props.match.params.id})
        this.props.dispatch({ type: 'DELETE_LANGUAGES', payload: this.props.match.params.id})
        this.props.history.push('/')
        }
    }
    deleteLink = (i) =>{

        if(window.confirm('Are you sure you that like you totally want to delete this?')){
        this.props.dispatch({ type: 'DELETE_LINK', payload: this.props.reduxState.language.setLink[i].id})
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
    componentDidUpdate(prevProps){
        if(this.props.reduxState !== prevProps.reduxState){
            console.log('checking component did Update')
            this.getLanguage();
            this.getLinks();
        }
    }
    render(){
        return(
        <div>
            <div class="ui container">
                <h1 class="ui header">{this.state.Language.name}</h1>
            </div> 
        <div class="ui segment">
        <h2>Comfort Level</h2>
        <h3>{this.state.Language.comfort}</h3>
        </div>
        <div class="ui segment">
        <h2>Notes</h2>
        <h3> {this.state.Language.notes}</h3>
        </div>
        <br></br>
        <div class="ui segment">
        <h3>Useful Links</h3>
        <input type='text' placeholder="Add A Link" value={this.state.newLink.link} onChange={(event)=>this.handleNameChange(event, 'link')}/>
        <button onClick={this.addNewLink}>Add Link +</button>
        </div>
        
        <div class="ui link list">
            {this.props.reduxState.language.setLink.map((link, index)=>{
                return <div class="active item"><a class="huge item">{link.links}</a><button class="ui negative button" onClick={()=>{this.deleteLink(index)}}>Delete</button></div>
            })}
        </div>
        <button class="ui fluid button" onClick={()=>{this.props.history.push('/')}}>Back</button>
        <br></br>
        <button class="ui primary fluid button" onClick={this.edit} >Edit</button>
        <br></br>
        <button class="ui negative fluid button" onClick={this.deleteLanguage}>Delete</button>

        </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withRouter(connect(mapStateToProps)(LanguageView));