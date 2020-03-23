import React, { FunctionComponent } from "react";
import { WidgetConfig, MediaGrid } from "~/rgb-commons/types/widgets";
import { Container, Slider, Grid, Switch } from "@material-ui/core";
import {
  DEFAULT_BOX_SPACING,
  DEFAULT_HEIGHT,
  DEFAULT_MAX_CONTAINER_WIDTH
} from "~/components/pure/widgets/media-grid/defaults";
import WidgetRenderer from "~/components/pure/renderers/WidgetRenderer";
import { StoryConfig } from "~/rgb-commons/types/story-config";

interface Props {
  story: StoryConfig;
  widget: WidgetConfig;
  setWidget: (widget: WidgetConfig) => void;
}

const EditMediaGridAppearance: FunctionComponent<Props> = ({
  widget,
  setWidget,
  story
}) => {
  const metadata = widget.metadata as MediaGrid.Metadata;

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            Make photos fill screen
            <Switch
              onChange={(evt: any, value: boolean) =>
                setWidget({
                  ...widget,
                  metadata: {
                    ...metadata,
                    makePhotosFullHeight: value
                  }
                })
              }
              checked={metadata.makePhotosFullHeight}
              color="primary"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            Photo height
            <Slider
              disabled={metadata.makePhotosFullHeight}
              valueLabelDisplay="auto"
              value={metadata.targetRowHeight || DEFAULT_HEIGHT}
              onChange={(evt, value) =>
                setWidget({
                  ...widget,
                  metadata: { ...metadata, targetRowHeight: value as number }
                })
              }
              min={50}
              max={1000}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            Horizontal spacing
            <Slider
              disabled={metadata.makePhotosFullHeight}
              valueLabelDisplay="auto"
              value={
                metadata.boxSpacing &&
                metadata.boxSpacing.horizontal !== undefined
                  ? metadata.boxSpacing.horizontal
                  : DEFAULT_BOX_SPACING
              }
              onChange={(evt, value) =>
                setWidget({
                  ...widget,
                  metadata: {
                    ...metadata,
                    boxSpacing: {
                      horizontal: value as number,
                      vertical:
                        metadata.boxSpacing &&
                        metadata.boxSpacing.vertical !== undefined
                          ? metadata.boxSpacing.vertical
                          : DEFAULT_BOX_SPACING
                    }
                  }
                })
              }
              min={0}
              max={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            Vertical spacing
            <Slider
              disabled={metadata.makePhotosFullHeight}
              valueLabelDisplay="auto"
              value={
                metadata.boxSpacing &&
                metadata.boxSpacing.vertical !== undefined
                  ? metadata.boxSpacing.vertical
                  : DEFAULT_BOX_SPACING
              }
              onChange={(evt, value) =>
                setWidget({
                  ...widget,
                  metadata: {
                    ...metadata,
                    boxSpacing: {
                      vertical: value as number,
                      horizontal:
                        metadata.boxSpacing &&
                        metadata.boxSpacing.horizontal !== undefined
                          ? metadata.boxSpacing.horizontal
                          : DEFAULT_BOX_SPACING
                    }
                  }
                })
              }
              min={0}
              max={200}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            Max width
            <Slider
              disabled={metadata.makePhotosFullHeight}
              valueLabelDisplay="auto"
              value={metadata.containerWidth || DEFAULT_MAX_CONTAINER_WIDTH}
              onChange={(evt, value) =>
                setWidget({
                  ...widget,
                  metadata: {
                    ...metadata,
                    containerWidth: value as number
                  }
                })
              }
              min={200}
              max={3000}
            />
          </Grid>
        </Grid>
      </Container>
      <WidgetRenderer {...{ widget, media: story.media }} />
    </>
  );
};

export default EditMediaGridAppearance;
