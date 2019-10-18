import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import { HashRouter as Router } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class LangItem extends Component{
    render(){

        return(
            <Router>
        <Card.Group>
           
          <Card onClick={()=>this.props.history.push(`/languages/${this.props.lang.id}`)}
                header={this.props.lang.name}
                meta = {this.props.lang.comfort}  />
        </Card.Group>
        </Router>
        )
    }
}

export default withRouter(LangItem);