import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';




class NewLanguageForm extends Component{
    state = {
        newLanguage: {
            name: '',
            comfort: '',
            notes: '',
        }
    }
    handleNameChange = (event, propertyName) => {
        this.setState({
            newLanguage: {
                ...this.state.newLanguage,
                [propertyName]: event.target.value,
            }
        });
        console.log(this.state.newLanguage);
    }
    addNewLanguage = event => {
        event.preventDefault();
        Axios.post('/api/languages')
        .then((response)=>{
            
        })
    }



    render(){
        return(
            <div>
                <form onSubmit={this.addNewLanguage}>
                    <input type='text' placeholder="Name" value={this.state.newLanguage.name} onChange={(event)=>this.handleNameChange(event, 'name')}/>
                    <input type='text' placeholder="Comfort" value={this.state.newLanguage.comfort} onChange={(event)=>this.handleNameChange(event, 'comfort')}/>
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