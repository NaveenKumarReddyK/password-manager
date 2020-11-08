import React from 'react';
import { Grid, Container, Paper, Typography, Divider, TextField, Button, Link } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';

const DB_Styles = {

};
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>

            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: propTypes.object.isRequired
};

export default withStyles(DB_Styles)(Dashboard);