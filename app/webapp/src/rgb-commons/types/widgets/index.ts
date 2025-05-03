import * as Text from "./text";
import * as MediaGrid from "./media-grid";
import * as VirtualReality from "./virtual-reality";
import * as GigapixelPhoto from "./gigapixel-photo";
import { MediaType } from "../media";

export enum WidgetType {
  Text = "text",
  MediaGrid = "media-grid",
  VirtualReality = "virtual-reality",
  GigapixelPhoto = "gigapixel-photo"
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
  metadata:
    | Text.Metadata
    | MediaGrid.Metadata
    | VirtualReality.Metadata
    | GigapixelPhoto.Metadata;
}

export { Text, MediaGrid, VirtualReality, GigapixelPhoto };
