import React from 'react';
import {Grid, Container, Typography, Divider, TextField, Button, Link, Snackbar} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import propTypes from 'prop-types';
import axios from 'axios';

const Login_Style = {
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
    inputs: {
        width: "85%",
        marginLeft: "5%"
    }

};


class Login_Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            snack_open: false,
        };
        this.handlePwd = this.handlePwd.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.snackClose = this.snackClose.bind(this);
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
        this.setState({
            snack_open: true
        });

        var data = JSON.stringify({
            login_email: this.state.email,
            login_pwd: this.state.password
        });
        console.log(data)
        var loginData = {
            method: 'post',
            url: "http://localhost:4000/pw-manager/auth/login",
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(loginData).then((loginRes) => {
            console.log(JSON.stringify(loginRes.data));
        }).catch((err) => {console.log(JSON.stringify(err));});
    }

    snackClose() {
        this.setState({
            snack_open: false,
        });
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Snackbar
                    open={this.state.snack_open}
                    message="Logged In Sucessfuly"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left"
                    }}
                    action={
                        <Button variant="contained" onClick={this.snackClose} style={{backgroundColor: "#fff5b1"}} size="small">Ok</Button>
                    }
                />
                <Container maxWidth="xl" className={classes.root}>
                    <Grid container maxWidth="xl" direction="row" spacing={4} style={{paddingTop: "20vh", paddingBottom: "21.6vh"}}>
                        <Grid item xs={1} >{""}</Grid>
                        <Grid item xs={5}  >
                            <Typography className={classes.typo_1}>Password Manager</Typography><Divider />
                            <Typography className={classes.typo_2} >Store Passwords securly in MongoDB valut and
                            all you need to remember is one password to access all your passwords</Typography>
                        </Grid>
                        <Grid item xs={1} >{""}</Grid>
                        <Grid item xs={4} style={{backgroundColor: "#fafbfc", borderRadius: "10px"}} >

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
                                    <Grid item style={{marginTop: "-3%"}}>
                                        <Typography variant="caption" style={{marginLeft: "5%", color: "#f66a0a"}}>
                                            Password length should be between 5 and 8 characters
                                    </Typography>

                                    </Grid>
                                    <Grid item style={{marginTop: "-2%"}}>
                                        <Button variant="contained" size="large" style={{backgroundColor: "#34d058", marginLeft: "5%"}} type="submit"> Login</Button>
                                        <Typography variant="button" style={{marginLeft: "10%", lineHeight: "2"}}>Don't have account <Link href="/pwd/signup">Register</Link></Typography>
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

Login_Component.propTypes = {
    classes: propTypes.object.isRequired
};
export default withStyles(Login_Style)(Login_Component);