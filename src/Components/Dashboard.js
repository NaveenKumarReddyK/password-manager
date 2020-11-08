import React from 'react';
import {
    Paper, Divider, TextField, Button, Link, Dialog, DialogActions,
    DialogContent, DialogTitle
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import propTypes from 'prop-types';
import GitHubIcon from '@material-ui/icons/GitHub';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const DB_Styles = {
    navDiv: {
        margin: "0",
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "9vh",
        // backgroundColor :"#959da5"
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
        paddingTop: "2vh",
        lineHeight: "4vh",
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
            addPwd_Sanck: false,
            updatePwd_Sanck: false
        };
        this.addPwdSanckOpen = this.addPwdSanckOpen.bind(this);
        this.addPwdSanckClose = this.addPwdSanckClose.bind(this);
        this.updatePwdSnackOpen = this.updatePwdSnackOpen.bind(this);
        this.updatePwdSnackClose = this.updatePwdSnackClose.bind(this);

    }
    addPwdSanckOpen() {this.setState({addPwd_Sanck: true});}
    addPwdSanckClose() {this.setState({addPwd_Sanck: false});}
    updatePwdSnackOpen() {this.setState({updatePwd_Sanck: true});}
    updatePwdSnackClose() {this.setState({updatePwd_Sanck: false});}


    render() {
        const {classes} = this.props;
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
                                <Button variant="contained" size="large" style={{backgroundColor: "#f9c513"}}>References</Button>
                            </li>
                            <li className={classes.nav_ul_li}>
                                <Button variant="contained" size="large" endIcon={<ExitToAppIcon />} style={{backgroundColor: "#f97583"}}>Logout</Button>
                            </li>
                        </ul>
                    </Paper>
                </div>
                {/* div to display all passwords */}

                <div>
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
                                <p className={classes.data_p}>facebook.com</p>
                            </li>
                            <Divider orientation="vertical" flexItem />
                            <li className={classes.data_ul_li_12}>
                                <p className={classes.data_p}>Password</p>
                            </li>
                            <li className={classes.data_ul_li_34}>
                                <Button variant="contained" disableElevation size="large" endIcon={<CloudUploadIcon />} style={{backgroundColor: "#f66a0a"}} onClick={this.updatePwdSnackOpen}>Update</Button>
                            </li>
                            <li className={classes.data_ul_li_34}>
                                <Button variant="contained" disableElevation size="large" endIcon={<DeleteForeverIcon />} style={{backgroundColor: "#cb2431"}}>Delete</Button>
                            </li>
                        </ul>
                    </Paper>
                </div>
                {/******************************************************************************
                  *********************ADDING UPDATE PASSWORD CLASS*****************************
                  ******************************************************************************/}

                <Dialog open={this.state.updatePwd_Sanck}    >
                    <DialogTitle >Update Password</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <TextField
                            // autoFocus
                            label="Company Email Address"
                            type="email"
                            name="email"
                            fullWidth
                            className={classes.email_input}
                        />
                        <TextField
                            label="Password"
                            type="text"
                            name="password"
                            fullWidth
                            className={classes.pwd_input}
                        />
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button style={{color: "green"}} size="large">Update</Button>
                        <Button style={{color: "red"}} size="large" onClick={this.updatePwdSnackClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                {/******************************************************************************
                  *********************ADDING ADD PASSWORD CLASS********************************
                  ******************************************************************************/}
                <Dialog open={this.state.addPwd_Sanck}  >
                    <DialogTitle >Add Password</DialogTitle>
                    <Divider />
                    <DialogContent>
                        <TextField
                            // autoFocus
                            label="Company Email Address"
                            type="email"
                            name="email"
                            fullWidth
                            className={classes.email_input}
                        />
                        <TextField
                            label="Updated Password"
                            type="text"
                            name="password"
                            fullWidth
                            className={classes.pwd_input}
                        />
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button style={{color: "green"}} size="large">Add ++</Button>
                        <Button style={{color: "red"}} size="large" onClick={this.addPwdSanckClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>

            </div>
        );
    }
}




Dashboard.propTypes = {
    classes: propTypes.object.isRequired
};

export default withStyles(DB_Styles)(Dashboard);