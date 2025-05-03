import * as Text from "./text";
import * as MediaGrid from "./media-grid";
import { SupportedMediaType } from "./supported-media-types";

export enum WidgetType {
  Text = "text",
  MediaGrid = "media-grid"
};

export type RequiredMediaConfig = MediaGrid.RequiredMediaConfig;

export type WidgetMedia = {
  type: SupportedMediaType,
  id: string
}

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  media?: Array<WidgetMedia>
  metadata: Text.Metadata | MediaGrid.Metadata;
}

export { Text, MediaGrid } 
