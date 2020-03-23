import React, { FunctionComponent } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
  isLoading?: boolean;
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  },
}));

const LoadingSpinner: FunctionComponent<Props> = ({ isLoading = true }) => {
  const classes = useStyles({});

  return (
    <>
      {
        isLoading &&
        <div className={classes.root}>
          <CircularProgress />
        </div>
      }
    </>
  );
}

export default LoadingSpinner;
