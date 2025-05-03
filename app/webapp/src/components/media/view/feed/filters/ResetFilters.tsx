import React, { FunctionComponent } from "react";
import { Button, createStyles, Theme, makeStyles } from "@material-ui/core";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";

import { useMediaView } from "~/components/media/useMediaView";
import { ViewType } from "~/components/media/view-type";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline"
    }
  })
);

const ResetFilters: FunctionComponent<{}> = () => {
  const mediaView = useMediaView();
  const { resetAppliedFilter, appliedFilter } = useAppliedFilter();

  const classes = useStyles();
  return (
    <>
      {Object.keys(appliedFilter).length > 0 && (
        <Button
          variant="contained"
          onClick={resetAppliedFilter}
          size={
            mediaView.toString() === ViewType.BROWSER.toString()
              ? "small"
              : "medium"
          }
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
