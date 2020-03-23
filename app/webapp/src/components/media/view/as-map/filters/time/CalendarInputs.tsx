import "date-fns";
import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { useAppliedFilter } from "~/redux/media-filter/useAppliedFilter";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: "center"
    },
    input: {
      width: 125,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      "& .MuiSvgIcon-root": {
        fontSize: "1.2rem"
      },
      "& .MuiIconButton-root": {
        padding: 8
      },
      "& .MuiInputBase-input": {
        paddingBottom: 3
      },
      "& .MuiInputLabel-formControl": {
        fontSize: 14,
        "& .MuiInputLabel-shrink": {
          fontSize: 12
        }
      }
    }
  })
);

const CalendarInputs: React.FunctionComponent<{}> = () => {
  const { appliedFilter, setAppliedFilter } = useAppliedFilter();
  const onStartDateChange = (date: Date | null) => {
    setAppliedFilter({
      ...appliedFilter,
      // Picker library works with nulls; we prefer undefined.
      startDate: date || undefined
    });
  };

  const onEndDateChange = (date: Date | null) => {
    setAppliedFilter({
      ...appliedFilter,
      endDate: date || undefined
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          className={classes.input}
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="start-date-picker-inline"
          label="Start date"
          value={appliedFilter.startDate || null}
          onChange={onStartDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
        <KeyboardDatePicker
          className={classes.input}
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="end-date-picker-inline"
          label="End date"
          value={appliedFilter.endDate || null}
          onChange={onEndDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default CalendarInputs;
