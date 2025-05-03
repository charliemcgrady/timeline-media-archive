import React, { FunctionComponent } from "react";
import { Theme, makeStyles, createStyles, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "~/redux/store";
import { updatePassword } from "~/redux/authentication/actions";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "white",
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: 200
    }
  })
);

const NavBarPasswordPrompt: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const state = useSelector((appState: AppState) => appState);

  const classes = useStyles();

  return (
    <>
      <TextField
        InputLabelProps={{ shrink: false }}
        className={classes.root}
        label={state.authentication.password === "" ? "Password" : ""}
        value={state.authentication.password}
        onChange={evt => dispatch(updatePassword(evt.target.value))}
        variant="outlined"
        size="small"
      />
      {state.userData.media.saveError ||
      state.userData.stories.saveError ||
      state.userData.tags.syncError ||
      state.userData.media.fetchError ? (
        <ErrorOutlineIcon color="inherit" />
      ) : (
        <></>
      )}
    </>
  );
};

export default NavBarPasswordPrompt;
