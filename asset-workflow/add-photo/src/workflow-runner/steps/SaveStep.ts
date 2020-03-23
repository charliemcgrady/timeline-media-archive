import WorkflowStep from "./WorkflowStep";
import { WorkflowSteps } from "./types";
import { nodeServerUrl } from "../../config/aws";
import fetch from "node-fetch";
import { Media, MediaType } from "../../rgb-commons/types/media";
import { SaveMediaRequest } from "../../rgb-commons/types/api";

export default class SaveStep extends WorkflowStep {
  name = WorkflowSteps.SAVE;

  execute = async () => {
    this.validate();

    // Location is the one thing we are not currently capturing from exif
    const photo: Omit<Required<Media>, "locations"> = {
      id: this.context.photoId,
      type: MediaType.PHOTO,
      ownerId: this.context.ownerId,
      dateTaken: this.context.dateTaken,
      lastModified: new Date(),
      width: this.context.width,
      height: this.context.height,
      dominantColorHex: this.context.dominantColorHex,
      colors: this.context.colors,
      filepaths: this.context.filepaths,
      rating: 3,
      exif: this.context.exif,
      archives: {
        exif: this.context.archives.exif,
        gcpStorageUrl: this.context.archives.gcpStorageUrl,
        gcpVisionAnnotations: this.context.archives.gcpVisionAnnotations,
        s3ArchivedFileUrls: this.context.archives.s3ArchivedFileUrls
      }
    };

    console.log(
      "Saving the following photo to node-server:\n\n " + JSON.stringify(photo)
    );

    const url = `${nodeServerUrl}/api/media/${this.context.photoId}`;
    console.log(url);

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ media: photo } as SaveMediaRequest),
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

  // Defensively make sure we have collected everything we need before completing the workflow
  //
  // These are all set in the workflow steps. However, the WorkflowContext type has
  // many ?s because the values are set at different times.
  //
  // prettier-ignore
  validate = () => {
    const log = fieldName => {
      let contextWithoutJpegBuffer = this.context;
      delete contextWithoutJpegBuffer.jpgBuffer
      console.log(`${fieldName} is missing:\n\n${JSON.stringify(contextWithoutJpegBuffer)}`);
      throw new Error("Required fields are missing at the end of the workflow.");
    }

    if (!this.context.photoId) { log('photoId') }
    if (!this.context.ownerId) { log('ownerId') }
    if (!this.context.dateTaken) { log('dateTaken') }
    if (!this.context.width) { log('width') }
    if (!this.context.height) { log('height') }
    if (!this.context.dominantColorHex) { log('dominantColorHex') }
    if (!this.context.colors) { log('colors') }
    if (!this.context.filepaths) { log('filepaths') }
    if (!this.context.exif) { log('exif') }
    if (!this.context.archives) { log('archives') }
    if (!this.context.archives.exif) { log('archives.exif') }
    if (!this.context.archives.gcpStorageUrl) { log('archives.gcpStorageUrl') }
    if (!this.context.archives.gcpVisionAnnotations) { log('archives.gcpVisionAnnotations') }
    if (!this.context.archives.s3ArchivedFileUrls) { log('archives.s3ArchivedFileUrls') }
  }
}
