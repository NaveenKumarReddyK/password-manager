import React from 'react';
import { Grid, Container, Paper, Typography, Divider, TextField, Button, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';


const MPG_Style = {
    root: {
        // width: "100vw",
        // height: "100vh",
        // marginTop: "10vh",
        backgroundColor: "#2b3137",
        // margin : "0",
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
    inputs: {
        width: "85%",
        marginLeft: "5%"
    }

};
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handlePwd = this.handlePwd.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    handlePwd(event) {
        this.setState({
            password: event.target.value
        });
    }
    handleEmail(event) {
        this.setState({
            email: event.target.value
        });
    }
    submitForm(event) {
        event.preventDefault();
        const user = {
            'email': this.state.email,
            'password': this.state.password
        };
        console.log(user);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Container maxWidth="xl" className={classes.root}>
                    <Grid container maxWidth="xl" direction="row" spacing={4} style={{ paddingTop: "20vh", paddingBottom: "21.6vh" }}>
                        <Grid item xs={1} >{""}</Grid>
                        <Grid item xs={5}  >
                            <Typography className={classes.typo_1}>Password Manager</Typography><Divider />
                            <Typography className={classes.typo_2} >Store Passwords securly in MongoDB valut and
                            all you need to remember is one password to access all your passwords</Typography>
                        </Grid>
                        <Grid item xs={1} >{""}</Grid>
                        <Grid item xs={4} style={{ backgroundColor: "#fafbfc", borderRadius: "10px" }} >
                            <form onSubmit={this.submitForm}>
                                <Grid item xl container direction="column" spacing={3} >
                                    <Grid item >
                                        <Typography className={classes.typo_3}>LOGIN</Typography>
                                    </Grid>
                                    <Grid item >
                                        <TextField label="Email"
                                            type="email"
                                            name="email"
                                            onChange={this.handleEmail}
                                            value={this.state.email}
                                            className={classes.inputs}
                                        />
                                    </Grid>
                                    <Grid item >
                                        <TextField label="Password"
                                            type="password"
                                            name="email"
                                            onChange={this.handlePwd}
                                            value={this.state.password}
                                            className={classes.inputs}
                                        />
                                    </Grid>
                                    <Grid item style={{ marginTop: "-3%" }}>
                                        <Typography variant="caption" style={{ marginLeft: "5%", color: "#f66a0a" }}>
                                            Password length should be between 5 and 8 characters
                                    </Typography>

                                    </Grid>
                                    <Grid item style={{ marginTop: "-2%" }}>
                                        <Button variant="contained" size="large" style={{ backgroundColor: "#34d058" }} type="submit"> Login</Button>
                                        <Typography variant="button" style={{ marginLeft: "10%", lineHeight: "2" }}>Don't have account <Link href="#">Register</Link></Typography>
                                    </Grid>
                                </Grid>
                            </form>
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