import uuid from "uuid/v4";

export const generateUserId = () => "rgb.user.v1." + uuid();
export const generatePhotoId = () => "rgb.photo.v1." + uuid();
export const generatePhotosphereId = () => "rgb.photosphere.v1." + uuid();
export const generateColorId = () => "rgb.color.v1." + uuid();
export const generateStoryId = () => "rgb.story.v1." + uuid();
export const generateWidgetId = () => "rgb.widget.v1." + uuid();

export const getDefaultUserId = () =>
  "rgb.user.v1.ffb2fde6-fba6-40aa-8bb6-55b23d5d3c1d";
