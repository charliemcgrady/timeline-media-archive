import {
  AnnotateImageResponse,
  EntityAnnotation
} from "../../../rgb-commons/types/vision-api";
import { GCPVisionTag } from "../../../rgb-commons/types/media";

export default (annotations: AnnotateImageResponse): Array<GCPVisionTag> => {
  if (!annotations.labelAnnotations) {
    throw new Error(
      "Label annotations are missing from GCP Vision response:\n\n " +
        annotations
    );
  }

  return annotations.labelAnnotations.map((annotation: EntityAnnotation) => {
    if (!annotation.score || !annotation.mid || !annotation.description) {
      throw new Error(
        "Required properties are missing from GCP label annotation:\n\n " +
          annotation
      );
    }

    return {
      mid: annotation.mid,
      description: annotation.description,
      score: annotation.score
    };
  });
};
