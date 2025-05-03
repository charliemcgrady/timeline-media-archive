import React, { FunctionComponent } from "react";
import { WidgetConfig } from "~/rgb-commons/types/widgets";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Divider, ExpansionPanelActions, Button } from "@material-ui/core";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import { Link } from "react-router-dom";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import DeleteWidget from "./DeleteWidget";

interface Props {
  widget: WidgetConfig;
  story: StoryConfig;
  setStory: (story: StoryConfig) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 0
    },
    details: {
      display: "inherit"
    }
  })
);

const EditStorySection: FunctionComponent<Props> = ({
  widget,
  story,
  setStory,
  children
}) => {
  const classes = useStyles();

  return (
    <ExpansionPanel defaultExpanded elevation={2} className={classes.root}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel-content"
      >
        <DragHandleIcon />
      </ExpansionPanelSummary>
      <Divider />
      <ExpansionPanelDetails className={classes.details}>
        {children}
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <DeleteWidget {...{ widget, story, setStory }} />
        <Link to={`/profile/stories/${story.id}/${widget.id}`}>
          <Button size="small" color="primary">
            Edit
          </Button>
        </Link>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
};

export default EditStorySection;
