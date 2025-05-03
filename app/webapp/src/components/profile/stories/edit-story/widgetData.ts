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
        scenes: []
      }
    };
  } else if (type === WidgetType.GigapixelPhoto) {
    newWidget = {
      id,
      type,
      media: [],
      metadata: {}
    };
  }

  return newWidget;
};
