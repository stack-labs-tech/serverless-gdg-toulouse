import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

import logo from '../../assets/logo.png';

const styles = () => ({
  toolbar: {
    display: 'flex',
  },
  anchor: {
    padding: '15px 0',
  },
});

function Header(props) {
  const { classes } = props;
  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <a className={classes.anchor} href="https://stack-labs.com">
          <img src={logo} height="20" alt="stack-labs-logo" />
        </a>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(Header);
