import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewLanguageForm extends Component{
    state = {
        newLanguage: {
            name: '',
            comfort: '1',
            notes: '',
            user: this.props.reduxState.user.id,
        },
    }

// grabs users inputs for new language and stores in local state    
    handleNameChange = (event, propertyName) => {
        this.setState({
            newLanguage: {
                ...this.state.newLanguage,
                [propertyName]: event.target.value, 
            }
        });
    } // end handleNameChange

// uses saga to add new language to database
    addNewLanguage = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'POST_LANGUAGES', payload: this.state.newLanguage})
        this.props.history.push('/');
    } // end addNewLanguage



    render(){
        return(
            <div>
                <form class="ui form" onSubmit={this.addNewLanguage}>
                    <div class="field">
                        <label><h2>Program Language</h2></label>
                            <input onClick={this.setNewLanguage} type='text' placeholder="Name of language" value={this.state.newLanguage.name} onChange={(event)=>this.handleNameChange(event, 'name')}/>
                        <br></br>
                        <br></br>
                    <label><h2>Comfort Level</h2></label>
                    <select defaultValue='1' onChange={(event)=>this.handleNameChange(event, 'comfort')}>
                        <option value='1'  selected='selected'>Not very Comfortable</option>
                        <option value='2'>Comfortable</option>
                        <option value='3'>Very Comfortable</option>
                    </select>
                    <br></br>
                    <label><h2>Notes About this language</h2></label>
                    <input type='text' placeholder="Notes" value={this.state.newLanguage.notes} onChange={(event)=>this.handleNameChange(event, 'notes')}/>
                   <div className='buttons'>
                    <input class="ui positive button" type='submit' value='Add New Language'/>
                    </div>
                    </div>
                </form>
                <br></br>
                <div className='buttons'>
                <button class='ui button' onClick={()=>this.props.history.push('/')}>Back to all Languages</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(NewLanguageForm);