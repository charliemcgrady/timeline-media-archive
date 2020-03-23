import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";
import sharp from "sharp";
import parseExif from "../../rgb-commons/workflow/parseExif";
import { getThumbnailPath } from "../../workflow-runner/workflowDao";

export default class ParseExifStep extends WorkflowStep {
  name = WorkflowSteps.PARSE_EXIF;

  execute = async () => {
    const jpgBuffer = await sharp(
      getThumbnailPath(this.context.marzipanoKey)
    ).toBuffer();

    const { dateTaken, width, height, exif, decodedExif } = await parseExif(
      jpgBuffer
    );

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
