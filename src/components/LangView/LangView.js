import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Segment, Input } from 'semantic-ui-react';
import './LangView.css';
import swal from 'sweetalert';

class LanguageView extends Component{
   state = {
       Language: {},
       Links: {},
       newLink: {
           link: '',
           lang_id: this.props.match.params.id,
           user_id: this.props.reduxState.user.id,
       },
// Conditional rendering states for editing links
    toggleEdit: false,
    selectedLink: '',
    selectedId: 0,
    toggleSave: false,

   } // end state

// post link asssociated with language to database
   addNewLink = event => {
    event.preventDefault();
    this.props.dispatch({ type: 'POST_LINKS', payload: this.state.newLink})
    this.props.history.push('/');
} // end addNewLink

// Grabs all links associated with a language in database
getLinks = () =>{
    this.props.dispatch({ type: 'FETCH_LINKS', payload: this.props.match.params.id})
    this.setState({
        Links: this.props.reduxState.language.setLink
    })
} // end getLinks

// delete selected link
deleteLink = (i) =>{
    swal({
        title: "Are you sure?",
        text: "This will delete your link",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            {
                this.props.dispatch({ type: 'DELETE_LINK', payload: this.props.reduxState.language.setLink[i].id})
                this.props.history.push('/')
                }
          swal("Poof! Your link has been deleted!", {
            icon: "success",
            
          });
        } else {
          swal("Your link lives another day");
        }
      });
} // end deleteLink

// selected link changes to input
editLink = (link, i) =>{
    this.setState({
        toggleEdit: true,
        selectedLink: link,
        selectedId: i,
        toggleSave: true,
    })
 } // end editLink

 // cancel editing a link
 handleCancel = () =>{
    this.setState({
        toggleEdit: false,
        toggleSave: false,
    })
 } // end handleCancel

saveLink = (i) =>{
    console.log(i)
}

// sets state on change of input while editing a link
handleNameChange = (event, propertyName) => {
    this.setState({
        newLink: {
            ...this.state.newLink,
            [propertyName]: event.target.value, 
        }
    });
} // end handleNameChange

// Grabs all the languages in the database
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
        }// end getlanguages

// uses redux sagas to delete a language from database
    deleteLanguage = () =>{
        swal({
            title: "Are you sure?",
            text: "This will delete your language",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                {
                    this.props.dispatch({ type: 'DELETE_LINK', payload: this.props.match.params.id})
                    this.props.dispatch({ type: 'DELETE_LANGUAGES', payload: this.props.match.params.id})
                    this.props.history.push('/')
                    }
              swal("Poof! Your language has been deleted!", {
                icon: "success",
                
              });
            } else {
              swal("Your language lives another day");
            }
          });
    } // end delete language

// routes user to edit page of current selected language
    edit = () =>{
        this.props.history.push(`/edit/${this.props.match.params.id}`);
    } // end edit

// changes comfort value into a informational text associated with the value
    comfortString =(string) =>{
        if(string===1){
            return 'Not very comfortable'
        } else if(string===2){
            return 'Comfortable'
        } else if (string===3){
            return 'Love language'
        }
    } // end comfort string

// changes color of comfort section associated with comfort level 
    comfortColor =(string) =>{
        if(string===1){
            return 'red'
        } else if(string===2){
            return 'orange'
        } else if (string===3){
            return 'green'
        }
    } // end comfort color
     
  
      handleEditLink = (event) => {
         this.setState({
             selectedLink: event.target.value, 
             
         });
     }

    componentDidMount(){
        // grab language and links on page load
        this.getLanguage();
        this.getLinks();

    } // end componentDidMount

    render(){
        return(
    // display language information, and page navigation
        <div className='langInfo'>
            <Segment inverted textAlign='center'>
                <h1 class="ui header">{this.state.Language.name}</h1>
                <div className='buttons'>
                <button class="ui fluid button" onClick={()=>{this.props.history.push('/')}}>Back to all langauges</button>
                <button class="ui fluid primary button" onClick={this.edit} >Edit this langauge</button>
                <button class="ui fluid negative button" onClick={this.deleteLanguage}>Delete this Language</button>
                </div>
            </Segment>
    
        <Segment inverted color={this.comfortColor(this.state.Language.comfort)} textAlign='center'>
        <h3>Comfort Level</h3>
        <h4>{this.comfortString(this.state.Language.comfort)}</h4>
        </Segment>
        
        <Segment inverted textAlign='center'>
        <h3>Notes</h3>
        <h5> {this.state.Language.notes}</h5>
        </Segment>

        <div className='links'>
        <Segment inverted textAlign='center'>
        <h2>Useful Links</h2>
        <Input onClick={this.setLinkLandon} type='text' placeholder="Add A Link" value={this.state.newLink.link} onChange={(event)=>this.handleNameChange(event, 'link')}/>
        <button class="ui positive button" onClick={this.addNewLink}>Add Link +</button>
        <div class="ui link list">
            {this.props.reduxState.language.setLink.map((link, index)=>{
                return <div class="active item">{!this.state.toggleEdit && <a><h3>{link.links}</h3></a>}
                {this.state.toggleEdit && this.state.selectedId===index && <input onChange={this.handleEditLink} value={this.state.selectedLink}></input>}
                {!this.state.toggleSave && <button class="ui negative mini button" onClick={()=>{this.deleteLink(index)}}>Delete</button>}
                {this.state.toggleSave && <button class="ui positive mini button" onClick={()=>{this.saveLink(index)}}>Save</button>}
                {!this.state.toggleEdit && <button class="ui button mini" onClick={()=>{this.editLink(link.links, index)}}>Edit</button>}
                {this.state.toggleEdit && <button class="ui button mini" onClick={()=>{this.handleCancel(link.links, index)}}>Cancel</button>}
                </div>
            })}
        </div>
        </Segment>

        </div>
        </div>
        )
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });
  
  export default withRouter(connect(mapStateToProps)(LanguageView));