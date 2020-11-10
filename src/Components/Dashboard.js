import React from 'react';
import {
    Paper, Divider, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import propTypes from 'prop-types';
import GitHubIcon from '@material-ui/icons/GitHub';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

const Pwd_Decrypt = require('./Pwd_Decrypt');

const DB_Styles = {
    navDiv: {
        margin: "0",
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "9vh",
    },
    navPaper: {
        position: "relative",
        width: "70%",
        height: "100%",
        marginTop: "1vh",
        backgroundColor: "#dbedff",
        marginLeft: "15%",
    },
    nav_ul: {
        position: "relative",
        listStyleType: "none",
        margin: "0",
        width: "100%",
        height: "100%"
    },
    nav_typohead: {
        fontSize: "5vh",
        fontFamily: "Open sans",
        fontWeight: "500",
        color: "black",
        margin: "0",
        paddingTop: "2vh",
        lineHeight: "4vh",
    },
    nav_ul_li: {
        float: "left", marginLeft: "2vw", paddingTop: "1vh"
    },
    dataDiv: {
        margin: "0",
        width: "100%",
    },
    dataPaper: {
        position: "relative",
        width: "80%",
        height: "9vh",
        marginTop: "3vh",
        backgroundColor: "#dbedff",
        marginLeft: "10%",
    },
    data_ul_li_12: {
        float: "left", marginLeft: "1%", width: "33%", overflow: "hidden"
    },
    data_ul_li_34: {
        float: "left", marginLeft: "1%", width: "13%", paddingTop: "1vh"
    },
    data_p: {
        fontSize: "5vh",
        fontFamily: "Open sans",
        fontWeight: "500",
        color: "black",
        margin: "0",
        marginTop: "1vh"
    },
    email_input: {
        marginTop: "2vh"
    },
    pwd_input: {
        marginTop: "4vh",
        marginBottom: "5vh"
    }
};

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addPwd_Dialog: false,
            updatePwd_Dialog: false,
            loginStatus: false,
            addPwd: "",
            addEmail: "",
            updPwd: "",
            updEmail: "",
            updMasterPwd: "",
            userData: [],
        };
        this.addPwdSanckOpen = this.addPwdSanckOpen.bind(this);
        this.addPwdSanckClose = this.addPwdSanckClose.bind(this);
        this.updatePwdDialogOpen = this.updatePwdDialogOpen.bind(this);
        this.updatePwdDialogClose = this.updatePwdDialogClose.bind(this);
        this.userLogout = this.userLogout.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.addPassword = this.addPassword.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handleAddPwd = this.handleAddPwd.bind(this);
        this.handleUpdPwd = this.handleUpdPwd.bind(this);
        this.decryptPassword = this.decryptPassword.bind(this);
    }
    addPwdSanckOpen() {this.setState({addPwd_Dialog: true});}
    addPwdSanckClose() {this.setState({addPwd_Dialog: false});}
    updatePwdDialogOpen(currPwd, currEmail, currMasterPwd) {
        var decPwd = this.decryptPassword(currPwd, currMasterPwd);
        this.setState({
            updatePwd_Dialog: true,
            updEmail: currEmail,
            updPwd: decPwd,
            updMasterPwd: currMasterPwd,
        });

    }
    updatePwdDialogClose() {this.setState({updatePwd_Dialog: false});}

    //invoke getUserData function to get all passwords of user
    componentDidMount() {
        this.getUserData();
    }
    //get all passwords information
    getUserData() {
        var userPwdsConfig = {
            method: 'get',
            url: "http://localhost:4000/pw-manager/pwd/getpwds",
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(userPwdsConfig).then((res) => {
            this.setState({
                userData: res.data.Pwds
            });
            console.log(res.data.Pwds);
        }).catch((err) => {
            console.log("Error", err);
        });
    }
    //add password dialog inputs
    handleAddPwd(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    //add password
    addPassword() {
        var data = JSON.stringify({
            comp_email: this.state.addEmail,
            comp_pwd: this.state.addPwd,
        });

        var addPwdConfig = {
            method: 'post',
            url: "http://localhost:4000/pw-manager/pwd/addpwd",
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(addPwdConfig).then((res) => {
            this.getUserData();
            this.addPwdSanckClose();
        }).catch((err) => {
            console.log("Error", err);
        });
    }
    //update password dialog input
    handleUpdPwd(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    //update password
    updatePassword() {
        var data = JSON.stringify({
            comp_email: this.state.updEmail,
            new_pwd: this.state.updPwd,
            masterPwd_SHA256: this.state.updMasterPwd
        });
        var updPwdsConfig = {
            method: 'post',
            url: "http://localhost:4000/pw-manager/pwd/update",
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(updPwdsConfig).then((res) => {
            //call get user data to update displayed passwords
            this.getUserData();
            this.updatePwdDialogClose();
        }).catch((err) => {
            console.log("Error", err);
        });
    }
    //delete password
    deletePassword(companyEmail) {
        var data = JSON.stringify({
            comp_email: companyEmail
        });
        var delPwdConfig = {
            method: 'post',
            url: "http://localhost:4000/pw-manager/pwd/delete",
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios(delPwdConfig).then((res) => {
            this.getUserData();
        }).catch((err) => {
            console.log("Error", err);
        });
    }
    //logout from website
    userLogout() {
        var logoutConfig = {
            method: 'post',
            url: "http://localhost:4000/pw-manager/auth/logout",
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
        };
        axios(logoutConfig).then((res) => {
            this.props.handleLogout();
        }).catch((err) => {
            console.log("ERROR", err);
        });
    }
    //decrypt password
    decryptPassword(encPwd, masterPwd) {
        var decPwd = Pwd_Decrypt(encPwd, masterPwd);
        return decPwd.decrpyt_pwd;
    }
    //if user not logged in redirect to login page

    render() {
        const {classes} = this.props;
        if (this.props.loggedInStatus === false) {
            return <Redirect to="/pwd/login" />;
        }
        return (
            <div>
                <div className={classes.navDiv}>
                    <Paper elevation={3} className={classes.navPaper}>
                        <ul className={classes.nav_ul}>
                            <li style={{float: "left"}}>
                                <p className={classes.nav_typohead}>Passwrod Manager</p>
                            </li>
                            <li className={classes.nav_ul_li}>
                                <Button variant="contained" size="large" endIcon={<GitHubIcon />} style={{backgroundColor: "#e1e4e8"}} href="https://github.com/NaveenKumarReddyK/password-manager" target="_blank">Github</Button>
                            </li>
                            <li className={classes.nav_ul_li}>
                                <Button variant="contained" size="large" endIcon={<PostAddIcon />} style={{backgroundColor: "#85e89d"}} onClick={this.addPwdSanckOpen} >Add</Button>
                            </li>
                            <li className={classes.nav_ul_li}>
                                <Button variant="contained" size="large" style={{backgroundColor: "#f9c513"}} href="https://github.com/NaveenKumarReddyK/password-manager/tree/master/src/Components/References" target="_blank">References</Button>
                            </li>
                            <li className={classes.nav_ul_li}>
                                <Button variant="contained" size="large" endIcon={<ExitToAppIcon />} style={{backgroundColor: "#f97583"}} onClick={this.userLogout}>Logout</Button>
                            </li>
                        </ul>
                    </Paper>
                </div>
                {/* div to display all passwords */}

                <div>

                    {this.state.userData.map((data, i) => {
                        return (

                            <div key={i}>
                                <Paper elevation={1} className={classes.dataPaper}>
                                    <ul style={{
                                        position: "relative",
                                        listStyleType: "none",
                                        margin: "0",
                                        width: "100%",
                                        height: "100%",
                                        padding: "0"
                                    }}>
                                        <li className={classes.data_ul_li_12}>
                                            <p className={classes.data_p}>{data.company_email}</p>
                                        </li>
                                        <Divider orientation="vertical" flexItem />
                                        <li className={classes.data_ul_li_12}>
                                            <p className={classes.data_p}>{this.decryptPassword(data.password_tosave, data.master_password)}</p>
                                        </li>
                                        <li className={classes.data_ul_li_34}>
                                            <Button variant="contained" disableElevation size="large" endIcon={<CloudUploadIcon />} style={{backgroundColor: "#f66a0a"}}
                                                onClick={() => {this.updatePwdDialogOpen(data.password_tosave, data.company_email, data.master_password);}}
                                            >Update</Button>
                                        </li>
                                        <li className={classes.data_ul_li_34}>
                                            <Button variant="contained" disableElevation size="large" endIcon={<DeleteForeverIcon />} style={{backgroundColor: "#cb2431"}} onClick={() => {this.deletePassword(data.company_email);}}>Delete</Button>
                                        </li>
                                    </ul>
                                </Paper>

                            </div>

                        );

                    })}

                </div>
                {/* ************************UPDATING PASSWORD************************ */}
                <Dialog open={this.state.updatePwd_Dialog} >
                    <DialogTitle >Update Password</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <TextField
                            disabled
                            label="Company Email Address"
                            type="text"
                            fullWidth
                            className={classes.email_input}
                            value={this.state.updEmail}
                        />
                        <TextField
                            label="Updated Password"
                            type="text"
                            name="updPwd"
                            fullWidth
                            className={classes.pwd_input}
                            onChange={this.handleUpdPwd}
                            value={this.state.updPwd}
                        />
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button
                            style={{color: "green"}}
                            size="large"
                            onClick={this.updatePassword}
                        >Update</Button>
                        <Button style={{color: "red"}} size="large" onClick={this.updatePwdDialogClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>

                {/*********************ADDING ADD PASSWORD DIALOG*******************************
                  ******************************************************************************/}
                <Dialog open={this.state.addPwd_Dialog}  >
                    <DialogTitle >Add Password</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <TextField
                            // autoFocus
                            label="Company Email Address"
                            type="email"
                            name="addEmail"
                            fullWidth
                            onChange={this.handleAddPwd}
                            className={classes.email_input}
                        />
                        <TextField
                            label="Password"
                            type="text"
                            name="addPwd"
                            fullWidth
                            onChange={this.handleAddPwd}
                            className={classes.pwd_input}
                        />
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button style={{color: "green"}} size="large" onClick={this.addPassword}>Add ++</Button>
                        <Button style={{color: "red"}} size="large" onClick={this.addPwdSanckClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                {/* ************************************************************************************ */}
            </div>
        );
    }
}




Dashboard.propTypes = {
    classes: propTypes.object.isRequired
};

export default withStyles(DB_Styles)(Dashboard);