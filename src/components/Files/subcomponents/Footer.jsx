import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function Footer(){
  const classes = useStyles();

  return(
    <Box className={classes.root}>
      <Typography className={classes.text} color="primary"><span className={classes.part1}>Created by</span> Badr Bnider</Typography>
    </Box>
  )
}

const useStyles = makeStyles((theme) => ({
  text: {
    textAlign: "center",
  },
  part1:{
    color: "#fff"
  },
  root:{
    marginTop: "10px",
    backgroundColor: "#424242",
    paddingTop: "15px",
    paddingBottom: "15px",
    position: "relative",
    bottom: 0,
    JustifySelf: "flex-end"
  }
}));

export default Footer;