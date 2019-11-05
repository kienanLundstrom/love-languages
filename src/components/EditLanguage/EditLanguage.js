import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import Axios from 'axios';
import { Segment, Form, TextArea } from 'semantic-ui-react';
import swal from 'sweetalert';

class EditLanguage extends Component{

    state = {
        Language: { },
        Links: {
            link: '',
        },
    }

// axios request to grab the seleced language from database
     getLanguage = () =>{
         this.props.dispatch({ type: 'ONE_LANGUAGE', payload: this.props.match.params.id })
         Axios.get('/api/languages/' + [this.props.match.params.id])
             .then((response)=>{
                 console.log('get: /api/languages', response)
                 this.setState({
                     Language: response.data[0]
                 })
             }).catch((error)=>{
                 console.log('error in /api/langauges/', error)
             })
         } // end getLanguage
         
// grabs all links using a saga associated with this language
        getLinks = () =>{
            this.props.dispatch({ type: 'FETCH_LINKS', payload: this.props.match.params.id})
            this.setState({
                Links: this.props.reduxState.language.setLink
            })
        } // end getLinks 

// sets state for changes made to the language
handleChange = (event, propertyName ) =>{
    this.setState({
        Language: {
            ...this.state.Language,
            [propertyName]: event.target.value,
        }
    })
} // end handleChange

// asks if the user wants to save the changes they made, then uses a saga to update the language
handleSubmit = () =>{
    swal({
        title: "Are you sure?",
        text: "This will save your changes and previous information will be updated",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            {
                this.props.dispatch({ type: 'UPDATE_LANGUAGE', payload: this.state.Language}); 
                this.props.history.push(`/languages/${this.state.Language.id}`)
                }
          swal("Poof! Your language has been updated!", {
            icon: "success",
            
          });
        } else {
          swal("Your language has no changes");
        }
      });
} // end handleSubmit

componentDidMount(){
    this.getLanguage();
    this.getLinks();
    console.log('logging links', this.state.Language.links)
}


    render(){
        return(
            <div>
                <Segment inverted textAlign='center'>
                <h2>Name of Language</h2>
                <Form>
                <TextArea rows='1' onChange={(event)=>this.handleChange( event, 'name' )} value={this.state.Language.name} />
                <br></br>
                </Form>
                </Segment>
                <Segment inverted color={this.state.Language.comfort} textAlign='center'>
                <h3>Comfort Level</h3>
                <select value={this.state.Language.comfort} onChange={(event)=>this.handleChange(event, 'comfort')}>
                        <option value='1'>Not very Comfortable</option>
                        <option value='2'>Comfortable</option>
                        <option value='3'>Very Comfortable</option>
                    </select>
                    </Segment>
                <Segment inverted textAlign='center'>
                <h3>Notes</h3>
                <Form>
                <TextArea rows='9'  onChange={(event)=>this.handleChange( event, 'notes' )} value={this.state.Language.notes} />
                </Form>
                </Segment>
                <div className='buttons'>
                <button class='ui positive button' onClick = {this.handleSubmit}>Submit Changes</button>
                <button class='ui negative button' onClick={()=>this.props.history.push(`/languages/${this.state.Language.id}`)}>Back</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(EditLanguage));