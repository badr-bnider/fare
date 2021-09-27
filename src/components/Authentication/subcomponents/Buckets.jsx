import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import StorageIcon from '@material-ui/icons/Storage';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';


import { removeBucket } from '../../../storage/utils.localStorage.js';
import { signIn } from '../../../storage/utils.supabase.js';

const getBucketList = () => Object.entries(JSON.parse(localStorage.getItem("buckets")))

function Buckets() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [bucketList, setBucketList] = useState(getBucketList)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function removeCurrentBucket(e,b) {
    removeBucket(b)
    setBucketList(getBucketList())
    handleClose()
  }

  return (
    <div>
      <Card id="buckets-card" className={classes.card}>
        <List>
          {
            bucketList.map(b => {
              function auth() {
                signIn(b[0], b[1])
              }
              return (
                <ListItem key={b[0]}>
                  <ListItemAvatar>
                    <StorageIcon color="secondary" />
                  </ListItemAvatar>
                  <Typography color="secondary" className={classes.listItemText}><b>{b[0]}</b></Typography>
                  <IconButton variant="contained" onClick={auth} className={classes.auth}>
                    <LockOpenIcon size="medium" color="primary" />
                  </IconButton>
                  <ListItemSecondaryAction className={classes.more}>
                    <IconButton onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={e => removeCurrentBucket(e, b[0])}>
                        <DeleteIcon color="secondary" style={{ marginRight: "10px" }} />Delete
                      </MenuItem>
                    </Menu>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })
          }
          {
            isLCEmpty() &&
            <ListItem key={0}>
              <Typography color="secondary" className={classes.noneItem}>
                <b>There is no saved buckets</b>
              </Typography>
            </ListItem>
          }
        </List>
      </Card>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "2ch",
    paddingTop: "1ch",
    paddingBottom: "1ch",
  },
  auth: {
    marginRight: "40px",
  },
  listItemText: {
    fontSize: "1.2em",
    width: "100%"
  },
  noneItem: {
    fontSize: "1.2em",
    textAlign: "center",
    width: "100%"
  }
}));

function isLCEmpty() {
  if (localStorage.getItem("buckets") == undefined || localStorage.getItem("buckets") == "{}") {
    return true
  }
  return false;
}

export default Buckets;