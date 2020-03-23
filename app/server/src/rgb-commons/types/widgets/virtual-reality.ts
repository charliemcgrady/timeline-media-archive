export type Metadata = {
  scenes: Array<Scene>;
  height?: number;
  width?: number;
};

export type Level = {
  tileSize: number;
  size: number;
  fallbackOnly?: boolean;
};

export type InitialViewParameters = {
  yaw: number;
  pitch: number;
  fov: number;
  target?: string;
};

// FIXME: Add size validation to these radian numbers
export type SceneLinkHotspotConfig = {
  yaw: number;
  pitch: number;
  rotation: number;
  target: string;
};

export type PictureHotspotConfig = {
  yaw: number;
  pitch: number;
  title: string;
  text: string;
  photoIds: Array<string>;
};

export type InfoHotspotConfig = {
  yaw: number;
  pitch: number;
  title?: string;
  text?: string;
};

export type Scene = {
  id: string;
  name: string;
  faceSize: number;
  levels: Array<Level>;
  initialViewParameters: InitialViewParameters;
  // Amount of rotation in radians to compensate to true north when the yaw is 0

  // TODO: Add these back in once we flesh out the widget edit section
  // displacementFromNorth: number;
  // linkHotspots: SceneLinkHotspotConfig[];
  // pictureHotspots: PictureHotspotConfig[];

  infoHotspots?: InfoHotspotConfig[];
  location: {
    lat: number;
    lng: number;
  };
};
