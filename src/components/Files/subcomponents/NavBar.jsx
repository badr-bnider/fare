import React from 'react';

import { alpha, makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import '../../../assets/styles/styles.css'
import { getBucketName, signOut } from '../../../storage/utils.supabase.js';

function NavBar(props) {
  const classes = useStyles();
  const [search, setSearchValue] = useState("")
  const bucketName = getBucketName()

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  function setSearch(e) {
    props.dataBridge({ search: e.currentTarget.value })
    setSearchValue(e.currentTarget.value)
  }

  function goToSignIn() {
    window.location.assign("/auth")
  }

  return (
    <AppBar id="navbar" position="fixed" >
      <Toolbar>
        <Typography id="title" className={classes.title} variant="h6" noWrap>
          Fare | <b>{bucketName}</b>
        </Typography>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={search}
            onChange={setSearch}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <IconButton onClick={handleMenu} color="inherit" edge="end">
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem color="secondary"><AccountCircleIcon color="secondary" className={classes.menuIcon} /><b>{bucketName}</b></MenuItem>
          
          {/*Settings menu:
          
          <MenuItem >
            < TuneIcon color="secondary" className={classes.menuIcon} onClick={handleClickOpen} />
            Settings
            <Dialog
              open={open}
              keepMounted
              onClose={handleCloseDialogue}
            >
              <DialogTitle>Settings</DialogTitle>
              <DialogContent>
                <DialogContentText >
                  <TextField id="new-email" placeholder="New Email" style={{marginTop:"10px",marginBottom:"10px"}} fullWidth={true} variant="filled"/>
                  <Button style={{ marginTop: "10px", marginBottom: "10px" }} fullWidth={true} variant="contained" color="primary" onClick={editEmail}>Save</Button>
                  <TextField id="new-password" placeholder="New Password" style={{ marginTop:"10px", marginBottom:"10px" }} fullWidth={true} variant="filled" />
                  <Button style={{ marginTop:"10px", marginBottom:"10px" }} fullWidth={true} variant="contained" color="primary" onClick={editPassword}>Save</Button>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button style={{margin:"10px"}} onClick={handleCloseDialogue} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </MenuItem>*/}

          <MenuItem onClick={goToSignIn}>< SupervisorAccountIcon color="secondary" className={classes.menuIcon} /> Switch Bucket
          </MenuItem>
          <MenuItem onClick={signOut}><ExitToAppIcon color="secondary" className={classes.menuIcon} />Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontFamily: 'Montserrat',
    fontWeigth: 600,
    fontSize: 30,
  },
  menuIcon: {
    paddingRight: "1ch"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
  select: {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    "&:after": {
      borderColor: "#ffffff",
      color: "#ffffff",
      borderRadius: theme.shape.borderRadius,
    },
    "& .MuiSvgIcon-root": {
      display: "none",
      margin: 0,
      padding: 0,
      width: 0,
    },
    color: "#ffffff",
    borderColor: "#ffffff",
    margin: theme.spacing(1),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default NavBar;