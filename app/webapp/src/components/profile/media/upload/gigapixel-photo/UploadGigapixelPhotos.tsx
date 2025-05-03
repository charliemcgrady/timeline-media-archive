import React, { useEffect } from "react";
import * as Uppy from "@uppy/core";
import UploadNavBar from "../UploadNavBar";
import { MediaType } from "~/rgb-commons/types/media";
import UppyWrapper from "../UppyWrapper";
import { CreateGigapixelPhotoRequest } from "~/rgb-commons/types/api";
import {
  Typography,
  Grid,
  makeStyles,
  Theme,
  createStyles
} from "@material-ui/core";
import getUploadParameters from "~/components/profile/media/upload/getUploadParameters";
import AwsS3 from "@uppy/aws-s3";
import store from "~/redux/store";

const uppy = new Uppy.Uppy({ autoProceed: true });
uppy.use(AwsS3, { getUploadParameters });

const save = (request: CreateGigapixelPhotoRequest) =>
  fetch(`/api/media/gigapixel-photo`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Password: store.getState().authentication.password
    }
  });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    instructions: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      paddingTop: theme.spacing(1),
      backgroundColor: "white"
    }
  })
);

const UploadPhotospheres = () => {
  useEffect(
    () => {
      uppy.on("upload-success", (file: Uppy.UppyFile) => {
        save({ zipUrlKey: file.name, gigapixelKey: file.name.split(".")[0] });
      });
    },
    // uppy.on will set up a new event listener every time it is called
    // Make sure it's only called once so we don't end up with duplicate file entries
    []
  );

  const classes = useStyles();

  return (
    <UploadNavBar type={MediaType.GIGAPIXEL_PHOTO}>
      <Grid container justify="center" className={classes.instructions}>
        <Typography variant="body2">
          <div>
            Contents should be a zip folder with{" "}
            <a href="https://github.com/openzoom/deepzoom.py">
              Deep Zoom files
            </a>{" "}
            and the original file named as <i>key</i>.jpg.
          </div>
        </Typography>
      </Grid>
      <UppyWrapper uppy={uppy} />
    </UploadNavBar>
  );
};

export default UploadPhotospheres;
