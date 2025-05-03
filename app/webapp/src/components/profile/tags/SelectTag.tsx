import React, { FunctionComponent } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import { TagMap } from "~/rgb-commons/types/tags";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      textAlign: "center"
    },
    input: {
      textAlign: "left",
      marginTop: theme.spacing(2),
      width: 300,
      marginLeft: "auto",
      marginRight: "auto"
    }
  })
);

const SelectTag: FunctionComponent<{
  tagMap: TagMap;
  activeTagId: string | undefined;
  setActiveTagId: (id: string | undefined) => void;
}> = ({ activeTagId, setActiveTagId, tagMap }) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setActiveTagId(event.target.value as string);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl className={classes.input}>
        <InputLabel id="select-tag">Select tag</InputLabel>
        <Select
          labelId="select-tag"
          value={activeTagId}
          onChange={handleChange}
        >
          {Object.keys(tagMap).map(id => (
            <MenuItem value={tagMap[id].id}>{tagMap[id].label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectTag;
