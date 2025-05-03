import { MediaGrid } from "~/rgb-commons/types/widgets";

export default class FullHeightLayout implements MediaGrid.Layout {
  private DEFAULT_VERTICAL_PADDING = 20;
  private DEFAULT_HORIZONTAL_PADDING = 0;

  calculate(
    input: Array<MediaGrid.PhotoDimensions>,
    config: MediaGrid.Metadata
  ): MediaGrid.LayoutMetadata {
    let currentHeight = 0;
    const boxes = input.map(photoDim => {
      const { width, height } = this.calculatePhotoSize(photoDim, config);
      const layout = {
        top: currentHeight,
        width: width,
        height: height,
        left: (window.innerWidth - width) / 2
      };

      const padding =
        (config.boxSpacing && config.boxSpacing.vertical) ||
        this.DEFAULT_VERTICAL_PADDING;

      currentHeight += height + padding;
      return layout;
    });

    return {
      containerHeight: currentHeight,
      boxes
    };
  }

  private calculatePhotoSize = (
    photoDim: MediaGrid.PhotoDimensions,
    config: MediaGrid.Metadata
  ) => {
    const { width, height } = this.calculateFullHeightLayout(photoDim, config);
    if (width > window.innerWidth) {
      return this.calculateFullWidthLayout(photoDim, config);
    } else {
      return { width, height };
    }
  };

  private calculateFullHeightLayout = (
    photoDim: MediaGrid.PhotoDimensions,
    config: MediaGrid.Metadata
  ) => {
    const padding =
      (config.boxSpacing && config.boxSpacing.vertical) ||
      this.DEFAULT_VERTICAL_PADDING;
    const height = window.innerHeight - padding;
    const width = height * (photoDim.width / photoDim.height);
    return { height, width };
  };

  private calculateFullWidthLayout = (
    photoDim: MediaGrid.PhotoDimensions,
    config: MediaGrid.Metadata
  ) => {
    const padding =
      (config.containerPadding && config.containerPadding.left) ||
      this.DEFAULT_HORIZONTAL_PADDING;
    const width = window.innerWidth - 2 * padding;
    const height = width * (photoDim.height / photoDim.width);
    return { height, width };
  };
}
