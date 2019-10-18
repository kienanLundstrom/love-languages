import React, { Component } from 'react';
import { connect } from 'react-redux';




class NewLanguageForm extends Component{
    




    render(){
        return(
            <div>

            </div>
        )
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
});
export default connect(mapStateToProps)(NewLanguageForm);