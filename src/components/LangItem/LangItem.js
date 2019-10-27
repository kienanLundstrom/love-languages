import React, { Component } from 'react';
import { Card} from 'semantic-ui-react'
import { HashRouter as Router } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './LangItem.css'

class LangItem extends Component{
    comfortColor =(comfort) =>{
        if(comfort===1){
            return 'red'
        } else if(comfort===2){
            return 'orange'
        } else if (comfort===3){
            return 'green'
        }
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

    
    
    render(){

        return(
            <Router>
                <Card raised color={this.comfortColor(this.props.lang.comfort)} onClick={()=>this.props.history.push(`/languages/${this.props.lang.id}`)}
                       header={this.props.lang.name}
                        meta = {this.comfortString(this.props.lang.comfort)} >
                 </Card>
            </Router>
        )
    }
}

export default withRouter(LangItem);