import React, { useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import UploadPhotos from "~/components/profile/media/upload/photo/UploadPhotos";
import UploadPhotospheres from "~/components/profile/media/upload/photosphere/UploadPhotospheres";
import ViewMedia from "~/components/media/ViewMediaContainer";
import ViewStory from "~/components/stories/ViewStoryContainer";
import EditStories from "~/components/profile/stories/EditStories";
import EditStory from "~/components/profile/stories/edit-story/EditStoryContainer";
import EditWidget from "~/components/profile/stories/edit-story/edit-widget/EditWidgetContainer";
import EditMedia from "~/components/profile/media/edit/EditMediaContainer";
import EditRoute from "~/components/profile/media/edit/routes/EditRoute";
import PhotosMedia from "./components/profile/media/hoc/PhotosMedia";
import PhotosphereMedia from "./components/profile/media/hoc/PhotosphereMedia";

export default ({}) => (
  <Router>
    <ScrollToTop>
      <Switch>
        <Route
          path="/profile/media/photosphere/upload"
          component={UploadPhotospheres}
        />
        <Route path="/profile/media/photo/upload" component={UploadPhotos} />
        <Route path="/stories/:id" component={ViewStory} />
        <Route path="/media/map" component={ViewMedia} />
        <Route path="/media" component={ViewMedia} />
        <Route path="/profile/media/photos" component={PhotosMedia} />
        <Route
          path="/profile/media/photospheres"
          component={PhotosphereMedia}
        />
        <Route path="/profile/media/:id" component={EditMedia} />
        <Route
          path="/profile/stories/:storyId/:widgetId"
          component={EditWidget}
        />
        <Route path="/profile/stories/:id" component={EditStory} />
        <Route path="/profile/stories" component={EditStories} />
        <Route path="/profile/media" component={PhotosMedia} />
        <Route path="/profile/routes" component={EditRoute} />
        {/* Finally, catch all unmatched routes */}
      </Switch>
    </ScrollToTop>
  </Router>
);

const ScrollToTop = withRouter(({ history, children }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);

  return <Fragment>{children}</Fragment>;
});
