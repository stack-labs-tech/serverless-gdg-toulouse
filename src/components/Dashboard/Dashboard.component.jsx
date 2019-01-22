import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TextField from '@material-ui/core/TextField';

const styles = () => ({
  root: {
    flexGrow: 1,
    padding: '60px 10px 20px 10px',
  },
  textField: {
    maxWidth: '800px',
    width: '100%',
    color: 'black',
  },
});

const defaultUrl = '';
const refreshSuccessMessage = 'Translation updated';

function Dashboard(props) {
  const [endpointUrl, setEndpointUrl] = useState(defaultUrl);
  const [translatedText, setTranslatedText] = useState('');
  const [textToTranslate, setTextToTranslate] = useState('');

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: refreshSuccessMessage,
    action: [],
  });

  const handleClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const onRefreshSuccess = (getAction = () => []) => {
    setSnackbar({
      ...snackbar,
      open: true,
      message: refreshSuccessMessage,
      action: getAction(handleClose),
    });
  };

  const onRefreshError = () => {
    setSnackbar({
      ...snackbar,
      open: true,
      message: 'Failed to fetch translation',
    });
  };

  const handleTextChange = (event) => {
    setTextToTranslate(event.target.value);
  };

  const handleChange = (event) => {
    setEndpointUrl(event.target.value);
  };

  const submitToTranslate = () => {
    fetch(`${endpointUrl}?text=${textToTranslate}`)
      .then(r => r.json())
      .then((json) => {
        setTranslatedText(json.TranslatedText);
        onRefreshSuccess();
      })
      .catch(() => {
        onRefreshError();
      });
  };

  const handleKeyPressed = (event) => {
    if (event.charCode === 13) {
      submitToTranslate();
    }
  };

  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <TextField
            id="outlined-endpoint-url"
            label="Your API URL"
            placeholder="Enter your deployed API URL"
            className={classes.endpointField}
            value={endpointUrl}
            onChange={handleChange}
            onKeyPress={handleKeyPressed}
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="To translate FR -> EN"
            className={classes.textField}
            placeholder="write your text and press Enter to translate french to english"
            margin="normal"
            variant="outlined"
            onKeyPress={handleKeyPressed}
            onChange={handleTextChange}
            value={textToTranslate}
          />
          <br />
          <TextField
            label="Translation"
            className={classes.textField}
            value={translatedText}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Snackbar
        open={snackbar.open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'posts-refreshed',
        }}
        autoHideDuration={3000}
      >
        <SnackbarContent
          message={<span id="posts-refreshed">{snackbar.message}</span>}
          action={snackbar.action}
        />
      </Snackbar>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line
};

export default withStyles(styles)(Dashboard);
