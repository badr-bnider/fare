import React from 'react';
import { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { CircularProgress } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import { uploadFile } from '../../../storage/utils.supabase.js';

function Upload() {
  const classes = useStyles();
  const [state, setState] = useState(1)

  async function upload(e) {
    setState(2)
    const data = await uploadFile(e)
    if (data.data) {
      setState(3)
      await setTimeout(() => { setState(1) }, 1000)
    }
    else if (data.error) {
      setState(4)
      await setTimeout(() => {setState(1)}, 2000)
    }
  }

  return (
    <div className={classes.root}>
      <input className={classes.fileInput} id="uploadInput" multiple type="file" onChange={upload} />
      <label htmlFor="uploadInput">
        <Fab color="primary" className={classes.fab} aria-label="add" component="span">
          {state == 1 && <AddIcon />}
          {state == 2 && <CircularProgress color="secondary" />}
          {state == 3 && <CheckIcon color="secondary" />}
          {state == 4 && <ClearIcon color="secondary" />}
        </Fab>
      </label>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: "10",
  },
  fileInput: {
    display: "none",
  },
}));

export default Upload;