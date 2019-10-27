import React, { Component } from 'react';



class linkList extends Component{
state = {
    toggleEdit: false,
    selectedLink: '',
    selectedId: 0,
    toggleSave: false,
}

saveLink = (i) =>{
    console.log(i)
}
deleteLink = (i) =>{

    if(window.confirm('Are you sure you that like you totally want to delete this?')){
    this.props.dispatch({ type: 'DELETE_LINK', payload: this.props.reduxState.language.setLink[i].id})
    this.props.history.push('/')
    }
}
editLink = (link, i) =>{
    this.setState({
        toggleEdit: true,
        selectedLink: link,
        selectedId: i,
        toggleSave: true,
    })
 }
 
 handleCancel = () =>{
     this.setState({
         toggleEdit: false,
         toggleSave: false,
     })
  }
  handleEditLink = (event) => {
     this.setState({
         selectedLink: event.target.value, 
         
     });
 }

    render(){
        return(
            <div class="active item">{!this.state.toggleEdit && <a class="huge item">{link.links}</a>}
            {this.state.toggleEdit && this.state.selectedId===index && <input onChange={this.handleEditLink} value={this.state.selectedLink}></input>}
            {!this.state.toggleSave && <button class="ui negative button" onClick={()=>{this.deleteLink(index)}}>Delete</button>}
            {this.state.toggleSave && <button class="ui positive button" onClick={()=>{this.saveLink(index)}}>Save</button>}
            {!this.state.toggleEdit && <button class="ui button" onClick={()=>{this.editLink(link.links, index)}}>Edit</button>}
            {this.state.toggleEdit && <button class="ui button" onClick={()=>{this.handleCancel(link.links, index)}}>Cancel</button>}
            </div>
        )
    }
}
export default linkList;