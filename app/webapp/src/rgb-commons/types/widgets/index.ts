import * as Text from "./text";
import * as MediaGrid from "./media-grid";
import * as VirtualReality from "./virtual-reality";
import { MediaType } from "../media";

export enum WidgetType {
  Text = "text",
  MediaGrid = "media-grid",
  VirtualReality = "virtual-reality"
}

export type RequiredMediaConfig = MediaGrid.RequiredMediaConfig;

export type WidgetMedia = {
  type: MediaType;
  id: string;
};

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  media?: Array<WidgetMedia>;
  metadata: Text.Metadata | MediaGrid.Metadata | VirtualReality.Metadata;
}

export { Text, MediaGrid, VirtualReality };
