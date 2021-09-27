import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';

import '../../../assets/styles/styles.css'
import { downloadFile, removeFile } from '../../../storage/utils.supabase.js';

function FilesViewer(props) {
  const classes = useStyles();
  const data = props.data

  return (
    <Container className={classes.files}>
      <Grid container spacing={2}>
        {
          data.map(d => {
            const name = d.name;
            const ext = name.split(".")[name.split(".").length - 1];
            const style = {
              fontWeight: 600, fontSize: 15, backgroundColor: stringToColor(ext)
            }
            return (
              <Grid item key={data.indexOf(d)} xs={12} sm={6} md={4} lg={3}>
                <Card id="file-card" className={classes.fileCard} variant="outlined">
                  <CardActionArea id="card-title" onClick={() => downloadFile(d.name)} className={classes.textFileCard}>
                    <CardContent >
                      <Typography variant="h6" component="h6">{
                        d.name.split(".")[0].replace(/\-/g, " ")
                      }</Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className={classes.buttonCardAction}>
                    <Chip color="primary" style={style} label={ext.toUpperCase()} className={classes.chip} />
                    <IconButton className={classes.smallButton} size="small" onClick={() => downloadFile(d.name)}>
                      <GetAppIcon color="secondary" />
                    </IconButton>
                    <IconButton className={classes.smallButton} size="small" onClick={() => removeFile(d.name)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )
          })
        }
      </Grid>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  files: {
    marginTop: "150px",
    marginBottom: "20px",
    fullWidth: true,
    flexGrow: 1,
    display: "flex",
  },
  buttonCardAction: {
    display: "flex",
  },
  smallButton: {
    padding: "0px"
  },
  chip: {
    flexGrow: 1,
    overflow: "hidden",
    textTransform: 'capitalize',
    "&:.MuiChip-label": {
      fontSize: "1em",
      textDecoration: "bold"
    }
  },
  fileCard: {
    textAlign: "center",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    borderRadius: "0.5em"
  },
  textFileCard: {
    backgroundColor: "#eeeeee",
    textTransform: 'capitalize',
    flexGrow: 1,
    overflowX: "hidden",
    overflowY: "hidden",
    height: "140px"
  }
}));

var stringToColor = function (str) {
  var extColors = {
  }
  return extColors[str];
}

export default FilesViewer;