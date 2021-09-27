import React from 'react';


import { makeStyles } from '@material-ui/core/styles';

import '../../assets/styles/styles.css';
import AuthenticationCard from './subcomponents/AuthenticationCard'
import Buckets from './subcomponents/Buckets';
import { Box, Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';

function Authentication() {
  const classes = useStyles();
  return (
    <div id="background" className={classes.root}>
      <Box className={classes.box}>
        <AuthenticationCard />
        <Buckets />
        <Typography color="secondary" className={classes.footer}>Created by <b><Link href="https://badrbnider.tk">Badr Bnider</Link></b></Typography>
      </Box>
    </div>
  );
}

const useStyles = makeStyles({
  box:{
    gap: "1ch",
    maxWidth: "700px"
  },
  footer:{
    textAlign:"center",

  },
  root:{
    display: "flex",
    flexDirection: "column",
    justifyContent :"center",
    alignItems: "center",
    backgroundSize: "cover",
    minHeight: "100vh",
    width: "100vw",
  }
});

export default Authentication;