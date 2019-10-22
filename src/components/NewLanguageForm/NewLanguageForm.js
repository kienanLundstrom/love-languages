import React, { Component } from 'react';
import { connect } from 'react-redux';




class NewLanguageForm extends Component{
    state = {
        newLanguage: {
            name: '',
            comfort: '',
            notes: '',
            user: this.props.reduxState.user.id,
        }
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
                <form onSubmit={this.addNewLanguage}>
                    <input type='text' placeholder="Name of language" value={this.state.newLanguage.name} onChange={(event)=>this.handleNameChange(event, 'name')}/>
                    {/* <input type='select' placeholder="Comfort Level 1-3" value={this.state.newLanguage.comfort} onChange={(event)=>this.handleNameChange(event, 'comfort')}/> */}
                    <select defaultValue='1' onChange={(event)=>this.handleNameChange(event, 'comfort')}>
                        <option value='1'>Not very Comfortable</option>
                        <option value='2'>Comfortable</option>
                        <option value='3'>Very Comfortable</option>
                    </select>
                    <input type='text' placeholder="Notes" value={this.state.newLanguage.notes} onChange={(event)=>this.handleNameChange(event, 'notes')}/>
                    <input type='submit' value='Add New Language'/>
                </form>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(NewLanguageForm);