import WorkflowStep from "../WorkflowStep";
import { WorkflowSteps } from "../types";
import { photosBucket } from "../../../config/gcp";
import parseColors from "../../../rgb-commons/workflow/parseGVisionColors";
import {
  uploadToGCP,
  processImage
} from "../../../rgb-commons/workflow/gcpUtils";

export default class ProcessWithGVisionStep extends WorkflowStep {
  name = WorkflowSteps.PROCESS_WITH_GVISION;

  execute = async () => {
    const key = `${this.context.ownerId}/${this.context.photoId}.jpg`;

    await uploadToGCP(key, this.context.jpgBuffer);
    const gcpVisionAnnotations = await processImage(key);

    const { colors, dominantColorHex } = parseColors(gcpVisionAnnotations);

    return {
      ...this.context,
      colors,
      dominantColorHex,
      archives: {
        ...this.context.archives,
        gcpVisionAnnotations,
        gcpStorageUrl: { key, bucket: photosBucket }
      }
    };
  };
}
