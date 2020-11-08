import React from 'react';
import { Grid, Container, Paper, Typography, Divider, TextField, Button, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';

const Reg_Style = {
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
        marginLeft: "30%",
    },
    inputs: {
        width: "85%",
        marginLeft: "5%"
    }

};


class Register_Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: "",
            email: "",
            password: ""
        };
        this.handleUname = this.handleUname.bind(this);
        this.handlePwd = this.handlePwd.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    handleUname(event) {
        this.setState({
            uname: event.target.value
        });
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
            'uname': this.state.uname,
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
                    <Grid container maxWidth="xl" direction="row" spacing={4} style={{ paddingTop: "20vh", paddingBottom: "12.8vh" }}>
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
                                        <Typography className={classes.typo_3}>REGISTER</Typography>
                                    </Grid>
                                    <Grid item >
                                        <TextField label="User Name"
                                            type="text"
                                            name="uname"
                                            onChange={this.handleUname}
                                            value={this.state.uname}
                                            className={classes.inputs}
                                        />
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
                                        <Button variant="contained" size="large" style={{ backgroundColor: "#ea4a5a", marginLeft: "5%" }} type="submit"> Register</Button>
                                        <Typography variant="button" style={{ marginLeft: "6%", lineHeight: "2" }}>Already have account <Link href="/pwd/login">login</Link></Typography>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>

                </Container>
            </div >
        );
    }
}

Register_Component.propTypes = {
    classes: propTypes.object.isRequired
};
export default withStyles(Reg_Style)(Register_Component);