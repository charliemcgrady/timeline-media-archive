import React, { FunctionComponent } from "react";
import { Button, createStyles, Theme, makeStyles } from "@material-ui/core";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";
import { useIsViewingMap } from "../../../useIsViewingMap";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline"
    }
  })
);

const ResetFilters: FunctionComponent<{}> = () => {
  const viewingMap = useIsViewingMap();
  const { resetAppliedFilter, appliedFilter } = useAppliedFilter();

  const classes = useStyles();
  return (
    <>
      {Object.keys(appliedFilter).length > 0 && (
        <Button
          variant="contained"
          onClick={resetAppliedFilter}
          size={viewingMap ? "small" : "medium"}
          color="secondary"
          className={classes.root}
        >
          Reset
        </Button>
      )}
    </>
  );
};

export default ResetFilters;
