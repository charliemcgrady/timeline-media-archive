import React, { FunctionComponent } from "react";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";

const useStyles = makeStyles({
  root: {
    width: 200,
    margin: "auto"
  }
});

const RatingFilter: FunctionComponent<{}> = () => {
  const { appliedFilter, setAppliedFilter } = useAppliedFilter();

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Checkbox
            value={appliedFilter.rating === 5}
            onClick={() => {
              if (appliedFilter.rating === 5) {
                setAppliedFilter({ rating: undefined });
              } else {
                setAppliedFilter({ rating: 5 });
              }
            }}
          />
        }
        label="Only show bangers"
      />
    </div>
  );
};

export default RatingFilter;
