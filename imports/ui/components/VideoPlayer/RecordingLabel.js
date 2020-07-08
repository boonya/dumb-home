import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = makeStyles(({ spacing }) => ({
  root: {
    display: 'inline-block',
    padding: `0 ${spacing(1)}px`,
    color: 'red',
    backgroundColor: 'rgba(255, 255, 255, .1)',
  },
  blink: {
    animation: '$blinker 1.5s linear infinite',
  },
  '@keyframes blinker': {
    '50%': {
      opacity: 0,
    },
  },
}));

export default function RecordingLabel() {
  const classes = useStyles();

  return (
    <Grid className={classes.root}>
      <Grid className={classes.blink} container justify="center" alignItems="center" wrap="nowrap">
        <FiberManualRecordIcon />
        <Typography>REC</Typography>
      </Grid>
    </Grid>
  );
}
