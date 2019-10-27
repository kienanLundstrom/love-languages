import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';
import './LangView.css';

class LanguageView extends Component{
   state = {
       Language: {},
       Links: {},
       newLink: {
           link: '',
           lang_id: this.props.match.params.id,
           user_id: this.props.reduxState.user.id,
       },

   }
   addNewLink = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'POST_LINKS', payload: this.state.newLink})
    this.props.history.push('/');
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
    comfortString =(string) =>{
        if(string===1){
            return 'Not very comfortable'
        } else if(string===2){
            return 'Comfortable'
        } else if (string===3){
            return 'Love language'
        }
    }


    componentDidMount(){
        this.getLanguage();
        this.getLinks();
    }
  
    render(){
        return(
        <div className='langInfo'>
            <Segment inverted textAlign='center'>
                <h1 class="ui header">{this.state.Language.name}</h1>
            </Segment>
        <Segment inverted textAlign='center'>
        <h3>Comfort Level</h3>
        <h4>{this.comfortString(this.state.Language.comfort)}</h4>
        </Segment>
        
        <Segment inverted textAlign='center'>
        <h3>Notes</h3>
        <h5> {this.state.Language.notes}</h5>
        </Segment>
        <br></br>

        <div className='links'>
        <h3>Useful Links</h3>
        <input type='text' placeholder="Add A Link" value={this.state.newLink.link} onChange={(event)=>this.handleNameChange(event, 'link')}/>
        <button onClick={this.addNewLink}>Add Link +</button>
        </div>

        <div className='buttons'>
        <button class="ui button" onClick={()=>{this.props.history.push('/')}}>Back</button>
        
        <button class="ui primary button" onClick={this.edit} >Edit</button>
        
        <button class="ui negative button" onClick={this.deleteLanguage}>Delete</button>
        </div>
        </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withRouter(connect(mapStateToProps)(LanguageView));