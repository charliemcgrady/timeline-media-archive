import {
  ColorInfo as GCPColorInfo,
  AnnotateImageResponse
} from "../types/vision-api";
import { ColorInfo } from "../types/media";
import { generateColorId } from "../uuidFactory";
import * as d3 from "d3-color";

export default (
  annotations: AnnotateImageResponse
): { colors: Array<ColorInfo>; dominantColorHex: string } => {
  const colors: Array<ColorInfo> = annotations.imagePropertiesAnnotation.dominantColors.colors.map(
    (info: GCPColorInfo) => {
      validate(info);

      const rgb = {
        r: info.color.red,
        g: info.color.green,
        b: info.color.blue
      };

      const d3lab = d3.lab(`rgb(${rgb.r},${rgb.g},${rgb.b})`);
      const lab = {
        l: round(d3lab.l),
        a: round(d3lab.a),
        b: round(d3lab.b)
      };

      const d3hsl = d3.hsl(`rgb(${rgb.r},${rgb.g},${rgb.b})`);
      // For B+W colors, d3 sets h to null. Set it to 0 instead so errors aren't thrown
      // when marshalling to Dynamo
      if (!d3hsl.h) {
        d3hsl.h = 0;
      }
      const hsl = {
        h: round(d3hsl.h),
        s: round(d3hsl.s),
        l: round(d3hsl.l)
      };

      return {
        id: generateColorId(),
        rgb,
        lab,
        hsl,
        score: round(info.score),
        pixelFraction: round(info.pixelFraction)
      };
    }
  );

  // Cast the dominant color to any because d3-color types are missing formatHex()
  const dominantColor: any = d3.rgb(
    colors[0].rgb.r,
    colors[0].rgb.g,
    colors[0].rgb.b
  );

  return {
    colors,
    dominantColorHex: dominantColor.formatHex()
  };
};

const round = (value: number, precision = 3) =>
  Number.parseFloat(value.toFixed(precision));

const validate = (info: GCPColorInfo) => {
  if (
    !info.color ||
    !info.color.red ||
    !info.color.green ||
    !info.color.blue ||
    !info.pixelFraction ||
    !info.score
  ) {
    throw new Error("Required color information is missing from GCP: " + info);
  }
};
