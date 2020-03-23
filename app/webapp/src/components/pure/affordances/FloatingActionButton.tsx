import React, { FunctionComponent } from "react";
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

interface Props {
  label: string;
  onClick: () => void;
}

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(2),
    position: "fixed",
    bottom: 0,
    right: 0
  }
}));

const Photos: FunctionComponent<Props> = ({ onClick, label }) => {
  const classes = useStyles();

  return (
    <>
      <Fab
        color="primary"
        variant="extended"
        aria-label="add"
        className={classes.fab}
        onClick={onClick}

      >
        <AddIcon />
        {label}
      </Fab>
    </>
  );
}

export default Photos;
