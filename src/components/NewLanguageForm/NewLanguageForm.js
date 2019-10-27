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
    handleNameChange = (event, propertyName) => {
        this.setState({
            newLanguage: {
                ...this.state.newLanguage,
                [propertyName]: event.target.value, 
            }
        });
    }
    
 
    addNewLanguage = event => {
        event.preventDefault();
        this.props.dispatch({ type: 'POST_LANGUAGES', payload: this.state.newLanguage})
        this.props.history.push('/');
    }



    render(){
        return(
            <div>
                <form class="ui form" onSubmit={this.addNewLanguage}>
                    <div class="field">
                        <label>Program Language</label>
                            <input type='text' placeholder="Name of language" value={this.state.newLanguage.name} onChange={(event)=>this.handleNameChange(event, 'name')}/>
                        <br></br>
                        <br></br>
                    <label>Comfort Level</label>
                    <select defaultValue='1' onChange={(event)=>this.handleNameChange(event, 'comfort')}>
                        <option value='1'  selected='selected'>Not very Comfortable</option>
                        <option value='2'>Comfortable</option>
                        <option value='3'>Very Comfortable</option>
                    </select>
                    <br></br>
                    <label>Notes About this language</label>
                    <input type='text' placeholder="Notes" value={this.state.newLanguage.notes} onChange={(event)=>this.handleNameChange(event, 'notes')}/>
                    <input class="ui positive button" type='submit' value='Add New Language'/>
                    </div>
                </form>
                <button onClick={()=>this.props.history.push('/')}>Back to Languages</button>

            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(NewLanguageForm);