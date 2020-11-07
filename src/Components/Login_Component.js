import React from 'react';
import { Grid, Container, Paper, Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';

const MPG_Style = {
    root: {
        // width: "100vw",
        // height: "100vh",
        marginTop: "10vh",
        backgroundColor: "#2b3137",
        // margin : "0",
    },

};


class Login_Component extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>

            </div>
        )
    }
}

Login_Component.propTypes = {
    classes: propTypes.object.isRequired
};
export default withStyles(MPG_Style)(Login_Component);