import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";
import { nodeServerUrl } from "../../config/aws";
import fetch from "node-fetch";
import { Media, MediaType } from "../../rgb-commons/types/media";
import { SaveMediaRequest } from "../../rgb-commons/types/api";

export default class SaveStep extends WorkflowStep {
  name = WorkflowSteps.SAVE;

  execute = async () => {
    // Location is the one thing we are not currently capturing from exif
    const photosphere: Omit<Required<Media>, "locations"> = {
      id: this.context.photosphereId,
      type: MediaType.PHOTOSPHERE,
      ownerId: this.context.ownerId,
      dateTaken: this.context.dateTaken,
      width: this.context.width,
      height: this.context.height,
      exif: this.context.exif,
      lastModified: new Date(),
      dominantColorHex: this.context.dominantColorHex,
      colors: this.context.colors,
      filepaths: this.context.marzipanoFilePaths,
      rating: 3,
      archives: {
        gcpStorageUrl: this.context.archives.gcpStorageUrl,
        gcpVisionAnnotations: this.context.archives.gcpVisionAnnotations,
        s3ArchivedFileUrls: this.context.archives.s3ArchivedFileUrls
      }
    };

    console.log(
      "Saving the following photosphere to node-server:\n\n " +
        JSON.stringify(photosphere)
    );

    const url = `${nodeServerUrl}/api/media/${this.context.photosphereId}`;
    console.log(url);

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ media: photosphere } as SaveMediaRequest),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });

    if (response.status !== 200) {
      console.log(response.status);
      throw new Error("Failed to save to the node server");
    }

    return this.context;
  };
}
