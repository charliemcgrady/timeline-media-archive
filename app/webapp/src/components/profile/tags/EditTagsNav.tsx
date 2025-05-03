import React from "react";
import { IconButton, CircularProgress, Button } from "@material-ui/core";
import NavBar from "~/components/pure/affordances/NavBar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import NavBarPasswordPrompt from "~/components/pure/affordances/NavBarPasswordPrompt";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "~/redux/store";
import { tagActions } from "~/redux/actions";

const EditTagsNav: React.FunctionComponent<{}> = ({ children }) => {
  const dispatch = useDispatch();
  const { syncLoading, fetchLoading, pendingSync } = useSelector(
    (state: AppState) => state.userData.tags
  );

  const history = useHistory();
  const onBack = () => history.push("/profile");

  return (
    <NavBar
      leftSlot={
        <IconButton color="inherit" onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
      }
      title="Edit Tags"
      rightSlot={
        <>
          <NavBarPasswordPrompt />
          {syncLoading || fetchLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <Button
              color="inherit"
              onClick={() => dispatch(tagActions.syncTags(pendingSync))}
            >
              Save
            </Button>
          )}
        </>
      }
    >
      {children}
    </NavBar>
  );
};

export default EditTagsNav;
