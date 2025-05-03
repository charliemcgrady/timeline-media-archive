import React, { FunctionComponent } from "react";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "~/redux/store";
import { tagActions } from "~/redux/actions";
import { TagMap } from "~/rgb-commons/types/tags";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      textAlign: "center",
      margin: theme.spacing(2)
    },
    button: {
      margin: "auto"
    }
  })
);

const DeleteTag: FunctionComponent<{
  tagMap: TagMap;
  activeTagId: string | undefined;
  setActiveTagId: (id: string | undefined) => void;
}> = ({ activeTagId, setActiveTagId, tagMap }) => {
  const dispatch = useDispatch();
  const { pendingSync } = useSelector((state: AppState) => state.userData.tags);

  const onDelete = () => {
    dispatch(
      tagActions.updatePendingSync({
        ...pendingSync,
        tagsToDelete: [...pendingSync.tagsToDelete, ...[tagMap[activeTagId!]]]
      })
    );
    setActiveTagId(undefined);
  };

  const classes = useStyles();

  return (
    <>
      {activeTagId && (
        <div className={classes.root}>
          <Button
            className={classes.button}
            onClick={onDelete}
            color="secondary"
          >
            Delete
          </Button>
        </div>
      )}
    </>
  );
};

export default DeleteTag;
