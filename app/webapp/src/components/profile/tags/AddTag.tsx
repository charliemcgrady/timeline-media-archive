import React, { FunctionComponent, useState } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Paper,
  InputBase,
  Divider,
  IconButton
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "~/redux/store";
import { tagActions } from "~/redux/actions";
import { getDefaultUserId, generateTagId } from "~/rgb-commons/uuidFactory";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: theme.spacing(3)
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    }
  })
);

const AddTag: FunctionComponent<{}> = () => {
  const dispatch = useDispatch();
  const { pendingSync } = useSelector((state: AppState) => state.userData.tags);

  const [label, setLabel] = useState("");

  const onAdd = () => {
    dispatch(
      tagActions.updatePendingSync({
        ...pendingSync,
        tagsToAddOrUpdate: [
          ...pendingSync.tagsToAddOrUpdate,
          {
            ownerId: getDefaultUserId(),
            id: generateTagId(),
            label
          }
        ]
      })
    );
    setLabel("");
  };

  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Enter new tag"
        onChange={evt => setLabel(evt.target.value)}
        value={label}
      />
      {label.length > 0 && (
        <>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={classes.iconButton}
            onClick={onAdd}
          >
            <AddIcon />
          </IconButton>
        </>
      )}
    </Paper>
  );
};

export default AddTag;
