import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UploadPhotos from "~/components/profile/media/upload/photo/UploadPhotos";
import UploadGigapixelPhotos from "~/components/profile/media/upload/gigapixel-photo/UploadGigapixelPhotos";
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
import Profile from "./components/profile/Profile";
import EditTags from "./components/profile/tags/EditTags";
import GigapixelPhotosMedia from "./components/profile/media/hoc/GigapixelPhotosMedia";

export default () => (
  <Router>
    <Switch>
      <Route
        path="/profile/media/photosphere/upload"
        component={UploadPhotospheres}
      />
      <Route
        path="/profile/media/gigapixel-photo/upload"
        component={UploadGigapixelPhotos}
      />
      <Route path="/profile/media/photo/upload" component={UploadPhotos} />

      <Route path="/media/*" component={ViewMedia} />

      <Route path="/stories/:id" component={ViewStory} />

      <Route path="/profile/media/photos" component={PhotosMedia} />
      <Route
        path="/profile/media/gigapixel-photos"
        component={GigapixelPhotosMedia}
      />
      <Route path="/profile/media/photospheres" component={PhotosphereMedia} />
      <Route path="/profile/media/:id" component={EditMedia} />
      <Route
        path="/profile/stories/:storyId/:widgetId"
        component={EditWidget}
      />
      <Route path="/profile/stories/:id" component={EditStory} />
      <Route path="/profile/stories" component={EditStories} />
      <Route path="/profile/media" component={PhotosMedia} />
      <Route path="/profile/tags" component={EditTags} />
      <Route path="/profile/routes" component={EditRoute} />
      <Route path="/profile" component={Profile} />

      <Route path="/" component={ViewMedia} />
      <Route component={ViewMedia} />
    </Switch>
  </Router>
);
