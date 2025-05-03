import React, { FunctionComponent } from "react";
import EditStorySection from "./inline/EditStorySection";
import { StoryConfig } from "~/rgb-commons/types/story-config";
import EditStoryNavBar from "./EditStoryNavBar";
import { makeStyles, Theme, createStyles, Container } from "@material-ui/core";
import EditStoryReorderableContainer from "./inline/EditStoryReorderableContainer";
import AddWidget from "./AddWidget";
import { OFFSET_SPACING_FOR_FAB } from "~/style";

interface Props {
  story: StoryConfig;
  setStory: (story: StoryConfig) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingBottom: OFFSET_SPACING_FOR_FAB
    },
    editStorySection: {
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(2),
      maxWidth: theme.breakpoints.width("md"),
      margin: "auto"
    }
  })
);

const EditStory: FunctionComponent<Props> = ({ story, setStory }) => {
  const classes = useStyles();

  return (
    <EditStoryNavBar {...{ story, setStory }}>
      <EditStoryReorderableContainer {...{ story, setStory }}>
        <Container className={classes.root}>
          {story.widgets.map((widget, i) => (
            <div className={classes.editStorySection} key={widget.id}>
              <EditStorySection {...{ story, widget, setStory, index: i }} />
            </div>
          ))}
        </Container>
      </EditStoryReorderableContainer>
      <AddWidget {...{ story, setStory }} />
    </EditStoryNavBar>
  );
};

export default EditStory;
