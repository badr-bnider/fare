import React from 'react';


import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Alert } from '@material-ui/lab';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import '../../../assets/styles/styles.css'
import { signIn, signUp } from '../../../storage/utils.supabase.js';
import { saveBucket } from '../../../storage/utils.localStorage.js';

function AuthenticationCard() {
  const classes = useStyles();

  const [bucket, setBucket] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [toSave, setToSave] = useState(true)

  async function signInAction() {
    const err = await signIn(bucket, password)
    if (err) {
      setError(err)
    }
    else {
      if (toSave) {
        saveBucket(bucket, password)
      }
    }
  }

  async function signUpAction() {
    const err = await signUp(bucket, password)
    if (err) {
      setError(err)
    }
    else {
      if (toSave) {
        saveBucket(bucket, password)
      }
    }
  }

  function onClickEnterSignIn(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById("signin").click();
    }
  }

  function onClickEnterToPassword(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.getElementById("password").focus();
    }
  }

  function handleSaveChange(e) {
    setToSave(e.target.checked)
  }

  return (
    <Card id="signin-card" className={classes.card}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12}>
          <Typography className={classes.title} color="primary"><b>Fare |</b><span className={classes.titlePart1}> Authentication</span></Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField id="bucket-name" onKeyUp={onClickEnterToPassword} label="Bucket Name" variant="filled" size="small" value={bucket} onChange={e => { setBucket(e.target.value); setError("") }} className="signin-input" fullWidth={true} required autoFocus />
        </Grid>
        <Grid item xs={12} >
          <TextField id="password" onKeyUp={onClickEnterSignIn} value={password} label="Password" variant="filled" size="small" className="signin-input" onChange={e => { setPassword(e.target.value); setError("") }} type="password" fullWidth={true} required />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel className={classes.switch}
            control={<Switch checked={toSave} color="primary" onChange={handleSaveChange} />}
            label="Save Bucket"
          />
        </Grid>
        <Grid item xs={12}>
          <Error error={error} />
        </Grid>
        <Grid item xs={6}>
          <Button id="signup" className="signin-input" variant="outlined" color="primary" onClick={signUpAction} fullWidth={true}><b>Sign Up</b></Button>
        </Grid>
        <Grid item xs={6}>
          <Button id="signin" className="signin-input" variant="contained" color="primary" onClick={signInAction} fullWidth={true}><b>Sign In</b></Button>
        </Grid>
      </Grid>
    </Card>
  );
}

const useStyles = makeStyles({
  title: {
    fontSize: "2.5em",
    textAlign: "center",
    margin: 5,
    fontFamily: "Montserrat"
  },
  card: {
    padding: "2ch",
  },
  switch: {
    color: "#424242"
  },
  titlePart1: {
    color: "#424242"
  }
});


export default AuthenticationCard;

function Error(props) {
  return (
    (
      props.error && <Alert style={{ margin: "8px" }} severity="error">{props.error.message}</Alert>
    )
  )
}