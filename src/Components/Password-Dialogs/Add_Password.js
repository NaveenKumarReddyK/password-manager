import React from 'react';
import {
    Button, TextField, Dialog, DialogActions,
    DialogContent, Divider, DialogTitle
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import propTypes from 'prop-types';


const addPwd_Dialog_Styles = {
    email_input: {
        marginTop: "2vh"
    },
    pwd_input: {
        marginTop: "4vh",
        marginBottom: "5vh"
    }
};
class AddPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addpwd_snack_open: props.addPwd_Sanck
        };
        this.snackClose = this.snackClose.bind(this);
    }
    // componentWillReceiveProps(snackProp) {
    //     if (snackProp.addPwd_Sanck !== this.state.addpwd_snack_open) {
    //         this.setState({
    //             addpwd_snack_open: snackProp.addPwd_Sanck
    //         });
    //     }
    // }
    snackClose() {
        this.setState({
            addpwd_snack_open: false
        });
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Dialog open={this.state.addpwd_snack_open}  >
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
                            label="Password"
                            type="text"
                            name="password"
                            fullWidth
                            className={classes.pwd_input}
                        />
                    </DialogContent>
                    <Divider />
                    <DialogActions>
                        <Button style={{color: "green"}} size="large">Add ++</Button>
                        <Button style={{color: "red"}} size="large" onClick={this.snackClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AddPassword.propTypes = {
    classes: propTypes.object.isRequired
};

export default withStyles(addPwd_Dialog_Styles)(AddPassword);