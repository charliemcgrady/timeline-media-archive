import { WidgetType, WidgetConfig } from "~/rgb-commons/types/widgets";
import { generateWidgetId } from "~/rgb-commons/uuidFactory";

export const getDefaultData = (type: WidgetType): WidgetConfig | undefined => {
  const id = generateWidgetId();
  let newWidget: WidgetConfig | undefined;

  if (type === WidgetType.Text) {
    newWidget = {
      id,
      type,
      metadata: {
        html: ""
      }
    };
  } else if (type === WidgetType.MediaGrid) {
    newWidget = {
      id,
      type,
      media: [],
      metadata: {}
    };
  } else if (type === WidgetType.VirtualReality) {
    newWidget = {
      id,
      type,
      media: [],
      metadata: {
        scenes: [
          // {
          //   id: "0-pano_20190820_091559",
          //   name: "PANO_20190820_091559",
          //   levels: [
          //     {
          //       tileSize: 256,
          //       size: 256,
          //       fallbackOnly: true
          //     },
          //     {
          //       tileSize: 512,
          //       size: 512
          //     },
          //     {
          //       tileSize: 512,
          //       size: 1024
          //     },
          //     {
          //       tileSize: 512,
          //       size: 2048
          //     }
          //   ],
          //   faceSize: 2048,
          //   initialViewParameters: {
          //     pitch: 0,
          //     yaw: 0,
          //     fov: 1.5707963267948966
          //   },
          //   infoHotspots: []
          // }
        ]
      }
    };
  }

  return newWidget;
};
