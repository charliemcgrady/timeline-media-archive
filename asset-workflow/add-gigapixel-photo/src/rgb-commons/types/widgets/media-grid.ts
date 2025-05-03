import { SupportedMediaType } from "./supported-media-types";

export type Metadata = {
  mediaIds: Array<string>;

  containerWidth?: number;

  containerPadding?: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };

  boxSpacing?: {
    horizontal: number;
    vertical: number;
  };

  makePhotosFullHeight?: boolean;
  targetRowHeight?: number;
}

// These are the fields of the Photo type which are required for the media grid
export type RequiredMediaConfig = {
  id: string;
  width: number;
  height: number;
  type: SupportedMediaType;
  dominantColorHex: string;
};

export type PhotoDimensions = {
  width: number;
  height: number;
};

export type LayoutParams = {
  top: number;
  width: number;
  height: number;
  left: number;
};

export interface LayoutMetadata {
  containerHeight: number;
  boxes: Array<LayoutParams>;
}

export interface Layout {
  calculate(input: Array<PhotoDimensions>, config: Metadata): LayoutMetadata;
};

