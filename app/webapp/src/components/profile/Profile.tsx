import React, { FunctionComponent } from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  Button,
  Grid,
  TextField
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "~/redux/store";
import { updatePassword } from "~/redux/authentication/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center",
      marginTop: theme.spacing(3),
      "& > *": {
        marginBottom: theme.spacing(2)
      }
    }
  })
);

const Profile: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const password = useSelector(
    (appState: AppState) => appState.authentication.password
  );

  const history = useHistory();
  const classes = useStyles();
  return (
    <Grid className={classes.root}>
      <Grid item>
        <TextField
          label="Password"
          value={password}
          onChange={evt => dispatch(updatePassword(evt.target.value))}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => history.push("/profile/media/photos")}
        >
          Photos
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => history.push("/profile/media/photospheres")}
        >
          Photospheres
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => history.push("/profile/media/gigapixel-photos")}
        >
          Gigapixel Photos
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => history.push("/profile/stories")}
        >
          Stories
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          onClick={() => history.push("/profile/tags")}
        >
          Tags
        </Button>
      </Grid>
    </Grid>
  );
};

export default Profile;
