import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';




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
        Axios.post('/api/languages/', this.state.newLanguage )
        .then((response)=>{
            console.log(response)
            this.setState({
                newLanguage: {
                    name: '',
                    comfort: '',
                    notes: '',
                }
            })
        })
    }



    render(){
        return(
            <div>
                <form onSubmit={this.addNewLanguage}>
                    <input type='text' placeholder="Name of language" value={this.state.newLanguage.name} onChange={(event)=>this.handleNameChange(event, 'name')}/>
                    <input type='text' placeholder="Comfort Level" value={this.state.newLanguage.comfort} onChange={(event)=>this.handleNameChange(event, 'comfort')}/>
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