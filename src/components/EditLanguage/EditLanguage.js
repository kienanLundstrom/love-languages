import React, { Component } from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import Axios from 'axios';

class EditLanguage extends Component{

    state = {
        Language: { },
    }


 
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
         }

componentDidMount(){
    this.getLanguage();
}


handleChange = (event, propertyName ) =>{
    this.setState({
        Language: {
            ...this.state.Language,
            [propertyName]: event.target.value,
        }
    })
}
handleSubmit = () =>{
    if(window.confirm('Are you sure you want to make these changes?')){
    this.props.dispatch({ type: 'UPDATE_LANGUAGE', payload: this.state.Language}); 
    this.props.history.push(`/edit/${this.props.match.params.id}`)
    }
}

    render(){
        return(
            <div>
                <p>Name</p>
                <textarea onChange={(event)=>this.handleChange( event, 'name' )} value={this.state.Language.name}/>
                <br></br>
                <p>Comfort</p>
                {/* <textarea onChange={(event)=>this.handleChange( event, 'comfort' )} value={this.state.Language.comfort}/> */}
                <select value={this.state.Language.comfort} onChange={(event)=>this.handleChange(event, 'comfort')}>
                        <option value='1'>Not very Comfortable</option>
                        <option value='2'>Comfortable</option>
                        <option value='3'>Very Comfortable</option>
                    </select>
                <br></br>
                <p>Notes</p>
                <textarea onChange={(event)=>this.handleChange( event, 'notes' )} value={this.state.Language.notes}/>
                <br></br>

                <button onClick = {this.handleSubmit}>Submit Changes</button>
                <button onClick={()=>this.props.history.push(`/languages/${this.state.Language.id}`)}>Back</button>
            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});

export default withRouter(connect(mapStateToProps)(EditLanguage));