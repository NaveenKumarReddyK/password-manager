import React from 'react';
import { Grid, Container, Paper, Typography, Divider, TextField, Button, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import Login_Component from './Login' 
import Register_Component from "./Register";

const MPG_Style = {
    root: {
        backgroundColor: "#2b3137",
    },
    typo_1: {
        fontSize: "10vh",
        fontFamily: "Open sans",
        fontWeight: "500",
        color: "whitesmoke",
        margin: "0",
        lineHeight: "1",
        marginBottom: "20px"
    },
    typo_2: {
        fontSize: "5vh",
        fontFamily: "Open sans",
        fontWeight: "100",
        color: "whitesmoke",
        margin: "0",
        // lineHeight:"30px",
        marginBottom: "20px"
    },
    typo_3: {
        fontSize: "5vh",
        fontFamily: "Open sans",
        fontWeight: "900",
        color: " #a04100",
        marginLeft: "35%",
    },
    login_container: {
        position: "relative",
    },
    

};
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paddingBottom:"21.6vh",
            component :"LOGIN"
        };
         
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Container maxWidth="xl" className={classes.root}>
                    <Grid container maxWidth="xl" direction="row" spacing={4} style={{ paddingTop: "20vh", paddingBottom: "12.8vh" }}>
                        <Grid item xs={1} >{""}</Grid>
                        <Grid item xs={5}  >
                            <Typography className={classes.typo_1}>Password Manager</Typography><Divider />
                            <Typography className={classes.typo_2} >Store Passwords securly in MongoDB valut and
                            all you need to remember is one password to access all your passwords</Typography>
                        </Grid>
                        <Grid item xs={1} >{""}</Grid>
                        <Grid item xs={4} style={{ backgroundColor: "#fafbfc", borderRadius: "10px" }} >
                            {/* PLACE COMPONENT  */}
                            <Register_Component />
                            {/* PLACE COMPONENT  */}
                        </Grid>
                    </Grid>

                </Container>
            </div>
        );
    }
}

MainPage.propTypes = {
    classes: propTypes.object.isRequired
};
export default withStyles(MPG_Style)(MainPage);