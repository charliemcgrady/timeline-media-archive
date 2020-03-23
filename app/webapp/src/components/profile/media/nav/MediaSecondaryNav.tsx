import React, { FunctionComponent } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { MediaType } from "~/rgb-commons/types/media";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps<{}> {
  activeType: MediaType;
}

const MediaNav: FunctionComponent<Props> = ({ activeType, history }) => {
  const handleChange = (event: React.ChangeEvent<{}>, newValue: MediaType) => {
    let newActiveCollection = "photos";
    if (newValue === MediaType.PHOTOSPHERE) {
      newActiveCollection = "photospheres";
    }
    history.push(`/profile/media/${newActiveCollection}`);
  };

  return (
    <Paper square>
      {/* Render a dummy tab to offset the page's nav bar */}
      <Tabs value={0} />
      <Tabs
        value={activeType.toString()}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Photos" value={MediaType.PHOTO} />
        <Tab label="Photo Spheres" value={MediaType.PHOTOSPHERE} />
      </Tabs>
    </Paper>
  );
};

export default withRouter(MediaNav);
