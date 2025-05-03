import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";
import parseExif from "../../rgb-commons/workflow/parseExif";

export default class ParseExifStep extends WorkflowStep {
  name = WorkflowSteps.PARSE_EXIF;

  execute = async () => {
    const { dateTaken, width, height, exif, decodedExif } = await parseExif(
      this.context.jpgBuffer
    );

    console.log("Decoded exif");
    console.log(decodedExif);

    return {
      ...this.context,
      width,
      height,
      dateTaken,
      exif,
      archives: {
        ...this.context.archives,
        exif: decodedExif
      }
    };
  };
}
