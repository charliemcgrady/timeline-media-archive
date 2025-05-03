import justifiedLayout from "justified-layout";
import { MediaGrid } from "~/rgb-commons/types/widgets";

export default class JustifiedLayout implements MediaGrid.Layout {
  calculate(
    input: Array<MediaGrid.PhotoDimensions>,
    config: MediaGrid.Metadata
  ): MediaGrid.LayoutMetadata {
    if (config.containerWidth && config.containerWidth > window.innerWidth) {
      config.containerWidth = window.innerWidth;
    }

    return justifiedLayout(input, {
      containerWidth: config.containerWidth || window.innerWidth,
      widowLayoutStyle: "center",
      ...config
    });
  }
}
