import React from 'react';

import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TodayIcon from '@material-ui/icons/Today';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventIcon from '@material-ui/icons/Event';

import '../../../assets/styles/styles.css'

function SortBar(props) {
  const classes = useStyles();
  const [sort,setSortValue] = useState(1);

  function variantToggle(buttonValue){
    if(sort == buttonValue){
      return "contained"
    } else {
      return "outlined"
    }
  }

  function setSort(e){
    props.dataBridge({sort: e.currentTarget.value})
    setSortValue(e.currentTarget.value)
  }

  return (
    <div className={classes.root}>
      <AppBar id="sortbar" position="fixed" className={classes.appBar}>
        <Toolbar>
          <ButtonGroup variant="outlined" color="secondary" disableElevation>
            <Button className={classes.button} variant={variantToggle(1)} value={1} onClick={setSort} >
              <SortByAlphaIcon /><ExpandLessIcon />
            </Button>
            <Button className={classes.button} variant={variantToggle(2)} value={2}  onClick={setSort} >
              <SortByAlphaIcon /><ExpandMoreIcon />
            </Button>
            <Button className={classes.button} variant={variantToggle(3)} value={3} onClick={setSort} >
              <TodayIcon/><ExpandLessIcon/>
            </Button>
            <Button className={classes.button} variant={variantToggle(4)} value={4} onClick={setSort} >
              <EventIcon/><ExpandMoreIcon />
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  button:{
    padding: "5px",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  appBar:{
    backgroundColor: "#ffffff",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    top:"64px",
    [theme.breakpoints.down('md')]: {
      top: "59px"
    },
  },
  title: {
    flexGrow: 1,
  },
}));

export default SortBar;